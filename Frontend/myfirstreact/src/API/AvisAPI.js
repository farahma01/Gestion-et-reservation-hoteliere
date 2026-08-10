const BASE_URL = "http://127.0.0.1:8000/api";

export const getAvisParHotel = async (hotelId) => {
    const response = await fetch(`${BASE_URL}/hotels/${hotelId}/avis`);
    if (!response.ok) throw new Error("Erreur lors du chargement des avis");
    return response.json();
};

export const addAvis = async (avisData, token) => {
    const response = await fetch(`${BASE_URL}/avis`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(avisData),
    });
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Erreur lors de l'envoi de l'avis");
    }
    return response.json();
};