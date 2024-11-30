import {
    StyleSheet,
    KeyboardAvoidingView,
    TouchableWithoutFeedback,
    Keyboard,
    Platform,
    ScrollView,
} from "react-native";
import { useHeaderHeight } from "@react-navigation/elements";

export function KeyboardAvoidingViewContainerVariant({ children }: any) {
    const headerHeight = useHeaderHeight();

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.container}
            keyboardVerticalOffset={headerHeight}
        >
            {/* <TouchableWithoutFeedback onPress={Keyboard.dismiss}> */}
            <ScrollView
                keyboardShouldPersistTaps="handled" // This is used to handle taps outside of the keyboard
                contentContainerStyle={{ flexGrow: 1 }} // This is used to make the ScrollView take up the full height of the screen
                showsVerticalScrollIndicator={false} // This is used to hide the vertical scroll indicator
                keyboardDismissMode={
                    Platform.OS === "ios" ? "interactive" : "on-drag"
                } // This prop is used to dismiss the keyboard when the user drags the screen
                // These props are used to disable the bounce effect on the horizontal, vertical axis in IOS
                alwaysBounceHorizontal={false}
                alwaysBounceVertical={false}
                bounces={false}
            >
                {children}
            </ScrollView>
            {/* </TouchableWithoutFeedback> */}
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
    },
});
