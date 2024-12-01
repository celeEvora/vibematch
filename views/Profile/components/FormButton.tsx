import { TouchableOpacity, Text, TouchableOpacityProps } from "react-native";

type FormButtonProps = {
    text: string;
    onPress: () => void;
    backgroundColor?: string;
    disabled?: boolean;
} & TouchableOpacityProps;

export default function FormButton({
    text,
    onPress,
    backgroundColor,
    disabled,
    ...rest
}: FormButtonProps) {
    return (
        <TouchableOpacity
            style={{
                backgroundColor: backgroundColor || "#d07ea6",
                padding: 13,
                borderRadius: 5,
                width: 80,
                opacity: disabled ? 0.5 : 1,
            }}
            {...rest}
            disabled={disabled}
            onPress={onPress}
        >
            <Text
                style={{
                    color: "#fff",
                    textAlign: "center",
                    fontWeight: "bold",
                    fontSize: 16,
                }}
            >
                {text}
            </Text>
        </TouchableOpacity>
    );
}
