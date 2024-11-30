import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { User } from "@/types/User";

type AuthStore = {
    user: User | null;
    token: string | null;
    isAuthLoaded: boolean;

    login: (userData: User, token: string) => Promise<void>;
    logout: () => Promise<void>;
    loadAuth: () => Promise<void>;
};

const useAuthStore = create<AuthStore>((set, get) => ({
    user: null,
    token: null,
    isAuthLoaded: false, // This is used to determine if the app is ready to render

    login: async (userData: User, token: string) => {
        await AsyncStorage.setItem("authToken", token); // Save token to AsyncStorage
        set({ user: userData, token });
    },

    logout: async () => {
        await AsyncStorage.removeItem("authToken"); // Remove token from AsyncStorage
        set({ user: null, token: null });
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
