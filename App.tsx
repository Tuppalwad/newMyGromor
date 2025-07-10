// import React from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import SplashScreen from './src/pages/splash';
// import HomeScreen from './src/pages/home';
// import WelcomeScreen from './src/pages/welcome';
// import LanguageScreen from './src/pages/language/LanguageScreen';
// import LoginScreen from './src/pages/login/LoginScreen';
// import VerifyOtp from './src/pages/login/VerifyOtp';
// import { Provider } from 'react-redux';
// import store from './src/redux/store';

// const Stack = createNativeStackNavigator();

// export default function App() {
//   return (
//     <Provider store={store}>
//       <NavigationContainer>
//         <Stack.Navigator initialRouteName="Splash" screenOptions={{ headerShown: false }}>
//           <Stack.Screen name="Splash" component={SplashScreen} />
//           <Stack.Screen name="Home" component={HomeScreen} />
//           <Stack.Screen name='WelcomeScreen' component={WelcomeScreen} />
//           <Stack.Screen name='language' component={LanguageScreen} />
//           <Stack.Screen name='Login' component={LoginScreen} />
//           <Stack.Screen name='VerifyOtp' component={VerifyOtp} />

//         </Stack.Navigator>
//       </NavigationContainer>
//     </Provider>
//   );
// }



import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from './src/pages/splash';
import HomeScreen from './src/pages/home';
import WelcomeScreen from './src/pages/welcome';
import LanguageScreen from './src/pages/language/LanguageScreen';
import LoginScreen from './src/pages/login/LoginScreen';
import VerifyOtp from './src/pages/login/VerifyOtp';
import { Provider } from 'react-redux';
import store from './src/redux/store';
import messaging from '@react-native-firebase/messaging';
// import PushNotification from 'react-native-push-notification';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import { Platform } from 'react-native';
// import { UserManager } from './src/storage';
import NetInfo from '@react-native-community/netinfo';
import { requestPermission } from './src/config/permission';
import { Isplatform_Android } from './src/config/resposiveSize';
import { setJsonAsync } from './src/utils/async';

const Stack = createNativeStackNavigator();


async function requestUserPermission() {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log('Authorization status:', authStatus);
    const fcmToken = await getFcmToken();
    await setJsonAsync("FCMToken", { token: fcmToken });
  }
}

const getFcmToken = async () => {
  const fcmToken = await messaging().getToken();
  if (fcmToken) {
    console.log('Your Firebase Token is:', fcmToken);
    return fcmToken;
  } else {
    console.log('Failed to get FCM token');
  }
};



export default function App() {


  // const [show, setShow] = useState(false);
  // const [hookedshow, setHookedshow] = useState({ visible: false, Message: '' });

  // const unsubscribe = NetInfo.addEventListener(states => {
  //   if (show === states.isConnected) {
  //     setShow(!states.isConnected);
  //   }
  // });

  // useEffect(() => {
  //   if (Isplatform_Android) {
  //     requestPermission('NOTIFICATIONS');
  //   }

  // }, []);

  // useEffect(() => {
  //   const type = 'notification';
  //   PushNotificationIOS.addEventListener(type, onRemoteNotification);
  //   return () => {
  //     PushNotificationIOS.removeEventListener(type);
  //   };
  // });

  // const onRemoteNotification = (notification: any) => {
  //   console.log('onRemoteNotification', notification);

  // };



  // useEffect(() => {
  //   // Assume a message-notification contains a "type" property in the data payload of the screen to open
  //   messaging().onNotificationOpenedApp(remoteMessage => {
  //     console.log(
  //       'Notification caused app to open from background state:',
  //       remoteMessage.notification,
  //     );
  //     // navigation.navigate(remoteMessage.data.type);
  //   });
  // }, []);

  // useEffect(() => {
  //   messaging()
  //     .getToken()
  //     .then(token => {
  //       console.log('NOTIFICATION 123 : config 2 --->', token);
  //       // UserManager.updateFcmToken(token);
  //     });

  //   messaging().onMessage(response => {
  //     // console.log(JSON.stringify(response));
  //     if (Platform.OS !== 'ios') {
  //       showNotification(response.notification);
  //       return;
  //     }
  //     PushNotificationIOS.requestPermissions().then(() =>
  //       showNotification(response.notification),
  //     );
  //   });

  //   messaging().setBackgroundMessageHandler(
  //     async ({ }) => {
  //       // console.log('in background wer received FCM');
  //     },
  //   );

  //   const showNotification = (notification: any) => {
  //     // console.log("Going to show Notification");
  //     // PushNotification.localNotification({
  //     //   title: notification.title,
  //     //   message: notification.body,
  //     // });
  //   };
  //   return () => {
  //     unsubscribe();
  //   };
  // }, []);



  useEffect(() => {
    requestUserPermission();
  }, []);

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Splash" screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Splash" component={SplashScreen} />
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name='WelcomeScreen' component={WelcomeScreen} />
          <Stack.Screen name='language' component={LanguageScreen} />
          <Stack.Screen name='Login' component={LoginScreen} />
          <Stack.Screen name='VerifyOtp' component={VerifyOtp} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
