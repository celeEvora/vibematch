import { View, StyleSheet } from "react-native";
import { useCallback, useState, useEffect } from "react";
import { useLocalSearchParams } from "expo-router";
import { GiftedChat, Bubble, IMessage } from "react-native-gifted-chat";
import { io } from "socket.io-client";
import { useUser } from "@/hooks/useUser";
import { useChats } from "@/hooks/useChats";

const socket = io("http://192.168.0.3:3000");

export default function ChatDetails() {
    const { id: chatId, idMatch } = useLocalSearchParams();
    const [messages, setMessages] = useState<IMessage[]>([]);
    const { user } = useUser();
    const { mutate: mutateChats } = useChats(user.id);

    useEffect(() => {
        if (chatId) {
            socket.emit("load_messages", parseInt(chatId as string));

            const handleLoadMessages = (loadedMessages: IMessage[]) => {
                setMessages((prevMessages) =>
                    GiftedChat.append(prevMessages, loadedMessages)
                );
            };

            socket.on("load_messages", handleLoadMessages);

            const handleChatMessage = (msg: IMessage) => {
                setMessages((prevMessages) => [msg, ...prevMessages]);
            };

            socket.on("chat_message", handleChatMessage);

            return () => {
                socket.off("chat_message", handleChatMessage);
                mutateChats();
            };
        }
    }, [chatId]);

    const onSend = useCallback(
        (newMessages: IMessage[] = []) => {
            const message = newMessages[0];

            socket.emit("chat_message", {
                chatId,
                senderId: user.id,
                receiverId: parseInt(idMatch as string),
                content: message.text,
                createdAt: new Date(),
            });
        },
        [chatId, user.id, idMatch]
    );

    return (
        <View style={styles.container}>
            <GiftedChat
                messages={messages}
                onSend={(messages) => onSend(messages)}
                user={{
                    _id: user.id,
                }}
                renderBubble={(props) => (
                    <Bubble
                        {...props}
                        wrapperStyle={{
                            right: {
                                backgroundColor: "#a885b2",
                                borderTopLeftRadius: 20,
                                borderTopRightRadius: 20,
                                borderBottomRightRadius: 0,
                                borderBottomLeftRadius: 20,
                                padding: 3,
                                // marginTop: 5,
                            },
                            left: {
                                backgroundColor: "#f0f0f0",
                                borderTopLeftRadius: 20,
                                borderTopRightRadius: 20,
                                borderBottomLeftRadius: 0,
                                borderBottomRightRadius: 20,
                                padding: 3,
                                // marginTop: 5,
                            },
                        }}
                    />
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#ffff",
    },
});
