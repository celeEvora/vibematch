import { useRouter } from "expo-router";
import {
    Text,
    View,
    StyleSheet,
    TouchableOpacity,
    ActivityIndicator,
} from "react-native";
import { FormProvider, useForm } from "react-hook-form";
import ProfilePictureSelector from "@/components/ProfilePictureSelector";
import { useRegisterStore, RegisterFormType } from "@/stores/useRegisterStore";
import { useRegister } from "@/hooks/useRegister";
import RegisterLayout from "./components/RegisterLayout";

export default function Step6View() {
    const router = useRouter();
    const { data, setData } = useRegisterStore();
    const { processRegister, isLoading } = useRegister();

    const methods = useForm({
        defaultValues: data,
    });
    const { handleSubmit } = methods;

    async function submitForm(formData: Partial<RegisterFormType>) {
        setData(formData);
        // router.push("/success");

        const { data: currentData } = useRegisterStore.getState();
        await processRegister(currentData as RegisterFormType);
    }

    return (
        <RegisterLayout
            title="Update Your Look"
            subtitle="Upload a profile picture"
            step={6}
        >
            {isLoading && (
                <View
                    style={{
                        flex: 1,
                        justifyContent: "center",
                        alignItems: "center",
                        position: "absolute",
                        left: 0,
                        right: 0,
                        zIndex: 100,
                        height: "100%",
                    }}
                >
                    <ActivityIndicator size="large" color="#3e1732" />
                </View>
            )}
            <FormProvider {...methods}>
                <View style={styles.inputsContainer}>
                    <ProfilePictureSelector name={"profilePicture"} />
                </View>

                <TouchableOpacity
                    style={styles.buttonContainer}
                    onPress={() => handleSubmit(submitForm)()}
                >
                    <Text style={styles.buttonText}>NEXT</Text>
                </TouchableOpacity>
            </FormProvider>
        </RegisterLayout>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    formContainer: {
        paddingHorizontal: 20,
        paddingVertical: 30,
        marginHorizontal: 20,
        backgroundColor: "#fff",
        borderRadius: 20,
    },
    inputsContainer: {
        height: 330,
    },
    buttonContainer: {
        alignSelf: "center",
        paddingVertical: 10,
        paddingHorizontal: 25,
        borderWidth: 2,
        borderColor: "#d07ea6",
        borderRadius: 50,
        marginTop: 15,
    },
    buttonText: {
        color: "#d07ea6",
        fontWeight: "bold",
        fontSize: 18,
    },
});
