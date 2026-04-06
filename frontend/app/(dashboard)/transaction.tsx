import ThemedText from '@/components/ThemedText'
import ThemedView from '@/components/ThemedView'
import React from 'react'
import { StyleSheet } from 'react-native'

const transaction = () => {
    return (
        <ThemedView style={styles.container}>
            <ThemedText>Transaction Screen</ThemedText>
        </ThemedView>
    )
}

export default transaction

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
}
)