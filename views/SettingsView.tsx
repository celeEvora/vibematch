import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import useAuthStore from "@/stores/useAuthStore";

export default function SettingsView() {
    const logout = useAuthStore((state) => state.logout);

    return (
        <View style={styles.container}>
            <View>
                <TouchableOpacity
                    style={styles.logoutButton}
                    onPress={async () => {
                        await logout();
                    }}
                >
                    <Text style={styles.logoutTextButton}>Log Out</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        // alignItems: "center",
        paddingHorizontal: 5,
    },
    logoutButton: {
        backgroundColor: "#fff",
        padding: 15,
        borderRadius: 10,
        margin: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3.84,
        elevation: 5,
    },
    logoutTextButton: {
        color: "#c93c32",
        fontWeight: "bold",
        textAlign: "center",
        fontSize: 16,
    },
});
