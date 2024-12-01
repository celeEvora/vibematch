import { useRouter } from "expo-router";
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    Keyboard,
    ActivityIndicator,
} from "react-native";
import { FormProvider, useForm, Controller } from "react-hook-form";
import { useUser } from "@/hooks/useUser";
import { useUpdateUser } from "@/hooks/useUpdateUser";
import { User } from "@/types/User";
import { KeyboardAvoidingViewContainer } from "@/components/KeyboardAvoidingViewContainer";
import FormButton from "@/views/Profile/components/FormButton";

export default function EditBioScreen() {
    const { user } = useUser();
    const router = useRouter();
    const methods = useForm({
        defaultValues: {
            bio: user.bio,
        },
    });
    const {
        handleSubmit,
        formState: { isDirty },
    } = methods;
    const { processUpdateUser, isLoading } = useUpdateUser();

    async function handleSave(formData: Pick<User, "bio">) {
        await processUpdateUser(parseInt(user.id), formData);
        router.back();
    }

    return (
        <KeyboardAvoidingViewContainer>
            <FormProvider {...methods}>
                <View style={styles.container}>
                    <Text style={styles.label}>Edit Bio</Text>
                    <Controller
                        control={methods.control}
                        render={({ field: { onChange, value } }) => (
                            <>
                                <TextInput
                                    style={styles.input}
                                    multiline
                                    onChangeText={onChange}
                                    value={value}
                                    editable={!isLoading}
                                    returnKeyType="done"
                                    onSubmitEditing={Keyboard.dismiss}
                                />
                                {isLoading && (
                                    <View
                                        style={{
                                            position: "absolute",
                                            left: 0,
                                            right: 0,
                                            justifyContent: "center",
                                            zIndex: 100,
                                            height: 360,
                                        }}
                                    >
                                        <ActivityIndicator
                                            size="large"
                                            color="#3e1732"
                                        />
                                    </View>
                                )}
                            </>
                        )}
                        name="bio"
                    />
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
        </KeyboardAvoidingViewContainer>
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
