import { useRouter } from "expo-router";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { FormProvider, useForm } from "react-hook-form";
import { useRegisterStore } from "@/stores/useRegisterStore";
import { User } from "@/types/User";
import TextInputForm from "@/components/TextInputForm";
import RegisterLayout from "./components/RegisterLayout";
import SecureInputForm from "@/components/SecureInputForm";

export default function Step1View() {
    const router = useRouter();
    const { data, setData } = useRegisterStore();

    const methods = useForm({
        defaultValues: data,
    });
    const { handleSubmit } = methods;

    function submitForm(formData: Partial<User>) {
        setData(formData);
        router.push("/step2");
    }

    return (
        <RegisterLayout
            title="Create an account"
            subtitle="Let's get to know you better"
            step={1}
            KeyboardAvoidingView
        >
            <FormProvider {...methods}>
                <View style={styles.inputsContainer}>
                    <TextInputForm
                        label="First Name"
                        name={"firstName"}
                        placeholder={"John"}
                        rules={{
                            required: "This field is required",
                        }}
                    />
                    <TextInputForm
                        label="Last Name"
                        name={"lastName"}
                        placeholder={"Doe"}
                        rules={{
                            required: "This field is required",
                        }}
                    />
                    <TextInputForm
                        label="Email"
                        name={"email"}
                        placeholder={"example@example.com"}
                        rules={{
                            required: "This field is required",
                            pattern: {
                                value: /\S+@\S+\.\S+/,
                                message: "Invalid email",
                            },
                        }}
                    />

                    <SecureInputForm
                        label="Password"
                        name={"password"}
                        placeholder={"********"}
                        rules={{
                            required: "This field is required",
                            minLength: {
                                value: 6,
                                message:
                                    "Password must have at least 6 characters",
                            },
                        }}
                    />
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
        // flex: 1,
        paddingHorizontal: 20,
        paddingVertical: 30,
        marginHorizontal: 20,
        backgroundColor: "#fff",
        borderRadius: 20,
    },
    inputsContainer: {
        flex: 1,
        gap: 15,
        height: 330,
    },
    buttonContainer: {
        alignSelf: "center",
        // marginTop: 20,
        // width: 180,
        paddingVertical: 10,
        paddingHorizontal: 25,
        // backgroundColor: "#e28e6e",
        borderWidth: 2,
        borderColor: "#d07ea6",
        borderRadius: 50,
        marginTop: 15,
    },
    buttonText: {
        // color: "#fff",
        color: "#d07ea6",
        fontWeight: "bold",
        fontSize: 18,
    },
});
