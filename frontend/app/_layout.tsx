import { Stack, useRouter } from 'expo-router';
import { StatusBar, useColorScheme, View } from 'react-native';
import { Colors } from '@/constants/theme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useEffect } from 'react';
import { UserProvider } from './contexts/UserContext';

export default function RootLayout() {
    const insets = useSafeAreaInsets();
    const router = useRouter();
    const colorScheme = useColorScheme() ?? 'light';
    const theme = Colors[colorScheme as keyof typeof Colors];

    return (
        <UserProvider>
            <View style={{ flex: 1, backgroundColor: theme.background }}>
                <StatusBar
                    // Core RN uses these specific strings:
                    barStyle={colorScheme === 'dark' ? 'light-content' : 'dark-content'}

                    // Android specific: Makes it blend with your background
                    backgroundColor="transparent"
                    translucent={true}

                    // iOS specific: Hidden or visible
                    hidden={false}
                />
                <Stack
                    initialRouteName='index'
                    screenOptions={{
                        headerStyle: { backgroundColor: theme.navBackground },
                        headerTintColor: theme.title,
                        contentStyle: { backgroundColor: theme.background }, // Important for Android
                        headerShadowVisible: false,
                    }}
                >
                    <Stack.Screen name="index" options={{ title: "Home" }} />
                    <Stack.Screen name="(auth)" options={{ headerShown: false }} />
                    <Stack.Screen name="(dashboard)" options={{ headerShown: false }} />
                </Stack>
            </View>
        </UserProvider>
    );
}