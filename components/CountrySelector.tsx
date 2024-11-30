import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    FlatList,
    StyleSheet,
    TouchableOpacity,
    Image,
} from "react-native";
import { Controller, useFormContext } from "react-hook-form";
import { useCountries } from "@/hooks/useCountries";

export default function CountrySelector({ name }: { name: string }) {
    const { control } = useFormContext();
    const [search, setSearch] = useState("");
    const { countries } = useCountries();
    const [filteredCountries, setFilteredCountries] = useState(countries);

    const handleSearch = (text: string) => {
        setSearch(text);
        if (text === "") {
            setFilteredCountries(countries);
        } else {
            setFilteredCountries(
                countries.filter((country) =>
                    country.name.toLowerCase().includes(text.toLowerCase())
                )
            );
        }
    };

    return (
        <Controller
            name={name}
            control={control}
            rules={{ required: "Please select a country" }}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
                <View style={styles.container}>
                    <TextInput
                        style={styles.searchInput}
                        placeholder="Search by name"
                        value={search}
                        onChangeText={handleSearch}
                    />

                    <FlatList
                        data={filteredCountries}
                        keyExtractor={(item) => item.name}
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                style={[
                                    styles.countryItem,
                                    value === item.id && styles.selectedItem,
                                ]}
                                onPress={() => onChange(item.id)}
                            >
                                <Image
                                    source={{ uri: item.flag }}
                                    style={styles.flag}
                                />
                                <Text
                                    style={[
                                        styles.countryName,
                                        value === item.id &&
                                            styles.selectedText,
                                    ]}
                                >
                                    {item.name}
                                </Text>
                            </TouchableOpacity>
                        )}
                    />

                    {error && (
                        <Text style={styles.errorText}>{error.message}</Text>
                    )}
                </View>
            )}
        />
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 15,
    },
    searchInput: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 8,
        padding: 12,
        marginBottom: 15,
        backgroundColor: "#fff",
    },
    countryItem: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#eee",
    },
    selectedItem: {
        backgroundColor: "#d9ccdd",
    },
    flag: {
        marginLeft: 5,
        width: 30,
        height: 20,
        marginRight: 10,
        borderRadius: 3,
    },
    countryName: {
        flex: 1,
        fontSize: 16,
        color: "#333",
    },
    selectedText: {
        fontWeight: "bold",
        color: "#fff",
    },
    errorText: {
        color: "#ab1212",
        fontSize: 14,
        marginTop: 10,
    },
});
