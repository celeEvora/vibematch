import React, { View } from "react-native";
import { Slot } from "expo-router";
import { Stack } from "expo-router/stack";

export default function Layout() {
    return (
        <Stack>
            {/* <Stack.Screen name="(tabs)" options={{ headerShown: false }} /> */}
            <Stack.Screen name="index" options={{ headerShown: false }} />
        </Stack>
    );
}
