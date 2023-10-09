// utils/api.js
export const customFetch = async (url, options) => {
    try {
        const response = await fetch(url, {
            ...options,
            credentials: 'include'
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    } catch (error) {
        throw error;
    }
};
