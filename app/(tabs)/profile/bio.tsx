import { useRouter } from "expo-router";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { FormProvider, useForm, Controller } from "react-hook-form";
import { useUser } from "@/hooks/useUser";

export default function EditBioScreen() {
    const { user } = useUser();
    const router = useRouter();
    const methods = useForm({
        defaultValues: {
            bio: user.bio,
        },
    });

    return (
        <FormProvider {...methods}>
            <View style={styles.container}>
                <Text style={styles.label}>Edit Bio</Text>
                <Controller
                    control={methods.control}
                    render={({ field: { onChange, value } }) => (
                        <TextInput
                            style={styles.input}
                            multiline
                            onChangeText={onChange}
                            value={value}
                            placeholder="Write something about yourself..."
                        />
                    )}
                    name="bio"
                    // rules={{ required: "Bio is required" }}
                />
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
        fontWeight: "bold",
        marginBottom: 10,
    },
    input: {
        backgroundColor: "#f9f9f9",
        padding: 15,
        borderRadius: 10,
        fontSize: 16,
        textAlignVertical: "top",
        height: 300,
        borderWidth: 1,
        borderColor: "#ddd",
        marginBottom: 20,
    },
});
