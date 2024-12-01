import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    FlatList,
    Pressable,
    TouchableOpacity,
} from "react-native";
import { useState } from "react";
import { useRouter } from "expo-router";
import { Chat } from "@/components/Chat";
import MatchesView from "@/views/Matches/MatchesView";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

const chats = [
    {
        id: 1,
        name: "John Doe",
        message: "Hey, how are you?",
        image: require("@/assets/img/avatars/avatar1.jpeg"),
    },
    {
        id: 2,
        name: "Jane Doe",
        message: "Hey, how are you?",
        image: require("@/assets/img/avatars/avatar2.jpeg"),
    },
    {
        id: 3,
        name: "Celeste Evora",
        message: "Hey, how are you?",
        image: require("@/assets/img/avatars/avatar3.jpeg"),
    },
    {
        id: 4,
        name: "Michelle Evora",
        message: "Hey, how are you?",
        image: require("@/assets/img/avatars/avatar4.jpg"),
    },
    {
        id: 5,
        name: "Valeria Avalos",
        message: "Hey, how are you?",
        image: require("@/assets/img/avatars/avatar5.jpeg"),
    },
];

export default function Chats() {
    const [view, setView] = useState("Messages");

    const router = useRouter();

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
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <Pressable
                            onPress={() =>
                                router.push({
                                    pathname: `/chats/${item.id}`,
                                    params: { name: item.name },
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
