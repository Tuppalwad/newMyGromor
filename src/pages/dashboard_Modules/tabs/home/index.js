// import { StyleSheet, Text, View, ScrollView, SafeAreaView, TextInput, Image, FlatList, Dimensions } from 'react-native';
// import React from 'react';
// import CustomHeader from '../../../../components/common/CustomHeader';
// import Slider from '../../../../components/Slider';
// import { useNavigation } from '@react-navigation/native';
// import ServiceCard from '../../../../components/home/ServiceCard';
// import searchIcon from '../../../../assets/images/splash/search.png'
// // Import your custom components: SearchBar, Slider, ServiceCard, FooterBar, etc.
// import Weather from '../../../../assets/images/common/Weather.png';
// import RightArrow from '../../../../assets/images/common/rightArrow.png';
// import LinearGradient from 'react-native-linear-gradient';
// import location from '../../../../assets/images/common/locationGreen.png'

// import SprayingService from '../../../../assets/images/common/SprayingService.png'
// import DoorDelivery from '../../../../assets/images/common/doorDelivery.png'
// import GromorStore from '../../../../assets/images/common/gromorStore.png'
// import CropDoctore from '../../../../assets/images/common/cropDoctor.png'
// import AskTheExperts from '../../../../assets/images/common/AskExpert.png'
// import CropAdvisory from '../../../../assets/images/common/CropAdvisoryTab.png'
// import AgriVideo from '../../../../assets/images/common/AgriVideos2.png'
// import MyCrop from '../../../../assets/images/common/MyCrops.png'
// import GromorConnect from '../../../../assets/images/common/ConnectGromorTab.png'
// import MandiRates from '../../../../assets/images/common/MandiRates.png'
// import fertilizerCal from '../../../../assets/images/common/fertilizerCalculator.png'
// import BuyProduct from '../../../../assets/images/common/buyProduct.png';


// const services = [
//   { title: 'Buy Products', screen: 'ShopScreen', icon: BuyProduct }, // Replace with actual icon if different
//   { title: 'Spraying Services', screen: '', icon: SprayingService },
//   { title: 'Door Delivery', screen: '', icon: DoorDelivery },
//   { title: 'Gromor Store', screen: '', icon: GromorStore },
//   { title: 'Crop Doctor', screen: '', icon: CropDoctore },
//   { title: 'Ask the Experts', screen: '', icon: AskTheExperts },
//   { title: 'My Crop Advisory', screen: '', icon: CropAdvisory },
//   { title: 'Agri Video', screen: 'AgriVideo', icon: AgriVideo },
//   { title: 'My Crops', screen: '', icon: MyCrop },
//   { title: 'Gromor Connect', screen: '', icon: GromorConnect },
//   { title: 'Mandi Rates', screen: '', icon: MandiRates },
//   { title: 'Fertilizer Calculator', screen: '', icon: fertilizerCal },
// ];

// const numColumns = 3;
// const screenWidth = Dimensions.get('window').width;
// const itemSize = screenWidth / numColumns;


// const HomeScreen = () => {
//   const navigation = useNavigation();

//   const numColumns = 3; // or 2 depending on your design

//   const renderItem = ({ item }) => (
//     <ServiceCard
//       title={item.title}
//       icon={item.icon}
//       onPress={() => item.screen && navigation.navigate(item.screen)}
//     />
//   );

//   return (
//     <SafeAreaView style={styles.container}>
//       {/* Top Weather Strip */}
//       <LinearGradient
//         colors={['#fcf5d7ff', '#FFFFFF']}
//         start={{ x: 0, y: 0 }}
//         end={{ x: 0, y: 0.5 }}
//         style={styles.container}
//       >
//         <View style={styles.weatherStrip}>
//           <View style={{ flexDirection: 'row', alignItems: 'center' }}>
//             <Image source={Weather} style={{ width: 16, height: 16, marginRight: 4 }} resizeMode='contain' />
//             <Text style={styles.weatherText}> 31°C  Partly cloudy and light winds</Text>
//           </View>
//           <View style={{ flexDirection: 'row', alignItems: 'center' }}>
//             <Text style={styles.weatherLink}>View</Text>
//             <Image source={RightArrow} style={{ width: 8, height: 8, marginLeft: 4, tintColor: '#6AB42D' }} resizeMode='contain' />
//           </View>
//         </View>

//         {/* Header */}
//         <CustomHeader
//           type="home"
//           welcomeText="Ramachandra"
//           onMenuPress={() => navigation.openDrawer()}
//           onCartPress={() => console.log('Cart pressed')}
//           onNotificationPress={() => console.log('Notification pressed')}
//         // onSearch={(text) => console.log('Search:', text)}
//         />

//         {/* Search Bar */}
//         <View style={styles.searchContainer}>
//           <TextInput
//             placeholder="Search for Seeds"
//             placeholderTextColor="#999"
//             style={styles.searchInput}
//           // onChangeText={onSearch}
//           />
//           <Image source={searchIcon} style={styles.searchIcon} />
//         </View>

//         <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>
//           {/* Slider */}
//           <View style={styles.sliderContainer}>
//             <Slider />
//           </View>

//           {/* Service Section */}
//           <FlatList
//             data={services}
//             renderItem={renderItem}
//             keyExtractor={(item, index) => index.toString()}
//             numColumns={numColumns}
//             columnWrapperStyle={{ justifyContent: 'space-between', paddingHorizontal: 10 }}
//             contentContainerStyle={{ paddingVertical: 10 }}
//           />

//           {/* Any Other Sections */}
//         </ScrollView>

//         {/* Bottom Footer */}
//         <View style={styles.footerBar}>
//           <Image source={location} style={{ width: 15, height: 15 }} resizeMode='contain' />
//           <Text style={{ marginLeft: 10 }}>Store Code: S0584 | Mana Gromor Centre Akola </Text>
//         </View>
//       </LinearGradient>
//     </SafeAreaView>
//   );
// };

// export default HomeScreen;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     // backgroundColor: '#fff',
//   },
//   weatherStrip: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',      // vertically center content
//     // backgroundColor: '#f5f5f5',
//     paddingVertical: 8,        // increased padding
//     height: 50,
//     marginTop: 25,
//     paddingHorizontal: 16,
//   },
//   servicesContainer: {
//     marginTop: 24,
//   },
//   cardWrapper: {
//     width: itemSize,
//     // padding: 10,
//     alignItems: 'center',
//   },
//   weatherText: {
//     fontSize: 12,
//     color: '#333',
//     lineHeight: 10
//   },
//   weatherLink: {
//     fontSize: 12,
//     color: '#6AB42D',
//     fontWeight: '500',
//   },
//   searchContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#ffffff',
//     marginHorizontal: 16,
//     marginBottom: 8,
//     borderRadius: 8,
//     paddingHorizontal: 12,
//     paddingVertical: 8,
//   },
//   searchInput: {
//     flex: 1,
//     fontSize: 14,
//     color: '#333',
//   },
//   searchIcon: {
//     width: 16,
//     height: 16,
//   },
//   scrollView: {
//     flex: 1,
//     // paddingHorizontal: 16,
//   },
//   sliderContainer: {
//     marginTop: 16,
//   },

//   footerBar: {
//     padding: 10,
//     borderTopWidth: 1,
//     borderColor: '#ddd',
//     alignItems: 'center',
//     backgroundColor: '#e6fceeff',
//     flexDirection: 'row',
//     justifyContent: 'center'
//   },
// });


import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import HomeScreen from './HomeScreen';
import { useDispatch, useSelector } from 'react-redux';
import { useOperation } from '../../../../redux/operation';
import { useIsFocused } from '@react-navigation/native';
import { createLoadingSelector } from '../../../../redux/loading-reducer';
import { defCardData, deftabData } from './index.service';
import messaging from '@react-native-firebase/messaging';
import { UserManager } from '../../../../storage';
import { isEmpty } from '../../../../utils/validator';
import { Isplatform_IOS } from '../../../../config/resposiveSize';
import Geolocation from '@react-native-community/geolocation';
import { PERMISSIONS } from 'react-native-permissions';
import { HEToast } from '../../../../components/toast';
import { WEATHER_APP_KEY } from '../../../../config';
import { FarmerType } from '../../../../redux/farmer/type';
import { WeatherType } from '../../../../redux/weather-report/type';
import { ProductType } from '../../../../redux/product/type';
import moment from 'moment';


const Home = () => {

  UserManager.loadUser();
  const [appLanguage, setAppLanguage] = useState(null);
  const dispatch = useDispatch();
  const operation = useOperation();
  const isFocussed = useIsFocused();
  const loadingSelector = createLoadingSelector([
    FarmerType.farmerCallDetail,
    FarmerType.farmerAddress,
    WeatherType.location,
    WeatherType.monthlyWeather,
    WeatherType.weather,
    WeatherType.currentWeather,
    ProductType.productBanners,
  ]);
  const isLoading = useSelector(state => loadingSelector(state));
  const hourlyWeatherData = useSelector(state => state.weather.hourlyWeather);
  const weeklyWeatherData = useSelector(state => state.weather.weeklyWeather);
  const monthlyWeatherData = useSelector(state => state.weather.monthlyWeather);
  const currentWeatherData = useSelector(state => state.weather.currentWeather);
  const [currentWeather, setCurrentWeather] = useState(null);
  const [data, setData] = useState([]);
  const bannerDataFromReducer = useSelector(state => state.product.bannerData);
  const [showWeather, setShowWeather] = useState(false);
  const [location, setLocation] = useState(null);
  const [PRODUCT, setPRODUCT] = useState([]);
  const [tabData, settabData] = useState(deftabData(UserManager?.getAppMultiLanguage));
  const [activeTab, setActiveTab] = useState(tabData[0]);
  const [section, setSections] = useState({ activeSections: [] });
  const [isNodata, setIsNoData] = useState(false);
  const [notification, setnotification] = useState({
    visible: false,
    Message: ' ',
    title: ' ',
  });
  const farmerAddress = useSelector(state => state.farmer.farmerAddressArray);

  useEffect(() => {
    messaging().onNotificationOpenedApp(remoteMessage => {
      console.log(
        'Notification caused app to open from background state:',
        remoteMessage.notification,
      );
      setnotification({
        visible: true,
        Message: remoteMessage.notification?.body ?? '',
        title: remoteMessage.notification?.title ?? '',
      });
    });
    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage) {
          setnotification({
            visible: true,
            Message: remoteMessage.notification?.body ?? '',
            title: remoteMessage.notification?.title ?? '',
          });
          console.log(
            'Notification caused app to open from quit state:',
            remoteMessage.notification,
          );
        }
      });
  }, []);

  useEffect(() => {
    if (isFocussed) {
      UserManager.loadAppMultiLangauge().then(res => {
        setAppLanguage(JSON.parse(res));
      });
      let param = UserManager.getUserLanguage;
      let addressParam = {
        id: UserManager.getUserId,
        mobileNumber: UserManager.getUserMobileNumber,
      };
      dispatch(operation.farmer.getFarmerLanguage(param));
      dispatch(operation.farmer.getFarmerAddress(addressParam));
      if (isEmpty(bannerDataFromReducer)) {
        dispatch(operation.product.getProductBanners());
      }
    }
  }, [isFocussed]);

  useEffect(() => {
    const tempArr = defCardData(appLanguage, farmerAddress);
    setPRODUCT(tempArr);
  }, [isFocussed, appLanguage, farmerAddress]);

  // console.log('App Language:', JSON.stringify(appLanguage, null, 2));


  const onPressItem = (items, index) => {
    let tempArr = [...data];
    tempArr?.map((tempItem, tempIndex) => {
      if (tempIndex === index) {
        tempItem['expanded'] = !tempItem['expanded'];
      } else {
        tempItem['expanded'] = false;
      }
    });
    setData(tempArr);
  };

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

  const onPressProductItem = item => {
    if (item?.id === 1) {
      navigation.navigate(
        appLanguage?.my_crop_advisory ?? Screen.cropAdvisory,
        { type: 'Advisory HNI' },
      );
    } else if (item?.id === 2) {
      navigation.navigate(
        appLanguage?.my_crop_advisory ?? Screen.cropAdvisory,
        { type: 'Advisory Crop' },
      );
    } else if (item?.id === 3) {
      navigation.navigate(appLanguage?.buy_products ?? Screen.product);
    } else if (item?.id === 4) {
      navigation.navigate(appLanguage?.lblFeeds ?? Screen.postFeed);
    } else if (item?.id === 5) {
      navigation.navigate(
        appLanguage?.my_crop_advisory ?? Screen.cropAdvisory,
        { type: 'Advisory Farmland' },
      );
    } else if (item?.id === 6) {
      navigation.navigate(Screen.Plantix);
    } else if (item?.id === 7) {
      navigation.navigate(appLanguage?.market_value ?? Screen.marketValue);
    } else if (item?.id === 8) {
      navigation.navigate(Screen.viewAllDealers);
    } else if (item?.id === 9) {
      navigation.navigate(
        appLanguage?.my_crop_advisory ?? Screen.cropAdvisory,
        { type: 'Advisory Quries' },
      );
    } else if (item?.id === 10) {
      navigation.navigate(Screen.adVideo);
    } else if (item?.id === 11) {
      navigation.navigate(
        appLanguage?.mana_gromor_stores ?? Screen.gromorStore,
      );
    } else if (item?.id === 12) {
      navigation.navigate(Screen.FylloScreen);
    } else if (item?.id === 13) {
      navigation.navigate(Screen.myServices);
    }
  };

  //////// <<<<<Location_Weather - Modlues >>>>>>> ///////
  async function requestPermissions() {
    if (Isplatform_IOS) {
      const auth = await Geolocation.requestAuthorization('whenInUse');
      getCurrentLocation();
    } else {
      requestLocationPermission();
    }
  }

  useEffect(() => {
    if (
      isFocussed &&
      isEmpty(currentWeatherData) &&
      isEmpty(bannerDataFromReducer)
    ) {
      requestPermissions();
    }
  }, [isFocussed, currentWeatherData, bannerDataFromReducer]);

  const requestLocationPermission = async () => {
    if (Isplatform_IOS) {
      getCurrentLocation();
    } else {
      try {
        const granted = await request(
          PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
          {
            title:
              appLanguage?.lblLocationAccessRequired ??
              'Location Access Required',
            message:
              appLanguage?.lblThisAppneedscurrent ??
              'This App needs to Access your current location',
            buttonNegative: appLanguage?.cancel ?? 'Cancel',
            buttonPositive: appLanguage?.lblOk ?? 'OK',
          },
        );
        if (granted === RESULTS.GRANTED) {
          getCurrentLocation();
        } else {
          HEToast(appLanguage?.lblAuthorization ?? 'Location access is denied');
        }
      } catch (err) {
        HEToast(
          appLanguage?.lblLocationservice ??
          'Location service is disabled or unavailable',
        );
      }
    }
  };

  const onChangeLocationSection = userLocation => {
    dispatch(operation.weather.setLocation(userLocation));
    setLocation(userLocation);
    let params = {
      units: 'metric',
      appid: WEATHER_APP_KEY,
      lat: userLocation?.latitude,
      lon: userLocation?.longitude,
    };
    dispatch(operation.weather.getCurrentWeather(params));
  };

  const getCurrentLocation = () => {
    Geolocation.getCurrentPosition(
      position => {
        let userLocation = {
          latitude: position.coords?.latitude,
          longitude: position.coords?.longitude,
        };
        UserManager.saveLocation(userLocation);
        onChangeLocationSection(userLocation);
      },
      error => {
        const { code, message } = error;

        console.log(code, message, 'position');
        if (code === 'CANCELLED') {
          HEToast(
            appLanguage?.lblLocationcancelled ??
            'Location cancelled by user or by another request',
          );
        }
        if (code === 'UNAVAILABLE') {
          HEToast(
            appLanguage?.lblLocationservice ??
            'Location service is disabled or unavailable',
          );
        }
        if (code === 'TIMEOUT') {
          HEToast(
            appLanguage?.lblLocationrequest ?? 'Location request timed out',
          );
        }
        if (code === 'UNAUTHORIZED') {
          HEToast(appLanguage?.lblAuthorization ?? 'Location access is denied');
        }
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
    );
  };

  useEffect(() => {
    if (tabData?.length > 0) {
      setActiveTab(tabData[0]);
    }
  }, [tabData]);

  useEffect(() => {
    if (location) {
      let params = {
        units: 'metric',
        appid: WEATHER_APP_KEY,
        lat: location?.latitude,
        lon: location?.longitude,
      };
      let params_ = {
        units: 'metric',
        appid: WEATHER_APP_KEY,
        lat: location?.latitude,
        lon: location?.longitude,
        cnt: activeTab.id == 1 ? 24 : 7,
        activeTab: activeTab.id,
      };
      if (activeTab.id === 3 && isEmpty(monthlyWeatherData)) {
        dispatch(operation.weather.getMonthlyWeather(params));
      } else if (isEmpty(hourlyWeatherData)) {
        dispatch(operation.weather.getWeather(params_));
      }
    }
  }, [activeTab, location]);

  console.log('monthlyWeatherData', monthlyWeatherData)

  useEffect(() => {
    if (activeTab.id === 1) {
      let tempData = hourlyWeatherData?.map(item => ({ ...item })) || [];  // deep clone items
      var today = moment.utc(new Date()).local().format('DD');
      tempData?.forEach((item) => {
        var time = moment
          .utc(new Date(item?.dt * 1000 - 3600 * 1000))
          .local()
          .format('DD');
        if (time === today) {
          setCurrentWeather(item);
          item.expanded = true;
        } else {
          item.expanded = false;
        }
      });
      setData(tempData ?? []);
    } else if (activeTab.id === 2) {
      let tempData = weeklyWeatherData?.map(item => ({ ...item })) || [];  // deep clone items
      var today = moment.utc(new Date()).local().format('DD');
      tempData?.forEach((item) => {
        var time = moment
          .utc(new Date(item?.dt * 1000 - 3600 * 1000))
          .local()
          .format('DD');
        if (time === today) {
          setCurrentWeather(item);
          item.expanded = true;
        } else {
          item.expanded = false;
        }
      });
      setData(tempData ?? []);
    } else if (activeTab.id === 3) {
      if (monthlyWeatherData.length != 0) {
        let tempData = monthlyWeatherData?.map(item => ({ ...item })) || [];  // deep clone items
        var today = moment.utc(new Date()).local().format('DD');
        tempData?.forEach((item) => {
          var time = moment
            .utc(new Date(item?.dt * 1000 - 3600 * 1000))
            .local()
            .format('DD');
          if (time === today) {
            setCurrentWeather(item);
            item.expanded = true;
          } else {
            item.expanded = false;
          }
        });
        setData(tempData ?? []);

      } else {
        setData([]);
      }
    }
  }, [
    activeTab,
    hourlyWeatherData,
    weeklyWeatherData,
    monthlyWeatherData,
    currentWeatherData,
  ]);

  const onChangeWeatherSection = activeSections => {
    setSections({ activeSections });
  };

  const handleTabPress = id => {
    let selecteddata = tabData?.filter(e => e.id === id);
    if (selecteddata != null && selecteddata.length > 0) {
      setActiveTab(selecteddata[0]);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <HomeScreen 
        
      />
    </View>
  )
}

export default Home

const styles = StyleSheet.create({

})