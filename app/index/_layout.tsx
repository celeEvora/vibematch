import { Stack } from "expo-router";

export default function Layout() {
    return (
        <Stack
            screenOptions={{
                animation: "slide_from_right",
                // headerShown: false,
                headerLargeStyle: {
                    backgroundColor: "#a885b2",
                },
                headerStyle: {
                    backgroundColor: "#a885b2",
                },
                headerLargeTitleStyle: {
                    color: "#fff",
                },
                headerTintColor: "#fff",
                headerBackButtonDisplayMode: "minimal",
                title: "VibeMatch",
            }}
        />
    );
}
