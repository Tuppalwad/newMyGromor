import React, { useState } from 'react';
import {
    Modal,
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    StyleSheet,
    Dimensions,
    Image,
    TextInput
} from 'react-native';
import close from '../../../../assets/images/common/close.png';
import checkIcon from '../../../../assets/images/common/checkIcon.png';
const { height } = Dimensions.get('window');
import search from '../../../../assets/images/common/searchIcon.png'
import LinearGradient from 'react-native-linear-gradient';
import { useSelector } from 'react-redux';

const tabs = ["Crop", "Language"];

const AgriFilterModal = ({ visible, onClose }) => {
    const appLanguage = UserManager?.getAppMultiLanguage
    const [activeTab, setActiveTab] = useState("Crop");
    const [selectedOptions, setSelectedOptions] = useState({ Crop: [], Language: [] });
    const [searchTerm, setSearchTerm] = useState("");

    const dataMap = {
        Crop: [
            { label: 'Carrot', image: require('../../../../assets/images/shop/product2.png') },
            { label: 'Cotton', image: require('../../../../assets/images/shop/product2.png') },
            { label: 'Chilli', image: require('../../../../assets/images/shop/product2.png') },
            { label: 'Cabbage', image: require('../../../../assets/images/shop/product2.png') },
        ],
        Language: [
            { label: 'English', subtitle: 'English' },
            { label: 'తెలుగు', subtitle: 'Telugu' },
            { label: 'ಕನ್ನಡ', subtitle: 'Kannada' },
            { label: 'मराठी', subtitle: 'Marathi' },
            { label: 'हिंदी', subtitle: 'Hindi' },
        ],
    };

    const toggleOption = (option) => {
        const current = selectedOptions[activeTab];
        const updated = current.includes(option)
            ? current.filter(item => item !== option)
            : [...current, option];
        setSelectedOptions({ ...selectedOptions, [activeTab]: updated });
    };

    const clearAll = () => setSelectedOptions({ Crop: [], Language: [] });

    const applyFilters = () => {
        console.log('Selected Filters:', selectedOptions);
        onClose(false);
    };

    const filteredData = dataMap[activeTab].filter(item =>
        item.label.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <Modal visible={visible} animationType="slide" transparent>
            <View style={styles.modalOverlay}>
                <View style={styles.bottomSheet}>

                    {/* Header */}
                    <View style={styles.headerRow}>
                        {/* <View></View> */}
                        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={styles.headerText}>{appLanguage?.filter ?? "Filter"}</Text>
                            <TouchableOpacity onPress={clearAll}>
                                <Text style={styles.clearText}>{appLanguage?.clear_all ?? "Clear All"}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <TouchableOpacity onPress={() => onClose(false)} style={{
                        position: 'absolute', top: 10,
                        right: 10,
                    }}>
                        <Image source={close} style={styles.closeIcon} />
                    </TouchableOpacity>

                    {/* Tabs and Options */}
                    <View style={styles.filterBody}>

                        {/* Left Tabs */}
                        <View style={styles.leftPane}>
                            {tabs.map((tab, index) => (
                                <TouchableOpacity
                                    key={index}
                                    onPress={() => setActiveTab(tab)}
                                    style={[styles.tabButton, activeTab === tab && styles.activeTab]}
                                >
                                    <Text style={[styles.tabText, activeTab === tab && styles.activeTabText]}>{tab}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>

                        {/* Right Options */}
                        <View style={styles.rightPane}>
                            {/* Search */}
                            <View style={styles.searchContainer}>
                                <TextInput
                                    style={styles.searchInput}
                                    value={searchTerm}
                                    onChangeText={setSearchTerm}
                                    placeholder="Search"
                                />
                                {/* <Text style={styles.searchIcon}></Text> */}
                                <Image source={search} style={{ height: 15, width: 15, tintColor: 'green' }} />
                            </View>

                            <ScrollView showsVerticalScrollIndicator={false}>
                                {filteredData.map((item, index) => (
                                    <TouchableOpacity
                                        key={index}
                                        style={styles.optionRow}
                                        onPress={() => toggleOption(item.label)}
                                    >
                                        <View style={[styles.checkbox, selectedOptions[activeTab].includes(item.label) && styles.checkboxChecked]}>
                                            {selectedOptions[activeTab].includes(item.label) && (
                                                <Image
                                                    source={checkIcon}
                                                    style={styles.checkIcon}
                                                    resizeMode='contain'
                                                />
                                            )}
                                        </View>
                                        {item.image && <Image source={item.image} style={styles.itemImage} />}
                                        <View>
                                            <Text style={styles.optionLabel}>{item.label}</Text>
                                            {item.subtitle && <Text style={styles.optionSubtitle}>{item.subtitle}</Text>}
                                        </View>
                                    </TouchableOpacity>
                                ))}
                            </ScrollView>
                        </View>
                    </View>

                    {/* Apply */}
                    <TouchableOpacity style={styles.applyButton} onPress={applyFilters}>
                        <LinearGradient
                            colors={['#1E8153', '#4EA618']}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                            style={styles.payButton}
                        >

                            <Text style={styles.applyText}>{appLanguage?.apply_filter ?? "Apply"}</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};
export default AgriFilterModal;

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.4)',
        justifyContent: 'flex-end',
    },
    bottomSheet: {
        backgroundColor: '#fff',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        // maxHeight: height * 0.8,
        height: 400,
        paddingHorizontal: 10,
        paddingTop: 20,
    },
    headerRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerText: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    clearText: {
        marginTop: 10,
        color: '#01AD41',
    },
    closeIcon: {
        width: 12,
        height: 12,
        tintColor: '#000',
    },
    filterBody: {
        flexDirection: 'row',
        marginTop: 20,
        flex: 1,
    },
    leftPane: {
        width: 100,
        borderRightWidth: 1,
        borderRightColor: '#eee',
    },
    tabButton: {
        paddingVertical: 12,
        paddingHorizontal: 10,
    },
    activeTab: {
        backgroundColor: '#e6f8eb',
        // borderTopRightRadius: 20,
        // borderBottomRightRadius: 20,
    },
    tabText: {
        color: '#666',
    },
    activeTabText: {
        color: '#000',
        fontWeight: 'bold',
    },
    rightPane: {
        flex: 1,
        paddingLeft: 15,
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        paddingHorizontal: 10,
        marginBottom: 10,
    },
    searchInput: {
        flex: 1,
        height: 40,
    },
    searchIcon: {
        fontSize: 16,
    },
    optionRow: {
        flexDirection: 'row',
        alignItems: 'center',
        // backgroundColor: '#f3f2f2',
        borderRadius: 8,
        marginBottom: 8,
        padding: 10,
    },
    checkbox: {
        width: 18,
        height: 18,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: '#ccc',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
        backgroundColor: '#fff'
    },
    checkboxChecked: {
        backgroundColor: 'green',
        borderColor: 'green',
    },
    checkIcon: {
        width: 12,
        height: 12,
        tintColor: '#fff',
    },
    itemImage: {
        width: 30,
        height: 30,
        borderRadius: 15,
        marginRight: 10,
    },
    optionLabel: {
        fontWeight: 'bold',
    },
    optionSubtitle: {
        fontSize: 12,
        color: '#888',
    },
    applyButton: {
        marginTop: 15,
        // backgroundColor: 'green',
        // paddingVertical: 12,
        // borderRadius: 10,
        alignItems: 'center',
    },
    payButton: {
        borderRadius: 10,
        paddingVertical: 14,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
    },
    applyText: {
        color: '#fff',
        fontWeight: 'bold',
    }
});

