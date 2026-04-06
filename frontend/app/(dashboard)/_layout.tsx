import { Colors } from '@/constants/theme';
import { Stack, Tabs } from 'expo-router';
import { useColorScheme } from 'react-native';
import { Package, ShoppingCart, User } from 'lucide-react-native';

export default function DashboardLayout() {
    const colorScheme = useColorScheme();
    const theme = Colors[colorScheme as keyof typeof Colors] || Colors.light;

    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarStyle: {
                    backgroundColor: theme.navBackground,
                    paddingTop: 10,
                    height: 90
                },
                tabBarActiveTintColor: theme.tabIconSelected,
                tabBarInactiveTintColor: theme.tabIconDefault,
            }}>


            <Tabs.Screen name="product" options={{
                title: "Products", tabBarIcon: ({ focused }) => {
                    return (
                        focused ?
                            <Package color={theme.tabIconSelected} />
                            :
                            <Package color={theme.tabIconDefault} />
                    )
                }
            }} />

            <Tabs.Screen name="transaction" options={{
                title: "Transaction", tabBarIcon: ({ focused }) => {
                    return (
                        focused ?
                            <ShoppingCart color={theme.tabIconSelected} />
                            :
                            <ShoppingCart color={theme.tabIconDefault} />
                    )
                }
            }} />

            <Tabs.Screen name="profile" options={{
                title: "Profile", tabBarIcon: ({ focused }) => {
                    return (
                        focused ?
                            <User color={theme.tabIconSelected} />
                            :
                            <User color={theme.tabIconDefault} />
                    )
                }
            }} />

        </Tabs>
    );
}