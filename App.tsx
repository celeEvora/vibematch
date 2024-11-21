import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    Platform,
    StatusBar,
} from "react-native";
import Start from "./views/Start";

export default function App() {
    return (
        <View style={{ flex: 1, backgroundColor: "#fff" }}>
            <StatusBar translucent={true} backgroundColor={"transparent"} />

            {/* <Register /> */}
            {/* <Login /> */}
            <Start />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: "#f5f5f5",
        alignItems: "center",
        justifyContent: "center",
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    },
});
