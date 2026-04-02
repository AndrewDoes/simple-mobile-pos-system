import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View, KeyboardAvoidingView, Platform, useColorScheme } from 'react-native';
// Note: @ is a common alias for the root, if it doesn't work, use relative path ../constants/Colors
import { Colors } from '../constants/theme';
import { Image } from 'expo-image';
import ThemedLogo from '@/components/ThemedLogo';
import ThemedText from '@/components/ThemedText';

export default function LandingPage() {
    const colorScheme = useColorScheme() ?? 'light';
    const theme = Colors[colorScheme as keyof typeof Colors];

    return (
        <View style={styles.container}>
            <ThemedLogo style={styles.logo} />
            <ThemedText title={true}>
                Simple POS
            </ThemedText>
            <ThemedText style={{ opacity: 1, marginBottom: 20 }}>
                {`Tap the logo to enter`}
            </ThemedText>
        </View>
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