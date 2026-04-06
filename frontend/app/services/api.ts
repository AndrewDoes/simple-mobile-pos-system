// services/api.ts
const BASE_URL = process.env.EXPO_PUBLIC_API_URL;

if (!BASE_URL) {
    console.error("EXPO_PUBLIC_API_URL is not defined in .env.local");
}

interface RequestOptions extends RequestInit {
    token?: string;
}

export const apiRequest = async (endpoint: string, options: RequestOptions = {}) => {
    const { token, ...customOptions } = options;

    const url = `${BASE_URL}${endpoint}`;

    const headers = new Headers({
        'Content-Type': 'application/json',
        ...customOptions.headers,
    });

    // If we have a JWT, attach it to the Authorization header
    if (token) {
        headers.set('Authorization', `Bearer ${token}`);
    }

    try {
        const response = await fetch(url, {
            ...customOptions,
            headers,
        });

        // Check if the backend returned an error (4xx or 5xx)
        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.message || `Request failed with status ${response.status}`);
        }

        // Return the JSON data
        return await response.json();
    } catch (error: any) {
        console.error(`[API Error] at ${endpoint}:`, error.message);
        throw error;
    }
};

// Specific Auth Methods
export const authApi = {
    login: (credentials: object) =>
        apiRequest('/auth/login', {
            method: 'POST',
            body: JSON.stringify(credentials),
        }),

    register: (userData: object) =>
        apiRequest('/auth/register', {
            method: 'POST',
            body: JSON.stringify(userData),
        }),
};

export const productApi = {
    getAll: (token?: string) =>
        apiRequest('/product/all', {
            method: 'GET',
            token,
        }),

    create: (productData: object, token?: string) =>
        apiRequest('/product/create', {
            method: 'POST',
            body: JSON.stringify(productData),
            token,
        }),
}