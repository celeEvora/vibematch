import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    FlatList,
    Pressable,
} from "react-native";
import { useState } from "react";
import { useRouter } from "expo-router";
import { Chat } from "@/components/Chat";

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

const matches = [
    { id: 1, name: "Alice", image: require("@/assets/img/avatar.jpg") },
    { id: 2, name: "Bob", image: require("@/assets/img/avatar.jpg") },
];

export default function Chats() {
    const [view, setView] = useState("Messages");

    const router = useRouter();

    return (
        <SafeAreaView style={styles.container}>
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
                <View
                    style={{ width: 2, height: 25, backgroundColor: "#f0f0f0" }}
                />
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
                            // onPress={() => router.push(`/chats/${item.id}`)}
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
                <FlatList
                    data={matches}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <View style={styles.matchCard}>
                            <Text>{item.name}</Text>
                        </View>
                    )}
                    style={styles.chats}
                />
            )}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff",
    },
    menuBar: {
        flexDirection: "row",
        justifyContent: "space-around",
        width: "90%",
        padding: 10,
        // marginHorizontal: 20,
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
        color: "#e28e6e",
    },
    matchCard: {
        flexDirection: "row",
        alignItems: "center",
        padding: 10,
        backgroundColor: "#f9f9f9",
        borderBottomWidth: 1,
        borderBottomColor: "#f0f0f0",
    },
});
