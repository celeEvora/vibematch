import * as ImagePicker from "expo-image-picker";

export async function checkPermissions() {
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

export async function tookPhoto(onChange: (uri: string) => void) {
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
}

export async function pickImage(onChange: (uri: string) => void) {
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
}
