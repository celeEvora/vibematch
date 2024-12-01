import { View, StyleSheet, TextInput } from "react-native";
import Feather from "@expo/vector-icons/Feather";

type SearchBarUserProps = {
    setSearch: (search: string) => void;
};

export default function SearchBarUser({ setSearch }: SearchBarUserProps) {
    return (
        <View style={[styles.searchBarContainer]}>
            <TextInput
                style={styles.input}
                placeholder="Search"
                placeholderTextColor={"#bdbdbd"}
                onChangeText={setSearch}
            />
            <Feather
                name="search"
                size={20}
                color="#bdbdbd"
                style={{
                    position: "absolute",
                    left: 35,
                }}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    searchBarContainer: {
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.05,
        shadowRadius: 3.84,
        elevation: 5,
        gap: 10,
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 5,
        paddingHorizontal: 15,
    },
    input: {
        width: "100%",
        backgroundColor: "#fff",
        borderRadius: 10,
        marginVertical: 10,
        paddingHorizontal: 20,
        paddingVertical: 14,
        fontSize: 16,
        paddingLeft: 50,
    },
});
