import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    Pressable,
    FlatList,
} from "react-native";
import { useRouter } from "expo-router";
import { useMatchesForUser } from "@/hooks/useMatchesForUser";
import { useUser } from "@/hooks/useUser";
import SearchBarUser from "@/components/SearchBarUser";
import useSearchUser from "@/hooks/useSearchUser";

export default function CreateChatView() {
    const router = useRouter();
    const { user } = useUser();
    const { matches } = useMatchesForUser(user.id);
    const { search, setSearch, filterMatches } = useSearchUser();

    const filteredMatches = filterMatches(search, matches);

    return (
        <View>
            <SearchBarUser setSearch={setSearch} />

            <FlatList
                data={filteredMatches}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <Pressable
                        onPress={() => router.replace(`chats/${item.id}`)}
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
        </View>
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
});
