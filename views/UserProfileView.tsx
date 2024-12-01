import React, { useState } from "react";
import { View, Text, Image, StyleSheet, ActivityIndicator } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useUserById } from "@/hooks/useUserById";
import { calculateAge } from "@/helpers/calculateAge";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { capilizeWord } from "@/helpers/capitalizeWord";

export default function UserProfileView() {
    const { id } = useLocalSearchParams();
    const { user, isLoading } = useUserById(parseInt(id as string));

    const [isImageLoading, setIsImageLoading] = useState(true);

    if (isLoading) {
        return (
            <View style={styles.loaderContainer}>
                <ActivityIndicator size="large" color="#333" />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <View style={styles.profileContainer}>
                {isImageLoading && (
                    <ActivityIndicator
                        size="large"
                        color="#333"
                        style={styles.imageLoader}
                    />
                )}
                <Image
                    source={{ uri: user.profilePicture }}
                    style={styles.profilePicture}
                    resizeMode="cover"
                    onLoad={() => setIsImageLoading(false)}
                    onError={() => setIsImageLoading(false)}
                />
            </View>

            <View style={styles.contentContainer}>
                <View style={styles.userInfoRow}>
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
                <View style={styles.userInfoRow}>
                    <MaterialIcons
                        name="location-pin"
                        size={18}
                        color="black"
                    />
                    <Text style={styles.locationText}>{user.country.name}</Text>
                </View>

                <View style={styles.divider}>
                    <Text style={styles.orientationText}>
                        {capilizeWord(user.orientation)}
                    </Text>
                </View>

                <View>
                    <Text style={styles.bioText}>{user.bio}</Text>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
    },
    loaderContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    profileContainer: {
        width: "100%",
        height: 320,
        overflow: "hidden",
        marginBottom: 15,
        justifyContent: "center",
        alignItems: "center",
    },
    profilePicture: {
        width: "100%",
        height: "100%",
        position: "absolute",
    },
    imageLoader: {
        position: "absolute",
        zIndex: 1,
    },
    contentContainer: {
        paddingHorizontal: 20,
    },
    userInfoRow: {
        flexDirection: "row",
        alignItems: "center",
        marginVertical: 5,
        gap: 10,
    },
    nameUser: {
        fontSize: 22,
        fontWeight: "bold",
    },
    locationText: {
        marginLeft: 5,
        fontSize: 16,
    },
    divider: {
        marginTop: 5,
        borderBottomColor: "#eceaeb",
        borderBottomWidth: 1,
        paddingBottom: 10,
        marginBottom: 25,
    },
    orientationText: {
        marginLeft: 5,
        fontSize: 16,
    },
    bioText: {
        fontSize: 16,
        marginBottom: 5,
    },
});
