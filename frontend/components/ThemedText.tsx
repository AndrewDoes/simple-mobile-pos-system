import { Colors, Fonts } from '@/constants/theme';
import React from 'react'
import { StyleProp, StyleSheet, Text, TextProps, TextStyle, useColorScheme } from 'react-native';
type Props = TextProps & {
    style?: StyleProp<TextStyle>
    title?: boolean
}
const ThemedText = ({ title = false, style, ...props }: Props) => {
    const colorScheme = useColorScheme() ?? 'light';
    const theme = Colors[colorScheme as keyof typeof Colors];


    const textColor = title ? theme.title : theme.text;
    return (
        <Text style={[title ? styles.title : styles.text, style, { color: textColor, marginHorizontal: 40, marginVertical: 10 }]} {...props} />
    )
}

const styles = StyleSheet.create({
    title: {
        fontSize: 32,
        textAlign: 'center' as const,
        fontWeight: 'bold' as const
    },
    text: {
        fontSize: 16,
        textAlign: 'center' as const,
        fontWeight: 'light' as const
    }
});

export default ThemedText
