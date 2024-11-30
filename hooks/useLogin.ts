import { useState } from "react";
import { login } from "@/services/auth";
import { useRouter } from "expo-router";
import useAuthStore from "@/stores/useAuthStore";
import { Login, AuthResponse } from "@/types/Auth";

export type LoginResponse = {
    isLoading: boolean;
    isError: any;
    message: string;
    processLogin: (formData: Login) => Promise<void>;
};

export function useLogin(): LoginResponse {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isError, setIsError] = useState<any>(null);
    const [message, setMessage] = useState<string>("");
    const router = useRouter();
    const loginStore = useAuthStore((state) => state.login);

    const processLogin = async (formData: Login) => {
        setIsLoading(true);
        setIsError(null);
        setMessage("");

        try {
            const response = await login(formData);
            if (!response) {
                return;
            }

            const data = await response;
            const { data: userData } = data;

            await loginStore(userData.user, userData.token);

            setMessage("User logged in successfully");
            router.replace("/");
        } catch (error) {
            console.log("error:", error);
            setIsError(error);
        } finally {
            setIsLoading(false);
        }
    };

    return {
        isLoading,
        isError,
        message,
        processLogin,
    };
}
