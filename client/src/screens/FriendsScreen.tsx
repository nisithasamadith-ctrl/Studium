import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { theme } from '../theme';
import { Button } from '../components/Button';
import api from '../services/api';

export const FriendsScreen = ({ navigation }: any) => {
    const [friends, setFriends] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchFriends();
    }, []);

    const fetchFriends = async () => {
        try {
            const response = await api.get('/friends?userId=mock-uid');
            setFriends(response.data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const renderItem = ({ item, index }: any) => (
        <View style={styles.friendCard}>
            <View style={styles.rankContainer}>
                <Text style={styles.rankText}>#{index + 1}</Text>
            </View>
            <View style={styles.infoContainer}>
                <Text style={styles.name}>{item.name || 'Unknown'}</Text>
                <Text style={styles.uni}>{item.university || 'No University'}</Text>
            </View>
            <View style={styles.statsContainer}>
                <Text style={styles.minutes}>{item.totalMinutes}m</Text>
                <Text style={styles.label}>Focus</Text>
            </View>
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Button title="Back" onPress={() => navigation.goBack()} variant="outline" />
                <Text style={styles.title}>Leaderboard</Text>
                <Button title="+ Add" onPress={() => navigation.navigate('AddFriend')} />
            </View>

            <FlatList
                data={friends}
                renderItem={renderItem}
                keyExtractor={(item: any) => item.id}
                contentContainerStyle={styles.list}
                refreshControl={
                    <RefreshControl refreshing={loading} onRefresh={fetchFriends} />
                }
                ListEmptyComponent={
                    <View style={styles.empty}>
                        <Text style={styles.emptyText}>No friends yet. Add some to compete!</Text>
                    </View>
                }
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
    list: {
        padding: theme.spacing.m,
    },
    friendCard: {
        backgroundColor: theme.colors.surface,
        padding: theme.spacing.m,
        borderRadius: theme.borderRadius.m,
        marginBottom: theme.spacing.s,
        flexDirection: 'row',
        alignItems: 'center',
    },
    rankContainer: {
        width: 40,
        alignItems: 'center',
        marginRight: theme.spacing.m,
    },
    rankText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: theme.colors.primary,
    },
    infoContainer: {
        flex: 1,
    },
    name: {
        fontSize: 16,
        fontWeight: '600',
        color: theme.colors.text,
    },
    uni: {
        fontSize: 12,
        color: theme.colors.textLight,
    },
    statsContainer: {
        alignItems: 'flex-end',
    },
    minutes: {
        fontSize: 18,
        fontWeight: 'bold',
        color: theme.colors.text,
    },
    label: {
        fontSize: 10,
        color: theme.colors.textLight,
    },
    empty: {
        padding: theme.spacing.xl,
        alignItems: 'center',
    },
    emptyText: {
        color: theme.colors.textLight,
    },
});
