import { Stack } from 'expo-router';

export default function DashboardLayout() {
    return (
        <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="product" />
            <Stack.Screen name="profile" />
            <Stack.Screen name="transaction" />
        </Stack>
    );
}