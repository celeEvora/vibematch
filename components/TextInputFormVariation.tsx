import React, { useRef } from "react";
import { View, TextInput, Text, StyleSheet } from "react-native";
import { Controller, useFormContext } from "react-hook-form";

type TextInputFormProps = {
    name: string;
    label: string;
    placeholder?: string;
    rules?: any;
};

export default function TextInputFormVariation({
    name,
    label,
    placeholder,
    rules,
}: TextInputFormProps) {
    const inputRef = useRef<TextInput>(null);
    const {
        control,
        formState: { errors },
    } = useFormContext();

    function focusInput() {
        inputRef.current?.focus();
    }

    return (
        <View>
            <View
                style={[
                    styles.container,
                    errors[name]
                        ? { borderWidth: 1, borderColor: "#ab1212" }
                        : {},
                ]}
                onTouchStart={focusInput}
            >
                <Text style={styles.label}>{label}</Text>

                <Controller
                    control={control}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput
                            ref={inputRef}
                            style={styles.input}
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                            placeholder={placeholder}
                        />
                    )}
                    name={name}
                    rules={rules}
                    defaultValue={""}
                />
            </View>

            <Text style={{ color: "#ab1212", fontSize: 12 }}>
                {errors[name]?.message ? errors[name].message.toString() : ""}
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#f6f7f9",
        // backgroundColor: "#faf7fc",
        borderRadius: 10,
        paddingVertical: 12,
        paddingHorizontal: 20,
        width: "100%",
    },
    label: {
        fontSize: 12,
        color: "#898989",
        fontWeight: 400,
        marginBottom: 3,
    },
    input: {
        fontSize: 15,
        color: "#333",
    },
});
