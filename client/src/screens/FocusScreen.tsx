import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../contexts/ThemeContext';
import { Button } from '../components/Button';
import api from '../services/api';

export const FocusScreen = ({ navigation }: any) => {
    const { theme } = useTheme();
    const [isActive, setIsActive] = useState(false);
    const [timeLeft, setTimeLeft] = useState(25 * 60);
    const [mode, setMode] = useState<'25' | '45' | '60'>('25');

    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (isActive && timeLeft > 0) {
            interval = setInterval(() => {
                setTimeLeft((prev) => prev - 1);
            }, 1000);
        } else if (timeLeft === 0 && isActive) {
            setIsActive(false);
            handleCompleteSession();
        }
        return () => clearInterval(interval);
    }, [isActive, timeLeft]);

    const handleCompleteSession = async () => {
        try {
            await api.post('/focus/session', {
                duration: parseInt(mode),
                userId: 'mock-uid',
            });
            Alert.alert('Focus Session Complete!', 'You grew a tree! 🌳');
            setTimeLeft(parseInt(mode) * 60);
        } catch (error) {
            console.error(error);
        }
    };

    const toggleTimer = () => {
        setIsActive(!isActive);
    };

    const setTimerMode = (newMode: '25' | '45' | '60') => {
        if (isActive) return;
        setMode(newMode);
        setTimeLeft(parseInt(newMode) * 60);
    };

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    };

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
            <View style={styles.header}>
                <Button title="Back" onPress={() => navigation.goBack()} variant="outline" />
                <Text style={[styles.title, { color: theme.colors.text }]}>Focus Mode</Text>
                <View style={{ width: 60 }} />
            </View>

            <View style={styles.content}>
                <View style={styles.timerContainer}>
                    <Text style={[styles.timerText, { color: theme.colors.primary }]}>{formatTime(timeLeft)}</Text>
                    <Text style={[styles.statusText, { color: theme.colors.textLight }]}>
                        {isActive ? 'Growing a tree...' : 'Ready to focus?'}
                    </Text>
                </View>

                <View style={styles.controls}>
                    <View style={styles.modeSelector}>
                        <Button title="25m" onPress={() => setTimerMode('25')} variant={mode === '25' ? 'primary' : 'outline'} disabled={isActive} />
                        <Button title="45m" onPress={() => setTimerMode('45')} variant={mode === '45' ? 'primary' : 'outline'} disabled={isActive} />
                        <Button title="60m" onPress={() => setTimerMode('60')} variant={mode === '60' ? 'primary' : 'outline'} disabled={isActive} />
                    </View>

                    <Button title={isActive ? 'Give Up' : 'Start Focus'} onPress={toggleTimer} variant={isActive ? 'secondary' : 'primary'} />
                </View>
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
    content: {
        flex: 1,
        justifyContent: 'center',
        padding: 24,
    },
    timerContainer: {
        alignItems: 'center',
        marginBottom: 64,
    },
    timerText: {
        fontSize: 80,
        fontWeight: 'bold',
    },
    statusText: {
        fontSize: 16,
        marginTop: 16,
    },
    controls: {
        width: '100%',
    },
    modeSelector: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 24,
    },
});
