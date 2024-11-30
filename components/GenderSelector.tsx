import {
    View,
    Text,
    FlatList,
    StyleSheet,
    TouchableOpacity,
} from "react-native";
import { Controller, useFormContext } from "react-hook-form";
import Foundation from "@expo/vector-icons/Foundation";

const genders = [
    { name: "Male", value: "male" },
    { name: "Female", value: "female" },
];

export default function GenderSelector({ name }: { name: string }) {
    const { control } = useFormContext();

    return (
        <Controller
            name={name}
            control={control}
            rules={{ required: "Please select your gender" }}
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
                                <Foundation
                                    name={
                                        `${item.value}-symbol` as keyof typeof Foundation.glyphMap
                                    }
                                    size={35}
                                    color={
                                        value === item.value ? "#fff" : "#333"
                                    }
                                />
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
        height: 120,
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
