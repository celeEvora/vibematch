import { Text, View, StyleSheet, Image } from "react-native";

function getTime(date: string) {
    const time = new Date(date);
    return time.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
    });
}

export function Chat({ messageData }: { messageData: any }) {
    const { otherUser, lastMessage } = messageData;
    const { firstName, lastName, profilePicture } = otherUser;

    return (
        <View style={styles.container}>
            <Image
                source={{
                    uri: profilePicture,
                }}
                style={styles.avatar}
            />

            <View
                style={{
                    flex: 1,
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    borderBottomWidth: 1,
                    borderBottomColor: "#f0f0f0",
                    paddingBottom: 22,
                    paddingTop: 12,
                    height: "100%",
                    width: "80%",
                }}
            >
                <View>
                    <View
                        style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                            alignItems: "center",
                            marginBottom: 5,
                            width: "100%",
                        }}
                    >
                        <Text
                            style={{
                                fontWeight: 600,
                                fontSize: 16,
                                marginBottom: 5,
                            }}
                        >
                            {firstName} {lastName}
                        </Text>
                        <Text
                            style={{
                                color: "#666",
                            }}
                        >
                            {getTime(lastMessage.createdAt)}
                        </Text>
                    </View>
                    <Text
                        style={{
                            fontSize: 15,
                            color: "#666",
                        }}
                        ellipsizeMode="tail"
                        numberOfLines={2}
                    >
                        {lastMessage.content}
                    </Text>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        flexDirection: "row",
        marginBottom: 10,
        height: 75,
    },
    avatar: {
        width: 65,
        height: 65,
        borderRadius: 50,
        marginRight: 15,
    },
});
