import { Link } from "expo-router";
import {
    View,
    Text,
    StyleSheet,
    Pressable,
    TouchableOpacity,
} from "react-native";
import { TopCircleGradient } from "@/components/TopCircleGradient";
import { GradientButton } from "@/components/GradientButton";

export default function Start() {
    return (
        <View>
            <TopCircleGradient height={350} />
            <View style={styles.container}>
                <Text
                    style={{
                        marginTop: 15,
                        fontSize: 24,
                        fontWeight: "bold",
                    }}
                >
                    Welcome to{" "}
                    <Text
                        style={{
                            color: "#ab74aa",
                            fontWeight: "bold",
                            fontSize: 26,
                        }}
                    >
                        VibeMatch!
                    </Text>
                </Text>

                <Text
                    style={{
                        fontSize: 18,
                        marginTop: 15,
                        marginBottom: 20,
                        color: "#aeaeae",
                        textAlign: "center",
                        fontWeight: "500",
                        width: "80%",
                    }}
                >
                    Connect, chat and create something special. Log in or
                    register.
                </Text>

                <View style={{ marginTop: 20, gap: 20, width: "80%" }}>
                    <Link href="/login" asChild>
                        <TouchableOpacity>
                            <GradientButton text="Log In" rounded />
                        </TouchableOpacity>
                    </Link>

                    <Link href="/register" asChild>
                        <TouchableOpacity>
                            <GradientButton text="Register" rounded />
                        </TouchableOpacity>
                    </Link>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "white",
    },
    formContainer: {
        width: "87%",
        gap: 18,
    },
});
