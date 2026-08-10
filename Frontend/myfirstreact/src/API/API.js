const BASE_URL = "http://127.0.0.1:8000/api/hotels";

export async function getHotels() {
  const response = await fetch(BASE_URL);
  return await response.json();
}
export async function getHotelById(id) {
  const response = await fetch(`${BASE_URL}/${id}`);
  return await response.json();
}
export async function addHotel(hotel) {
  const response = await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(hotel),
  });
  return await response.json();
}
export async function deleteHotel(id) {
  await fetch(`${BASE_URL}/${id}`, { method: "DELETE" });
}
export async function updateHotel(id, hotel) {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(hotel),
  });
  return await response.json();
}