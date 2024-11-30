import { SafeAreaView, Text, View, StyleSheet } from "react-native";

type RegisterLayoutProps = {
    children: React.ReactNode;
    title: string;
    subtitle: string;
    step: number;
};

export default function RegisterLayoutSimpleView({
    children,
    title,
    subtitle,
    step,
}: RegisterLayoutProps) {
    return (
        <SafeAreaView style={styles.container}>
            <View
                style={{
                    flex: 1,
                    justifyContent: "center",
                }}
            >
                <View style={styles.containerProgressBar}>
                    {[1, 2, 3, 4, 5, 6].map((circleStep) => (
                        <View
                            key={circleStep}
                            style={[
                                styles.circleProgressBar,
                                step === circleStep &&
                                    styles.activeCircleProgressBar,
                            ]}
                        >
                            <Text
                                style={[
                                    styles.textProgressBar,
                                    step === circleStep &&
                                        styles.activeTextProgressBar,
                                ]}
                            >
                                {circleStep}
                            </Text>
                        </View>
                    ))}
                </View>

                <View style={styles.formContainer}>
                    <View>
                        <Text style={styles.title}>{title}</Text>
                        <Text style={styles.subtitle}>{subtitle}</Text>
                    </View>

                    {children}
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: "#e28e6e",
        // justifyContent: "center",
        // alignItems: "center",
    },
    formContainer: {
        // flex: 1,
        paddingHorizontal: 20,
        paddingVertical: 30,
        marginHorizontal: 20,
        backgroundColor: "#fff",
        borderRadius: 20,
    },
    inputsContainer: {
        flex: 1,
        gap: 10,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 10,
        color: "#a885b2",
    },
    subtitle: {
        fontSize: 16,
        color: "#c3c3c3",
        marginBottom: 30,
        fontWeight: "500",
        lineHeight: 25,
    },
    containerProgressBar: {
        flexDirection: "row",
        justifyContent: "center",
        marginBottom: 30,
    },
    circleProgressBar: {
        width: 35,
        height: 35,
        borderRadius: 30,
        // backgroundColor: "#e28e6e",
        borderWidth: 2,
        borderColor: "#a885b2",
        justifyContent: "center",
        alignItems: "center",
        marginHorizontal: 10,
    },
    textProgressBar: {
        // color: "#fff",
        color: "#a885b2",
        fontWeight: "bold",
    },
    buttonContainer: {
        alignSelf: "center",
        // marginTop: 20,
        // width: 180,
        paddingVertical: 10,
        paddingHorizontal: 25,
        // backgroundColor: "#e28e6e",
        borderWidth: 2,
        borderColor: "#e28e6e",
        borderRadius: 50,
        marginTop: 15,
    },
    buttonText: {
        // color: "#fff",
        color: "#e28e6e",
        fontWeight: "bold",
        fontSize: 18,
    },
    activeCircleProgressBar: {
        backgroundColor: "#a885b2",
        // borderColor: "#fff",
    },
    activeTextProgressBar: {
        color: "#fff",
    },
});
