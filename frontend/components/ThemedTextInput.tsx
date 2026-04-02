import { Colors } from '@/constants/theme';
import React, { useState } from 'react'
import { StyleProp, TextInput, TextStyle, useColorScheme } from 'react-native';

interface Props {
    style?: StyleProp<TextStyle>
    [key: string]: any
}

const ThemedTextInput = ({ style, ...props }: Props) => {
    const [isFocused, setIsFocused] = useState(false);
    const colorScheme = useColorScheme() ?? 'light';
    const theme = Colors[colorScheme as keyof typeof Colors];

    return (
        <TextInput
            placeholderTextColor={theme.text}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            style={{
                backgroundColor: theme.navBackground,
                opacity: props.value?.length === 0 ? 0.5 : 1,
                color: theme.text,
                padding: 20,
                borderRadius: 10,
                width: '80%',
                borderColor: isFocused ? theme.text : 'transparent',
                borderWidth: 2,
                ...style
            }}
            {...props}
        />

    )
}

export default ThemedTextInput
