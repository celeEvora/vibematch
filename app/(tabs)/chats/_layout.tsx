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
                    headerShown: false,
                }}
            />

            <Stack.Screen
                name="[id]"
                // options={{
                //     title: "Chat Details",
                // }}
                options={({ route }: any) => ({
                    headerTitle: route.params?.name || "Chat",
                    headerStyle: {
                        backgroundColor: "#e28e6e",
                    },
                    headerTintColor: "#fff",
                })}
            />
        </Stack>
    );
}
