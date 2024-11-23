import { calculateAge } from "@/helpers/calculateAge";
import { capilizeWord } from "@/helpers/capitalizeWord";
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    ScrollView,
    SafeAreaView,
} from "react-native";
import Octicons from "@expo/vector-icons/Octicons";

const user = {
    name: "John Doe",
    email: "joh@example.com",
    avatar: require("../../assets/img/avatar.jpg"),
    bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum sit amet sodales est. Nullam nec purus eu nunc ultricies posuere. Sed at justo auctor, fermentum mi nec, maximus libero. Nullam nec purus eu nunc ultricies posuere. Sed at justo auctor, fermentum mi nec, maximus libero. Nullam nec purus eu nunc ultricies posuere. Sed at justo",
    birthDate: "1990-01-01",
    gender: "male",
    phone: "+1 234 567 890",
    sexualOrientation: "heterosexual",
};

export default function Profile() {
    const { avatar, name, birthDate, gender, bio, sexualOrientation } = user;

    return (
        <ScrollView style={styles.container}>
            <View style={styles.circle}>
                <View style={styles.circleBg}></View>
                <SafeAreaView
                    style={{
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <Image
                        source={avatar}
                        style={styles.avatar}
                        resizeMode="contain"
                    />
                    <View
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            marginTop: 20,
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        <Text style={styles.nameAndAge}>
                            {name}, {calculateAge(birthDate)}
                        </Text>
                    </View>
                    <Text>
                        {capilizeWord(gender)} -{" "}
                        {capilizeWord(sexualOrientation)}
                    </Text>

                    <View style={styles.buttonsHeaderContainer}>
                        <View style={styles.buttonTextIconContainer}>
                            <TouchableOpacity
                                style={styles.buttonHeaderContainer}
                            >
                                <Octicons
                                    name="gear"
                                    size={28}
                                    color="#c2c5c8"
                                />
                            </TouchableOpacity>
                            <Text style={styles.textButtonHeader}>
                                SETTINGS
                            </Text>
                        </View>

                        <View
                            style={[
                                styles.buttonTextIconContainer,
                                {
                                    marginTop: 40,
                                },
                            ]}
                        >
                            <TouchableOpacity
                                style={styles.buttonHeaderContainer}
                            >
                                <Octicons
                                    name="device-camera"
                                    size={28}
                                    color="#c2c5c8"
                                />
                            </TouchableOpacity>
                            <Text style={styles.textButtonHeader}>
                                CHANGE PHOTO
                            </Text>
                        </View>

                        <View style={styles.buttonTextIconContainer}>
                            <TouchableOpacity
                                style={styles.buttonHeaderContainer}
                            >
                                <Octicons
                                    name="pencil"
                                    size={28}
                                    color="#c2c5c8"
                                />
                            </TouchableOpacity>
                            <Text style={styles.textButtonHeader}>
                                EDIT INFO
                            </Text>
                        </View>
                    </View>
                </SafeAreaView>
            </View>

            <View style={styles.mainContent}>
                <Text
                    style={{
                        fontSize: 20,
                        fontWeight: "bold",
                        color: "#333",
                        borderBottomWidth: 2,
                        borderColor: "#ececec",
                        paddingBottom: 10,
                        width: "100%",
                        marginBottom: 10,
                    }}
                >
                    About
                </Text>
                <Text style={styles.bio}>{bio}</Text>
            </View>

            <View style={styles.footer}>
                <Text
                    style={{
                        fontSize: 20,
                        fontWeight: "bold",
                        color: "#333",
                        textAlign: "center",
                    }}
                >
                    Start looking for your ideal match!
                </Text>

                <TouchableOpacity
                    style={styles.matchButton}
                    onPress={() => console.log("Start matching")}
                >
                    <Text style={styles.matchText}>Start Matching</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        backgroundColor: "#f7f6fa",
    },
    circle: {
        height: 450,
        marginBottom: 20,
        justifyContent: "center",
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.1,
        shadowRadius: 4.84,
        elevation: 5,
        borderBottomLeftRadius: 200,
        borderBottomRightRadius: 200,
    },
    circleBg: {
        position: "absolute",
        top: 0,
        left: 0,
        backgroundColor: "white",
        transform: [{ scaleX: 1.5 }],
        width: "100%",
        height: "100%",
        borderBottomLeftRadius: 200,
        borderBottomRightRadius: 200,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    avatar: {
        width: 150,
        height: 150,
        aspectRatio: 1,
        borderRadius: 100,
        // borderWidth: 3,
        borderColor: "white",
    },
    nameAndAge: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#333",
    },
    footer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 30,
    },
    matchButton: {
        backgroundColor: "#e28e6e",
        paddingVertical: 14,
        paddingHorizontal: 30,
        borderRadius: 30,
        marginTop: 20,
    },
    matchText: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 18,
    },
    mainContent: {
        paddingHorizontal: 30,
        justifyContent: "center",
        alignItems: "center",
    },
    bio: {
        fontSize: 16,
        color: "#333",
        textAlign: "justify",
    },
    buttonsHeaderContainer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        // marginTop: 20,
        gap: 35,
    },
    buttonHeaderContainer: {
        width: 65,
        height: 65,
        borderRadius: 100,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3.84,
        elevation: 5,
        backgroundColor: "#fff",
    },
    textButtonHeader: {
        color: "#c2c5c8",
        fontWeight: "bold",
        fontSize: 11,
        marginTop: 10,
    },
    buttonTextIconContainer: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
    },
});
