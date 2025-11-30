import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { theme } from '../theme';
import api, { setAuthToken } from '../services/api';
import { auth } from '../config/firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';

export const LoginScreen = ({ navigation }: any) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLogin, setIsLogin] = useState(true);
    const [loading, setLoading] = useState(false);

    const handleAuth = async () => {
        if (!email || !password) {
            Alert.alert('Error', 'Please enter email and password');
            return;
        }

        setLoading(true);
        try {
            let userCredential;
            if (isLogin) {
                userCredential = await signInWithEmailAndPassword(auth, email, password);
            } else {
                userCredential = await createUserWithEmailAndPassword(auth, email, password);
            }

            const user = userCredential.user;
            const token = await user.getIdToken();

            // Set token for API requests
            setAuthToken(token);

            // Sync user with backend
            await api.post('/auth/login', {
                email: user.email,
                name: user.displayName || 'Student',
                university: 'University',
            });

            navigation.replace('Home');
        } catch (error: any) {
            Alert.alert('Authentication Failed', error.message);
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <View style={styles.header}>
                    <Text style={styles.title}>Studium</Text>
                    <Text style={styles.subtitle}>Focus. Learn. Grow.</Text>
                </View>

                <View style={styles.form}>
                    <Input
                        label="Email"
                        placeholder="student@university.edu"
                        value={email}
                        onChangeText={setEmail}
                        autoCapitalize="none"
                        keyboardType="email-address"
                    />
                    <Input
                        label="Password"
                        placeholder="********"
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry
                    />

                    <Button
                        title={isLogin ? "Login" : "Sign Up"}
                        onPress={handleAuth}
                        loading={loading}
                    />

                    <Button
                        title={isLogin ? "Need an account? Sign Up" : "Have an account? Login"}
                        onPress={() => setIsLogin(!isLogin)}
                        variant="outline"
                    />
                </View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background,
    },
    content: {
        flex: 1,
        padding: theme.spacing.l,
        justifyContent: 'center',
    },
    header: {
        alignItems: 'center',
        marginBottom: theme.spacing.xl * 2,
    },
    title: {
        ...theme.typography.h1,
        fontSize: 40,
        color: theme.colors.primary,
        marginBottom: theme.spacing.s,
    },
    subtitle: {
        ...theme.typography.body,
        color: theme.colors.textLight,
    },
    form: {
        width: '100%',
    },
});
