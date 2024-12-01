import {
    View,
    Text,
    FlatList,
    StyleSheet,
    ActivityIndicator,
    Image,
} from "react-native";
import { useUser } from "@/hooks/useUser";
import { useLikesForUser } from "@/hooks/useLikesForUser";
import { useLikeUser } from "@/hooks/useLikeUser";
import UserCard from "./components/UserCard";
import { PossibleMatch } from "@/types/Match";

export default function NotificationsView() {
    const { user } = useUser();
    const { likes } = useLikesForUser(user?.id);
    const { processLikeUser, isLoading } = useLikeUser();

    async function likeUser(toUser: PossibleMatch, isLike: boolean) {
        await processLikeUser({
            fromUserId: user.id,
            toUserId: toUser.id,
            isLike,
        });
    }

    if (!likes.length) {
        return (
            <View
                style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <Image
                    source={require("@/assets/img/nolikes.png")}
                    style={{
                        width: 100,
                        height: 100,
                        opacity: 0.5,
                    }}
                    resizeMode="contain"
                />
                <Text
                    style={{ fontSize: 16, color: "#5b5b5b", fontWeight: 600 }}
                >
                    No likes yet! 😢
                </Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>You have {likes.length} likes! 🔥</Text>

            {isLoading && <ActivityIndicator size="large" color="#333" />}
            <FlatList
                data={likes}
                renderItem={({ item }) => (
                    <UserCard
                        user={item}
                        onPressLike={() => likeUser(item, true)}
                        onPressDislike={() => likeUser(item, false)}
                    />
                )}
                keyExtractor={(item) => item.id.toString()}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: "#f0f0f0",
    },
    title: {
        fontSize: 18,
        fontWeight: "bold",
        marginTop: 10,
        marginBottom: 20,
        color: "#333",
    },
});
