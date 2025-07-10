import React, { useEffect, useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { TabBar } from './tabbar';

import { Screen } from './screen';
import { useSelector } from 'react-redux';

const Tab = createBottomTabNavigator();

export const TabNavigator = () => {
    // UserManager.loadUser();
    // const [appLanguage, setAppLanguage] = useState( UserManager?.getAppMultiLanguage );
    // const farmerAddress = useSelector(state => state.farmer.farmerAddressArray);

    // useEffect(() => {
    //     UserManager?.loadAppMultiLangauge().then(res => {
    //         setAppLanguage(JSON.parse(res));
    //     });
    // }, [UserManager?.appMultiLanguage]);

    return (
        <Tab.Navigator
            backBehavior={'initialRoute'}
            detachInactiveScreens={true}
            screenOptions={{ headerShown: false }}
            tabBar={props => <TabBar {...props} />}>
            <Tab.Screen
                name={appLanguage?.home ?? Screen.homes}
                component={HomeComponent}
            />
            <Tab.Screen
                name={appLanguage?.my_crop_advisory ?? Screen.cropAdvisory}
                component={AdvisoryDashboard}
            />
            {/* {farmerAddress?.features?.isFeedsEnabled && (
                <Tab.Screen
                    name={appLanguage?.lblFeeds ?? Screen.postFeed}
                    component={PostFeedScreen}
                />
            )} */}
            <Tab.Screen
                name={appLanguage?.buy_products ?? Screen.product}
                component={ProductScreen}
            />
            <Tab.Screen
                name={appLanguage?.market_value ?? Screen.marketValue}
                component={HomeMarketValue}
            />
        </Tab.Navigator>
    );
};
