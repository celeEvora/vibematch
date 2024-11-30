import { useEffect } from "react";
import { TouchableOpacity, Image, View, StyleSheet, Text } from "react-native";
import * as ImagePicker from "expo-image-picker";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Controller, useFormContext } from "react-hook-form";

async function checkPermissions() {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
        alert(
            "Please grant gallery permissions inside your system's settings."
        );
    }

    const { status: cameraStatus } =
        await ImagePicker.requestCameraPermissionsAsync();
    if (cameraStatus !== "granted") {
        alert("Please grant camera permissions inside your system's settings.");
    }

    if (status === "granted" && cameraStatus === "granted") {
        console.log("All permissions are granted");
    }
}

export default function ProfilePictureSelector({ name }: { name: string }) {
    const { control } = useFormContext();

    const tookPhoto = async (onChange: (uri: string) => void) => {
        try {
            let result = await ImagePicker.launchCameraAsync({
                mediaTypes: ["images"],
                allowsEditing: true,
                aspect: [4, 3],
                quality: 1,
            });

            if (!result.canceled) {
                onChange(result.assets[0].uri);
            }
        } catch (error) {
            console.error("Error taking photo:", error);
            alert("An error occurred while accessing the camera.");
        }
    };

    const pickImage = async (onChange: (uri: string) => void) => {
        try {
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ["images"],
                allowsEditing: true,
                aspect: [4, 3],
                quality: 1,
            });

            if (!result.canceled) {
                onChange(result.assets[0].uri);
            }
        } catch (error) {
            console.error("Error picking image:", error);
            alert("An error occurred while picking the image.");
        }
    };

    useEffect(() => {
        checkPermissions();
    }, []);

    return (
        <Controller
            name={name}
            control={control}
            rules={{ required: "Please select a profile picture" }}
            defaultValue={null}
            render={({ field: { value, onChange }, fieldState: { error } }) => (
                <View style={styles.container}>
                    <View style={styles.imageContainer}>
                        {value ? (
                            <Image
                                source={{ uri: value }}
                                style={styles.image}
                            />
                        ) : (
                            <Image
                                source={require("@/assets/img/avatar.jpg")}
                                style={styles.image}
                            />
                        )}
                    </View>

                    <View style={styles.buttonsContainer}>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => tookPhoto(onChange)}
                        >
                            <MaterialIcons
                                name="add-a-photo"
                                size={24}
                                color="black"
                            />
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => pickImage(onChange)}
                        >
                            <MaterialIcons
                                name="add-photo-alternate"
                                size={24}
                                color="black"
                            />
                        </TouchableOpacity>
                    </View>

                    <Text style={styles.errorText}>
                        {error && error.message}
                    </Text>
                </View>
            )}
        />
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    imageContainer: {
        borderWidth: 1,
        borderColor: "#f0f0f0",
        borderRadius: 100,
        marginBottom: 25,
    },
    image: {
        width: 170,
        height: 170,
        borderRadius: 100,
        borderWidth: 8,
        borderColor: "#fff",
    },
    buttonsContainer: {
        flexDirection: "row",
        gap: 10,
    },
    button: {
        borderRadius: 10,
        paddingVertical: 15,
        backgroundColor: "#f0f0f0",
        width: "50%",
        alignItems: "center",
    },
    errorText: {
        color: "#ab1212",
        fontSize: 14,
        marginTop: 10,
    },
});
