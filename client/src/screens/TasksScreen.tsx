import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, LayoutAnimation, Platform, UIManager } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { theme } from '../theme';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import api from '../services/api';

// Enable LayoutAnimation on Android
if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

export const TasksScreen = ({ navigation }: any) => {
    const [tasks, setTasks] = useState<any[]>([]);
    const [newTask, setNewTask] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        try {
            const response = await api.get('/tasks?userId=mock-uid');
            // Simple animation when loading initial data
            LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
            setTasks(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleAddTask = async () => {
        if (!newTask.trim()) return;

        setLoading(true);
        try {
            const response = await api.post('/tasks', {
                title: newTask,
                userId: 'mock-uid', // Replace with real user ID
            });

            LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
            setTasks([response.data, ...tasks]);
            setNewTask('');
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteTask = async (id: string) => {
        try {
            await api.delete(`/tasks/${id}`);
            LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
            setTasks(tasks.filter(t => t.id !== id));
        } catch (error) {
            console.error(error);
        }
    };

    const renderItem = ({ item }: any) => (
        <View style={styles.taskCard}>
            <View style={styles.taskInfo}>
                <Text style={styles.taskTitle}>{item.title}</Text>
                <Text style={styles.taskStatus}>{item.completed ? 'Completed' : 'Pending'}</Text>
            </View>
            <TouchableOpacity onPress={() => handleDeleteTask(item.id)}>
                <Text style={styles.deleteText}>Delete</Text>
            </TouchableOpacity>
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Button title="Back" onPress={() => navigation.goBack()} variant="outline" />
                <Text style={styles.title}>My Tasks</Text>
                <View style={{ width: 60 }} />
            </View>

            <View style={styles.inputContainer}>
                <Input
                    label="New Task"
                    placeholder="What needs to be done?"
                    value={newTask}
                    onChangeText={setNewTask}
                />
                <Button
                    title="Add"
                    onPress={handleAddTask}
                    loading={loading}
                />
            </View>

            <FlatList
                data={tasks}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.list}
            />
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
    inputContainer: {
        padding: theme.spacing.m,
    },
    list: {
        padding: theme.spacing.m,
    },
    taskCard: {
        backgroundColor: theme.colors.surface,
        padding: theme.spacing.m,
        borderRadius: theme.borderRadius.m,
        marginBottom: theme.spacing.s,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        ...theme.shadows.small,
    },
    taskInfo: {
        flex: 1,
    },
    taskTitle: {
        fontSize: 16,
        fontWeight: '500',
        color: theme.colors.text,
    },
    taskStatus: {
        fontSize: 12,
        color: theme.colors.textLight,
        marginTop: 4,
    },
    deleteText: {
        color: theme.colors.error,
        fontWeight: '600',
    },
});
