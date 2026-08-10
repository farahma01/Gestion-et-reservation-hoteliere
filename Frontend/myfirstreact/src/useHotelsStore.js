import { create } from 'zustand';
import { getHotels, getHotelById, addHotel, updateHotel, deleteHotel, } from './API/API';

export const useHotelsStore = create((set, get) => ({
  hotels: [],
  hotelCourant: null,
  status: 'idle',
  
  fetchHotels: async () => {
    set({ status: 'loading' });
    try {
      const data = await getHotels();
      set({ hotels: data, status: 'succeeded' });
    } catch (error) {
      console.error('Erreur fetchHotels:', error);
      set({ status: 'failed' });
    }
  },

  fetchHotelById: async (id) => {
    set({ status: 'loading' });
    try {
      const hotel = await getHotelById(id);
      set({ hotelCourant: hotel, status: 'succeeded' });
    } catch (error) {
      console.error('Erreur fetchHotelById:', error);
      set({ status: 'failed' });
    }
  },

  setHotelCourant: (id) => {
    const { hotels } = get();
    const hotel = hotels.find((h) => h.id === id);
    set({ hotelCourant: hotel });
  },

  addHotel: async (hotelData) => {
    const nouvelHotel = await addHotel(hotelData);
    set({ hotels: [...get().hotels, nouvelHotel] });
    return nouvelHotel;
  },

  updateHotel: async (id, hotelData) => {
    const hotelModifie = await updateHotel(id, hotelData);
    set({
      hotels: get().hotels.map((h) => (h.id === id ? hotelModifie : h)),
    });
    return hotelModifie;
  },

  deleteHotel: async (id) => {
    await deleteHotel(id);
    set({ hotels: get().hotels.filter((h) => h.id !== id) });
  },
}));