import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../contexts/ThemeContext';
import { Button } from '../components/Button';
import { ForestGrid } from '../components/ForestGrid';
import api from '../services/api';

export const HomeScreen = ({ navigation }: any) => {
    const { theme, isDark, toggleTheme } = useTheme();
    const [forest, setForest] = useState([]);

    useEffect(() => {
        fetchForest();
    }, []);

    const fetchForest = async () => {
        try {
            const response = await api.get('/focus/forest?userId=mock-uid');
            setForest(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
            <ScrollView contentContainerStyle={styles.content}>
                <View style={styles.header}>
                    <View>
                        <Text style={[styles.greeting, { color: theme.colors.primary }]}>Hello, Student!</Text>
                        <Text style={[styles.date, { color: theme.colors.textLight }]}>Today is a great day to learn.</Text>
                    </View>
                    <TouchableOpacity
                        onPress={toggleTheme}
                        style={[styles.themeToggle, { backgroundColor: theme.colors.surface }]}
                    >
                        <Text style={{ fontSize: 24 }}>{isDark ? '☀️' : '🌙'}</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.section}>
                    <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Quick Actions</Text>
                    <View style={styles.actionGrid}>
                        <Button title="Start Focus" onPress={() => navigation.navigate('Focus')} variant="primary" />
                        <Button title="Add Task" onPress={() => navigation.navigate('Tasks')} variant="secondary" />
                        <Button title="AI Tools" onPress={() => navigation.navigate('AITools')} variant="outline" />
                        <Button title="Calendar" onPress={() => navigation.navigate('Calendar')} variant="outline" />
                        <Button title="Stats" onPress={() => navigation.navigate('Stats')} variant="outline" />
                    </View>
                </View>

                <View style={styles.section}>
                    <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Your Forest</Text>
                    <ForestGrid trees={forest} />
                </View>

                <View style={styles.section}>
                    <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Upcoming Deadlines</Text>
                    <View style={[styles.card, {
                        backgroundColor: theme.colors.surface,
                        borderLeftColor: theme.colors.error,
                        ...theme.shadows.small,
                    }]}>
                        <Text style={[styles.cardTitle, { color: theme.colors.text }]}>Math Assignment</Text>
                        <Text style={[styles.cardSubtitle, { color: theme.colors.textLight }]}>Due Tomorrow</Text>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        padding: 16,
    },
    header: {
        marginBottom: 24,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },
    greeting: {
        fontSize: 28,
        fontWeight: 'bold',
    },
    date: {
        fontSize: 16,
    },
    themeToggle: {
        width: 50,
        height: 50,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
    },
    section: {
        marginBottom: 24,
    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    actionGrid: {
        gap: 8,
    },
    card: {
        padding: 16,
        borderRadius: 8,
        marginBottom: 8,
        borderLeftWidth: 4,
    },
    cardTitle: {
        fontSize: 16,
        fontWeight: '600',
    },
    cardSubtitle: {
        fontSize: 14,
        marginTop: 4,
    },
});
