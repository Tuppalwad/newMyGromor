import React from 'react';
import { View, Text, StyleSheet, FlatList, SafeAreaView, ScrollView } from 'react-native';
import CustomHeader from '../../../components/common/CustomHeader';
import CustomButton from '../../../components/common/CustomButton';
import SearchBar from '../../../components/common/SearchBar';
import { useNavigation } from '@react-navigation/native';
import CategoryCard from '../components/CategoryCard';
import NewLaunch from '../components/NewLaunch';
import PopularProduct from '../components/PopularProduct';


const categories = [
    { id: '1', title: 'All', icon: require('../../../assets/images/shop/all.png') },
    { id: '2', title: 'Pesticides', icon: require('../../../assets/images/shop/pesticides.png') },
    { id: '3', title: 'Fertilisers', icon: require('../../../assets/images/shop/fertilisers.png') },
    { id: '4', title: 'Seeds', icon: require('../../../assets/images/shop/seeds.png') },
    { id: '5', title: 'Implements', icon: require('../../../assets/images/shop/implements.png') },
    { id: '6', title: 'Organic', icon: require('../../../assets/images/shop/organic.png') },
    { id: '7', title: 'Speciality Nutrients', icon: require('../../../assets/images/shop/speacialityNutrents.png') },
    { id: '8', title: 'Veterinary', icon: require('../../../assets/images/shop/veterinary.png') },
    { id: '9', title: ' ' },
];

export default function ShopScreen() {
    const navigation = useNavigation();
    return (

        <>
            <View style={{ marginTop: 30 }}>
                <CustomHeader
                    type="shop"
                    topTitle="Shop"
                    showLocation={true}
                    subtitle="Store Code: S0584 | Mana Gromor Centre Akola"
                    onBackPress={() => navigation.goBack()}
                    onCartPress={() => console.log('Cart pressed')}
                    onNotificationPress={() => console.log('Notification pressed')}
                />
            </View>

            {/* Search */}
            <SearchBar placeholder="Search for Seeds" />
            <SafeAreaView style={styles.container}>

                <ScrollView>
                    <FlatList
                        data={categories}
                        renderItem={({ item }) => (
                            item.id != 9 ? <CategoryCard title={item.title} icon={item.icon} /> : <View style={{ width: '30%' }}> </View>
                        )}
                        keyExtractor={(item) => item.id}
                        numColumns={3}
                        columnWrapperStyle={{ justifyContent: 'space-between', paddingHorizontal: 10 }}
                        contentContainerStyle={{ paddingVertical: 10 }}

                    />
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
        // paddingHorizontal: 16
    },
    gridContainer: {
        margin: 20
    },
});
