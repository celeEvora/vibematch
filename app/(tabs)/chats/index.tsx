import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    FlatList,
    Pressable,
    TouchableOpacity,
} from "react-native";
import { useState, useEffect } from "react";
import { useRouter } from "expo-router";
import { Chat } from "@/components/Chat";
import MatchesView from "@/views/Matches/MatchesView";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useChats } from "@/hooks/useChats";
import { useUser } from "@/hooks/useUser";
import { io } from "socket.io-client";

const socket = io(process.env.API_SOCKET_URL);

export default function Chats() {
    const [view, setView] = useState("Messages");
    const { user } = useUser();
    const { chats, mutate } = useChats(user.id);

    const router = useRouter();

    useEffect(() => {
        // Join the user's room
        socket.emit("register_user", user.id);

        // Listen for chat updates
        const handleChatUpdated = (data: unknown) => {
            mutate(); // Update the chat list
        };

        socket.on("chat_updated", handleChatUpdated);

        return () => {
            socket.off("chat_updated", handleChatUpdated);
        };
    }, [user.id, mutate]);

    return (
        <SafeAreaView style={styles.container}>
            <TouchableOpacity
                onPress={() => router.push("/chats/create-chat")}
                style={{
                    position: "absolute",
                    right: 40,
                    bottom: 40,
                    zIndex: 1,
                    backgroundColor: "#fff",
                    padding: 15,
                    borderRadius: 50,
                    shadowColor: "#000",
                    shadowOffset: {
                        width: 0,
                        height: 1,
                    },
                    shadowOpacity: 0.05,
                    shadowRadius: 3.84,
                    elevation: 5,
                }}
            >
                <MaterialCommunityIcons
                    name="chat-plus-outline"
                    size={30}
                    color="#a885b2"
                />
            </TouchableOpacity>
            <View style={styles.menuBar}>
                <Pressable onPress={() => setView("Messages")}>
                    <Text
                        style={[
                            styles.textMenuBar,
                            view === "Messages" && styles.activeTab,
                        ]}
                    >
                        Messages
                    </Text>
                </Pressable>
                <View style={{ width: 2, height: 25 }} />
                <Pressable onPress={() => setView("Matches")}>
                    <Text
                        style={[
                            styles.textMenuBar,
                            view === "Matches" && styles.activeTab,
                        ]}
                    >
                        Matches
                    </Text>
                </Pressable>
            </View>

            {view === "Messages" ? (
                <FlatList
                    data={chats}
                    keyExtractor={(item) => item.chatId.toString()}
                    renderItem={({ item }) => (
                        <Pressable
                            onPress={() =>
                                router.push({
                                    pathname: `/chats/${item.chatId}`,
                                    params: {
                                        name: `${item.otherUser.firstName} ${item.otherUser.lastName}`,
                                        idMatch: item.otherUser.id,
                                    },
                                })
                            }
                        >
                            <Chat messageData={item} />
                        </Pressable>
                    )}
                    style={styles.chats}
                />
            ) : (
                <MatchesView />
            )}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        backgroundColor: "#f7f6fa",
    },
    menuBar: {
        flexDirection: "row",
        justifyContent: "space-around",
        width: "100%",
        paddingHorizontal: 10,
        paddingVertical: 15,
        backgroundColor: "#fff",
        borderBottomWidth: 2,
        borderBottomColor: "#f0f0f0",
    },
    textMenuBar: {
        color: "#e0e0e0",
        fontSize: 18,
        fontWeight: "bold",
    },
    chats: {
        width: "100%",
        padding: 20,
    },
    activeTab: {
        color: "#a885b2",
    },
});
