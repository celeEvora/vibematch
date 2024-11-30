import { useRouter } from "expo-router";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { FormProvider, useForm, Controller } from "react-hook-form";
import { useUser } from "@/hooks/useUser";
import GenderSelector from "@/components/GenderSelector";

export default function EditGender() {
    const { user } = useUser();
    const router = useRouter();
    const methods = useForm({
        defaultValues: {
            gender: user.gender,
        },
    });

    return (
        <FormProvider {...methods}>
            <View style={styles.container}>
                <Text style={styles.label}>
                    You can change your gender here ⚤
                </Text>

                <GenderSelector name="gender" />

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
