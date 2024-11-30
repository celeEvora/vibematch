import { View, Text, TextInput, StyleSheet } from "react-native";
import { useFormContext, Controller } from "react-hook-form";

type Fields = {
    month: string;
    day: string;
    year: string;
};

export default function DateOfBirthPicker() {
    const {
        control,
        setFocus,
        formState: { errors },
    } = useFormContext<{ birthDate: Fields }>();

    return (
        <View style={styles.container}>
            <View style={styles.fieldsContainer}>
                <View>
                    <Text style={styles.text}>Month</Text>
                    <Controller
                        name={`birthDate.month`}
                        control={control}
                        rules={{
                            required: "Month is required",
                            min: { value: 1, message: "Invalid month" },
                            max: { value: 12, message: "Invalid month" },
                        }}
                        render={({
                            field: { onChange, onBlur, value, ref },
                        }) => (
                            <TextInput
                                style={[
                                    styles.input,
                                    errors.birthDate?.month &&
                                        styles.errorInput,
                                ]}
                                ref={ref}
                                placeholder="MM"
                                keyboardType="number-pad"
                                maxLength={2}
                                placeholderTextColor={"#7c7c7c"}
                                returnKeyType="next"
                                onBlur={onBlur}
                                onChangeText={(text) => {
                                    onChange(text);
                                    if (text.length === 2) {
                                        setFocus(`birthDate.day`);
                                    }
                                }}
                                value={value}
                            />
                        )}
                    />
                </View>

                <View>
                    <Text style={styles.text}>Day</Text>
                    <Controller
                        name={`birthDate.day`}
                        control={control}
                        rules={{
                            required: "Day is required",
                            min: { value: 1, message: "Invalid day" },
                            max: { value: 31, message: "Invalid day" },
                        }}
                        render={({
                            field: { onChange, onBlur, value, ref },
                        }) => (
                            <TextInput
                                style={[
                                    styles.input,
                                    errors.birthDate?.day && styles.errorInput,
                                ]}
                                ref={ref}
                                placeholder="DD"
                                keyboardType="number-pad"
                                maxLength={2}
                                placeholderTextColor={"#7c7c7c"}
                                returnKeyType="next"
                                onBlur={onBlur}
                                onChangeText={(text) => {
                                    onChange(text);
                                    if (text.length === 2) {
                                        setFocus(`birthDate.year`);
                                    }
                                }}
                                value={value}
                            />
                        )}
                    />
                </View>

                <View>
                    <Text style={styles.text}>Year</Text>
                    <Controller
                        name={`birthDate.year`}
                        control={control}
                        rules={{
                            required: "Year is required",
                            minLength: {
                                value: 4,
                                message: "Year must be 4 digits",
                            },
                            maxLength: {
                                value: 4,
                                message: "Year must be 4 digits",
                            },
                        }}
                        render={({
                            field: { onChange, onBlur, value, ref },
                        }) => (
                            <TextInput
                                ref={ref}
                                style={[
                                    styles.input,
                                    errors.birthDate?.year && styles.errorInput,
                                ]}
                                placeholder="YYYY"
                                keyboardType="number-pad"
                                maxLength={4}
                                placeholderTextColor={"#7c7c7c"}
                                returnKeyType="done"
                                onBlur={onBlur}
                                onChangeText={onChange}
                                value={value}
                            />
                        )}
                    />
                </View>
            </View>

            <Text style={styles.errorText}>
                {errors.birthDate &&
                    (errors.birthDate?.month?.message ||
                        errors.birthDate?.day?.message ||
                        errors.birthDate?.year?.message)}
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        // flex: 1,
    },
    fieldsContainer: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: 25,
        marginBottom: 20,
    },
    input: {
        backgroundColor: "#f6f7f9",
        borderRadius: 8,
        padding: 10,
        width: 70,
        height: 50,
        textAlign: "center",
    },
    text: {
        marginBottom: 8,
        fontSize: 14,
        fontWeight: "bold",
        color: "#4d4d4d",
    },
    errorText: {
        fontSize: 12,
        color: "#ab1212",
        marginTop: 4,
        textAlign: "center",
    },
    errorInput: {
        borderColor: "#ab1212",
        borderWidth: 1,
    },
});
