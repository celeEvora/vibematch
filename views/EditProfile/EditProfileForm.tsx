import { useRouter } from "expo-router";
import {
    ScrollView,
    View,
    Image,
    TouchableOpacity,
    StyleSheet,
    TextInput,
    Text,
} from "react-native";
import { FormProvider, useForm } from "react-hook-form";
import { KeyboardAvoidingViewContainerVariant } from "@/components/KeyboardAvoidingViewContainerVariant";
import { useUser } from "@/hooks/useUser";
import TextInputForm from "./components/TextInput";

export default function EditProfileForm() {
    const { user } = useUser();
    const {
        firstName,
        lastName,
        email,
        bio,
        orientation,
        gender,
        birthDate,
        countryId,
        profilePicture,
    } = user;

    const methods = useForm({
        defaultValues: {
            firstName: firstName,
            lastName: lastName,
            email: email,
            bio: bio,
            orientation: orientation,
            gender: gender,
            birthDate: birthDate,
            countryId: countryId,
        },
    });

    const router = useRouter();
    return (
        // <ScrollView>
        <KeyboardAvoidingViewContainerVariant>
            <View style={styles.profilePictureContainer}>
                <Image
                    source={{
                        uri: profilePicture,
                    }}
                    style={styles.profilePicture}
                />
            </View>

            <View style={styles.inputContainer}>
                <FormProvider {...methods}>
                    <TextInputForm
                        name="firstName"
                        label="First Name"
                        rules={{ required: "First Name is required" }}
                    />

                    <TextInputForm
                        name="lastName"
                        label="Last Name"
                        rules={{ required: "Last Name is required" }}
                    />

                    <TextInputForm
                        name="email"
                        label="Email"
                        rules={{ required: "Email is required" }}
                    />

                    <TouchableOpacity
                        onPress={() => router.push("/profile/bio")}
                    >
                        <View style={styles.containerExternalInput}>
                            <Text style={styles.label}>Bio</Text>
                            <Text
                                style={styles.bioPreview}
                                ellipsizeMode="tail"
                                numberOfLines={1}
                            >
                                {methods.getValues("bio") || "Add a bio..."}
                            </Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => router.push("/profile/orientation")}
                    >
                        <View style={styles.containerExternalInput}>
                            <Text style={styles.label}>Orientation</Text>
                            <Text style={styles.bioPreview}>
                                {methods.getValues("orientation") ||
                                    "Add your orientation..."}
                            </Text>
                        </View>
                    </TouchableOpacity>
                </FormProvider>
            </View>
        </KeyboardAvoidingViewContainerVariant>
        // </ScrollView>
    );
}

const styles = StyleSheet.create({
    profilePictureContainer: {
        alignItems: "center",
        marginVertical: 20,
    },
    profilePicture: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 10,
        marginHorizontal: "auto",
    },
    changePictureText: {
        color: "#007bff",
        fontSize: 16,
    },
    inputContainer: {
        marginVertical: 10,
        paddingBottom: 50,
        paddingHorizontal: 23,
    },
    label: {
        fontSize: 16,
        // color: "#888",
        fontWeight: "bold",
    },
    input: {
        backgroundColor: "#fff",
        padding: 10,
        borderWidth: 1,
        borderColor: "#ddd",
        borderRadius: 8,
        marginBottom: 15,
    },
    bioPreview: {
        backgroundColor: "#f9f9f9",
        padding: 15,
        fontWeight: 500,
        borderRadius: 8,
        fontSize: 16,
        width: "70%",
        color: "#333",
        textAlign: "right",
    },
    containerExternalInput: {
        marginVertical: 5,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
});
