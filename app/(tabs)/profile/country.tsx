import { useRouter } from "expo-router";
import { View, Text, Button, StyleSheet } from "react-native";
import { FormProvider, useForm } from "react-hook-form";
import { useUser } from "@/hooks/useUser";
import CountrySelector from "@/components/CountrySelector";

export default function EditCountry() {
    const { user } = useUser();
    const router = useRouter();
    const methods = useForm({
        defaultValues: {
            countryId: user.countryId,
        },
    });

    return (
        <FormProvider {...methods}>
            <View style={styles.container}>
                <Text style={styles.label}>
                    You can edit your country here 🌎
                </Text>

                <CountrySelector name="countryId" />

                <View
                    style={{
                        flexDirection: "row",
                        justifyContent: "center",
                        gap: 30,
                        height: "10%", // TEMPORARY SOLUTION XDXD
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
