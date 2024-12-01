import { useRouter } from "expo-router";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import { FormProvider, useForm } from "react-hook-form";
import { useUser } from "@/hooks/useUser";
import CountrySelector from "@/components/CountrySelector";
import FormButton from "@/views/Profile/components/FormButton";
import { useUpdateUser } from "@/hooks/useUpdateUser";
import { User } from "@/types/User";

export default function EditCountry() {
    const { user } = useUser();
    const router = useRouter();
    const methods = useForm({
        defaultValues: {
            countryId: user.countryId,
        },
    });

    const {
        handleSubmit,
        formState: { isDirty },
    } = methods;
    const { processUpdateUser, isLoading } = useUpdateUser();

    async function handleSave(formData: Pick<User, "countryId">) {
        await processUpdateUser(parseInt(user.id), formData);
        router.back();
    }

    return (
        <FormProvider {...methods}>
            <View style={styles.container}>
                <Text style={styles.label}>
                    You can edit your country here 🌎
                </Text>

                <View
                    style={{
                        flexDirection: "row",
                        justifyContent: "center",
                        marginBottom: 50,
                        height: 460,
                    }}
                >
                    <CountrySelector name="countryId" />

                    {isLoading && (
                        <View
                            style={{
                                position: "absolute",
                                left: 0,
                                right: 0,
                                justifyContent: "center",
                                zIndex: 100,
                                height: "100%",
                            }}
                        >
                            <ActivityIndicator size="large" color="#3e1732" />
                        </View>
                    )}
                </View>

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
                        backgroundColor="#d07ea6"
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
