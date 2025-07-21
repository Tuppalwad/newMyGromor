import React, { useEffect, useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { TabBar } from './tabbar';

// import HomeComponent from '../pages/dashboard_Modules/tabs/home';
// import GromorStore from '../pages/dashboard_Modules/tabs/gromo-store';
// import AdvisoryDashboard from '../pages/dashboard_Modules/tabs/advisory-dashboard';
// import HomeMarketValue from '../pages/dashboard_Modules/tabs/market-value/marketvalue';
// import PostFeedScreen from '../pages/sidebar_Modules/postFeed';
// import ProductScreen from '../pages/product_Modules/products';
import { Screen } from './screen';
import { UserManager } from '../storage';
import { useSelector } from 'react-redux';
import HomeScreen from '../pages/dashboard_Modules/tabs/home';
import Advisory from '../pages/dashboard_Modules/tabs/advisory-dashboard';
import CropDoctor from '../pages/dashboard_Modules/tabs/crop-doctor';
import Products from '../pages/product_Modules/products';
import MarketValue from '../pages/dashboard_Modules/tabs/market-value';
import ShopScreen from '../pages/product_Modules/product-category/ShopScreen';
import ProductCategories from '../pages/product_Modules/product-category';

const Tab = createBottomTabNavigator();

export const TabNavigator = () => {
  UserManager.loadUser();
  const [appLanguage, setAppLanguage] = useState(
    UserManager?.getAppMultiLanguage,
  );
  const farmerAddress = useSelector(state => state.farmer.farmerAddressArray);

  useEffect(() => {
    UserManager?.loadAppMultiLangauge().then(res => {
      setAppLanguage(JSON.parse(res));
    });
  }, [UserManager?.appMultiLanguage]);

  return (
    <Tab.Navigator
      backBehavior={'initialRoute'}
      detachInactiveScreens={true}
      screenOptions={{ headerShown: false }}
      tabBar={props => <TabBar {...props} />}>
      <Tab.Screen
        name={appLanguage?.home ?? Screen.homes}
        component={HomeScreen}
      />
      <Tab.Screen
        name={appLanguage?.my_crop_advisory ?? Screen.cropAdvisory}
        component={Advisory}
      />
      {/* {farmerAddress?.features?.isFeedsEnabled && ( */}

      {/* )} */}
      <Tab.Screen
        name={appLanguage?.Shop ?? Screen.Shop}
        component={ProductCategories}
      />
      <Tab.Screen
        name={appLanguage?.cropDocktore ?? Screen.cropDocktore}
        component={CropDoctor}
      />
      {/* <Tab.Screen
        name={appLanguage?.market_value ?? Screen.marketValue}
        component={MarketValue}
      /> */}

      <Tab.Screen
        name={appLanguage?.Community ?? Screen.Community}
        component={MarketValue}
      />

    </Tab.Navigator>
  );
};
