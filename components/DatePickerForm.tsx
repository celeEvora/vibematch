import { useState } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    TouchableWithoutFeedback,
} from "react-native";
import { Controller, useFormContext } from "react-hook-form";
import DateTimePicker from "@react-native-community/datetimepicker";

type DatePickerFormProps = {
    name: string;
    label: string;
};

export default function DatePickerForm({ name, label }: DatePickerFormProps) {
    const {
        control,
        formState: { errors },
    } = useFormContext();
    const [showPicker, setShowPicker] = useState(false);

    const handleDismissPicker = () => {
        if (showPicker) setShowPicker(false);
    };

    return (
        <TouchableWithoutFeedback onPress={handleDismissPicker}>
            <View>
                <View style={styles.container}>
                    <Text style={styles.label}>{label}</Text>
                    <Controller
                        name={name}
                        control={control}
                        rules={{ required: "Birthdate is required" }}
                        render={({
                            field: { onChange, value },
                            fieldState: { error },
                        }) => (
                            <>
                                <TouchableOpacity
                                    style={[
                                        error
                                            ? {
                                                  borderColor: "#ab1212",
                                                  borderWidth: 1,
                                              }
                                            : {},
                                    ]}
                                    onPress={() => setShowPicker(true)}
                                >
                                    <Text style={styles.text}>
                                        {value
                                            ? new Date(
                                                  value
                                              ).toLocaleDateString()
                                            : "Tap to select date"}
                                    </Text>
                                </TouchableOpacity>

                                {showPicker && (
                                    <DateTimePicker
                                        mode="date"
                                        style={{
                                            paddingRight: 70,
                                        }}
                                        value={value || new Date()}
                                        display={"spinner"}
                                        onChange={(event, selectedDate) => {
                                            if (selectedDate) {
                                                onChange(selectedDate);
                                            }
                                        }}
                                    />
                                )}
                            </>
                        )}
                    />
                </View>
                <Text style={{ color: "#ab1212", fontSize: 12 }}>
                    {errors[name]?.message
                        ? errors[name].message.toString()
                        : ""}
                </Text>
            </View>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    text: { fontSize: 16, color: "#555" },
    submitButton: {
        backgroundColor: "#007BFF",
        padding: 15,
        borderRadius: 5,
        alignItems: "center",
    },
    container: {
        backgroundColor: "#f6f7f9",
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
});
