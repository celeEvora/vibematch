import { Stack } from "expo-router";

export default function ProfileLayout() {
    return (
        <Stack>
            <Stack.Screen
                name="index"
                options={{ title: "Profile", headerShown: false }}
            />
            <Stack.Screen name="settings" options={{ title: "Settings" }} />

            <Stack.Screen
                name="edit-profile"
                options={{
                    title: "Edit Profile",
                    presentation: "modal",
                }}
            />

            <Stack.Screen
                name="bio"
                options={{
                    title: "About me",
                    // presentation: "modal",
                }}
            />

            <Stack.Screen
                name="orientation"
                options={{ title: "Orientation" }}
            />

            <Stack.Screen name="gender" options={{ title: "Gender" }} />

            <Stack.Screen name="birthdate" options={{ title: "Birthdate" }} />

            <Stack.Screen name="country" options={{ title: "Country" }} />
        </Stack>
    );
}
