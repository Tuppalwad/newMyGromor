import { StyleSheet, Text, View, ScrollView, SafeAreaView, TextInput, Image, FlatList, Dimensions, Modal, TouchableOpacity, TouchableWithoutFeedback, Linking } from 'react-native';
import React, { useState } from 'react';
import CustomHeader from '../../../../components/common/CustomHeader';
import Slider from '../../../../components/common/Slider';
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
import { useDispatch, useSelector } from 'react-redux';
import { Screen } from '../../../../router/screen';
import Cart from '../../../product_modules/my-cart';
import callIcon from '../../../../assets/images/common/homeCallIcon.png'
import wheat from '../../../../assets/images/common/wheat.png'
import { Configuration } from '../../../../config';
import { useOperation } from '../../../../redux/operation';
import SearchBar from '../../../../components/common/SearchBar';
import Indicator from '../../../../components/common/Indicator';
import WeatherScreen from '../../../product_modules/weather/weatherScreen';

const numColumns = 3;
const screenWidth = Dimensions.get('window').width;
const itemSize = screenWidth / numColumns;


const getWeatherIcon = (weatherId) => {
    if (weatherId >= 200 && weatherId < 300) {
        return require('../../../../assets/images/common/rain.png'); // thunderstorm
    } else if (weatherId >= 300 && weatherId < 500) {
        return require('../../../../assets/images/common/raindrop.png'); // drizzle
    } else if (weatherId >= 500 && weatherId < 600) {
        return require('../../../../assets/images/common/rain.png'); // rain
    } else if (weatherId >= 600 && weatherId < 700) {
        return require('../../../../assets/images/common/snow.png'); // snow
    } else if (weatherId >= 700 && weatherId < 800) {
        return require('../../../../assets/images/common/fog.png'); // atmosphere
    } else if (weatherId === 800) {
        return require('../../../../assets/images/common/sun.png'); // clear
    } else if (weatherId > 800) {
        return require('../../../../assets/images/common/suncloud.png'); // clouds
    }
    return require('../../../../assets/images/common/suncloud.png'); // default
};


const HomeScreen = ({ isloading }) => {
    const navigation = useNavigation();
    const [storeModalVisible, setStoreModalVisible] = useState(false);
    const StoreCodeDetails = useSelector(
        state => state.farmer.farmerStoreCodeDetails,
    );
    const appLanguages = useSelector(state => state.user.appMultiLanguage);
    const numColumns = 3;
    const farmerAddress = useSelector(state => state.farmer.farmerAddressArray);
    const operation = useOperation();
    const dispatch = useDispatch()
    const currentWeatherData = useSelector(state => state.weather.currentWeather);


    const services = [
        { title: appLanguages.buy_products ?? 'Buy Products', screen: Screen.viewAllCategory, icon: BuyProduct }, // Replace with actual icon if different
        { title: appLanguages.spraying_service ?? 'Spraying Services', screen: Screen.MyServicesScreen, icon: SprayingService, state: 'Spraying Services' },
        { title: appLanguages.door_delivery ?? 'Door Delivery', screen: Screen.MyServicesScreen, icon: DoorDelivery, state: 'Door Delivery' },
        { title: appLanguages.mana_gromor_store ?? ' Mana Gromor Store', screen: Screen.marketValue, icon: GromorStore },
        { title: appLanguages.lblCropDoctor ?? 'Crop Doctor', screen: '', icon: CropDoctore },
        { title: appLanguages.ask_expert ?? 'Ask Experts', screen: '', icon: AskTheExperts },
        { title: appLanguages.my_crop_advisory ?? 'My Crop Advisory', screen: '', icon: CropAdvisory },
        { title: appLanguages.video ?? 'Agri Video', screen: Screen.adVideo, icon: AgriVideo },
        { title: appLanguages.cultivated_crops ?? 'My Crops', screen: Screen.mycrop, icon: MyCrop },
        { title: appLanguages.lblFeeds ?? 'Gromor Connect', screen: '', icon: GromorConnect },
        { title: 'Mandi Rates', screen: '', icon: MandiRates },
        { title: 'Fertilizer Calculator', screen: '', icon: fertilizerCal },
    ];

    const renderItem = ({ item }) => (
        <ServiceCard
            title={item.title}
            icon={item.icon}
            onPress={() => item.screen && navigation.navigate(item.screen, { state: item?.state ?? "" })}
        />
    );

    const { storeName, storeCode, address, contactDetails } = StoreCodeDetails

    const onPressCall = () => {

        let phoneNumber = Configuration.tollfreenumber_Linking;
        try {
            let param = {
                farmerId: farmerAddress?.farmerIdentityId,
                name: farmerAddress?.name,
                mobileNumber: farmerAddress?.mobileNumber,
                timeOfCall: new Date(),
            };
            dispatch(operation.farmer.postCallMethod(param)).then(res => {
                Linking.openURL(`tel:${phoneNumber}`);
            });
        } catch (e) { }
    };

    const onChangeText = () => {

    }


    return (
        <View style={styles.container}>
            <LinearGradient
                colors={['#fcf5d7ff', '#FFFFFF']}
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 0.5 }}
                style={styles.container}
            >

                <View style={styles.weatherStrip}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Image
                            source={getWeatherIcon(currentWeatherData?.weather?.[0]?.id || 804)}
                            style={{ width: 16, height: 16, marginRight: 4 }}
                            resizeMode='contain'
                        />
                        <Text style={styles.weatherText}> {currentWeatherData?.main?.temp ? Math.round(currentWeatherData.main.temp) : 29}°C  Partly cloudy and light winds</Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <TouchableOpacity onPress={() => navigation.navigate('WeatherScreen')}>

                            <Text style={styles.weatherLink}>View</Text>
                        </TouchableOpacity>
                        <Image source={RightArrow} style={{ width: 8, height: 8, marginLeft: 4, tintColor: '#6AB42D' }} resizeMode='contain' />
                    </View>
                </View>

                {/* Header */}
                <CustomHeader
                    type="home"
                    welcomeText={farmerAddress?.name ?? "Farmer"}
                    onMenuPress={() => navigation.openDrawer()}
                    onCartPress={() => navigation.navigate('Cart')}
                    onNotificationPress={() => console.log('Notification pressed')}
                // onSearch={(text) => console.log('Search:', text)}
                />

                {/* Search Bar */}
                <View style={styles.searchContainer}>
                    {/* <TextInput
                        placeholder="Search for Seeds"
                        placeholderTextColor="#999"
                        style={styles.searchInput}
                    />
                    <Image source={searchIcon} style={styles.searchIcon} /> */}
                    <SearchBar onChangeText={onChangeText} />
                </View>


                <FlatList
                    data={[{}]}
                    renderItem={() => (<View style={{ flex: 1 }}>
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
                        <View style={styles.BottomContainer}>
                            <Text style={styles.line1}>
                                <Text style={styles.bold}>30,00,000+ </Text>
                                farmers
                            </Text>
                            <Text style={styles.line2}>
                                trust <Text style={styles.brand}>MyGromor</Text> for
                            </Text>
                            <Text style={styles.line3}>
                                their <Image source={wheat} style={{ height: 20, width: 30, resizeMode: 'contain' }} /> agricultural needs.
                            </Text>

                            <Text style={styles.callLine}>We are just a call away 👉</Text>
                        </View>
                    </View>
                    )}
                />

                <TouchableOpacity onPress={onPressCall} style={{ position: 'absolute', bottom: 60, right: 15 }}>
                    <Image source={callIcon} style={{ width: 50, height: 50 }} />
                </TouchableOpacity>

                {/* Bottom Footer */}
                <TouchableOpacity onPress={() => setStoreModalVisible(true)}>
                    <View style={styles.footerBar}>
                        <Image source={location} style={{ width: 16, height: 18 }} resizeMode='contain' />
                        <Text style={{ marginLeft: 10 }}>{appLanguages.store_code ?? "Store Code: "}<Text style={{ fontWeight: 600, fontSize: 16, color: '#267c2cff' }}>{storeCode ?? ""}</Text> | {storeName?.slice(0, 24) ?? "" + "..."}</Text>
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
                    <View style={{ flex: 1, justifyContent: 'flex-end', backgroundColor: 'rgba(0,0,0,0.4)', marginBottom: 60 }}>
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
            {/* <Indicator show={isloading} /> */}
        </View>
    );
};

export default HomeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    weatherStrip: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 8,
        paddingVertical: 10,
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
        lineHeight: 15
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
        // marginBottom: 8,
        borderRadius: 8,
        // paddingHorizontal: 12,
        // paddingVertical: 8,
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
    BottomContainer: {
        padding: 20,
        marginBottom: 30,
        alignItems: 'center',
        // backgroundColor: '#F7FAF9', // optional light background
    },
    line1: {
        fontSize: 22,
        lineHeight: 40,
        color: '#A5C2BB',
        fontWeight: '600',
    },
    line2: {
        lineHeight: 40,
        fontSize: 22,
        color: '#A5C2BB',
        fontWeight: '600',
    },
    line3: {
        lineHeight: 40,
        fontSize: 22,
        color: '#A5C2BB',
        fontWeight: '600',
    },
    bold: {
        fontWeight: '700',
    },
    brand: {
        fontWeight: '700',
        color: '#A5C2BB', // Optional branding color for "MyGromor"
    },
    callLine: {
        marginTop: 40,
        fontSize: 16,
        color: '#A0B3AC',
        fontWeight: '600',
    },
});
