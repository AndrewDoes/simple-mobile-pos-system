import ThemedText from '@/components/ThemedText'
import ThemedView from '@/components/ThemedView'
import React, { useEffect, useState } from 'react'
import { ActivityIndicator, FlatList, Pressable, StyleSheet, useColorScheme, View } from 'react-native'
import { productApi } from '../services/api'
import { Colors } from '@/constants/theme'
import { useUser } from '../hooks/UseUser'

const product = () => {
    const colorScheme = useColorScheme() ?? 'light';
    const theme = Colors[colorScheme as keyof typeof Colors];
    const { user } = useUser();
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (user) {
            fetchProducts()
        }
    }, [user])

    const fetchProducts = async () => {
        try {
            const data = await productApi.getAll(user?.token);
            setProducts(data);
        } catch (error) {
            console.error("Failed to fetch products:", error);
        } finally {
            setLoading(false);
        }
    };

    const renderItem = ({ item }: { item: any }) => (
        <Pressable
            style={({ pressed }) => [
                styles.productCard,
                pressed && { opacity: 0.7 }
            ]}
        >
            <View style={styles.productInfo}>
                <ThemedText style={styles.name}>{item.name}</ThemedText>
                <ThemedText style={styles.quantity}>Stock: {item.quantity}</ThemedText>
            </View>
            <View style={styles.priceContainer}>
                <ThemedText style={[styles.price, { color: theme.tint }]}>
                    Rp {item.price.toLocaleString()}
                </ThemedText>
            </View>
        </Pressable>
    );

    if (loading) {
        return (
            <ThemedView style={styles.center}>
                <ActivityIndicator size="large" color={theme.tint} />
            </ThemedView>
        );
    }


    return (
        <ThemedView style={styles.container} safe={true}>
            <FlatList
                data={products}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.listContent}
            />
        </ThemedView>
    );
}

export default product

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    listContent: {
        padding: 16,
    },
    productCard: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
        marginBottom: 12,
        borderRadius: 12,
        backgroundColor: 'rgba(150, 150, 150, 0.05)',
        borderWidth: 1,
        borderColor: 'rgba(150, 150, 150, 0.1)',
    },
    productInfo: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
        marginRight: 10,
    },
    name: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'left',
        marginHorizontal: 0,
        marginVertical: 2,
    },
    quantity: {
        fontSize: 14,
        opacity: 0.6,
        textAlign: 'left',
        marginHorizontal: 0,
        marginVertical: 0,
    },
    priceContainer: {
        justifyContent: 'center',
        alignItems: 'flex-end',
    },
    price: {
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'right',
        marginHorizontal: 0,
        marginVertical: 0,
    },
});