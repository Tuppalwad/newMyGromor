import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {
  createDrawerNavigator,
  useDrawerStatus,
  useDrawerProgress,
} from '@react-navigation/drawer';
// import DrawerContent from './drawercontent';
import StackNav from './stacknav';
import { Dimensions, View } from 'react-native';
import analytics from '@react-native-firebase/analytics';
import { UserManager } from '../storage';
import DrawerContent from './drawercontent';

const Drawer = createDrawerNavigator();

// const AppTheme = {
//   colors: {},
//   style: { fontFamily: 'Poppins' },
// };

export default function AppStack() {
  const routeNameRef = React.useRef();
  const navigationRef = React.useRef();


  return (
    <View style={{ flex: 1 }}>

      <NavigationContainer
        ref={navigationRef}
        onReady={() => { routeNameRef.current = navigationRef.current.getCurrentRoute().name }}
        onStateChange={async () => {
          const previousRouteName = routeNameRef.current;
          const currentRouteName = navigationRef.current.getCurrentRoute().name;
          if (previousRouteName !== currentRouteName) {
            await analytics().logEvent(currentRouteName, {
              user_id: UserManager?.getUserId,
              mobile_number: UserManager?.getUserMobileNumber,
            });
          }
          routeNameRef.current = currentRouteName;
        }}
      // theme={AppTheme}
      >
        <Drawer.Navigator
          screenOptions={{
            gestureEnabled: false,
            swipeEnabled: false,
            drawerStyle: {
              width: Dimensions.get('window').width / 1.2,
            },
          }}
          initialRouteName="home"
          onStateChange={null}
          drawerContent={props => <DrawerContent {...props} />}
        >
          <Drawer.Screen
            options={{
              headerShown: false,
              // swipeEnabled: false,
              drawerLabel: () => null,
              title: null,
              drawerIcon: () => null,
              drawerItemStyle: { height: 0 },
            }}
            name="home"
            component={StackNav}
          />
        </Drawer.Navigator>
      </NavigationContainer>
    </View>
  );
}
