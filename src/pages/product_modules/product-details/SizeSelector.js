import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';

const SizeSelector = ({ sizesData, setSelectedSizeId, selectedSizeId }) => {


    const handleSelectSize = (item) => {
        setSelectedSizeId(item);
    };

    useEffect(() => {
        setSelectedSizeId(sizesData[0])
    }, [sizesData])

    return (
        <View style={styles.sizesContainer}>
            <View style={styles.divider} />
            <View style={{ paddingHorizontal: 10 }}>
                <Text style={styles.sizesTitle}>Sizes</Text>

                <FlatList
                    data={sizesData}
                    horizontal
                    keyExtractor={(item) => item.id.toString()}
                    contentContainerStyle={{ gap: 10 }}
                    renderItem={({ item }) => {
                        const isSelected = item?.id === selectedSizeId?.id;
                        return (
                            <TouchableOpacity
                                style={[styles.sizeBox, isSelected && styles.selectedSizeBox]}
                                onPress={() => handleSelectSize(item)}
                            >
                                <Text style={[styles.sizeText, isSelected && styles.selectedText]}>
                                    {item.size}
                                </Text>
                                <Text style={[styles.unitText, isSelected && styles.selectedText]}>
                                    {item.itemNumber.includes('Bag') ? 'Bag' : 'Pack'}
                                </Text>
                            </TouchableOpacity>
                        );
                    }}
                />
            </View>
        </View>
    );
};


export default SizeSelector;

const styles = StyleSheet.create({
    sizesContainer: {
        // padding: 16,
        backgroundColor: '#fff',
    },
    sizesTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    divider: {
        height: 0.5,
        backgroundColor: '#ccc',
        marginBottom: 12,
    },
    sizeBox: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        paddingVertical: 12,
        paddingHorizontal: 20,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 10
    },
    selectedSizeBox: {
        borderColor: 'green',
        backgroundColor: '#f0fff0',
    },
    sizeText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
    },
    unitText: {
        fontSize: 12,
        color: '#888',
    },
    selectedText: {
        color: 'green',
    },
});
