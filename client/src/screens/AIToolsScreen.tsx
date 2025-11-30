import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { theme } from '../theme';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import api from '../services/api';

export const AIToolsScreen = ({ navigation }: any) => {
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState('');
    const [inputText, setInputText] = useState('');

    const handleGeneratePlan = async () => {
        setLoading(true);
        try {
            // Mock data for now, in real app fetch tasks first
            const response = await api.post('/ai/studyplan', {
                tasks: [{ title: 'Math HW', deadline: 'Tomorrow' }],
                assignments: [],
            });
            setResult(response.data.plan);
        } catch (error) {
            console.error(error);
            setResult('Error generating plan.');
        } finally {
            setLoading(false);
        }
    };

    const handleSummarize = async () => {
        if (!inputText) return;
        setLoading(true);
        try {
            const response = await api.post('/ai/summarize', {
                text: inputText,
            });
            setResult(response.data.summary);
        } catch (error) {
            console.error(error);
            setResult('Error summarizing text.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Button title="Back" onPress={() => navigation.goBack()} variant="outline" />
                <Text style={styles.title}>AI Tools</Text>
                <View style={{ width: 60 }} />
            </View>

            <ScrollView contentContainerStyle={styles.content}>
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Study Planner</Text>
                    <Text style={styles.description}>
                        Let AI organize your schedule based on your tasks.
                    </Text>
                    <Button
                        title="Generate Daily Plan"
                        onPress={handleGeneratePlan}
                        loading={loading}
                    />
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Summarizer</Text>
                    <Input
                        placeholder="Paste text to summarize..."
                        multiline
                        numberOfLines={4}
                        value={inputText}
                        onChangeText={setInputText}
                        style={{ height: 100, textAlignVertical: 'top' }}
                    />
                    <Button
                        title="Summarize"
                        onPress={handleSummarize}
                        loading={loading}
                        variant="secondary"
                    />
                </View>

                {result ? (
                    <View style={styles.resultContainer}>
                        <Text style={styles.resultTitle}>AI Result:</Text>
                        <Text style={styles.resultText}>{result}</Text>
                    </View>
                ) : null}
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: theme.spacing.m,
    },
    title: {
        ...theme.typography.h2,
    },
    content: {
        padding: theme.spacing.m,
    },
    section: {
        marginBottom: theme.spacing.xl,
        backgroundColor: theme.colors.surface,
        padding: theme.spacing.m,
        borderRadius: theme.borderRadius.m,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: theme.colors.text,
        marginBottom: theme.spacing.s,
    },
    description: {
        ...theme.typography.body,
        marginBottom: theme.spacing.m,
        color: theme.colors.textLight,
    },
    resultContainer: {
        marginTop: theme.spacing.m,
        padding: theme.spacing.m,
        backgroundColor: '#E8F5E9',
        borderRadius: theme.borderRadius.m,
    },
    resultTitle: {
        fontWeight: 'bold',
        marginBottom: theme.spacing.s,
        color: theme.colors.primary,
    },
    resultText: {
        ...theme.typography.body,
    },
});
