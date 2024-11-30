import { useRouter } from "expo-router";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { FormProvider, useForm, Controller } from "react-hook-form";
import { useUser } from "@/hooks/useUser";
import DateOfBirthPicker from "@/components/DateOfBirthPicker";

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

export default function EditBirthDate() {
    const { user } = useUser();
    const formattedBirthDate = user.birthDate?.split("T")[0];

    const router = useRouter();
    const methods = useForm({
        defaultValues: {
            birthDate: {
                day: formattedBirthDate?.split("-")[2] || "",
                month: formattedBirthDate?.split("-")[1] || "",
                year: formattedBirthDate?.split("-")[0] || "",
            },
        },
    });

    return (
        <FormProvider {...methods}>
            <View style={styles.container}>
                <Text style={styles.label}>
                    You can change your date of birth here 📅
                </Text>

                <DateOfBirthPicker />

                <View
                    style={{
                        flexDirection: "row",
                        justifyContent: "center",
                        gap: 30,
                        height: "45%", // TEMPORARY SOLUTION XDXD
                    }}
                >
                    <Button title="Cancel" onPress={() => router.back()} />
                    <Button title="Save" onPress={() => router.back()} />
                </View>
            </View>
        </FormProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: "#fff",
    },
    label: {
        fontSize: 16,
        // fontWeight: "bold",
        marginBottom: 50,
    },
});
