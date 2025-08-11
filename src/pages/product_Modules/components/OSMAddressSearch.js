import React, { useState, useEffect } from 'react';
import {
    View,
    TextInput,
    FlatList,
    TouchableOpacity,
    Text,
    Image,
    Keyboard,
    StyleSheet
} from 'react-native';

import SearchIcon from '../../../assets/images/common/searchIcon.png';
import ClearIcon from '../../../assets/images/common/close.png';

const OSMAddressSearch = ({ onSelectAddress, setResults, results }) => {
    const [query, setQuery] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (query.length < 3) {
            setResults([]); // Clear when query is short
            return;
        }

        const delayDebounce = setTimeout(() => {
            console.log("🔍 Fetching for:", query); // Debug log
            fetchGoogleAddresses(query);
        }, 500);

        return () => clearTimeout(delayDebounce);
    }, [query]);


    const fetchGoogleAddresses = async (searchText) => {
        setLoading(true);
        try {
            const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(
                searchText
            )}&key=AIzaSyCq0fPRd6ZESlaPMP_JjVoy6MziX8ndvB8&components=country:in`;

            const response = await fetch(url);
            const data = await response.json();

            if (data.status === 'OK') {
                setResults(data.predictions);
            } else {
                console.warn("❗Google Places API error:", data.status, data.error_message || '');
                setResults([]); // Ensure results get cleared if something goes wrong
            }
        } catch (error) {
            console.error("❌ Google Places fetch failed:", error.message || error);
            setResults([]);
        } finally {
            setLoading(false);
        }
    };


    const handleSelect = async (item) => {
        try {
            const response = await fetch(
                `https://maps.googleapis.com/maps/api/place/details/json?place_id=${item.place_id}&key=AIzaSyCq0fPRd6ZESlaPMP_JjVoy6MziX8ndvB8`
            );
            const data = await response.json();
            const result = data.result;

            const address = {
                fullAddress: result.formatted_address,
                city: getComponent(result.address_components, 'locality'),
                state: getComponent(result.address_components, 'administrative_area_level_1'),
                pincode: getComponent(result.address_components, 'postal_code'),
                lat: result.geometry.location.lat,
                lon: result.geometry.location.lng,
            };

            onSelectAddress(address);
            setQuery(result.formatted_address);
            setResults([]);
            Keyboard.dismiss();
        } catch (error) {
            console.error('Place details error:', error);
        }
    };

    const getComponent = (components, type) => {
        const component = components.find(c => c.types.includes(type));
        return component ? component.long_name : '';
    };

    const handleClear = () => {
        setQuery('');
        setResults([]);
    };

    return (
        <View style={styles.container}>
            {/* Input wrapper */}
            <View style={styles.inputContainer}>
                {/* Search Icon (Left) */}
                <Image
                    source={SearchIcon}
                    style={styles.searchIcon}
                    resizeMode="contain"
                />
                {/* Input */}
                <TextInput
                    placeholder="Enter Location or Area"
                    value={query}
                    onChangeText={setQuery}
                    style={styles.input}
                    placeholderTextColor="#999"
                />

                {/* Clear Icon (Right) */}
                {query.length > 0 && (
                    <TouchableOpacity onPress={handleClear}>
                        <Image
                            source={ClearIcon}
                            style={styles.clearIcon}
                            resizeMode="contain"
                        />
                    </TouchableOpacity>
                )}
            </View>

            {/* Results Dropdown */}
            {loading && <Text style={styles.loadingText}>Loading...</Text>}
            {results.length > 0 && (
                <View style={styles.resultsContainer}>
                    <FlatList
                        data={results}
                        keyExtractor={(item) => item.place_id}
                        keyboardShouldPersistTaps="always"
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                onPress={() => handleSelect(item)}
                                style={styles.resultItem}
                            >
                                <Text style={styles.resultText} numberOfLines={1} ellipsizeMode="tail">
                                    {item.description}
                                </Text>
                            </TouchableOpacity>
                        )}
                        style={styles.resultsList}
                        contentContainerStyle={styles.resultsContentContainer}
                    />
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingVertical: 10,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#D9D9D9',
        borderRadius: 6,
        paddingHorizontal: 10,
        marginBottom: 8,
    },
    searchIcon: {
        width: 16,
        height: 16,
        marginRight: 8,
    },
    input: {
        flex: 1,
        paddingVertical: 15,
        color: '#000',
    },
    clearIcon: {
        width: 14,
        height: 14,
        tintColor: '#999',
        marginLeft: 8,
    },
    loadingText: {
        padding: 10,
        color: '#666',
        textAlign: 'center',
    },
    resultsContainer: {
        borderWidth: 0.5,
        borderColor: '#D9D9D9',
        borderRadius: 6,
        backgroundColor: '#fff',
        maxHeight: 200,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        overflow: 'hidden',
    },

    resultsList: {
        flexGrow: 1,
    },
    resultsContentContainer: {
        paddingBottom: 10,
    },

    resultItem: {
        paddingVertical: 12,
        paddingHorizontal: 15,
        borderBottomWidth: 1,
        borderColor: '#eee',
    },
    resultText: {
        fontSize: 14,
        color: '#333',
    },

});

export default OSMAddressSearch;