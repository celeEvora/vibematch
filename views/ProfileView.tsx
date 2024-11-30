import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    ScrollView,
    SafeAreaView,
    Button,
} from "react-native";
import Octicons from "@expo/vector-icons/Octicons";
import { useUser } from "@/hooks/useUser";
import { calculateAge } from "@/helpers/calculateAge";
import { capilizeWord } from "@/helpers/capitalizeWord";
import useAuthStore from "@/stores/useAuthStore";

export default function ProfileView() {
    const { user } = useUser();
    const {
        firstName,
        lastName,
        email,
        bio,
        profilePicture,
        orientation,
        gender,
        birthDate,
    } = user;

    const logout = useAuthStore((state) => state.logout);

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
                        source={{
                            uri: profilePicture,
                        }}
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
                            {`${firstName} ${lastName}`},{" "}
                            {calculateAge(birthDate)}
                        </Text>
                    </View>
                    <Text>
                        {capilizeWord(gender)} - {capilizeWord(orientation)}
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

                <Button
                    title="Logout"
                    onPress={async () => {
                        await logout();
                    }}
                />
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
        width: 135,
        height: 135,
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
