import ThemedButton from '@/components/ThemedButton';
import ThemedText from '@/components/ThemedText';
import ThemedTextInput from '@/components/ThemedTextInput';
import ThemedView from '@/components/ThemedView';
import { Colors } from '@/constants/theme';
import { useRouter } from 'expo-router';
import React, { useState } from 'react'
import { Alert, Keyboard, StyleSheet, Text, TouchableWithoutFeedback, useColorScheme, View, ViewStyle } from 'react-native'
import { authApi } from '../services/api';

const login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const colorScheme = useColorScheme() ?? 'light';
    const theme = Colors[colorScheme as keyof typeof Colors];

    const handleSubmit = async () => {
        console.log('Email:', email);
        console.log('Password:', password);

        if (!email || !password) {
            Alert.alert("Error", "Please fill in all fields.");
            return;
        }

        setLoading(true);
        try {
            // 2. Call your ASP.NET Backend
            const response = await authApi.login({ email, password });

            console.log("Login Success!", response);

            // 3. TODO: Save response.token to SecureStore here

            // 4. Navigate to the Dashboard
            router.replace('/register'); // Replace with your actual dashboard route
        } catch (error: any) {
            // This catches Network errors, 401s, 500s, etc.
            Alert.alert("Login Failed", error.message || "Check your connection/IP.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <TouchableWithoutFeedback onPress={() => { Keyboard.dismiss() }}>
            <ThemedView safe={true} style={[styles.container, { backgroundColor: theme.background, padding: 20 }]}>
                <ThemedText title={true}>Login</ThemedText>
                <ThemedText style={{ opacity: 0.7 }}>Welcome Back to Simplify POS</ThemedText>
                <ThemedText style={{ width: '80%', textAlign: 'left' }} >Email: </ThemedText>
                <ThemedTextInput
                    placeholder='Email'
                    value={email}
                    onChangeText={setEmail}
                    style={{ marginBottom: 20 }}
                />
                <ThemedText style={{ width: '80%', textAlign: 'left' }}>Password: </ThemedText>
                <ThemedTextInput
                    placeholder='Password'
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={true}
                    style={{ marginBottom: 40 }}
                />
                <ThemedButton style={{
                    width: '80%',
                    backgroundColor: theme.tint
                }} onPress={handleSubmit}>
                    <Text style={{ color: theme.background, fontSize: 16, marginHorizontal: 40, marginVertical: 10 }}>Register</Text>
                </ThemedButton>

                <ThemedButton style={{ display: 'flex', marginTop: 20 }} onPress={() => router.push('/register')}>
                    <ThemedText>Don't have an account?<ThemedText style={{ textDecorationLine: 'underline', color: theme.tint }}> Register</ThemedText></ThemedText>
                </ThemedButton>
            </ThemedView>
        </TouchableWithoutFeedback >
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
}
)
export default login
