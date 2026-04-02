import React, { useState } from 'react'
import ThemedButton from '@/components/ThemedButton';
import ThemedText from '@/components/ThemedText';
import ThemedTextInput from '@/components/ThemedTextInput';
import ThemedView from '@/components/ThemedView';
import { Colors } from '@/constants/theme';
import { Alert, Keyboard, StyleSheet, Text, TouchableWithoutFeedback, useColorScheme, View, ViewStyle } from 'react-native'
import { useRouter } from 'expo-router';
import { authApi } from '../services/api';

const register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const colorScheme = useColorScheme() ?? 'light';
    const router = useRouter();
    const theme = Colors[colorScheme as keyof typeof Colors];

    const handleSubmit = async () => {
        if (!email || !password || !confirmPassword) {
            Alert.alert("Error", "Please fill in all fields.");
            return;
        }
        if (password !== confirmPassword) {
            Alert.alert("Error", "Passwords do not match.");
            return;
        }

        try {
            const response = await authApi.register({ email, password, confirmPassword });
            console.log("Registration Success!", response);
            router.replace('/login'); // Navigate to login after successful registration
        } catch (error: any) {
            Alert.alert("Registration Failed", error.message || "Check your connection/IP.");
        }
    }
    return (
        <TouchableWithoutFeedback onPress={() => { Keyboard.dismiss() }}>
            <ThemedView safe={true} style={[styles.container, { backgroundColor: theme.background, padding: 20 }]}>
                <ThemedText title={true}>Register</ThemedText>
                <ThemedText style={{ opacity: 0.7 }}>Create a new account</ThemedText>
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
                    style={{ marginBottom: 20 }}
                />
                <ThemedText style={{ width: '80%', textAlign: 'left' }}>Confirm Password: </ThemedText>
                <ThemedTextInput
                    placeholder='Confirm Password'
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                    secureTextEntry={true}
                    style={{ marginBottom: 40 }}
                />
                <ThemedButton style={{
                    width: '80%',
                    backgroundColor: theme.tint,
                }} onPress={handleSubmit}><Text style={{ color: theme.background, fontSize: 16, marginHorizontal: 40, marginVertical: 10 }}>Register</Text></ThemedButton>
                <ThemedButton style={{ display: 'flex', marginTop: 20 }} onPress={() => router.push('/login')}>
                    <ThemedText>Already have an account?<ThemedText style={{ textDecorationLine: 'underline', color: theme.tint }}> Login</ThemedText></ThemedText>
                </ThemedButton>
            </ThemedView>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
})

export default register
