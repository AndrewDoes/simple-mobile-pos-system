import ThemedText from '@/components/ThemedText'
import ThemedView from '@/components/ThemedView'
import React from 'react'
import { StyleSheet } from 'react-native'

const profile = () => {
    return (
        <ThemedView style={styles.container}>
            <ThemedText>Profile Screen</ThemedText>
        </ThemedView>
    )
}

export default profile

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
}
)