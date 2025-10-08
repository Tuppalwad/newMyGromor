import { useEffect, useState } from "react";
import React, { forwardRef, useImperativeHandle } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    FlatList,
    StyleSheet,
    TouchableWithoutFeedback,
    Image
} from "react-native";
import { palette } from "../../theme/color";
import { width } from "../../config/resposiveSize";
import { UserManager } from "../../storage";
import DownArrow from '../../assets/images/common/downArrow.png'

const CategorizedDropdown = forwardRef((props, ref) => {

    const { cropData, setSelectedCrop, setSpringServices, selectedCrop, disabled } = props;

    useImperativeHandle(ref, () => ({
        clearDropdown: () => {
            setSelectedCrop(null); // or '' based on your state
            setCurrentValue('');
        }
    }));


    useEffect(() => {
        if (selectedCrop?.value) {
            setCurrentValue(selectedCrop.value);
        } else {
            setCurrentValue('');
        }
    }, [selectedCrop]);

    const appLanguage = UserManager?.getAppMultiLanguage;
    const groupedData = cropData.reduce((acc, item) => {
        const category = acc.find((c) => c.label === item.cropType);
        if (category) {
            category.items.push({ label: item.name, value: item.name, cropType: item.cropType });
        } else {
            acc.push({
                label: item.cropType,
                items: [{ label: item.name, value: item.name, cropType: item.cropType }]
            });
        }
        return acc;
    }, []);

    const dropdownData = groupedData.flatMap((category) => [
        { label: `--- ${category.label.toLowerCase().includes('short') ? appLanguage?.lblShortCrop : appLanguage?.lblTallCrop} ---`, value: `category-${category.label}`, isCategory: true },
        ...category.items
    ]);

    const [isOpen, setIsOpen] = useState(false);
    const [currentValue, setCurrentValue] = useState(selectedCrop?.value ?? "");

    const handleSelect = (item) => {
        if (!item.isCategory) {
            setCurrentValue(item.value);
            setSelectedCrop(item);
            setSpringServices((prev) => ({
                ...prev,
                crop: item.value,
            }));
            setIsOpen(false);
        }
    };

    return (
        <TouchableWithoutFeedback onPress={() => setIsOpen(false)}>
            <View style={{
                ...styles.container,
                backgroundColor: disabled ? '#E9E9E9' : 'transparent',
                borderRadius: 8
            }}>
                {/* Dropdown Button */}
                <TouchableOpacity style={styles.dropdown} onPress={() => setIsOpen(!isOpen)}
                    disabled={disabled}
                >
                    <Text style={{
                        color: currentValue ? "#333333" : "#82888f",
                        fontSize: 14
                    }}>
                        {currentValue ? currentValue : "Select crop"}
                    </Text>
                    <Image
                        source={DownArrow}
                        style={{ width: 10, height: 10, resizeMode: 'contain' }}
                    />
                </TouchableOpacity>

                {/* Dropdown List (Properly Scrollable) */}
                {isOpen && (
                    <View style={{
                        ...styles.dropdownContainer,

                    }}>
                        <FlatList
                            data={dropdownData}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={({ item }) => (
                                <TouchableOpacity
                                    style={[styles.item, item.isCategory && styles.categoryItem]}
                                    onPress={() => handleSelect(item)}
                                    disabled={item.isCategory}
                                >
                                    <Text style={[styles.itemText, item.isCategory && styles.categoryText]}>
                                        {item.label}
                                    </Text>
                                </TouchableOpacity>
                            )}
                            style={{ maxHeight: 300 }} // Limit height to avoid expanding infinitely
                            nestedScrollEnabled={true} // Allows independent scrolling
                            keyboardShouldPersistTaps="handled"
                        />

                    </View>
                )}
            </View>
        </TouchableWithoutFeedback>
    );
})

const styles = StyleSheet.create({
    container: {
        position: "relative",
        zIndex: 1000,

    },
    dropdown: {
        width: "100%",
        height: 40,
        borderRadius: 8,
        paddingHorizontal: 10,
        justifyContent: "space-between",
        alignItems: 'center',
        backgroundColor: "transparent",
        borderWidth: 1,
        borderColor: "#D1D5DB",
        flexDirection: 'row'

    },

    dropdownContainer: {
        width: "100%",
        height: 300,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: "#ccc",
        // backgroundColor: "transparent",

        top: 5,
        zIndex: 1000,
        shadowColor: "#000",
        shadowOpacity: 0.2,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
        overflow: "hidden",
    },
    item: {
        padding: 12,
        borderBottomWidth: 1,
        borderBottomColor: "#ddd",
    },
    itemText: {
        fontSize: 14,
        color: "#000",
    },
    categoryItem: {
        backgroundColor: "#ddd",
    },
    categoryText: {
        fontWeight: "bold",
        color: "#555",
    },
});

export default CategorizedDropdown;
