import { useEffect } from "react";
import { TouchableOpacity, Image, View, StyleSheet, Text } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Controller, useFormContext } from "react-hook-form";
import { checkPermissions, tookPhoto, pickImage } from "@/utils/photoUtils";

export default function ProfilePictureSelector({ name }: { name: string }) {
    const { control } = useFormContext();

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
