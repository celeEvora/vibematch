import { Stack } from "expo-router";

export default function Layout() {
    return (
        <Stack
            screenOptions={{
                headerShown: false,
            }}
        >
            <Stack.Screen name="index" />
            <Stack.Screen
                name="users/[id]"
                options={{
                    title: "User",
                    presentation: "modal",
                    headerShown: false,
                }}
            />
        </Stack>
    );
}
