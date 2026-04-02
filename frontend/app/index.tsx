import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View, KeyboardAvoidingView, Platform, useColorScheme } from 'react-native';
// Note: @ is a common alias for the root, if it doesn't work, use relative path ../constants/Colors
import { Colors } from '../constants/theme';
import { Image } from 'expo-image';
import ThemedLogo from '@/components/ThemedLogo';
import ThemedText from '@/components/ThemedText';
import ThemedButton from '@/components/ThemedButton';
import { useRouter } from 'expo-router';
import ThemedView from '@/components/ThemedView';

export default function LandingPage() {
    const router = useRouter();
    const colorScheme = useColorScheme() ?? 'light';
    const theme = Colors[colorScheme as keyof typeof Colors];

    const checkSession = () => {
        router.push('/(auth)/login')
    }

    return (
        <ThemedView style={styles.container}>
            <ThemedButton style={{ width: 200 }} onPress={checkSession}>
                <ThemedLogo style={styles.logo} />
            </ThemedButton>
            <ThemedText title={true}>
                Simple POS
            </ThemedText>
            <ThemedText>
                Press the logo to get started!
            </ThemedText>
        </ThemedView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
    },
    logo: {
        marginBottom: 20
    }
});