import React from 'react';
import { View, Text, StyleSheet, FlatList, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import CustomHeader from '../../../components/common/CustomHeader';
import CustomButton from '../../../components/common/CustomButton';
import SearchBar from '../../../components/common/SearchBar';
import { useNavigation } from '@react-navigation/native';
import CategoryCard from '../components/CategoryCard';
import { useSelector } from 'react-redux';
import Indicator from '../../../components/common/Indicator';
import LinearGradient from 'react-native-linear-gradient';
import ProductCard from '../components/ProductCard';
import { Screen } from '../../../router/screen';

export default function ShopScreen({ searchData, setSearchData, onPressCategory, onPressSeeAll, onPressDeleteFav, newProductData, popularProductData, onPressProductItem, onPressFavourite }) {

    const navigation = useNavigation();
    const productCategoryData = useSelector(state => state.product.productCategory);

    const renderProduct = ({ item, index, type }) => <ProductCard item={item} index={index} onPressProductItem={onPressProductItem} onPressFavourite={onPressFavourite} onPressDeleteFav={onPressDeleteFav} type={type} />;

    return (

        <SafeAreaView style={{ flex: 1, marginTop: 30 }}>
            <View>
                <CustomHeader
                    type="shop"
                    topTitle="Shop"
                    showLocation={true}
                    subtitle={true}
                    onBackPress={() => navigation.goBack()}
                    onCartPress={() => console.log('Cart pressed')}
                    onNotificationPress={() => console.log('Notification pressed')}
                />
            </View>
            {/* Search */}
            <SearchBar value={searchData} placeholder="Search for Seeds" onChangeText={(text) => setSearchData(text)} />

            <FlatList
                data={[{}]}
                renderItem={() => (<SafeAreaView style={styles.container}>
                    <FlatList
                        data={[...productCategoryData, { id: 9 }]}
                        renderItem={({ item }) => (
                            item.id != 9 ? <CategoryCard item={item} onPressCategory={onPressCategory} /> : <View style={{ width: '30%' }} />
                        )}
                        keyExtractor={(item) => item.id}
                        numColumns={3}
                        columnWrapperStyle={{ justifyContent: 'space-between', paddingHorizontal: 10 }}
                        contentContainerStyle={{ paddingVertical: 10 }}
                    />

                    <LinearGradient
                        colors={['#FFFBDF', '#EEF2F1']}  // light blue to white gradient
                        start={{ x: 0, y: 0 }}
                        end={{ x: 0, y: 1 }}
                        style={{ marginTop: 10 }}
                    >
                        <View style={{ marginVertical: 10 }}>
                            <View style={styles.header}>
                                <Text style={styles.title}>New Lunch</Text>
                                <TouchableOpacity onPress={() => onPressSeeAll("newLunch")}>
                                    <Text style={styles.viewAll}>View All</Text>
                                </TouchableOpacity>
                            </View>

                            <View style={{ marginVertical: 16 }}>
                                <FlatList
                                    data={newProductData || []}
                                    keyExtractor={(item) => item.id}
                                    renderItem={({ item, index }) => renderProduct({ item, index, type: 0 })}
                                    horizontal
                                    showsHorizontalScrollIndicator={false}
                                    contentContainerStyle={{ paddingHorizontal: 16 }}
                                />
                            </View>

                        </View>
                    </LinearGradient>


                    <LinearGradient
                        colors={['#E3F3FF', '#FFFFFF']}  // light blue to white gradient
                        start={{ x: 0, y: 0 }}
                        end={{ x: 0, y: 1 }}
                        style={{ marginVertical: 0 }}

                    >
                        <View style={{ marginVertical: 10 }} >
                            <View style={styles.header}>
                                <Text style={styles.title}>Popular Product</Text>
                                <TouchableOpacity onPress={() => onPressSeeAll("popular")}>
                                    <Text style={styles.viewAll}>View All</Text>
                                </TouchableOpacity>
                            </View>

                            <View style={{ marginVertical: 16 }}>
                                <FlatList
                                    data={popularProductData || []}
                                    keyExtractor={(item) => item.id}
                                    renderItem={({ item, index }) => renderProduct({ item, index, type: 1 })}
                                    horizontal
                                    showsHorizontalScrollIndicator={false}
                                    contentContainerStyle={{ paddingHorizontal: 16 }}
                                />
                            </View>

                        </View>
                    </LinearGradient>


                    <CustomButton title={"View All Product"} onPress={() => navigation.navigate(Screen.viewAllProduct)} />

                    <Indicator Indicator={newProductData?.length > 0 ? true : false} />

                </SafeAreaView>)}
            />


        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 10,
        // backgroundColor: '#F8F8F8',
        // paddingHorizontal: 16
    },
    gridContainer: {
        margin: 20
    },

    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        marginBottom: 8,
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#000',
    },
    viewAll: {
        fontSize: 12,
        color: '#1E8153',
        fontWeight: '500',
    },
});
