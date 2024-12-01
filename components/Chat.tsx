import { Text, View, StyleSheet, Image } from "react-native";

type ChatProps = {
    messageData: {
        id: number;
        name: string;
        message: string;
        image: any;
    };
};

export function Chat({ messageData }: ChatProps) {
    const { name, message, image } = messageData;

    return (
        <View style={styles.container}>
            <Image source={image} style={styles.avatar} />

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
                <View style={styles.contentContainer}>
                    <Text
                        style={{
                            fontWeight: 600,
                            fontSize: 16,
                            marginBottom: 5,
                        }}
                    >
                        {name}
                    </Text>
                    <Text
                        style={{
                            fontSize: 15,
                            color: "#666",
                        }}
                    >
                        {message}
                    </Text>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        marginBottom: 10,
        // borderBottomWidth: 1,
        // borderBottomColor: "#f0f0f0",
        // paddingBottom: 10,
    },
    avatar: {
        width: 65,
        height: 65,
        borderRadius: 50,
        marginRight: 15,
    },
    contentContainer: {
        // borderBottomWidth: 1,
        // borderBottomColor: "#f0f0f0",
        // paddingBottom: 10,
        // width: "80%",
    },
});
