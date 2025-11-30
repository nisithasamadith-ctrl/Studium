import React from 'react';
import { TextInput, View, Text, StyleSheet, TextInputProps } from 'react-native';
import { theme } from '../theme';

interface InputProps extends TextInputProps {
    label?: string;
    error?: string;
}

export const Input: React.FC<InputProps> = ({ label, error, style, ...props }) => {
    return (
        <View style={styles.container}>
            {label && <Text style={styles.label}>{label}</Text>}
            <TextInput
                style={[styles.input, error && styles.inputError, style]}
                placeholderTextColor={theme.colors.textLight}
                {...props}
            />
            {error && <Text style={styles.error}>{error}</Text>}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: theme.spacing.m,
        width: '100%',
    },
    label: {
        marginBottom: theme.spacing.s,
        color: theme.colors.text,
        fontWeight: '500',
    },
    input: {
        backgroundColor: theme.colors.surface,
        borderWidth: 1,
        borderColor: '#E0E0E0',
        borderRadius: theme.borderRadius.m,
        padding: theme.spacing.m,
        fontSize: 16,
        color: theme.colors.text,
    },
    inputError: {
        borderColor: theme.colors.error,
    },
    error: {
        color: theme.colors.error,
        fontSize: 12,
        marginTop: 4,
    },
});
