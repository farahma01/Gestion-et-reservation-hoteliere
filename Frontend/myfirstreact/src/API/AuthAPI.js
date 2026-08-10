const BASE_URL = "http://127.0.0.1:8000/api";

export const registerUser = async (userData) => {
    const response = await fetch(`${BASE_URL}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
    });
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Erreur lors de l'inscription");
    }
    return response.json();
};

export const loginUser = async (credentials) => {
    const response = await fetch(`${BASE_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
    });
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Identifiants incorrects");
    }
    return response.json();
};

export const logoutUser = async (token) => {
    const response = await fetch(`${BASE_URL}/logout`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });
    return response.json();
};