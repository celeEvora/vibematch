import {
    View,
    Text,
    FlatList,
    StyleSheet,
    TouchableOpacity,
} from "react-native";
import { Controller, useFormContext } from "react-hook-form";

const genders = [
    { name: "Straight", value: "heterosexual" },
    { name: "Gay/Lesbian", value: "homosexual" },
    { name: "Bisexual", value: "bisexual" },
];

export default function SexualOrientationSelector({ name }: { name: string }) {
    const { control } = useFormContext();

    return (
        <Controller
            name={name}
            control={control}
            rules={{ required: "Please select your orientation" }}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
                <View style={styles.container}>
                    <FlatList
                        data={genders}
                        keyExtractor={(item) => item.value}
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                style={[
                                    styles.genderItem,
                                    value === item.value && styles.selectedItem,
                                ]}
                                onPress={() => onChange(item.value)}
                            >
                                <Text
                                    style={[
                                        styles.genderName,
                                        value === item.value &&
                                            styles.selectedText,
                                    ]}
                                >
                                    {item.name}
                                </Text>
                            </TouchableOpacity>
                        )}
                    />

                    {error && (
                        <Text style={styles.errorText}>{error.message}</Text>
                    )}
                </View>
            )}
        />
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    genderItem: {
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 2,
        borderRadius: 5,
        height: 65,
        borderColor: "#eee",
        marginBottom: 20,
    },
    selectedItem: {
        backgroundColor: "#d9ccdd",
    },
    genderName: {
        fontSize: 16,
        color: "#333",
        textAlign: "center",
    },
    selectedText: {
        fontWeight: "bold",
        color: "#fff",
    },
    errorText: {
        color: "#ab1212",
        fontSize: 14,
        marginTop: 10,
    },
});
