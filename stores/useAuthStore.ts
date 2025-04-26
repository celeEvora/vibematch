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

// Nueva función para validar el token
const validateToken = async (token: string | null): Promise<boolean> => {
    if (!token) return false;
    try {
        // Aquí puedes usar un endpoint para validar el token o verificar su expiración localmente
        const isTokenValid = false; // TODO: IMPLEMENT VALIDATION LOGIC TO CHECK IF TOKEN IS VALID
        return isTokenValid;
    } catch (error) {
        console.error("Error validating token:", error);
        return false;
    }
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
    // loadAuth: async () => {
    //     const token = await AsyncStorage.getItem("authToken");

    //     if (token) {
    //         set({ token });
    //     }
    //     set({ isAuthLoaded: true });
    // },

    loadAuth: async () => {
        const token = await AsyncStorage.getItem("authToken");

        if (token) {
            const isValid = await validateToken(token);
            if (isValid) {
                set({ token });
            } else {
                // El token no es válido
                await AsyncStorage.removeItem("authToken");
                set({ token: null });
            }
        }
        set({ isAuthLoaded: true });
    },
}));

export default useAuthStore;
