import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Calendar, DateData } from 'react-native-calendars';
import { useTheme } from '../contexts/ThemeContext';
import { Button } from '../components/Button';
import api from '../services/api';

export const CalendarScreen = ({ navigation }: any) => {
    const { theme } = useTheme();
    const [tasks, setTasks] = useState<any[]>([]);
    const [selectedDate, setSelectedDate] = useState('');
    const [markedDates, setMarkedDates] = useState<Record<string, any>>({});

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        try {
            const response = await api.get('/tasks?userId=mock-uid');
            setTasks(response.data);

            const marked: Record<string, any> = {};
            response.data.forEach((task: any) => {
                if (task.dueDate) {
                    const date = task.dueDate.split('T')[0];
                    marked[date] = { marked: true, dotColor: theme.colors.primary };
                }
            });
            setMarkedDates(marked);
        } catch (error) {
            console.error(error);
        }
    };

    const handleDayPress = (day: DateData) => {
        setSelectedDate(day.dateString);
    };

    const filteredTasks = selectedDate
        ? tasks.filter(t => t.dueDate && t.dueDate.startsWith(selectedDate))
        : [];

    const renderTask = ({ item }: any) => (
        <View style={[styles.taskCard, { backgroundColor: theme.colors.surface, ...theme.shadows.small }]}>
            <Text style={[styles.taskTitle, { color: theme.colors.text }]}>{item.title}</Text>
            <Text style={[styles.taskCourse, { color: theme.colors.textLight }]}>{item.course || 'No course'}</Text>
        </View>
    );

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
            <View style={styles.header}>
                <Button title="Back" onPress={() => navigation.goBack()} variant="outline" />
                <Text style={[styles.title, { color: theme.colors.text }]}>Calendar</Text>
                <View style={{ width: 60 }} />
            </View>

            <Calendar
                onDayPress={handleDayPress}
                markedDates={{
                    ...markedDates,
                    [selectedDate]: {
                        selected: true,
                        selectedColor: theme.colors.primary,
                        marked: markedDates[selectedDate]?.marked || false,
                    },
                }}
                theme={{
                    backgroundColor: theme.colors.background,
                    calendarBackground: theme.colors.surface,
                    textSectionTitleColor: theme.colors.text,
                    dayTextColor: theme.colors.text,
                    todayTextColor: theme.colors.primary,
                    monthTextColor: theme.colors.text,
                    arrowColor: theme.colors.primary,
                }}
            />

            <View style={styles.tasksSection}>
                <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
                    {selectedDate ? `Tasks for ${selectedDate}` : 'Select a date'}
                </Text>
                {filteredTasks.length > 0 ? (
                    <FlatList
                        data={filteredTasks}
                        renderItem={renderTask}
                        keyExtractor={item => item.id}
                    />
                ) : (
                    <Text style={[styles.emptyText, { color: theme.colors.textLight }]}>
                        {selectedDate ? 'No tasks on this date' : ''}
                    </Text>
                )}
            </View>
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
    tasksSection: {
        flex: 1,
        padding: 16,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 12,
    },
    taskCard: {
        padding: 12,
        borderRadius: 8,
        marginBottom: 8,
    },
    taskTitle: {
        fontSize: 16,
        fontWeight: '500',
    },
    taskCourse: {
        fontSize: 14,
        marginTop: 4,
    },
    emptyText: {
        textAlign: 'center',
        marginTop: 20,
    },
});
