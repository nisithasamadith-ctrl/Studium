import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { theme } from '../theme';

interface Tree {
    id: string;
    treeType: 'sapling' | 'oak' | 'pine';
    timestamp: string;
}

interface ForestGridProps {
    trees: Tree[];
}

const TreeIcon = ({ type }: { type: string }) => {
    let icon = '🌱';
    if (type === 'oak') icon = '🌳';
    if (type === 'pine') icon = '🌲';

    return <Text style={styles.treeIcon}>{icon}</Text>;
};

export const ForestGrid: React.FC<ForestGridProps> = ({ trees }) => {
    if (trees.length === 0) {
        return (
            <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>No trees yet. Start focusing to grow your forest!</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={trees}
                keyExtractor={(item) => item.id}
                numColumns={4}
                renderItem={({ item }) => (
                    <View style={styles.treeContainer}>
                        <TreeIcon type={item.treeType} />
                    </View>
                )}
                scrollEnabled={false} // Nested in ScrollView usually
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: theme.spacing.s,
        backgroundColor: '#E8F5E9', // Light green background for forest floor
        borderRadius: theme.borderRadius.m,
    },
    emptyContainer: {
        padding: theme.spacing.l,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: theme.colors.surface,
        borderRadius: theme.borderRadius.m,
        borderWidth: 1,
        borderColor: '#E0E0E0',
        borderStyle: 'dashed',
    },
    emptyText: {
        color: theme.colors.textLight,
        textAlign: 'center',
    },
    treeContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: theme.spacing.s,
        aspectRatio: 1,
    },
    treeIcon: {
        fontSize: 32,
    },
});
