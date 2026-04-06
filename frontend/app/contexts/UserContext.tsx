import React, { createContext, useEffect, useState } from 'react'
import * as SecureStore from 'expo-secure-store';
import { useRouter } from 'expo-router';

interface User {
    email: string;
    token: string;
}

interface UserContextType {
    user: User | null;
    saveUser: (userData: User) => Promise<void>;
    logout: () => Promise<void>;
    isLoading: boolean;
}

export const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const loadStorageData = async () => {
            try {
                const authData = await SecureStore.getItemAsync('user_session');
                if (authData) {
                    setUser(JSON.parse(authData));
                    console.log("Session loaded from storage:", JSON.parse(authData));
                    router.push('/product');
                }
            } catch (e) {
                console.error("Failed to load session", e);
            } finally {
                setIsLoading(false);
            }
        };
        loadStorageData();
    }, []);

    const saveUser = async (userData: User) => {
        setUser(userData);
        await SecureStore.setItemAsync('user_session', JSON.stringify(userData));
    };

    const logout = async () => {
        setUser(null);
        await SecureStore.deleteItemAsync('user_session');
    };

    return (
        <UserContext.Provider value={{ user, saveUser, logout, isLoading }}>
            {children}
        </UserContext.Provider>
    );
};
