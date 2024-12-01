import { Stack } from "expo-router";
import { RouteProp } from "@react-navigation/native";

type ChatRoutes = {
    index: undefined;
    "[id]": { name: string };
};

// TODO: Fix the type for the route params
type ChatRouteProp = RouteProp<ChatRoutes, "[id]">;

export default function ChatsLayout() {
    return (
        <Stack>
            <Stack.Screen
                name="index"
                options={{
                    title: "Chats",
                    // headerShown: false,
                }}
            />

            <Stack.Screen
                name="[id]"
                options={({ route }: any) => ({
                    headerTitle: route.params?.name || "Chat",
                    headerStyle: {
                        backgroundColor: "#a885b2",
                    },
                    headerTintColor: "#fff",
                })}
            />

            <Stack.Screen
                name="create-chat"
                options={{
                    headerTitle: "New Chat",
                    presentation: "modal",
                }}
            />
        </Stack>
    );
}
