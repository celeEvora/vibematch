import { View, Text, StyleSheet } from "react-native";
import { useEffect, useState, useCallback } from "react";
import { useLocalSearchParams } from "expo-router";
import { GiftedChat, Bubble, IMessage } from "react-native-gifted-chat";

export default function ChatDetails() {
    const { id, name } = useLocalSearchParams();

    const [messages, setMessages] = useState<IMessage[]>([]);

    useEffect(() => {
        setMessages([
            {
                _id: 1,
                text: "Hello developer",
                createdAt: new Date(),
                user: {
                    _id: 2,
                    name: "React Native",
                    avatar: require("@/assets/img/avatars/avatar1.jpeg"),
                },
            },
        ]);
    }, []);

    const onSend = useCallback((messages: IMessage[] = []) => {
        setMessages((previousMessages) =>
            GiftedChat.append(previousMessages, messages)
        );
    }, []);

    return (
        <View style={styles.container}>
            <GiftedChat
                messages={messages}
                onSend={(messages) => onSend(messages)}
                user={{
                    _id: 1,
                }}
                renderBubble={(props) => {
                    return (
                        <Bubble
                            {...props}
                            wrapperStyle={{
                                right: {
                                    backgroundColor: "#e28e6e",
                                    borderTopLeftRadius: 20,
                                    borderTopRightRadius: 20,
                                    borderBottomRightRadius: 0,
                                    borderBottomLeftRadius: 20,
                                    padding: 3,
                                },
                                left: {
                                    backgroundColor: "#f0f0f0",
                                    borderTopLeftRadius: 20,
                                    borderTopRightRadius: 20,
                                    borderBottomLeftRadius: 0,
                                    borderBottomRightRadius: 20,
                                    padding: 3,
                                },
                            }}
                        />
                    );
                }}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: "center",
        // alignItems: "center",
        backgroundColor: "#ffff",
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
    },
});
