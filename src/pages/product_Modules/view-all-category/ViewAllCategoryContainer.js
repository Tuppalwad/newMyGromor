import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native';
// import CustomHeader from '../common/CustomHeader';
// import SearchBar from '../../common/SearchBar';
// import ProductCard from './ProductCard';
// import FilterModal from './FilterModal';
import product1 from '../../../assets/images/shop/product1.png'
import SearchBar from '../../../components/common/SearchBar';
import CustomHeader from '../../../components/common/CustomHeader';
import { useIsFocused, useNavigation, useRoute } from '@react-navigation/native';
import { UserManager } from '../../../storage';
import { useOperation } from '../../../redux/operation';
import { useDispatch, useSelector } from 'react-redux';
import { createLoadingSelector } from '../../../redux/loading-reducer';
import { ProductType } from '../../../redux/product/type';
import { isEmpty } from '../../../utils/validator';
import Indicator from '../../../components/common/Indicator';
import { Screen } from '../../../router/screen';
import FlatlistComponent from '../../../components/common/FlatListComponent';
import { Icon } from '../../../../assets/images';
import ProductCard from '../components/ProductCard';
import FilterModal from '../components/FilterModal';
import HorizontalScrollButtons from './HorizontalScrollButtons';
import Errordisplaycomponent from '../../../components/Error-display-component';


const ViewAllCategoryContainer = ({
    data,
    handlePress,
    activeTab,
    activeSubTab,
    tabData,
    onPressFilter,
    onPressClose,
    showFilter,
    onPressProductItem,
    isLoading,
    min,
    max,
    low,
    high,
    handleSubCategory,
    handleValueChange,
    onPressFilterCategory,
    onPressResetFilter,
    onPressFavourite,
    onEndReached,
    onPressSubmitFilter,
    filterCategory,
    showNoCode,
    setSearchData,
    searchData,
    onPressDeleteFav,
    appLanguage,
    getProduct,
    type,
    categorySelected,
    setActiveSubTab,
    fetchDataonSubcategory,
}) => {
    const [filterVisible, setFilterVisible] = useState(false);
    const navigation = useNavigation();
    const renderProduct = ({ item, index, isSimilar }) => <ProductCard item={item} index={index} onPressProductItem={onPressProductItem} onPressFavourite={onPressFavourite} onPressDeleteFav={onPressDeleteFav} type={isSimilar} />;


    return (
        <SafeAreaView style={styles.container}>

            <CustomHeader
                type={type}
                topTitle={type}
                showLocation={true}
                subtitle={true}
                onBackPress={() => navigation.goBack()}
                onCartPress={() => console.log('Cart pressed')}
                onNotificationPress={() => console.log('Notification pressed')}
            />

            <SearchBar value={searchData} onChangeText={(text) => { setSearchData(text) }} onPressFilter={onPressFilter} />

            <View>
                <HorizontalScrollButtons
                    setActiveSubTab={setActiveSubTab}
                    getProduct={getProduct}
                    categorySelected={categorySelected}
                    handleSubCategory={handleSubCategory}
                    fetchDataonSubcategory={fetchDataonSubcategory}
                />
            </View>


            <Text style={styles.itemCount}>{data.length} items</Text>

            <FlatList
                data={data || []}
                keyExtractor={(item) => item?.id}
                renderItem={({ item, index }) => renderProduct({ item, index, isSimilar: true })}
                numColumns={2}
                columnWrapperStyle={styles.row}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingHorizontal: 8, paddingBottom: 80 }}
                onEndReached={onEndReached}
                ListEmptyComponent={() => {
                    if (data.length == 0) {
                        return (
                            <View style={{ flex: 1, justifyContent: "center", }}>
                                <Errordisplaycomponent
                                    Error_Title={appLanguage?.no_data_found ?? 'No data found'}
                                    Error_Message={""}
                                    Error_Image={Icon.store}
                                    Error_Status={false}
                                />
                            </View>
                        );
                    }
                    return null;
                }}
            />

            {/* Bottom Bar with CustomButton */}
            <View style={styles.bottomBar}>
                <TouchableOpacity style={styles.bottomButton} onPress={() => console.log('Sort pressed')}>
                    <Text style={styles.bottomIcon}>⇅</Text>
                    <Text style={styles.bottomText}>Sort by</Text>
                </TouchableOpacity>

                <View style={styles.divider} />

                <TouchableOpacity style={styles.bottomButton} onPress={() => setFilterVisible(true)}>
                    <Text style={styles.bottomIcon}>≡</Text>
                    <Text style={styles.bottomText}>Filters</Text>
                    <View style={styles.dot} />
                </TouchableOpacity>
            </View>

            <FilterModal visible={filterVisible} onClose={() => setFilterVisible(false)} />

            <Indicator show={isLoading} />

        </SafeAreaView>
    );
};

export default ViewAllCategoryContainer;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F9FAFB',
    },
    itemCount: {
        fontSize: 14,
        color: '#333',
        marginHorizontal: 16,
        marginVertical: 8,
    },
    row: {
        justifyContent: 'space-between',
        marginBottom: 12,
    },
    bottomBar: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#0A8F43', // fallback for gradient
        paddingHorizontal: 16,
        paddingVertical: 10,
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        borderTopWidth: 1,
        borderColor: '#ddd',
        borderTopLeftRadius: 12,
        borderTopRightRadius: 12,
    },

    bottomButton: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
        justifyContent: 'center',
        paddingVertical: 8,
    },

    bottomIcon: {
        fontSize: 16,
        color: '#fff',
        marginRight: 8,
        lineHeight: 15
    },

    bottomText: {
        fontSize: 14,
        color: '#fff',
        fontWeight: '500',
    },

    divider: {
        width: 1,
        height: '80%',
        backgroundColor: '#fff',
        opacity: 0.3,
    },

    dot: {
        width: 4,
        height: 4,
        borderRadius: 6,
        backgroundColor: '#FFD700',
        marginLeft: 6,
    },

});
