import { View, StyleSheet } from "react-native";
import { useCallback } from "react";
import { useLocalSearchParams } from "expo-router";
import { GiftedChat, Bubble, IMessage } from "react-native-gifted-chat";
import { useMessages } from "@/hooks/useMessages";
import { useUser } from "@/hooks/useUser";

export default function ChatDetails() {
    const { id, idMatch } = useLocalSearchParams();
    const { user } = useUser();
    const { messages, addMessage } = useMessages(
        parseInt(id as string),
        parseInt(idMatch as string)
    );

    const onSend = useCallback((messages: IMessage[] = []) => {
        addMessage(messages[0]);
    }, []);

    return (
        <View style={styles.container}>
            <GiftedChat
                messages={messages}
                onSend={(messages) => onSend(messages)}
                user={{
                    _id: user.id,
                }}
                renderBubble={(props) => {
                    return (
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
