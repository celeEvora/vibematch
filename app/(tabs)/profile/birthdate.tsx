import { useRouter } from "expo-router";
import { View, Text, StyleSheet } from "react-native";
import { FormProvider, useForm } from "react-hook-form";
import { useUser } from "@/hooks/useUser";
import DateOfBirthPicker from "@/components/DateOfBirthPicker";
import { useUpdateUser } from "@/hooks/useUpdateUser";
import { User } from "@/types/User";
import FormButton from "@/views/Profile/components/FormButton";

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

    const {
        handleSubmit,
        formState: { isDirty },
    } = methods;
    const { processUpdateUser, isLoading } = useUpdateUser();

    async function handleSave(formData: FormData) {
        const birthDate = formatBirthDate(formData.birthDate);
        await processUpdateUser(parseInt(user.id), {
            birthDate: birthDate.toString(),
        } as Partial<User>);

        router.back();
    }

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
                    }}
                >
                    <FormButton
                        text="Cancel"
                        onPress={() => router.back()}
                        backgroundColor="#cdcdcd"
                    />

                    <FormButton
                        text="Save"
                        onPress={handleSubmit(handleSave)}
                        disabled={isLoading || !isDirty}
                    />
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
        marginBottom: 50,
    },
});
