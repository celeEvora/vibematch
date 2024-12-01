import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    Pressable,
    FlatList,
    TextInput,
} from "react-native";
import { useRouter } from "expo-router";
import { useState } from "react";
import { useMatchesForUser } from "@/hooks/useMatchesForUser";
import { useUser } from "@/hooks/useUser";

export default function MatchesView() {
    const { user } = useUser();
    const { matches } = useMatchesForUser(user.id);
    const [search, setSearch] = useState("");

    const router = useRouter();

    function filterMatches(search: string) {
        return matches.filter((match) => {
            const fullName = `${match.firstName} ${match.lastName}`;
            return fullName.toLowerCase().includes(search.toLowerCase());
        });
    }

    const filteredMatches = filterMatches(search);

    return (
        <>
            <View style={[styles.container]}>
                <TextInput
                    style={styles.input}
                    placeholder="Search"
                    onChangeText={setSearch}
                />
            </View>
            <FlatList
                data={filteredMatches}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <Pressable
                        // onPress={() => router.navigate("Chat", { id: item.id })}
                        style={styles.container}
                    >
                        <View style={styles.subContainer}>
                            <Image
                                source={{ uri: item.profilePicture }}
                                style={styles.image}
                            />
                            <View style={styles.infoContainer}>
                                <Text style={styles.nameText}>
                                    {`${item.firstName} ${item.lastName}`}
                                </Text>
                            </View>
                        </View>
                    </Pressable>
                )}
            />
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.05,
        shadowRadius: 3.84,
        elevation: 5,
        gap: 10,
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 5,
        paddingHorizontal: 15,
    },
    subContainer: {
        paddingVertical: 10,
        paddingHorizontal: 15,
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#fff",
        borderRadius: 10,
        gap: 20,
    },
    image: {
        width: 50,
        height: 50,
        borderRadius: 50,
    },
    infoContainer: {
        flex: 1,
        justifyContent: "space-between",
    },
    nameText: {
        fontSize: 16,
        fontWeight: "500",
    },
    buttonContainer: {
        flexDirection: "row",
        marginTop: 10,
        width: "100%",
        justifyContent: "space-between",
        gap: 12,
    },
    button: {
        flex: 1,
        paddingVertical: 10,
        borderRadius: 5,
        alignItems: "center",
    },
    buttonText: {
        fontWeight: 600,
        color: "#fff",
    },
    input: {
        width: "100%",
        backgroundColor: "#fff",
        borderRadius: 50,
        marginVertical: 10,
        paddingHorizontal: 20,
        paddingVertical: 18,
        fontSize: 16,
    },
});
