import { useState, useRef, useCallback, useEffect } from "react";
import {
    View,
    Text,
    StyleSheet,
    Image,
    Pressable,
    SafeAreaView,
    ActivityIndicator,
} from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Swiper, type SwiperCardRefType } from "rn-swiper-list";
import { AntDesign } from "@expo/vector-icons";
import { useRouter, Link } from "expo-router";
import { usePossibleMatches } from "@/hooks/usePossibleMatches";
import { PossibleMatch } from "@/types/Match";
import { calculateAge } from "@/helpers/calculateAge";
import { useUser } from "@/hooks/useUser";

export default function HomeView() {
    const ref = useRef<SwiperCardRefType>();
    const router = useRouter();
    const { user } = useUser();
    const { possibleMatches, isLoading, mutate, isValidating } =
        usePossibleMatches(user.id);

    const renderCard = useCallback((data: PossibleMatch) => {
        return (
            <View
                style={styles.renderCardContainer}
                //TODO: ADD A BUTTON INSTEAD TO O TO PROFILE
                // onPress={() => router.push(`/users/${data.id}`)} // Navega al perfil del usuario
            >
                <Image
                    source={{
                        uri: data.profilePicture,
                    }}
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
                        {`${data.firstName} ${data.lastName}, ${calculateAge(
                            data.birthDate
                        )}`}
                    </Text>
                    <Text
                        style={{
                            color: "#fff",
                            fontSize: 16,
                            fontWeight: "bold",
                        }}
                    >
                        {data.country.name}
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

    const handleIndexChange = useCallback(
        async (index: number) => {
            if (index === 0) return;
            if (index % 15 === 0 && !isLoading) {
                // If we are at the end of the list, fetch more matches
                mutate();
            }
        },
        [possibleMatches.length, mutate, isLoading, isValidating]
    );

    return (
        <GestureHandlerRootView style={styles.container}>
            <SafeAreaView style={styles.subContainer}>
                {isValidating ? (
                    <ActivityIndicator size="large" color="#ab74aa" />
                ) : (
                    <Swiper
                        ref={ref}
                        cardStyle={styles.cardStyle}
                        data={possibleMatches}
                        disableBottomSwipe
                        disableTopSwipe
                        renderCard={renderCard}
                        onIndexChange={handleIndexChange}
                        onSwipeRight={(cardIndex) => {
                            console.log("cardIndex", cardIndex);
                        }}
                        onSwipeLeft={(cardIndex) => {
                            console.log("onSwipeLeft", cardIndex);
                        }}
                        OverlayLabelRight={OverlayLabelRight}
                        OverlayLabelLeft={OverlayLabelLeft}
                    />
                )}
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

                {/* <Pressable
                    style={[
                        styles.button,
                        { height: 60, marginHorizontal: 10 },
                    ]}
                    onPress={() => {
                        ref.current?.swipeBack();
                    }}
                >
                    <AntDesign name="reload1" size={24} color="white" />
                </Pressable> */}

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
        height: 60,
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
        height: 60,
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
        height: 60,
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
