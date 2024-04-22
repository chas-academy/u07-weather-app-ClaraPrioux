/* eslint-disable  @typescript-eslint/no-explicit-any */
import { create } from 'zustand';

export const useUserLocationStore = create((set) => ({ // This hook encapsulates state management related to the user's location.
  userLocation: { // State object defines the initial state of the store
    latitude: 0,
    longitude: 0
  },
  updateUserLocation: (updatedLocation: any) => set({ userLocation: updatedLocation }), // takes an updatedLocation parameter and updates the userLocation state with the new location provided.
}))

