import { LinearGradient } from "expo-linear-gradient";
import {
    View,
    Image,
    Text,
    StyleSheet,
    SafeAreaView,
    Platform,
    StatusBar,
} from "react-native";

type TopCircleGradientProps = {
    height?: number;
};

export function TopCircleGradient({ height }: TopCircleGradientProps) {
    return (
        <View
            style={{
                height: height || 250,
                marginBottom: 30,
                justifyContent: "center",
                alignItems: "center",
                shadowColor: "#000",
                shadowOffset: {
                    width: 0,
                    height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
                elevation: 5,
                borderBottomLeftRadius: 200,
                borderBottomRightRadius: 200,
            }}
        >
            <LinearGradient
                colors={["#8e58e5", "#e28e6e"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={{
                    position: "absolute",
                    left: 0,
                    // backgroundColor: "red",
                    // transform: [{ rotate: "360deg" }],
                    transform: [{ scaleX: 2 }],
                    width: "100%",
                    height: "100%",
                    borderBottomLeftRadius: 200,
                    borderBottomRightRadius: 200,
                }}
            />
            <SafeAreaView
                style={{
                    justifyContent: "center",
                    alignItems: "center",
                    paddingTop:
                        Platform.OS === "android" ? StatusBar.currentHeight : 0,
                }}
            >
                <Image
                    source={require("../assets/img/logos/6-Photoroom.png")}
                    style={styles.logo}
                    resizeMode="contain"
                />
                <Text
                    style={{
                        color: "#fff",
                        fontSize: 20,
                        marginTop: 10,
                        fontWeight: 700,
                    }}
                >
                    VibeMatch
                </Text>
            </SafeAreaView>
        </View>
    );
}

const styles = StyleSheet.create({
    logo: {
        marginTop: 10,
        width: 130,
        height: 130,
    },
});
