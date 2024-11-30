import { View, TextInput, Text, StyleSheet } from "react-native";
import { Controller, useFormContext } from "react-hook-form";

type TextInputFormProps = {
    name: string;
    label: string;
    placeholder?: string;
    rules?: any;
};

export default function TextAreaForm({
    name,
    label,
    placeholder,
    rules,
}: TextInputFormProps) {
    const {
        control,
        formState: { errors },
    } = useFormContext();

    return (
        <View>
            <View>
                <Text
                    style={{
                        fontSize: 16,
                        color: "#c3c3c3",
                        marginBottom: 20,
                        fontWeight: "500",
                        lineHeight: 25,
                    }}
                >
                    {label}
                </Text>

                <Controller
                    control={control}
                    rules={rules}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput
                            style={[
                                {
                                    backgroundColor: "#f6f7f9",
                                    padding: 15,
                                    borderRadius: 10,
                                    textAlignVertical: "top",
                                    height: 130,
                                },
                                errors[name]
                                    ? { borderWidth: 1, borderColor: "#ab1212" }
                                    : {},
                            ]}
                            placeholder={placeholder}
                            placeholderTextColor="gray"
                            multiline
                            onChangeText={onChange}
                            onBlur={onBlur}
                            value={value}
                        />
                    )}
                    name={name}
                    defaultValue={""}
                />
            </View>

            <Text style={{ color: "#ab1212", fontSize: 12, marginTop: 5 }}>
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
