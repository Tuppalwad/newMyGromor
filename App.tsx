import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, StatusBar, Platform, PermissionsAndroid } from 'react-native';
import { CProvider } from './src/redux';
import AppStack from './src/router/router';
import Toast from 'react-native-toast-message';
import { ToastConfig } from './src/components/toast';
import { UserManager } from './src/storage';
import NetInfo from '@react-native-community/netinfo';
import messaging from '@react-native-firebase/messaging';


async function requestUserPermission() {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log('Authorization status:', authStatus);
    const fcmToken = await getFcmToken();
    console.log()
    // await setJsonAsync("FCMToken", { token: fcmToken });
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


  useEffect(() => {
    // Assume a message-notification contains a "type" property in the data payload of the screen to open
    messaging().onNotificationOpenedApp(remoteMessage => {
      console.log(
        'Notification caused app to open from background state:',
        remoteMessage.notification,
      );
      // navigation.navigate(remoteMessage.data.type);
    });
  }, []);

  useEffect(() => {
    const init = async () => {
      await requestUserPermission();
      messaging().onMessage(async (remoteMessage: any) => {
        if (remoteMessage?.notification?.title) {
          Toast.show({
            type: 'info',
            text1: remoteMessage.notification.title,
            text2: remoteMessage.notification.body ?? '', // Optional body
          });
        } else {
          console.warn('Notification format is invalid', remoteMessage);
        }
      });
      messaging().setBackgroundMessageHandler(
        async ({ data }) => {
          // console.log('in background wer received FCM');
        },
      );

    };
    init();
  }, []);

  return (
    <CProvider>
      <StatusBar barStyle="dark-content" backgroundColor="#000" />
      <AppStack />
      <Toast config={ToastConfig} />
    </CProvider>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    backgroundColor: '#000', // Match your app background
  },
});
