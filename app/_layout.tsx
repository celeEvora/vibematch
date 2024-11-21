import React, { View } from "react-native";
import { Slot } from "expo-router";

export default function Layout() {
    return (
        <View
            style={{
                flex: 1,
                backgroundColor: "white",
            }}
        >
            <Slot />
        </View>
    );
}
