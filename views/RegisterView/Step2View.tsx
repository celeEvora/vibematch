import { useRouter } from "expo-router";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { FormProvider, useForm } from "react-hook-form";
import RegisterLayout from "./components/RegisterLayout";
import { useRegisterStore } from "@/stores/useRegisterStore";
import DateOfBirthPicker from "@/components/DateOfBirthPicker";
import TextAreaForm from "@/components/TextAreaForm";

type FormData = {
    birthDate: {
        day: string;
        month: string;
        year: string;
    };
};

function formatBirthDate(birthDate: {
    day: string;
    month: string;
    year: string;
}): string {
    return `${birthDate.year}-${birthDate.month.padStart(
        2,
        "0"
    )}-${birthDate.day.padStart(2, "0")}`;
}

export default function Step2View() {
    const router = useRouter();
    const { data, setData } = useRegisterStore();

    const methods = useForm({
        defaultValues: {
            birthDate: {
                day: data.birthDate?.split("-")[2] || "",
                month: data.birthDate?.split("-")[1] || "",
                year: data.birthDate?.split("-")[0] || "",
            },
            bio: data.bio || "",
        },
    });
    const { handleSubmit } = methods;

    function submitForm(formData: FormData) {
        const birthDate = formatBirthDate(formData.birthDate);
        const configuredData = {
            ...formData,
            birthDate,
        };

        setData(configuredData);

        router.push("/step3");
    }

    return (
        <RegisterLayout
            title="Personal Details"
            subtitle="What's your date of birth?"
            step={2}
            KeyboardAvoidingView
        >
            <FormProvider {...methods}>
                <View style={styles.inputsContainer}>
                    <DateOfBirthPicker />

                    <TextAreaForm
                        name="bio"
                        label="Tell us more about you"
                        placeholder="Write something about you"
                        rules={{
                            required: "This field is required",
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
        flex: 1,
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
