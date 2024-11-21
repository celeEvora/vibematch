import { Text, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

type GradientButtonProps = {
    text: string;
    colors?: [string, string, ...string[]];
    rounded?: boolean;
};

export function GradientButton({ text, colors, rounded }: GradientButtonProps) {
    return (
        <LinearGradient
            // colors={["#4c669f", "#3b5998", "#192f6a"]}
            colors={colors || ["#ab74aa", "#e28e6e"]}
            // colors={["#e0c6ff", "#6009c8"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={[
                styles.button,
                rounded ? { borderRadius: 30 } : { borderRadius: 10 },
            ]}
        >
            <Text style={styles.textButton}>{text}</Text>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    button: {
        paddingVertical: 16,
        width: "100%",
    },
    textButton: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 18,
        textAlign: "center",
    },
});
