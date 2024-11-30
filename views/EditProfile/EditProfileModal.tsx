import React, { useRef } from "react";
import { View, Text, Button, StyleSheet, Modal } from "react-native";
import {
    PanGestureHandler,
    GestureHandlerRootView,
    PanGestureHandlerGestureEvent,
} from "react-native-gesture-handler";
import EditProfileForm from "./EditProfileForm";

type EditProfileModalProps = {
    modalVisible: boolean;
    setModalVisible: (visible: boolean) => void;
};

function EditProfileModal({
    modalVisible,
    setModalVisible,
}: EditProfileModalProps) {
    const translateYRef = useRef(0); // Use useRef to track the translation value

    const onGestureEvent = (event: PanGestureHandlerGestureEvent) => {
        const { translationY } = event.nativeEvent;

        if (translationY >= 0) {
            translateYRef.current = translationY; // Update the ref instead of state
        }
    };

    const onGestureEnd = (event: PanGestureHandlerGestureEvent) => {
        const { translationY } = event.nativeEvent;

        if (translationY > 100) {
            // If the sliding is greater than 100 pixels, close the modal
            setModalVisible(false);
        }
        translateYRef.current = 0; // Reset the translation value
    };

    return (
        <GestureHandlerRootView style={styles.screen}>
            <Modal
                visible={modalVisible}
                animationType="slide"
                transparent={true}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalOverlay}>
                    <PanGestureHandler
                        onGestureEvent={onGestureEvent}
                        onHandlerStateChange={onGestureEnd}
                    >
                        <View
                            style={[
                                styles.modalContent,
                                {
                                    transform: [
                                        { translateY: translateYRef.current },
                                    ],
                                },
                            ]}
                        >
                            <View style={styles.header}>
                                <Button
                                    title="Cancel"
                                    onPress={() => setModalVisible(false)}
                                />
                                <Text style={styles.title}>Edit Profile</Text>
                                <Button
                                    title="Save"
                                    onPress={() => setModalVisible(false)}
                                />
                            </View>

                            <EditProfileForm />
                        </View>
                    </PanGestureHandler>
                </View>
            </Modal>
        </GestureHandlerRootView>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    modalOverlay: {
        flex: 1,
        justifyContent: "flex-end", // Move the modal to the bottom
        // backgroundColor: "rgba(0, 0, 0, 0.5)", // Darken the background
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3.84,
        elevation: 5,
    },
    modalContent: {
        backgroundColor: "#fff",
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        paddingVertical: 20,
        paddingHorizontal: 20,
        maxHeight: "90%",
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        borderBottomWidth: 1,
        borderBottomColor: "#ddd",
        paddingBottom: 10,
    },
    title: {
        fontSize: 18,
        fontWeight: "600",
    },
});

export default EditProfileModal;
