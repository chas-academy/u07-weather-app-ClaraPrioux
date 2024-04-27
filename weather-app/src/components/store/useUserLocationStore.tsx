/* eslint-disable  @typescript-eslint/no-explicit-any */
import { create } from 'zustand';

// This hook encapsulates state management related to the user's location.
export const useUserLocationStore = create((set) => ({ 
  userLocation: {
    latitude: 0,
    longitude: 0
  },
  updateUserLocation: (updatedLocation: any) => set({ userLocation: updatedLocation }),
}))

