import ThemedView from '@/components/ThemedView'
import { Colors } from '@/constants/theme'
import { Stack } from 'expo-router'
import React from 'react'
import { StatusBar, useColorScheme, View } from 'react-native'

const _layout = () => {
    const scheme = useColorScheme()

    const theme =
        scheme === "dark"
            ? Colors.dark
            : Colors.light
    return (
        <ThemedView style={{ flex: 1, backgroundColor: theme.background }}>
            <StatusBar barStyle={'default'} backgroundColor={theme.navBackground} />
            <Stack screenOptions={{
                animation: 'none',
                headerStyle: { backgroundColor: theme.navBackground },
                headerTintColor: theme.title
            }} />
        </ThemedView>
    )
}

export default _layout
