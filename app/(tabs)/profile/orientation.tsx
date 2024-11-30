import { useRouter } from "expo-router";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { FormProvider, useForm, Controller } from "react-hook-form";
import { useUser } from "@/hooks/useUser";
import SexualOrientationSelector from "@/components/SexualOrientationSelector";

export default function EditOrientation() {
    const { user } = useUser();
    const router = useRouter();
    const methods = useForm({
        defaultValues: {
            orientation: user.orientation,
        },
    });

    return (
        <FormProvider {...methods}>
            <View style={styles.container}>
                <Text style={styles.label}>
                    You can change your sexual orientation here 🔥
                </Text>

                <SexualOrientationSelector name="orientation" />
            </View>
            <View
                style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    gap: 30,
                }}
            >
                <Button title="Cancel" onPress={() => router.back()} />
                <Button title="Save" onPress={() => router.back()} />
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
