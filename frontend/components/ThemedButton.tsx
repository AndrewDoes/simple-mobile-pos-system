import { Colors } from '@/constants/theme';
import React from 'react'
import { Button, Pressable, StyleProp, StyleSheet, useColorScheme, ViewStyle } from 'react-native'

interface Props {
    style?: StyleProp<ViewStyle>;
    [key: string]: any;
}

const ThemedButton = ({ style, ...props }: Props) => {
    const colorScheme = useColorScheme() ?? 'light';
    const theme = Colors[colorScheme as keyof typeof Colors];
    return (
        <Pressable
            {...props}
            style={({ pressed }) => [
                {
                    ...styles.btn,
                    ...(pressed && styles.pressed),
                    ...style
                }
            ]}
        >

        </Pressable>
    )
}

const styles = StyleSheet.create({
    btn: {
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 5,
        width: '100%',
        alignItems: 'center',
        borderCurve: 'circular',
    },
    pressed: {
        opacity: 0.8
    }
})

export default ThemedButton
