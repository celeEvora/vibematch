import { useRouter } from "expo-router";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { FormProvider, useForm } from "react-hook-form";
import CountrySelector from "@/components/CountrySelector";
import RegisterLayoutSimpleView from "./components/RegisterLayoutSimpleView";
import { useRegisterStore } from "@/stores/useRegisterStore";
import { User } from "@/types/User";
import RegisterLayout from "./components/RegisterLayout";

export default function Step3View() {
    const router = useRouter();
    const { data, setData } = useRegisterStore();

    const methods = useForm({
        defaultValues: data,
    });
    const { handleSubmit } = methods;

    function submitForm(formData: Partial<User>) {
        setData(formData);
        router.push("./step4");
    }

    return (
        <RegisterLayout
            title="Personal Details"
            subtitle="Where are you from?"
            step={3}
        >
            <FormProvider {...methods}>
                <View style={styles.inputsContainer}>
                    <CountrySelector name="countryId" />
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
