const BASE_URL = "http://127.0.0.1:8000/api/reservations";

export const addReservation = async (reservation, token) => {
    const headers = { "Content-Type": "application/json" };
    if (token) headers.Authorization = `Bearer ${token}`;

    const response = await fetch(BASE_URL, {
        method: "POST",
        headers,
        body: JSON.stringify(reservation),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Erreur lors de la réservation");
    }

    return response.json();
};

export const getReservations = async () => {
    const response = await fetch(BASE_URL);
    if (!response.ok) throw new Error("Erreur lors du chargement des réservations");
    return response.json();
};

export const updateStatutReservation = async (id, statut) => {
    const response = await fetch(`${BASE_URL}/${id}/statut`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ statut }),
    });
    if (!response.ok) throw new Error("Erreur lors de la mise à jour du statut");
    return response.json();
};

export const deleteReservation = async (id) => {
    const response = await fetch(`${BASE_URL}/${id}`, { method: "DELETE" });
    if (!response.ok) throw new Error("Erreur lors de la suppression");
    return response.json();
};