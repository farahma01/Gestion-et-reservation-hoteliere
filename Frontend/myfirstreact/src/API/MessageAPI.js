const BASE_URL = "http://127.0.0.1:8000/api";

export const sendMessage = async (messageData, token) => {
    const headers = { "Content-Type": "application/json" };
    if (token) headers.Authorization = `Bearer ${token}`;

    const response = await fetch(`${BASE_URL}/messages`, {
        method: "POST",
        headers,
        body: JSON.stringify(messageData),
    });
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Erreur lors de l'envoi du message");
    }
    return response.json();
};

export const getMesMessages = async (token) => {
    const response = await fetch(`${BASE_URL}/mes-messages`, {
        headers: { Authorization: `Bearer ${token}` },
    });
    if (!response.ok) throw new Error("Erreur lors du chargement de vos messages");
    return response.json();
};

export const getAllMessages = async () => {
    const response = await fetch(`${BASE_URL}/messages`);
    if (!response.ok) throw new Error("Erreur lors du chargement des messages");
    return response.json();
};

export const repondreMessage = async (id, reponse) => {
    const response = await fetch(`${BASE_URL}/messages/${id}/repondre`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reponse }),
    });
    if (!response.ok) throw new Error("Erreur lors de l'envoi de la réponse");
    return response.json();
};

export const deleteMessage = async (id) => {
    const response = await fetch(`${BASE_URL}/messages/${id}`, { method: "DELETE" });
    if (!response.ok) throw new Error("Erreur lors de la suppression");
    return response.json();
};