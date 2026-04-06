import ThemedText from '@/components/ThemedText'
import ThemedView from '@/components/ThemedView'
import React from 'react'
import { StyleSheet } from 'react-native'



const product = () => {
    return (
        <ThemedView style={styles.container}>
            <ThemedText>Product Screen</ThemedText>
        </ThemedView>
    )
}

export default product

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
}
)
