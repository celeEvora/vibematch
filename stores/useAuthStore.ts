import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { User } from "@/types/User";

const useAuthStore = create((set, get) => ({
    user: null,
    token: null,
    isAuthLoaded: false, // This is used to determine if the app is ready to render

    login: async (userData: User, token: string) => {
        await AsyncStorage.setItem("authToken", token); // Save token to AsyncStorage
        set({ user: userData, token });
    },

    logout: async () => {
        console.log("Logout called");
        await AsyncStorage.removeItem("authToken"); // Remove token from AsyncStorage
        set({ user: null, token: null });
        console.log("Logout completed, state reset");
    },

    // This function is called when the app starts
    loadAuth: async () => {
        const token = await AsyncStorage.getItem("authToken");

        if (token) {
            set({ token });
        }
        set({ isAuthLoaded: true });
    },
}));

export default useAuthStore;
