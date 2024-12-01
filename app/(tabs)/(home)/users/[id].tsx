import { View, Text, Image, StyleSheet } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useUserById } from "@/hooks/useUserById";
import { calculateAge } from "@/helpers/calculateAge";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { capilizeWord } from "@/helpers/capitalizeWord";

export default function User() {
    const { id } = useLocalSearchParams();
    const { user } = useUserById(parseInt(id as string));

    return (
        <View
            style={{
                flex: 1,
                backgroundColor: "white",
            }}
        >
            <View style={styles.profileContainer}>
                <Image
                    source={{ uri: user.profilePicture }}
                    style={styles.profilePicture}
                    resizeMode="cover"
                />
            </View>

            <View style={styles.contentContainer}>
                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        marginVertical: 5,
                        gap: 10,
                    }}
                >
                    <Text style={styles.nameUser}>
                        {`${user.firstName} ${user.lastName}, ${calculateAge(
                            user.birthDate
                        )}`}
                    </Text>
                    {user.gender === "male" ? (
                        <MaterialIcons name="male" size={24} color="#0c29a4" />
                    ) : (
                        <MaterialIcons
                            name="female"
                            size={24}
                            color="#d07ea6"
                        />
                    )}
                </View>
                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        marginVertical: 5,
                    }}
                >
                    <MaterialIcons
                        name="location-pin"
                        size={18}
                        color="black"
                    />
                    <Text
                        style={{
                            marginLeft: 5,
                            fontSize: 16,
                        }}
                    >
                        {user.country.name}
                    </Text>
                </View>

                <View
                    style={{
                        marginTop: 5,
                        borderBottomColor: "#eceaeb",
                        borderBottomWidth: 1,
                        paddingBottom: 10,
                        marginBottom: 25,
                    }}
                >
                    <Text
                        style={{
                            marginLeft: 5,
                            fontSize: 16,
                        }}
                    >
                        {capilizeWord(user.orientation)}
                    </Text>
                </View>

                <View>
                    <Text
                        style={{
                            fontSize: 16,
                            marginBottom: 5,
                        }}
                    >
                        {user.bio}
                    </Text>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    profileContainer: {
        width: "100%",
        height: 320,
        overflow: "hidden",
        marginBottom: 15,
    },
    profilePicture: {
        width: "100%",
        height: "100%",
    },
    contentContainer: {
        paddingHorizontal: 20,
    },
    nameUser: {
        fontSize: 22,
        fontWeight: "bold",
    },
});
