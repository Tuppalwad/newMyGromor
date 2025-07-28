import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Modal,
    FlatList,
    StyleSheet,
    ScrollView,
    Image,
} from 'react-native';
import downarrow from '../../../assets/images/common/downArrow.png'

export const Dropdown = ({ label, options, selectedValue, onSelect }) => {
    const [visible, setVisible] = useState(false);

    return (
        <View style={styles.dropdownContainer}>
            <Text style={styles.label}>{label}</Text>
            <TouchableOpacity
                style={styles.dropdown}
                onPress={() => setVisible(true)}
            >
                <Text style={{ color: selectedValue ? '#000' : '#999' }}>
                    {selectedValue || `Select ${label}`}
                </Text>
                <Image
                    source={downarrow}
                    style={{ width: 10, height: 10, resizeMode: 'contain' }}
                />
            </TouchableOpacity>

            <Modal transparent visible={visible} animationType="fade">
                <TouchableOpacity style={styles.modalOverlay} onPress={() => setVisible(false)}>
                    <View style={styles.modalContent}>
                        <FlatList
                            data={options}
                            keyExtractor={(item) => item}
                            renderItem={({ item }) => (
                                <TouchableOpacity
                                    style={styles.option}
                                    onPress={() => {
                                        onSelect(item);
                                        setVisible(false);
                                    }}
                                >
                                    <Text>{item}</Text>
                                </TouchableOpacity>
                            )}
                        />
                    </View>
                </TouchableOpacity>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    dropdownContainer: {
        width: '100%',
        marginBottom: 16,
    },
    label: {
        fontSize: 14,
        marginBottom: 4,
        fontWeight: '500',
    },
    dropdown: {
        borderWidth: 1,
        borderColor: '#D9D9D9',
        borderRadius: 6,
        padding: 12,
        justifyContent: 'space-between',
        flexDirection:'row',
        alignItems:'center'
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: '#00000066',
        justifyContent: 'center',
        padding: 40,
    },
    modalContent: {
        backgroundColor: '#fff',
        borderRadius: 8,
        maxHeight: 300,
    },
    option: {
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
})