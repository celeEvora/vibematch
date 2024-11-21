import { Link } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { FormProvider, useForm } from "react-hook-form";
import TextInputForm from "@/components/TextInputForm";
import { GradientButton } from "@/components/GradientButton";
import { AuthLayout } from "@/components/AuthLayout";

export default function RegisterView() {
    const methods = useForm();
    const { handleSubmit } = methods;

    function submitForm(data: any) {
        console.log(data);
    }

    return (
        <AuthLayout>
            <View style={styles.container}>
                <View style={styles.formContainer}>
                    <FormProvider {...methods}>
                        <View
                            style={{
                                flexDirection: "row",
                                gap: 10,
                                width: "100%",
                            }}
                        >
                            <View style={{ flex: 1 }}>
                                <TextInputForm
                                    label="First Name"
                                    name={"firstName"}
                                    placeholder={"John"}
                                    rules={{
                                        required: "This field is required",
                                    }}
                                />
                            </View>

                            <View style={{ flex: 1 }}>
                                <TextInputForm
                                    label="Last Name"
                                    name={"lastName"}
                                    placeholder={"Doe"}
                                    rules={{
                                        required: "This field is required",
                                    }}
                                />
                            </View>
                        </View>

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

                        <TextInputForm
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

                        <TextInputForm
                            label="Confirm Password"
                            name={"confirmPassword"}
                            placeholder={"********"}
                            rules={{
                                required: "This field is required",
                                validate: (value: string) =>
                                    value === methods.getValues().password ||
                                    "Passwords do not match",
                            }}
                        />
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity
                                onPress={() => handleSubmit(submitForm)()}
                            >
                                <GradientButton text="Register" rounded />
                            </TouchableOpacity>
                        </View>
                    </FormProvider>
                </View>

                <Link href="/login">
                    <Text style={styles.registerText}>
                        Already have an account?{" "}
                        <Text
                            style={{
                                color: "#e69069",
                                fontWeight: 700,
                                textDecorationLine: "underline",
                            }}
                        >
                            Login
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
        // justifyContent: "center",
        marginTop: 10,
        width: "100%",
    },
    formContainer: {
        width: "100%",
        paddingHorizontal: 28,
        gap: 10,
        marginBottom: 30,
    },
    buttonContainer: {
        alignSelf: "center",
        marginTop: 20,
        width: 180,
    },
    logo: {
        width: 140,
        height: 140,
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
        marginBottom: 40,
    },
    registerText: {
        marginTop: 20,
        color: "#9f9f9f",
        fontSize: 15,
    },
});
