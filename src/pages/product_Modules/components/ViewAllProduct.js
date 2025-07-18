import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, SafeAreaView, TouchableOpacity } from 'react-native';
// import CustomHeader from '../common/CustomHeader';
// import SearchBar from '../../common/SearchBar';
import ProductCard from './ProductCard';
import FilterModal from './FilterModal';
import product1 from '../../../assets/images/shop/product1.png'
import SearchBar from '../../../components/common/SearchBar';
import CustomHeader from '../../../components/common/CustomHeader';
import { useNavigation } from '@react-navigation/native';
const productData = [
    {
        id: '1',
        productImage: product1,
        productName: 'Gromor nutri drip 12-61-0',
        productType: 'FERTILIZER',
        cropType: 'Good for All Crops',
        weightOptions: ['25 kg', '50 kg'],
        price: 3618,
        originalPrice: 3999,
        badge: 'NEW',
    },
    {
        id: '2',
        productImage: product1,
        productName: 'Gromor nutri drip 12-61-0',
        productType: 'FERTILIZER',
        cropType: 'Good for All Crops',
        weightOptions: ['25 kg', '50 kg'],
        price: 3618,
        originalPrice: 3999,
        badge: 'NEW',
    },
    {
        id: '3',
        productImage: product1,
        productName: 'Gromor nutri drip 12-61-0',
        productType: 'FERTILIZER',
        cropType: 'Good for All Crops',
        weightOptions: ['25 kg', '50 kg'],
        price: 3618,
        originalPrice: 3999,
        badge: 'NEW',
    },
    {
        id: '4',
        productImage: product1,
        productName: 'Gromor nutri drip 12-61-0',
        productType: 'FERTILIZER',
        cropType: 'Good for All Crops',
        weightOptions: ['25 kg', '50 kg'],
        price: 3618,
        originalPrice: 3999,
        badge: 'NEW',
    },
    {
        id: '5',
        productImage: product1,
        productName: 'Gromor nutri drip 12-61-0',
        productType: 'FERTILIZER',
        cropType: 'Good for All Crops',
        weightOptions: ['25 kg', '50 kg'],
        price: 3618,
        originalPrice: 3999,
        badge: 'NEW',
    },
    {
        id: '6',
        productImage: product1,
        productName: 'Magwin magnesium sulphate',
        productType: 'SEEDS',
        cropType: 'Chilli',
        weightOptions: ['1500 seeds', '3000 seeds'],
        price: 585,
        originalPrice: 754,
        badge: 'BESTSELLERS',
    },
    // Add more items if needed
];

const ViewAllProduct = () => {
    const renderProduct = ({ item }) => <ProductCard {...item} />;
    const [filterVisible, setFilterVisible] = useState(false);
    const navigation = useNavigation();
    return (
        <SafeAreaView style={styles.container}>
            <CustomHeader
                type="shop"
                topTitle="All"
                subtitle="Store Code: S0584 | Mana Gromor Centre Akola"
                onBackPress={() => navigation.goBack()}
                onCartPress={() => console.log('Cart pressed')}
                onNotificationPress={() => console.log('Notification pressed')}
            />
            <SearchBar onChangeText={(text) => console.log('Search:', text)} />

            <Text style={styles.itemCount}>{productData.length} items</Text>

            <FlatList
                data={productData}
                keyExtractor={(item) => item.id}
                renderItem={renderProduct}
                numColumns={2}
                columnWrapperStyle={styles.row}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingHorizontal: 8, paddingBottom: 80 }}
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

        </SafeAreaView>
    );
};

export default ViewAllProduct;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 30,
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
