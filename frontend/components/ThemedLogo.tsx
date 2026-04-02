import { Colors } from '@/constants/theme';
import React from 'react'
import { Image, useColorScheme } from 'react-native'

const ThemedLogo = ({ children, style, ...props }: { children?: React.ReactNode; style?: any }) => {
    const colorScheme = useColorScheme() ?? 'light';
    const theme = Colors[colorScheme as keyof typeof Colors];

    if (colorScheme === 'dark') {
        return <Image source={require('../assets/pos/pos_logo_dark.png')} style={[styles.logo, style]} {...props} />
    }
    return <Image source={require('../assets/pos/pos_logo_light.png')} style={[styles.logo, style]} {...props} />
}

const styles = {
    logo: {
        width: 240,
        height: 240,
    }
};

export default ThemedLogo
