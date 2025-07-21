import { StyleSheet, Text, View, ScrollView, SafeAreaView, TextInput, Image, FlatList, Dimensions, Modal, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import React, { useState } from 'react';
import CustomHeader from '../../../../components/common/CustomHeader';
import Slider from '../../../../components/Slider';
import { useNavigation } from '@react-navigation/native';
import ServiceCard from '../../../../components/home/ServiceCard';
import searchIcon from '../../../../assets/images/splash/search.png'
// Import your custom components: SearchBar, Slider, ServiceCard, FooterBar, etc.
import Weather from '../../../../assets/images/common/Weather.png';
import RightArrow from '../../../../assets/images/common/rightArrow.png';
import LinearGradient from 'react-native-linear-gradient';
import location from '../../../../assets/images/common/locationGreen.png'

import SprayingService from '../../../../assets/images/common/SprayingService.png'
import DoorDelivery from '../../../../assets/images/common/doorDelivery.png'
import GromorStore from '../../../../assets/images/common/gromorStore.png'
import CropDoctore from '../../../../assets/images/common/cropDoctor.png'
import AskTheExperts from '../../../../assets/images/common/AskExpert.png'
import CropAdvisory from '../../../../assets/images/common/CropAdvisoryTab.png'
import AgriVideo from '../../../../assets/images/common/AgriVideos2.png'
import MyCrop from '../../../../assets/images/common/MyCrops.png'
import GromorConnect from '../../../../assets/images/common/ConnectGromorTab.png'
import MandiRates from '../../../../assets/images/common/MandiRates.png'
import fertilizerCal from '../../../../assets/images/common/fertilizerCalculator.png'
import BuyProduct from '../../../../assets/images/common/buyProduct.png';
import downarrow from '../../.././../assets/images/common/downArrow.png'
import { useSelector } from 'react-redux';
import { Screen } from '../../../../router/screen';
import Cart from '../../../product_Modules/my-cart';

const services = [
    { title: 'Buy Products', screen: Screen.viewAllCategory, icon: BuyProduct }, // Replace with actual icon if different
    { title: 'Spraying Services', screen: '', icon: SprayingService },
    { title: 'Door Delivery', screen: '', icon: DoorDelivery },
    { title: 'Gromor Store', screen: '', icon: GromorStore },
    { title: 'Crop Doctor', screen: '', icon: CropDoctore },
    { title: 'Ask the Experts', screen: '', icon: AskTheExperts },
    { title: 'My Crop Advisory', screen: '', icon: CropAdvisory },
    { title: 'Agri Video', screen: Screen.adVideo, icon: AgriVideo },
    { title: 'My Crops', screen: '', icon: MyCrop },
    { title: 'Gromor Connect', screen: '', icon: GromorConnect },
    { title: 'Mandi Rates', screen: '', icon: MandiRates },
    { title: 'Fertilizer Calculator', screen: '', icon: fertilizerCal },
];

const numColumns = 3;
const screenWidth = Dimensions.get('window').width;
const itemSize = screenWidth / numColumns;


const HomeScreen = () => {
    const navigation = useNavigation();
    const [storeModalVisible, setStoreModalVisible] = useState(false);
    const StoreCodeDetails = useSelector(
        state => state.farmer.farmerStoreCodeDetails,
    );
    const numColumns = 3;
    const renderItem = ({ item }) => (
        <ServiceCard
            title={item.title}
            icon={item.icon}
            onPress={() => item.screen && navigation.navigate(item.screen)}
        />
    );

    const { storeName, storeCode, address, contactDetails } = StoreCodeDetails


    return (
        <SafeAreaView style={styles.container}>
            {/* Top Weather Strip */}
            <LinearGradient
                colors={['#fcf5d7ff', '#FFFFFF']}
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 0.5 }}
                style={styles.container}
            >
                <View style={styles.weatherStrip}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Image source={Weather} style={{ width: 16, height: 16, marginRight: 4 }} resizeMode='contain' />
                        <Text style={styles.weatherText}> 31°C  Partly cloudy and light winds</Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={styles.weatherLink}>View</Text>
                        <Image source={RightArrow} style={{ width: 8, height: 8, marginLeft: 4, tintColor: '#6AB42D' }} resizeMode='contain' />
                    </View>
                </View>

                {/* Header */}
                <CustomHeader
                    type="home"
                    welcomeText="Ramachandra"
                    onMenuPress={() => navigation.openDrawer()}
                    onCartPress={() => navigation.navigate('Cart')}
                    onNotificationPress={() => console.log('Notification pressed')}
                // onSearch={(text) => console.log('Search:', text)}
                />

                {/* Search Bar */}
                <View style={styles.searchContainer}>
                    <TextInput
                        placeholder="Search for Seeds"
                        placeholderTextColor="#999"
                        style={styles.searchInput}
                    // onChangeText={onSearch}
                    />
                    <Image source={searchIcon} style={styles.searchIcon} />
                </View>

                <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>
                    {/* Slider */}
                    <View style={styles.sliderContainer}>
                        <Slider />
                    </View>

                    {/* Service Section */}
                    <FlatList
                        data={services}
                        renderItem={renderItem}
                        keyExtractor={(item, index) => index.toString()}
                        numColumns={numColumns}
                        columnWrapperStyle={{ justifyContent: 'space-between', paddingHorizontal: 10 }}
                        contentContainerStyle={{ paddingVertical: 10 }}
                    />
                    {/* Any Other Sections */}
                </ScrollView>

                {/* Bottom Footer */}
                <TouchableOpacity onPress={() => setStoreModalVisible(true)}>
                    <View style={styles.footerBar}>
                        <Image source={location} style={{ width: 16, height: 18 }} resizeMode='contain' />
                        <Text style={{ marginLeft: 10 }}>Store Code: <Text style={{ fontWeight: 600, fontSize: 16, color: '#267c2cff' }}>{storeCode}</Text> | {storeName?.slice(0, 24) + "..."}</Text>
                        <Image
                            source={downarrow}
                            style={{ marginLeft: 10, width: 15, height: 15, tintColor: '#22a12aff' }}
                            resizeMode='contain'
                        />
                    </View>
                </TouchableOpacity>

            </LinearGradient>

            <Modal
                visible={storeModalVisible}
                animationType="slide"
                transparent
                onRequestClose={() => setStoreModalVisible(false)}
            >
                <TouchableWithoutFeedback onPress={() => setStoreModalVisible(false)}>
                    <View style={{ flex: 1, justifyContent: 'flex-end', backgroundColor: 'rgba(0,0,0,0.4)', marginBottom: 40 }}>
                        <View style={{
                            backgroundColor: '#DFF5E3',
                            borderTopLeftRadius: 16,
                            borderTopRightRadius: 16,
                            paddingVertical: 20,
                            paddingHorizontal: 16,
                        }}>
                            {/* Optional Close Icon */}
                            <TouchableOpacity onPress={() => setStoreModalVisible(false)} style={{ position: 'absolute', right: 16, top: 16 }}>
                                <Image
                                    source={downarrow}
                                    style={{ marginLeft: 10, width: 15, height: 15, tintColor: '#22a12aff' }}
                                    resizeMode='contain'

                                />
                            </TouchableOpacity>

                            {/* Store Code */}
                            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 6 }}>
                                <Image source={location} style={{ width: 15, height: 15 }} resizeMode='contain' />
                                <Text style={{ fontWeight: 'bold', fontSize: 14, marginLeft: 8, color: '#1B5E20' }}>
                                    Store Code: <Text style={{ fontWeight: 'bold' }}>{storeCode}</Text>
                                </Text>
                            </View>

                            {/* Store Name */}
                            <Text style={{ fontWeight: 'bold', fontSize: 16, color: '#1B5E20', marginBottom: 8 }}>
                                {storeName}
                            </Text>

                            {/* Address */}
                            <View style={{ flexDirection: 'row', marginBottom: 10 }}>
                                {/* <Image source={require('./assets/address_icon.png')} style={{ width: 16, height: 16, marginTop: 2 }} /> */}
                                <Text style={{ marginLeft: 8, color: '#333', flex: 1 }}>
                                    {address}
                                </Text>
                            </View>

                            {/* Phone */}
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                {/* <Image source={require('./assets/phone_icon.png')} style={{ width: 16, height: 16 }} /> */}
                                <Text style={{ marginLeft: 8, color: '#333' }}>+91 {contactDetails}</Text>
                            </View>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>



        </SafeAreaView>
    );
};

export default HomeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: '#fff',
    },
    weatherStrip: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',      // vertically center content
        // backgroundColor: '#f5f5f5',
        paddingVertical: 8,        // increased padding
        height: 50,
        marginTop: 25,
        paddingHorizontal: 16,
    },
    servicesContainer: {
        marginTop: 24,
    },
    cardWrapper: {
        width: itemSize,
        // padding: 10,
        alignItems: 'center',
    },
    weatherText: {
        fontSize: 12,
        color: '#333',
        lineHeight: 10
    },
    weatherLink: {
        fontSize: 12,
        color: '#6AB42D',
        fontWeight: '500',
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#ffffff',
        marginHorizontal: 16,
        marginBottom: 8,
        borderRadius: 8,
        paddingHorizontal: 12,
        paddingVertical: 8,
    },
    searchInput: {
        flex: 1,
        fontSize: 14,
        color: '#333',
    },
    searchIcon: {
        width: 16,
        height: 16,
    },
    scrollView: {
        flex: 1,
        // paddingHorizontal: 16,
    },
    sliderContainer: {
        marginTop: 16,
    },

    footerBar: {
        padding: 10,
        // borderTopWidth: 1,
        borderColor: '#ddd',
        alignItems: 'center',
        backgroundColor: '#DFF5E3',
        flexDirection: 'row',
        justifyContent: 'center',
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10

    },
});
