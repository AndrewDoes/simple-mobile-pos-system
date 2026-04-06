import ThemedText from '@/components/ThemedText'
import ThemedView from '@/components/ThemedView'
import ThemedButton from '@/components/ThemedButton'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { useUser } from '../hooks/UseUser'

const profile = () => {
    const { user, logout } = useUser();

    return (
        <ThemedView style={styles.container}>
            <ThemedText style={[styles.title, { marginBottom: 30 }]}>Profile</ThemedText>

            <View style={styles.infoCard}>
                <ThemedText style={styles.label}>Email</ThemedText>
                <ThemedText style={styles.value}>{user?.email}</ThemedText>
            </View>

            <ThemedButton
                style={styles.logoutButton}
                onPress={logout}
            >
                <Text style={styles.logoutText}>Logout</Text>
            </ThemedButton>
        </ThemedView>
    )
}

export default profile

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 30,
    },
    infoCard: {
        width: '100%',
        padding: 20,
        borderRadius: 10,
        backgroundColor: 'rgba(150, 150, 150, 0.1)',
        marginBottom: 40,
    },
    label: {
        fontSize: 14,
        opacity: 0.6,
        marginBottom: 5,
    },
    value: {
        fontSize: 18,
        fontWeight: '500',
    },
    logoutButton: {
        backgroundColor: '#ff4444',
        marginHorizontal: 40,
    },
    logoutText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    }
});