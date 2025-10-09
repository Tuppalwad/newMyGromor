
import React, { useEffect, useState, useMemo } from 'react';
import { Modal, View, Text, TouchableOpacity, FlatList, TextInput, StyleSheet, Image, ScrollView, TouchableWithoutFeedback } from 'react-native';
import product1 from '../../../assets/images/shop/product1.png';
import SearchIcon from '../../../assets/images/common/searchIcon.png';
import { useDispatch, useSelector } from 'react-redux';
import { useIsFocused } from '@react-navigation/native';
import { useOperation } from '../../../redux/operation';
import checkIcon from '../../../assets/images/common/checkIcon.png'

const priceRanges = [
    { id: 'all', label: 'All' },
    { id: '0-500', label: '₹0 - ₹500' },
    { id: '500-1500', label: '₹500 - ₹1500' },
    { id: '1500-2500', label: '₹1500 - ₹2500' },
    { id: '2500-5000', label: '₹2500 - ₹5000' },
    { id: '5000-10000', label: '₹5000 - ₹10000' }
];

export default function FilterModal({ visible, onClose, resetAll }) {
    const [choice, setChoice] = useState('Crop');
    const [searchQuery, setSearchQuery] = useState('');
    const isFocussed = useIsFocused();
    const operation = useOperation();
    const [cropList, setCropList] = useState([]);
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const [applyedFilter, setApplyedFilter] = useState({})
    const appLanguages = useSelector(state => state.user.appMultiLanguage);
    const productCategoryData = useSelector(state => state.product.productCategory);
    const farmerLanguage = useSelector(state => state.farmer.FarmerLanguageID);

    const onPressChoice = (item) => {
        setChoice(item);
        setSearchQuery(''); // Reset search query when changing category
    }

    const FetchCrops = async () => {
        try {
            setLoading(true);
            const params = {
                language: farmerLanguage,
            };
            const res = await dispatch(operation.advisory.getCropsDrop(params));
            if (!res.errors || res.errors.length === 0) {
                setCropList(res);
            }
        } catch (error) {
            dispatch(operation.user.getErrorHandling(error, "getCrops"));
            console.error("Error fetching crops:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (isFocussed && cropList.length === 0) {
            FetchCrops();
        }
    }, [isFocussed, cropList.length]);

    // Filter data based on search query
    const filteredData = useMemo(() => {
        if (!searchQuery) {
            switch (choice) {
                case 'Crop': return cropList;
                case 'Category': return productCategoryData;
                case 'Sub-Category': return productCategoryData;
                case 'Price': return priceRanges;
                case 'Pest/Disease': return cropList;
                default: return [];
            }
        }

        const query = searchQuery.toLowerCase();
        switch (choice) {
            case 'Crop':
                return cropList.filter(item =>
                    item.name.toLowerCase().includes(query)
                );
            case 'Category':
                return productCategoryData.filter(item =>
                    item.name.toLowerCase().includes(query)
                );
            case 'Sub-Category':
                return productCategoryData.filter(item =>
                    item.name.toLowerCase().includes(query)
                );
            case 'Price':
                return priceRanges.filter(item =>
                    item.label.toLowerCase().includes(query)
                );
            case 'Pest/Disease':
                return cropList.filter(item =>
                    item.name.toLowerCase().includes(query)
                );
            default:
                return [];
        }
    }, [searchQuery, choice, cropList, productCategoryData]);

    const renderItem = ({ item }) => (
        <View style={styles.optionRow}>
            <TouchableOpacity
                style={[
                    styles.checkbox,
                    {
                        backgroundColor: (applyedFilter.choices || []).includes(item.name)
                            ? '#01AD41'
                            : 'transparent',
                        borderWidth: 1,
                        borderColor: (applyedFilter.choices || []).includes(item.name)
                            ? '#01AD41'
                            : '#ccc', // gray border when not selected
                        justifyContent: 'center',
                        alignItems: 'center',
                    },
                ]}
                onPress={() => {
                    setApplyedFilter((pre) => {
                        const selected = pre.choices || [];

                        return selected.includes(item.name)
                            ? { ...pre, choices: selected.filter((i) => i !== item.name) } // remove
                            : { ...pre, choices: [...selected, item.name] }; // add
                    });
                }}
            >
                {(applyedFilter.choices || []).includes(item.name) && (
                    <Image
                        source={checkIcon}
                        style={{
                            width: 16,
                            height: 16,
                            resizeMode: 'contain',
                            tintColor: '#fff',
                        }}
                    />
                )}
            </TouchableOpacity>


            {item.image && <Image source={item.image} style={styles.optionImage} />}
            <Text style={styles.optionText}>{item.name || item.label}</Text>
        </View>

    );

    const keyExtractor = (item) => item.id.toString();

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
                            <Text style={styles.title}>{appLanguages.filter ?? "Filter"}</Text>
                            <TouchableOpacity
                                onPress={() => {
                                    onClose()
                                    setSearchQuery("")
                                    resetAll()
                                }}
                            >
                                <Text style={styles.clearAll}>{appLanguages.clear_all ?? "Clear All"}</Text>
                            </TouchableOpacity>
                        </View>
                        <TouchableOpacity onPress={onClose}>
                            <Text style={styles.close}>✕</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.content}>
                        {/* Left Menu */}
                        <View style={styles.menu}>
                            {['Crop', 'Category', 'Sub-Category', 'Price', 'Pest/Disease'].map((item) => (
                                <TouchableOpacity
                                    key={item}
                                    onPress={() => onPressChoice(item)}
                                    style={[styles.menuItem, item === choice && styles.activeMenu]}
                                >
                                    <Text style={[styles.menuText, item === choice && styles.activeMenuText]}>{item}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>

                        {/* Right Content */}
                        <View style={styles.rightContent}>
                            <View style={styles.searchContainer}>
                                <TextInput
                                    placeholder="Search"
                                    style={styles.searchInput}
                                    placeholderTextColor={'#999'}
                                    value={searchQuery}
                                    onChangeText={setSearchQuery}
                                />
                                <Image source={SearchIcon} style={{ width: 15, height: 15 }} resizeMode='contain' />
                            </View>

                            <FlatList
                                data={filteredData}
                                keyExtractor={keyExtractor}
                                renderItem={renderItem}
                                showsVerticalScrollIndicator={false}
                                contentContainerStyle={styles.listContent}
                                keyboardShouldPersistTaps="handled"
                                initialNumToRender={10}
                                maxToRenderPerBatch={10}
                                windowSize={5}
                            />
                        </View>
                    </View>

                    {/* Apply Button */}
                    <TouchableOpacity style={styles.applyButton}>
                        <Text style={styles.applyText}>{appLanguages.apply ?? "Apply"}</Text>
                    </TouchableOpacity>

                </View>
            </View>
            {/* <TouchableWithoutFeedback onPress={}>
            </TouchableWithoutFeedback> */}
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
        paddingBottom: 20
    },
    title: {
        fontWeight: '600',
        fontSize: 20,
        fontWeight: 'bold',
    },
    close: {
        fontSize: 12,
        lineHeight: 10,
        fontWeight: '600'
    },
    clearAll: {
        color: '#0A8F43',
        marginTop: 8,
        fontSize: 14
    },
    content: {
        flexDirection: 'row',
        marginTop: 12,
        flex: 1,
    },
    menu: {
        width: "30%",
        borderRightWidth: 1,
        borderColor: '#eee',
    },
    menuItem: {
        paddingVertical: 10,
    },
    menuText: {
        paddingHorizontal: 10,
        fontSize: 14,
        color: '#333',
        lineHeight: 20,
    },
    activeMenu: {
        backgroundColor: '#DAFDE7',
        borderTopLeftRadius: 5,
        borderBottomLeftRadius: 5,
    },
    activeMenuText: {
        color: '#000',
        fontWeight: '500',
    },
    rightContent: {
        width: "70%",
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
        color: '#333',
    },
    listContent: {
        paddingBottom: 20,
    },
    optionRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },
    checkbox: {
        width: 20,
        height: 20,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: '#999',
        marginRight: 8,
        justifyContent: 'center',
        alignItems: 'center'
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