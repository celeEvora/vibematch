import { Link } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import TextInputForm from "@/components/TextInputForm";
import { FormProvider, useForm } from "react-hook-form";
import { GradientButton } from "@/components/GradientButton";
import { AuthLayout } from "@/components/AuthLayout";
import { useLogin } from "@/hooks/useLogin";

export default function LoginView() {
    const { processLogin } = useLogin();

    const methods = useForm();
    const { handleSubmit } = methods;

    async function submitForm(data: any) {
        await processLogin(data);
    }

    return (
        <AuthLayout>
            <View style={styles.container}>
                <View style={styles.formContainer}>
                    <FormProvider {...methods}>
                        <TextInputForm
                            label="Email"
                            name={"email"}
                            placeholder={"example@example.com"}
                            rules={{
                                required: "Email is required",
                                pattern: {
                                    value: /\S+@\S+\.\S+/,
                                    message: "Invalid email",
                                },
                            }}
                        />

                        <TextInputForm
                            label="Password"
                            name={"password"}
                            placeholder={"********"}
                            rules={{
                                required: "Password is required",
                                minLength: {
                                    value: 6,
                                    message:
                                        "Password must have at least 6 characters",
                                },
                            }}
                        />

                        <View style={styles.buttonContainer}>
                            <TouchableOpacity
                                onPress={() => handleSubmit(submitForm)()}
                            >
                                <GradientButton text="Login" rounded />
                            </TouchableOpacity>
                        </View>
                    </FormProvider>
                </View>

                <Link href="/register">
                    <Text style={styles.registerText}>
                        Don't have an account?{" "}
                        <Text
                            style={{
                                color: "#e69069",
                                fontWeight: 700,
                                textDecorationLine: "underline",
                            }}
                        >
                            Sign up
                        </Text>
                    </Text>
                </Link>
            </View>
        </AuthLayout>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        paddingTop: 50,
        width: "100%",
    },
    formContainer: {
        // width: "87%",
        // padding: 10,
        width: "100%",
        paddingHorizontal: 28,
        gap: 18,
        marginBottom: 30,
    },
    buttonContainer: {
        alignSelf: "center",
        marginTop: 20,
        width: 180,
    },
    logo: {
        width: 175,
        height: 175,
    },
    title: {
        fontSize: 24,
        fontWeight: 400,
        marginTop: 10,
        // color: "#c17b98",
        marginBottom: 10,
        textAlign: "center",
    },
    subtitle: {
        fontSize: 16,
        color: "#9f9f9f",
        marginBottom: 55,
    },
    registerText: {
        marginTop: 20,
        color: "#9f9f9f",
        fontSize: 15,
    },
});
