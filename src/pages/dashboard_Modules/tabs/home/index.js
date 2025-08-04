import { Linking, SafeAreaView, StyleSheet, Text, View } from 'react-native'
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
import { PERMISSIONS, request, RESULTS } from 'react-native-permissions';
import { HEToast } from '../../../../components/toast';
import { Configuration, WEATHER_APP_KEY } from '../../../../config';
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

    console.log('kkkkkkkkkk')

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
        console.log(err, 'rrrrrrrrrs')
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
      { enableHighAccuracy: false, timeout: 30000, maximumAge: 10000 }
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
    <SafeAreaView style={{ flex: 1 }}>
      <HomeScreen
        onPressCall={onPressCall}
        isLoading={isLoading}

      />
    </SafeAreaView>
  )
}

export default Home

const styles = StyleSheet.create({

})