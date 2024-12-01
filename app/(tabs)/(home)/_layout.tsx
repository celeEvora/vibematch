import { Stack } from "expo-router";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Text } from "react-native";

export default function HomeLayout() {
    return (
        <Stack>
            <Stack.Screen
                name="index"
                options={{
                    title: "VibeMatch",
                    headerTitle: () => (
                        <>
                            <Text
                                style={{
                                    color: "#a885b2",
                                    fontSize: 22,
                                    fontWeight: "bold",
                                    marginRight: 5,
                                }}
                            >
                                VibeMatch
                            </Text>
                            <MaterialCommunityIcons
                                name="heart-multiple-outline"
                                size={22}
                                color="#a885b2"
                            />
                        </>
                    ),
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
