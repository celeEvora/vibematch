import { useState } from "react";
import { Text, View, TextInput, StyleSheet } from "react-native";

export default function NewChat() {
    const [value, setValue] = useState("");
    return (
        <View>
            <Text>Start a new conversation</Text>

            <TextInput
                style={styles.input}
                multiline
                onChangeText={setValue}
                value={value}
                returnKeyType="done"
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: "#fff",
    },
    label: {
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 10,
    },
    input: {
        backgroundColor: "#f9f9f9",
        padding: 15,
        borderRadius: 10,
        fontSize: 16,
        textAlignVertical: "top",
        height: 300,
        borderWidth: 1,
        borderColor: "#ddd",
        marginBottom: 20,
    },
});
