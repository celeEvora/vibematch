import { Stack } from "expo-router";

export default function HomeLayout() {
    return (
        <Stack>
            <Stack.Screen
                name="index"
                options={{
                    title: "VibeMatch",
                    headerShown: true,
                    headerLargeTitleStyle: {
                        color: "#a885b2",
                        fontSize: 22,
                        fontWeight: "bold",
                    },
                    headerTitleStyle: {
                        color: "#a885b2",
                        fontSize: 22,
                        fontWeight: "bold",
                    },
                }}
            />
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
