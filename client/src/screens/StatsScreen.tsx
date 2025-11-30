import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LineChart } from 'react-native-chart-kit';
import { useTheme } from '../contexts/ThemeContext';
import { Button } from '../components/Button';
import api from '../services/api';

const screenWidth = Dimensions.get('window').width;

export const StatsScreen = ({ navigation }: any) => {
    const { theme } = useTheme();
    const [focusData, setFocusData] = useState({ labels: [], datasets: [{ data: [0] }] });
    const [totalMinutes, setTotalMinutes] = useState(0);

    useEffect(() => {
        fetchStats();
    }, []);

    const fetchStats = async () => {
        try {
            const response = await api.get('/focus/forest?userId=mock-uid');
            const sessions = response.data;

            // Calculate total minutes
            const total = sessions.reduce((acc: number, s: any) => acc + s.duration, 0);
            setTotalMinutes(total);

            // Prepare chart data (last 7 days)
            const last7Days = Array.from({ length: 7 }, (_, i) => {
                const date = new Date();
                date.setDate(date.getDate() - (6 - i));
                return date.toISOString().split('T')[0];
            });

            const dailyMinutes = last7Days.map(date => {
                return sessions
                    .filter((s: any) => s.createdAt?.startsWith(date))
                    .reduce((acc: number, s: any) => acc + s.duration, 0);
            });

            setFocusData({
                labels: last7Days.map(d => d.slice(5)), // MM-DD
                datasets: [{ data: dailyMinutes.length > 0 ? dailyMinutes : [0] }],
            });
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
            <View style={styles.header}>
                <Button title="Back" onPress={() => navigation.goBack()} variant="outline" />
                <Text style={[styles.title, { color: theme.colors.text }]}>Statistics</Text>
                <View style={{ width: 60 }} />
            </View>

            <ScrollView contentContainerStyle={styles.content}>
                <View style={[styles.card, { backgroundColor: theme.colors.surface, ...theme.shadows.medium }]}>
                    <Text style={[styles.cardTitle, { color: theme.colors.text }]}>Total Focus Time</Text>
                    <Text style={[styles.bigNumber, { color: theme.colors.primary }]}>{totalMinutes} min</Text>
                </View>

                <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Weekly Focus Trend</Text>
                <LineChart
                    data={focusData}
                    width={screenWidth - 32}
                    height={220}
                    chartConfig={{
                        backgroundColor: theme.colors.surface,
                        backgroundGradientFrom: theme.colors.surface,
                        backgroundGradientTo: theme.colors.surface,
                        decimalPlaces: 0,
                        color: (opacity = 1) => `rgba(76, 175, 80, ${opacity})`,
                        labelColor: (opacity = 1) => theme.colors.text,
                        style: { borderRadius: 16 },
                        propsForDots: { r: '6', strokeWidth: '2', stroke: theme.colors.primary },
                    }}
                    bezier
                    style={styles.chart}
                />
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    content: {
        padding: 16,
    },
    card: {
        padding: 20,
        borderRadius: 12,
        marginBottom: 24,
        alignItems: 'center',
    },
    cardTitle: {
        fontSize: 16,
        marginBottom: 8,
    },
    bigNumber: {
        fontSize: 48,
        fontWeight: 'bold',
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 16,
    },
    chart: {
        marginVertical: 8,
        borderRadius: 16,
    },
});
