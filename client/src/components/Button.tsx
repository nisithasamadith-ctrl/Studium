import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator, Animated, Pressable } from 'react-native';
import { theme } from '../theme';

interface ButtonProps {
    title: string;
    onPress: () => void;
    variant?: 'primary' | 'secondary' | 'outline';
    loading?: boolean;
    disabled?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
    title,
    onPress,
    variant = 'primary',
    loading = false,
    disabled = false,
}) => {
    const scaleValue = React.useRef(new Animated.Value(1)).current;

    const handlePressIn = () => {
        Animated.spring(scaleValue, {
            toValue: 0.95,
            useNativeDriver: true,
        }).start();
    };

    const handlePressOut = () => {
        Animated.spring(scaleValue, {
            toValue: 1,
            useNativeDriver: true,
        }).start();
    };

    const getBackgroundColor = () => {
        if (disabled) return theme.colors.textLight;
        switch (variant) {
            case 'primary':
                return theme.colors.primary;
            case 'secondary':
                return theme.colors.secondary;
            case 'outline':
                return 'transparent';
            default:
                return theme.colors.primary;
        }
    };

    const getTextColor = () => {
        if (variant === 'outline') return theme.colors.primary;
        return theme.colors.surface;
    };

    return (
        <Pressable
            onPress={onPress}
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
            disabled={disabled || loading}
            style={({ pressed }) => [
                styles.container,
                // { opacity: pressed ? 0.9 : 1 }, // Removed simple opacity for scale animation
            ]}
        >
            <Animated.View
                style={[
                    styles.button,
                    {
                        backgroundColor: getBackgroundColor(),
                        transform: [{ scale: scaleValue }],
                        ...theme.shadows.small, // Add shadow
                    },
                    variant === 'outline' && styles.outlineButton,
                ]}
            >
                {loading ? (
                    <ActivityIndicator color={getTextColor()} />
                ) : (
                    <Text style={[styles.text, { color: getTextColor() }]}>{title}</Text>
                )}
            </Animated.View>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    container: {
        marginVertical: theme.spacing.s,
    },
    button: {
        paddingVertical: theme.spacing.m,
        paddingHorizontal: theme.spacing.l,
        borderRadius: theme.borderRadius.m,
        alignItems: 'center',
        justifyContent: 'center',
    },
    outlineButton: {
        borderWidth: 1,
        borderColor: theme.colors.primary,
        backgroundColor: 'transparent', // Ensure transparent for outline
        elevation: 0, // Remove shadow for outline if desired, or keep it
        shadowOpacity: 0,
    },
    text: {
        fontSize: 16,
        fontWeight: '600',
    },
});
