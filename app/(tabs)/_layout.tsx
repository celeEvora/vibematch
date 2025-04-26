// import FontAwesome from "@expo/vector-icons/FontAwesome";
import AntDesign from "@expo/vector-icons/AntDesign";
import { Tabs } from "expo-router";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import useAuthStore from "@/stores/useAuthStore";
import { ActivityIndicator, View } from "react-native";
import { useUser } from "@/hooks/useUser";

export default function TabLayout() {
    const { user } = useUser();
    const token = useAuthStore((state) => state.token);

    if (!token || !user) {
        return (
            <View
                style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <ActivityIndicator size="large" color="#ab74aa" />
            </View>
        );
    }

    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: "blue",
                // tabBarShowLabel: false,
                tabBarStyle: {
                    height: 75,
                },
            }}
        >
            <Tabs.Screen
                name="(home)"
                options={{
                    title: "Home",
                    headerShown: false,
                    tabBarActiveTintColor: "#a885b2",
                    tabBarInactiveTintColor: "#cccbcd",
                    tabBarIcon: ({ color }) => (
                        // <AntDesign name="home" size={24} color={color} />
                        <MaterialCommunityIcons
                            name="heart-multiple-outline"
                            size={26}
                            color={color}
                        />
                    ),
                }}
            />

            <Tabs.Screen
                name="chats"
                options={{
                    title: "Chats",
                    headerShown: false,
                    tabBarActiveTintColor: "#a885b2",
                    tabBarInactiveTintColor: "#cccbcd",
                    tabBarIcon: ({ color }) => (
                        <AntDesign name="message1" size={24} color={color} />
                    ),
                }}
            />

            <Tabs.Screen
                name="notifications"
                options={{
                    title: "Notifications",
                    tabBarActiveTintColor: "#a885b2",
                    tabBarInactiveTintColor: "#cccbcd",
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons
                            name="bell-outline"
                            size={26}
                            color={color}
                        />
                    ),
                }}
            />

            <Tabs.Screen
                name="profile"
                options={{
                    title: "Profile",
                    headerShown: false,
                    tabBarActiveTintColor: "#a885b2",
                    tabBarInactiveTintColor: "#cccbcd",
                    tabBarIcon: ({ color }) => (
                        <AntDesign name="user" size={24} color={color} />
                    ),
                }}
            />
        </Tabs>
    );
}
