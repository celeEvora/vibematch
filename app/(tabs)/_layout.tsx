// import FontAwesome from "@expo/vector-icons/FontAwesome";
import AntDesign from "@expo/vector-icons/AntDesign";
import { Tabs } from "expo-router";

export default function TabLayout() {
    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: "blue",
                tabBarShowLabel: false,
                tabBarStyle: {
                    height: 65,
                },
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: "Home",
                    headerShown: false,
                    tabBarActiveTintColor: "#e28e6e",
                    tabBarInactiveTintColor: "#cccbcd",
                    // tabBarShowLabel: false,
                    tabBarIcon: ({ color }) => (
                        <AntDesign name="home" size={24} color={color} />
                    ),
                }}
            />

            <Tabs.Screen
                name="chats"
                options={{
                    title: "Chats",
                    headerShown: false,
                    tabBarActiveTintColor: "#e28e6e",
                    tabBarInactiveTintColor: "#cccbcd",
                    // tabBarShowLabel: false,
                    tabBarIcon: ({ color }) => (
                        <AntDesign name="message1" size={24} color={color} />
                    ),
                }}
            />

            <Tabs.Screen
                name="profile"
                options={{
                    title: "Profile",
                    headerShown: false,
                    tabBarActiveTintColor: "#e28e6e",
                    tabBarInactiveTintColor: "#cccbcd",
                    // tabBarShowLabel: false,
                    tabBarIcon: ({ color }) => (
                        <AntDesign name="user" size={24} color={color} />
                    ),
                }}
            />
        </Tabs>
    );
}
