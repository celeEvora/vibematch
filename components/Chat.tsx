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

            <View style={styles.contentContainer}>
                <Text>{name}</Text>
                <Text>{message}</Text>
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
        backgroundColor: "#fff",
        borderBottomWidth: 1,
        borderBottomColor: "#f0f0f0",
        paddingBottom: 10,
    },
    avatar: {
        width: 60,
        height: 60,
        borderRadius: 50,
        marginRight: 10,
    },
    contentContainer: {},
});
