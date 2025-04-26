import { View, StyleSheet } from "react-native";
import { useCallback, useState, useEffect } from "react";
import { useLocalSearchParams } from "expo-router";
import { GiftedChat, Bubble, IMessage } from "react-native-gifted-chat";
import { io } from "socket.io-client";
import { useUser } from "@/hooks/useUser";

const socket = io(process.env.API_SOCKET_URL);

const getRoomId = (userId1: string, userId2: string): string => {
    return [userId1, userId2].sort().join(":");
};

export default function ChatDetails() {
    const { id: chatId, idMatch } = useLocalSearchParams();
    const [messages, setMessages] = useState<IMessage[]>([]);
    const { user } = useUser();

    useEffect(() => {
        if (user && idMatch) {
            const chatRoom = getRoomId(String(user.id), idMatch as string);

            console.log(
                `Joining chat room for chatId: ${parseInt(chatRoom as string)}`
            );

            // Join the chat room
            // socket.emit("load_messages", parseInt(chatId as string));
            socket.emit("load_messages", {
                chatId: parseInt(chatId as string),
                senderId: user.id,
                receiverId: idMatch,
            });

            const handleLoadMessages = (loadedMessages: IMessage[]) => {
                setMessages((prevMessages) =>
                    GiftedChat.append(prevMessages, loadedMessages)
                );
            };

            const handleChatMessage = (msg: IMessage) => {
                setMessages((prevMessages) => [msg, ...prevMessages]);
            };

            socket.on("load_messages", handleLoadMessages);
            socket.on("chat_message", handleChatMessage);

            return () => {
                console.log("Leaving chat room for chatId:", chatId);
                socket.off("load_messages", handleLoadMessages);
                socket.off("chat_message", handleChatMessage);
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
