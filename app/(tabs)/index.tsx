import React, { useState, useRef, useCallback } from "react";
import {
    View,
    Text,
    StyleSheet,
    Image,
    Pressable,
    SafeAreaView,
    type ImageSourcePropType,
} from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Swiper, type SwiperCardRefType } from "rn-swiper-list";
import { AntDesign } from "@expo/vector-icons";

type DataType = {
    id: number;
    name: string;
    age: number;
    location: string;
    image: ImageSourcePropType;
};

const DATA = [
    {
        id: 1,
        name: "Samantha Melendez",
        age: 27,
        location: "New York, NY",
        image: require("../../assets/img/avatars/avatar1.jpeg"),
    },
    {
        id: 2,
        name: "Alex Smith",
        age: 25,
        location: "Los Angeles, CA",
        image: require("../../assets/img/avatars/avatar2.jpeg"),
    },
    {
        id: 3,
        name: "John Doe",
        age: 30,
        location: "Chicago, IL",
        image: require("../../assets/img/avatars/avatar5.jpeg"),
    },
    {
        id: 4,
        name: "Mia Johnson",
        age: 22,
        location: "Houston, TX",
        image: require("../../assets/img/avatars/avatar3.jpeg"),
    },
    {
        id: 5,
        name: "Sophia Williams",
        age: 29,
        location: "Philadelphia, PA",
        image: require("../../assets/img/avatars/avatar4.jpg"),
    },
];

export default function Home() {
    const ref = useRef<SwiperCardRefType>();

    const renderCard = useCallback((data: DataType) => {
        return (
            <View style={styles.renderCardContainer}>
                <Image
                    source={data.image}
                    style={styles.renderCardImage}
                    resizeMode="cover"
                />
                <View
                    style={{
                        position: "absolute",
                        bottom: 20,
                        left: 20,
                    }}
                >
                    <Text
                        style={{
                            color: "#fff",
                            fontSize: 24,
                            fontWeight: "bold",
                        }}
                    >
                        {data.name}, {data.age}
                    </Text>
                    <Text
                        style={{
                            color: "#fff",
                            fontSize: 16,
                            fontWeight: "bold",
                        }}
                    >
                        {data.location}
                    </Text>
                </View>
            </View>
        );
    }, []);

    const OverlayLabelRight = useCallback(() => {
        return (
            <View
                style={[
                    styles.overlayLabelContainer,
                    {
                        backgroundColor: "#e28e6e",
                        display: "flex",
                        justifyContent: "center",
                    },
                ]}
            >
                <Text
                    style={{
                        color: "#fff",
                        fontSize: 50,
                        fontWeight: "bold",
                        textAlign: "center",
                        borderWidth: 5,
                        borderRadius: 10,
                        borderColor: "#fff",
                        alignSelf: "center",
                        padding: 10,
                    }}
                >
                    Like!
                </Text>
            </View>
        );
    }, []);

    const OverlayLabelLeft = useCallback(() => {
        return (
            <View
                style={[
                    styles.overlayLabelContainer,
                    {
                        backgroundColor: "#ab74aa",
                        display: "flex",
                        justifyContent: "center",
                    },
                ]}
            >
                <Text
                    style={{
                        color: "#fff",
                        fontSize: 50,
                        fontWeight: "bold",
                        textAlign: "center",
                        borderWidth: 5,
                        borderRadius: 10,
                        borderColor: "#fff",
                        alignSelf: "center",
                        padding: 10,
                    }}
                >
                    Nope
                </Text>
            </View>
        );
    }, []);

    return (
        <GestureHandlerRootView style={styles.container}>
            <SafeAreaView style={styles.subContainer}>
                <Swiper
                    ref={ref}
                    cardStyle={styles.cardStyle}
                    data={DATA}
                    disableBottomSwipe
                    disableTopSwipe
                    renderCard={renderCard}
                    onIndexChange={(index) => {
                        console.log("Current Active index", index);
                    }}
                    onSwipeRight={(cardIndex) => {
                        console.log("cardIndex", cardIndex);
                    }}
                    onSwipedAll={() => {
                        console.log("onSwipedAll");
                    }}
                    onSwipeLeft={(cardIndex) => {
                        console.log("onSwipeLeft", cardIndex);
                    }}
                    OverlayLabelRight={OverlayLabelRight}
                    OverlayLabelLeft={OverlayLabelLeft}
                    onSwipeActive={() => {
                        console.log("onSwipeActive");
                    }}
                    onSwipeStart={() => {
                        console.log("onSwipeStart");
                    }}
                    onSwipeEnd={() => {
                        console.log("onSwipeEnd");
                    }}
                />
            </SafeAreaView>

            <View style={styles.buttonsContainer}>
                <Pressable
                    style={styles.buttonLeft}
                    onPress={() => {
                        ref.current?.swipeLeft();
                    }}
                >
                    <AntDesign name="close" size={25} color="white" />
                </Pressable>

                <Pressable
                    style={[
                        styles.button,
                        { height: 60, marginHorizontal: 10 },
                    ]}
                    onPress={() => {
                        ref.current?.swipeBack();
                    }}
                >
                    <AntDesign name="reload1" size={24} color="white" />
                </Pressable>

                <Pressable
                    style={styles.buttonRight}
                    onPress={() => {
                        ref.current?.swipeRight();
                    }}
                >
                    <AntDesign name="heart" size={20} color="white" />
                </Pressable>
            </View>
        </GestureHandlerRootView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    buttonsContainer: {
        flexDirection: "row",
        // bottom: 34,
        bottom: 50,
        alignItems: "center",
        justifyContent: "center",
    },
    buttonLeft: {
        height: 40,
        borderRadius: 40,
        marginHorizontal: 20,
        aspectRatio: 1,
        backgroundColor: "#ab74aa",
        elevation: 4,
        justifyContent: "center",
        alignItems: "center",
        shadowColor: "black",
        shadowOpacity: 0.1,
        shadowOffset: {
            width: 0,
            height: 4,
        },
    },
    buttonRight: {
        height: 40,
        borderRadius: 40,
        marginHorizontal: 20,
        aspectRatio: 1,
        backgroundColor: "#e28e6e",
        elevation: 4,
        justifyContent: "center",
        alignItems: "center",
        shadowColor: "black",
        shadowOpacity: 0.1,
        shadowOffset: {
            width: 0,
            height: 4,
        },
    },
    button: {
        height: 40,
        borderRadius: 40,
        marginHorizontal: 20,
        aspectRatio: 1,
        backgroundColor: "#3A3D45",
        elevation: 4,
        justifyContent: "center",
        alignItems: "center",
        shadowColor: "black",
        shadowOpacity: 0.1,
        shadowOffset: {
            width: 0,
            height: 4,
        },
    },
    buttonText: {
        fontSize: 20,
        fontWeight: "bold",
    },
    cardStyle: {
        width: "85%",
        height: "75%",
        borderRadius: 15,
        marginVertical: 20,
    },
    renderCardContainer: {
        flex: 1,
        borderRadius: 15,
        height: "75%",
        width: "100%",
        position: "relative",
    },
    renderCardImage: {
        height: "100%",
        width: "100%",
        borderRadius: 15,
    },
    subContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    overlayLabelContainer: {
        width: "100%",
        height: "100%",
        borderRadius: 15,
    },
});
