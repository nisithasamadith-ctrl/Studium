import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { theme } from '../theme';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import api from '../services/api';

export const AddFriendScreen = ({ navigation }: any) => {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);

    const handleAddFriend = async () => {
        if (!email) return;
        setLoading(true);
        try {
            await api.post('/friends/add', {
                userId: 'mock-uid', // Replace with real ID from context/auth
                friendEmail: email,
            });
            Alert.alert('Success', 'Friend added!');
            navigation.goBack();
        } catch (error: any) {
            Alert.alert('Error', error.response?.data?.message || 'Failed to add friend');
        } finally {
            setLoading(false);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Button title="Back" onPress={() => navigation.goBack()} variant="outline" />
                <Text style={styles.title}>Add Friend</Text>
                <View style={{ width: 60 }} />
            </View>

            <View style={styles.content}>
                <Text style={styles.description}>
                    Enter your friend's email address to add them to your leaderboard.
                </Text>

                <Input
                    label="Friend's Email"
                    placeholder="friend@university.edu"
                    value={email}
                    onChangeText={setEmail}
                    autoCapitalize="none"
                    keyboardType="email-address"
                />

                <Button
                    title="Add Friend"
                    onPress={handleAddFriend}
                    loading={loading}
                />
            </View>
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
        padding: theme.spacing.l,
    },
    description: {
        ...theme.typography.body,
        marginBottom: theme.spacing.l,
        color: theme.colors.textLight,
    },
});
