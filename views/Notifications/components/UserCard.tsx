import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    Pressable,
} from "react-native";
import { useRouter } from "expo-router";

type User = {
    id: number;
    firstName: string;
    lastName: string;
    profilePicture: string;
};

type UserCardProps = {
    user: User;
    onPressLike: () => void;
    onPressDislike: () => void;
};

export default function UserCard({
    user,
    onPressLike,
    onPressDislike,
}: UserCardProps) {
    const router = useRouter();

    return (
        <View style={styles.container}>
            <Pressable
                onPress={() => router.push(`/notifications/users/${user.id}`)}
            >
                <Image
                    source={{ uri: user.profilePicture }}
                    style={styles.image}
                />
            </Pressable>
            <View style={styles.infoContainer}>
                <Text style={styles.nameText}>
                    {`${user.firstName} ${user.lastName}`}
                </Text>

                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        onPress={onPressLike}
                        style={[styles.button, { backgroundColor: "#ab74aa" }]}
                    >
                        <Text style={styles.buttonText}>Like</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={onPressDislike}
                        style={[styles.button, { backgroundColor: "#f0c6b6" }]}
                    >
                        <Text style={[styles.buttonText, { color: "#333" }]}>
                            Nope
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingVertical: 10,
        paddingHorizontal: 15,
        flexDirection: "row",
        alignItems: "center",
        marginVertical: 5,
        backgroundColor: "#fff",
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
    },
    image: {
        width: 70,
        height: 70,
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
