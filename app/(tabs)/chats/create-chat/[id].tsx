import { useState, useCallback } from "react";
import {
    Text,
    View,
    TextInput,
    StyleSheet,
    Pressable,
    TouchableWithoutFeedback,
    Keyboard,
} from "react-native";
import { useLocalSearchParams } from "expo-router";
import { io } from "socket.io-client";
import { useUser } from "@/hooks/useUser";

const socket = io(process.env.API_SOCKET_URL);

export default function NewChat() {
    const { id, name } = useLocalSearchParams();
    const { user } = useUser();
    const [value, setValue] = useState("");

    const onSend = () => {
        console.log(value);
        socket.emit("chat_message", {
            senderId: user.id,
            receiverId: parseInt(id as string),
            content: value,
            createdAt: new Date(),
        });

        setValue("");
    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.container}>
                <Text style={styles.label}>
                    Start a new conversation with{" "}
                    <Text
                        style={{
                            color: "#ab74aa",
                            fontWeight: "bold",
                            fontSize: 18,
                        }}
                    >
                        {name}
                    </Text>
                </Text>

                <TextInput
                    style={styles.input}
                    multiline
                    onChangeText={setValue}
                    value={value}
                    returnKeyType="done"
                    placeholder="Type your message here..."
                    placeholderTextColor="#999"
                />

                <Pressable
                    style={{
                        backgroundColor: "#ab74aa",
                        padding: 15,
                        borderRadius: 10,
                        alignItems: "center",
                    }}
                    onPress={onSend}
                >
                    <Text
                        style={{
                            color: "#fff",
                            fontSize: 16,
                            fontWeight: "bold",
                        }}
                    >
                        SEND
                    </Text>
                </Pressable>
            </View>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingVertical: 20,
        paddingHorizontal: 30,
        backgroundColor: "#fff",
    },
    label: {
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 30,
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
