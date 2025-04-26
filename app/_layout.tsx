import { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import { Stack } from "expo-router/stack";
import useAuthStore from "@/stores/useAuthStore";
import { ActivityIndicator, View } from "react-native";

export default function Layout() {
    const token = useAuthStore((state) => state.token);
    const loadAuth = useAuthStore((state) => state.loadAuth);
    const isAuthLoaded = useAuthStore((state) => state.isAuthLoaded);
    const router = useRouter();
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        async function prepare() {
            try {
                await loadAuth(); // Load the auth state and ensure token is loaded
            } catch (error) {
                console.error("Error loading auth state:", error);
            } finally {
                setIsReady(true); // Indicate that the app is ready
            }
        }
        prepare();
    }, []);

    useEffect(() => {
        if (isReady && isAuthLoaded && !token) {
            console.log("User is logged out, redirecting...");
            router.replace("/login"); // Redirect to login if not authenticated
        }
    }, [isReady, isAuthLoaded, token, router]);

    if (!isReady || !isAuthLoaded) {
        return (
            <View
                style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    return (
        <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="login" options={{ headerShown: false }} />
            <Stack.Screen name="register" options={{ headerShown: false }} />
        </Stack>
    );
}
