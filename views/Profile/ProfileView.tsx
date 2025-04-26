import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    ScrollView,
    SafeAreaView,
    Alert,
    ActivityIndicator,
    TouchableWithoutFeedback,
} from "react-native";
import Octicons from "@expo/vector-icons/Octicons";
import { useCallback, useRef, useEffect, useState } from "react";
import { useUser } from "@/hooks/useUser";
import { calculateAge } from "@/helpers/calculateAge";
import { capilizeWord } from "@/helpers/capitalizeWord";
import { useRouter } from "expo-router";
import {
    GestureHandlerRootView,
    Pressable,
} from "react-native-gesture-handler";
import {
    BottomSheetModal,
    BottomSheetView,
    BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";
import { checkPermissions, tookPhoto, pickImage } from "@/utils/photoUtils";
import { useUpdateProfilePicture } from "@/hooks/useUpdateProfilePicture";
import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";

function BigProfileImage({
    profilePictureUrl,
    setShowProfilePicture,
}: {
    profilePictureUrl: string;
    setShowProfilePicture: (value: boolean) => void;
}) {
    async function handleShareImage(imageUri: string) {
        try {
            if (!imageUri) {
                Alert.alert("Error", "No image available for sharing.");
                return;
            }

            // Download the image to a temporary file
            const fileName = imageUri.split("/").pop();
            const localUri =
                FileSystem.documentDirectory &&
                FileSystem.documentDirectory + fileName;

            await FileSystem.downloadAsync(imageUri, localUri as string);

            if (await Sharing.isAvailableAsync()) {
                await Sharing.shareAsync(localUri as string);
            } else {
                Alert.alert(
                    "Error",
                    "Sharing is not available on this device."
                );
            }
        } catch (error) {
            console.error("Error sharing the image:", error);
            Alert.alert("Error", "Failed to share the image.");
        }
    }

    return (
        <TouchableWithoutFeedback onPress={() => setShowProfilePicture(false)}>
            <View style={styles.fullScreenContainer}>
                <Image
                    source={{ uri: profilePictureUrl }}
                    style={styles.fullScreenImage}
                    resizeMode="contain"
                />
                <TouchableOpacity
                    style={styles.closeButton}
                    onPress={() => setShowProfilePicture(false)}
                >
                    <Text style={styles.closeButtonText}>X</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={{
                        position: "absolute",
                        top: "80%",
                        justifyContent: "center",
                        backgroundColor: "rgba(255, 255, 255, 0.7)",
                        borderRadius: 25,
                        padding: 10,
                    }}
                    onPress={() => handleShareImage(profilePictureUrl)}
                >
                    <Text>Download image</Text>
                </TouchableOpacity>
            </View>
        </TouchableWithoutFeedback>
    );
}

export default function ProfileView() {
    const { user } = useUser();
    const {
        id,
        firstName,
        lastName,
        email,
        bio,
        profilePicture,
        orientation,
        gender,
        birthDate,
    } = user;

    const [image, setImage] = useState<string | null>(null);
    const { processUpdateProfilePicture, isLoading } =
        useUpdateProfilePicture();
    const [showProfilePicture, setShowProfilePicture] = useState(false);

    const router = useRouter();

    const bottomSheetModalRef = useRef<BottomSheetModal>(null);

    // callbacks
    const handlePresentModalPress = useCallback(() => {
        bottomSheetModalRef.current?.present();
    }, []);

    async function handleImageUpload(uri: string) {
        try {
            setImage(uri);
            await processUpdateProfilePicture(id, {
                profilePicture: uri,
            });
            bottomSheetModalRef.current?.dismiss();
            Alert.alert("Success", "Profile picture updated successfully.");
        } catch (error) {
            console.error("Error updating profile picture:", error);
            Alert.alert("Error", "Failed to update profile picture.");
        }
    }

    const handlePickImage = async () => {
        await pickImage((uri: string) => {
            if (uri) handleImageUpload(uri);
        });
    };

    const handleTakePhoto = async () => {
        await tookPhoto((uri: string) => {
            if (uri) handleImageUpload(uri);
        });
    };

    return (
        <GestureHandlerRootView style={styles.modalContainer}>
            {showProfilePicture && (
                <BigProfileImage
                    profilePictureUrl={profilePicture}
                    setShowProfilePicture={setShowProfilePicture}
                />
            )}
            <BottomSheetModalProvider>
                <ScrollView style={styles.container}>
                    <View style={styles.circle}>
                        <View style={styles.circleBg}></View>
                        <SafeAreaView
                            style={{
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                        >
                            <Pressable
                                onPress={() => setShowProfilePicture(true)}
                            >
                                <View
                                    style={{
                                        position: "relative",
                                    }}
                                >
                                    <Image
                                        source={{
                                            uri: profilePicture,
                                        }}
                                        style={styles.avatar}
                                        resizeMode="contain"
                                    />
                                    {isLoading && (
                                        <View
                                            style={{
                                                position: "absolute",
                                                top: 0,
                                                left: 0,
                                                backgroundColor:
                                                    "rgba(0, 0, 0, 0.5)",
                                                justifyContent: "center",
                                                alignItems: "center",
                                                width: 135,
                                                height: 135,
                                                aspectRatio: 1,
                                                borderRadius: 100,
                                            }}
                                        >
                                            <ActivityIndicator
                                                size="large"
                                                color="#fff"
                                            />
                                        </View>
                                    )}
                                </View>
                            </Pressable>

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
                                {capilizeWord(gender)} -{" "}
                                {capilizeWord(orientation)}
                            </Text>

                            <View style={styles.buttonsHeaderContainer}>
                                <View style={styles.buttonTextIconContainer}>
                                    <TouchableOpacity
                                        onPress={() =>
                                            router.push("/profile/settings")
                                        }
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
                                        onPress={handlePresentModalPress}
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
                                        onPress={() =>
                                            router.push("/profile/edit-profile")
                                        }
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
                            onPress={() => router.replace("/")}
                        >
                            <Text style={styles.matchText}>Start Matching</Text>
                        </TouchableOpacity>
                    </View>

                    <BottomSheetModal
                        ref={bottomSheetModalRef}
                        keyboardBehavior="interactive"
                        snapPoints={["14%"]}
                        index={1}
                        style={{
                            shadowColor: "#000",
                            shadowOffset: { width: 0, height: 1 },
                            shadowOpacity: 0.15,
                            shadowRadius: 4,
                            elevation: 5,
                        }}
                    >
                        <BottomSheetView style={styles.contentContainer}>
                            <View
                                style={{
                                    borderBottomWidth: 1,
                                    borderColor: "#ececec",
                                    width: "100%",
                                    paddingBottom: 10,
                                    marginBottom: 10,
                                }}
                            >
                                <TouchableOpacity onPress={handlePickImage}>
                                    <Text
                                        style={{
                                            color: "#d07ea6",
                                            fontSize: 18,
                                            fontWeight: "bold",
                                            textAlign: "center",
                                        }}
                                    >
                                        Choose From Existing Photo
                                    </Text>
                                </TouchableOpacity>
                            </View>

                            <View>
                                <TouchableOpacity onPress={handleTakePhoto}>
                                    <Text
                                        style={{
                                            color: "#d07ea6",
                                            fontSize: 18,
                                            fontWeight: "bold",
                                            textAlign: "center",
                                        }}
                                    >
                                        Upload Photo
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </BottomSheetView>
                    </BottomSheetModal>
                </ScrollView>
            </BottomSheetModalProvider>
        </GestureHandlerRootView>
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
    modalContainer: {
        flex: 1,
        // padding: 24,
        justifyContent: "center",
        // backgroundColor: "grey",
    },
    contentContainer: {
        // flex: 1,
        alignItems: "center",
        // backgroundColor: "#fff",
        // backgroundColor: "red",
    },
    fullScreenContainer: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.9)",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 100,
    },
    fullScreenImage: {
        width: "100%",
        height: "100%",
    },
    closeButton: {
        position: "absolute",
        top: 40,
        right: 20,
        backgroundColor: "rgba(255, 255, 255, 0.7)",
        borderRadius: 25,
        padding: 10,
    },
    closeButtonText: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#000",
    },
});
