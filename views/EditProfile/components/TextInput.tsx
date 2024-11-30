import { View, Text, TextInput, StyleSheet } from "react-native";
import { Controller, useFormContext } from "react-hook-form";

type TextInputProps = {
    name: string;
    label: string;
    placeholder?: string;
    rules?: any;
    multiline?: boolean;
};

export default function TextInputForm({
    name,
    label,
    placeholder,
    rules,
    multiline,
}: TextInputProps) {
    const {
        control,
        formState: { errors },
    } = useFormContext();

    return (
        <View style={styles.container}>
            <Text style={styles.label}>{label}</Text>

            <Controller
                control={control}
                render={({
                    field: { onChange, onBlur, value },
                    fieldState,
                }) => (
                    <TextInput
                        style={styles.input}
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                        placeholder={placeholder}
                        multiline={multiline}
                    />
                )}
                name={name}
                rules={rules}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginVertical: 5,
        // paddingHorizontal: 10,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    label: {
        fontSize: 16,
        // color: "#888",
        fontWeight: "bold",
    },
    input: {
        backgroundColor: "#f9f9f9",
        padding: 15,
        width: "70%",
        textAlign: "right",
        fontSize: 16,
        borderRadius: 10,
        fontWeight: 500,
    },
});
