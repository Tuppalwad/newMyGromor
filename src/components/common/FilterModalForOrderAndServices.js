import React, { useState } from 'react';
import {
    Modal,
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    StyleSheet,
    Dimensions,
    Image
} from 'react-native';
import close from '../../assets/images/common/close.png'
import checkIcon from '../../assets/images/common/checkIcon.png'
import CustomButton from './CustomButton';
const { height } = Dimensions.get('window');

const statusOptions = [
    "All",
    "In-progress",
    "Payment Failed",
    "Payment Received",
    "Delivery In-progress",
    "Pickup Ready",
    "Delivered",
    "Cancel In-progress",
];

const FilterModalForOrderAndServices = ({ visible, setVisible, onApply }) => {
    const [selectedOptions, setSelectedOptions] = useState(["In-progress"]);

    const toggleOption = (option) => {
        // if (selectedOptions.includes(option)) {
        //     setSelectedOptions(selectedOptions.filter(item => item !== option));
        // } else {
        //     setSelectedOptions([...selectedOptions, option]);
        // }

        let updatedOptions;
        if (selectedOptions.includes(option)) {
            updatedOptions = selectedOptions.filter(item => item !== option);
        } else {
            updatedOptions = [...selectedOptions, option];
        }
        setSelectedOptions(updatedOptions);

        // NEW: instantly update parent list when any option changes
        if (onApply) {
            onApply(updatedOptions);
        }
    };

    const clearAll = () => setSelectedOptions([]);

    // const applyFilters = () => {
    //     console.log('Selected Filters:', selectedOptions);
    //     setVisible(false);
    // };
    const handleApply = () => {
        if (onApply) {
            onApply(selectedOptions); // send selected filters to parent
        }
        setVisible(false);
    };
    return (
        <Modal visible={visible} animationType="slide" transparent>
            <View style={styles.modalOverlay}>
                <View style={styles.bottomSheet}>

                    {/* Title + Clear All */}
                    <View style={styles.headerRow}>
                        <View>

                            <Text style={styles.headerText}>Filters</Text>
                            <TouchableOpacity onPress={clearAll}>
                                <Text style={styles.clearText}>Clear All</Text>
                            </TouchableOpacity>
                        </View>

                    </View>
                    <View style={{ position: 'absolute', top: 4, right: 10, padding: 20 }}>
                        <TouchableOpacity onPress={() => setVisible(false)}>
                            <Image source={close} style={{ tintColor: '#000', width: 10, height: 10, resizeMode: "contain", }} />
                        </TouchableOpacity>
                    </View>

                    {/* Horizontal layout: Left tabs + Right options */}
                    <View style={styles.filterBody}>
                        {/* Left - Category Title */}
                        <View style={styles.leftPane}>
                            <Text style={styles.categoryTab}>Status</Text>
                        </View>

                        <View style={{ width: 1, height: 'auto', backgroundColor: "#DBF2EA" }}></View>

                        {/* Right - Options */}
                        <ScrollView style={styles.rightPane}>

                            {statusOptions.map((option, index) => (
                                <TouchableOpacity
                                    key={index}
                                    style={{ ...styles.option, }}
                                    onPress={() => toggleOption(option)}
                                >
                                    <View style={[styles.customCheckbox, selectedOptions.includes(option) && styles.customCheckboxChecked]}>
                                        {selectedOptions.includes(option) && (
                                            <Image
                                                source={checkIcon} // replace path if different
                                                style={{ width: 15, height: 15, tintColor: '#fff' }}
                                                resizeMode='contain'
                                            />
                                        )}
                                    </View>
                                    <Text style={styles.optionText}>{option}</Text>
                                </TouchableOpacity>
                            ))}
                        </ScrollView>
                    </View>
                    <View style={{ marginBottom: 10 }}>
                        {/* <CustomButton
                            title={"Apply"}
                            show={false}
                        /> */}
                        <CustomButton
                            title={"Apply"}
                            show={false}
                            onPress={handleApply}
                        />
                    </View>
                </View>
            </View>
        </Modal>
    );
};

export default FilterModalForOrderAndServices;

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        // height: 300,
        justifyContent: 'flex-end',
        backgroundColor: '#00000088',
    },
    bottomSheet: {
        backgroundColor: '#fff',
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
        paddingHorizontal: 16,
        paddingTop: 12,
        // paddingBottom: 20,
        maxHeight: height * 0.8,
    },
    headerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10,
    },
    headerText: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 6,
    },
    clearText: {
        color: '#28a745',
        fontSize: 14,
    },
    filterBody: {
        flexDirection: 'row',
        // flex: 1,
        height: 300
    },
    leftPane: {
        width: 100,
        // paddingVertical: 10,
        // paddingHorizontal: 8,
        borderRadius: 6,
        // marginRight: 8,
    },
    categoryTab: {
        padding: 13,
        backgroundColor: '#DAFDE7',
        fontWeight: 'bold',
        fontSize: 14,
        color: '#000',
    },
    rightPane: {
        flex: 1,
        marginLeft: 10,
    },
    option: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 8,
    },

    customCheckbox: {
        width: 24,
        height: 24,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: '#ccc',
        marginRight: 12,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    customCheckboxChecked: {
        backgroundColor: '#28a745',
        borderColor: '#28a745',
    },

    optionText: {
        fontSize: 14,
        fontWeight: 400
    },
    applyButton: {
        backgroundColor: '#28a745',
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 12,
    },
    applyButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
});
