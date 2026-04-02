import { Colors } from '@/constants/theme'
import React from 'react'
import { StyleProp, StyleSheet, useColorScheme, View, ViewStyle } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

interface Prop {
    safe?: boolean
    style?: StyleProp<ViewStyle>
    [key: string]: any
}

const ThemedView = ({ safe = false, style, ...props }: Prop) => {

    const colorScheme = useColorScheme() ?? 'light';
    const theme = Colors[colorScheme as keyof typeof Colors];

    if (!safe) {
        return (
            <View
                style={[
                    { backgroundColor: theme.background },
                    style
                ]}
                {...props}
            />
        )
    }

    const insets = useSafeAreaInsets();

    return (
        <View
            style={[
                {
                    backgroundColor: theme.background,
                    paddingTop: insets.top,
                    paddingBottom: insets.bottom
                },
                style
            ]}
            {...props}
        />
    )
}

export default ThemedView
