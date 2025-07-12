import React from 'react';
import { View, Text, StyleSheet, FlatList, SafeAreaView, ScrollView } from 'react-native';
// import CustomHeader from '../../../../components/common/CustomHeader';
// import SearchBar from '../../component/common/SearchBar';
// import CategoryCard from '../../components/shop/CategoryCard'; // You'll create this
import NewLaunch from '../../components/shop/NewLaunch';
import PopularProduct from '../../components/shop/PopularProduct';
import CustomButton from '../../components/common/CustomButton';
import SearchBar from '../../components/common/SearchBar';
import { useNavigation } from '@react-navigation/native';
import CustomHeader from '../../components/common/CustomHeader';
import CategoryCard from '../product_Modules/components/CategoryCard';

const categories = [
    { id: '1', title: 'All', icon: require('../../assets/images/shop/all.png') },
    { id: '2', title: 'Pesticides', icon: require('../../assets/images/shop/pesticides.png') },
    { id: '3', title: 'Fertilisers', icon: require('../../assets/images/shop/fertilisers.png') },
    { id: '4', title: 'Seeds', icon: require('../../assets/images/shop/seeds.png') },
    { id: '5', title: 'Implements', icon: require('../../assets/images/shop/implements.png') },
    { id: '6', title: 'Organic', icon: require('../../assets/images/shop/organic.png') },
    { id: '7', title: 'Speciality Nutrients', icon: require('../../assets/images/shop/speacialityNutrents.png') },
    { id: '8', title: 'Veterinary', icon: require('../../assets/images/shop/veterinary.png') },
    // { id: '9', title: ' ' },
];

export default function ShopScreen() {
    const navigation = useNavigation();
    return (

        <>
            <CustomHeader
                type="shop"
                title="Shop"
                subtitle="Store Code: S0584 | Mana Gromor Centre Akola"
                onBackPress={() => console.log('Back pressed')}
                onCartPress={() => console.log('Cart pressed')}
                onNotificationPress={() => console.log('Notification pressed')}
            />

            {/* Search */}
            <SearchBar placeholder="Search for Seeds" />
            <SafeAreaView style={styles.container}>
                {/* Header */}


                <ScrollView>
                    {/* Grid */}
                    <FlatList
                        data={categories}
                        renderItem={({ item }) => (
                            <CategoryCard title={item.title} icon={item.icon} />
                        )}
                        keyExtractor={(item) => item.id}
                        numColumns={3}
                        contentContainerStyle={styles.gridContainer}
                        columnWrapperStyle={{ justifyContent: 'space-between' }}

                    />
                    {/* <View style={{ backgroundColor: '#fff' }}>
                <Text style={{ margin: 16, fontSize: 16, fontWeight: 'bold' }}>New Launch</Text>
                <NewLaunchSlider />
            </View>
            <View>
                <Text>popular</Text>
            </View> */}


                    <NewLaunch />
                    <PopularProduct />
                    <CustomButton title={"View All Product"} onPress={() => navigation.navigate('AllProduct')} />
                </ScrollView>
            </SafeAreaView>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8F8F8',
        paddingHorizontal: 16
    },
    gridContainer: {
        margin: 20
    },
});
