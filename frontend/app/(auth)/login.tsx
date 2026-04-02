import ThemedButton from '@/components/ThemedButton';
import ThemedText from '@/components/ThemedText';
import ThemedTextInput from '@/components/ThemedTextInput';
import ThemedView from '@/components/ThemedView';
import { Colors } from '@/constants/theme';
import { useRouter } from 'expo-router';
import React, { useState } from 'react'
import { Keyboard, StyleSheet, Text, TouchableWithoutFeedback, useColorScheme, View, ViewStyle } from 'react-native'

const login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();
    const colorScheme = useColorScheme() ?? 'light';
    const theme = Colors[colorScheme as keyof typeof Colors];

    const handleSubmit = () => {
        console.log('Username:', username);
        console.log('Password:', password);
    }

    return (
        <TouchableWithoutFeedback onPress={() => { Keyboard.dismiss() }}>
            <ThemedView safe={true} style={[styles.container, { backgroundColor: theme.background, padding: 20 }]}>
                <ThemedText title={true}>Login</ThemedText>
                <ThemedText style={{ opacity: 0.7 }}>Welcome Back to Simplify POS</ThemedText>
                <ThemedText style={{ width: '80%', textAlign: 'left' }} >Username: </ThemedText>
                <ThemedTextInput
                    placeholder='Username'
                    value={username}
                    onChangeText={setUsername}
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
