import React from 'react';
import { Modal, View, Text, TouchableOpacity, FlatList, TextInput, StyleSheet, Image, ScrollView } from 'react-native';
import product1 from '../../assets/images/shop/product1.png'

const crops = [
    { id: 'all', name: 'All', image: null },
    { id: 'carrot', name: 'Carrot', image: product1 },
    { id: 'cotton', name: 'Cotton', image: product1 },
    { id: 'chilli', name: 'Chilli', image: product1 },
    { id: 'cabbage', name: 'Cabbage', image: product1 },
];

export default function FilterModal({ visible, onClose }) {
    return (
        <Modal
            visible={visible}
            animationType="slide"
            transparent
            onRequestClose={onClose}
        >
            <View style={styles.overlay}>
                <View style={styles.modalContainer}>

                    {/* Header */}
                    <View style={styles.header}>
                        <View></View>
                        <View style={{ flexDirection: 'column', alignItems: 'center' }}>
                            <Text style={styles.title}>Filters</Text>
                            <TouchableOpacity>
                                <Text style={styles.clearAll}>Clear All</Text>
                            </TouchableOpacity>
                        </View>
                        <TouchableOpacity onPress={onClose}>
                            <Text style={styles.close}>✕</Text>
                        </TouchableOpacity>
                    </View>

                    {/* Clear All */}

                    <View style={styles.content}>
                        {/* Left Menu */}
                        <View style={styles.menu}>
                            {['Crop', 'Category', 'Sub-Category', 'Price', 'Pest/Disease'].map((item, index) => (
                                <TouchableOpacity key={index} style={[styles.menuItem, item === 'Crop' && styles.activeMenu]}>
                                    <Text style={[styles.menuText, item === 'Crop' && styles.activeMenuText]}>{item}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>

                        {/* Right Content */}
                        <View style={styles.rightContent}>
                            <View style={styles.searchContainer}>
                                <TextInput placeholder="Search" style={styles.searchInput} />
                                <Text style={styles.searchIcon}>🔍</Text>
                            </View>

                            <ScrollView style={styles.optionsList}>
                                {crops.map((crop) => (
                                    <View key={crop.id} style={styles.optionRow}>
                                        <TouchableOpacity style={styles.checkbox}></TouchableOpacity>
                                        {crop.image && <Image source={crop.image} style={styles.optionImage} />}
                                        <Text style={styles.optionText}>{crop.name}</Text>
                                    </View>
                                ))}
                            </ScrollView>
                        </View>
                    </View>

                    {/* Apply Button */}
                    <TouchableOpacity style={styles.applyButton}>
                        <Text style={styles.applyText}>Apply</Text>
                    </TouchableOpacity>

                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(0,0,0,0.4)',
    },
    modalContainer: {
        backgroundColor: '#fff',
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
        padding: 16,
        height: 450
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    close: {
        fontSize: 12,
        lineHeight: 10,
        fontWeight: 600
    },
    clearAll: {
        color: '#0A8F43',
        marginTop: 8,
    },
    content: {
        flexDirection: 'row',
        marginTop: 12,
        flex: 1,
    },
    menu: {
        width: 100,
        borderRightWidth: 1,
        borderColor: '#eee',
    },
    menuItem: {
        paddingVertical: 10,
    },
    menuText: {
        fontSize: 14,
        color: '#333',
        lineHeight: 10,
    },
    activeMenu: {
        backgroundColor: '#E8F5E9',
        borderRadius: 6,
    },
    activeMenuText: {
        color: '#0A8F43',
        fontWeight: '500',
    },
    rightContent: {
        flex: 1,
        marginLeft: 16,
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: 8,
        marginBottom: 12,
        paddingHorizontal: 8,
    },
    searchInput: {
        flex: 1,
        height: 36,
    },
    searchIcon: {
        marginLeft: 8,
        fontSize: 16,
    },
    optionsList: {
        flex: 1,
    },
    optionRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },
    checkbox: {
        width: 18,
        height: 18,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: '#999',
        marginRight: 8,
    },
    optionImage: {
        width: 32,
        height: 32,
        borderRadius: 16,
        marginRight: 8,
    },
    optionText: {
        fontSize: 14,
    },
    applyButton: {
        backgroundColor: '#0A8F43',
        paddingVertical: 12,
        borderRadius: 6,
        marginTop: 12,
    },
    applyText: {
        color: '#fff',
        textAlign: 'center',
        fontWeight: 'bold',
    },
});
