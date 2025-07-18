import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, StatusBar, Platform } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { CProvider } from './src/redux';
import AppStack from './src/router/router';
import Toast from 'react-native-toast-message';
import { ToastConfig } from './src/components/toast';
import { UserManager } from './src/storage';
import NetInfo from '@react-native-community/netinfo';
import { Isplatform_Android } from './src/config/resposiveSize';
import messaging from '@react-native-firebase/messaging';
import JailMonkey from 'jail-monkey';
import PushNotificationIOS from '@react-native-community/push-notification-ios';

const Stack = createNativeStackNavigator();

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
    const init = async () => {
      await requestUserPermission();
      messaging().onMessage(async (remoteMessage: any) => {
        Toast.show({ type: 'info', text1: remoteMessage.notification.title });
      });
    };
    init();
  }, []);


  return (
    <CProvider>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <AppStack />
      <Toast config={ToastConfig} />
    </CProvider>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    backgroundColor: '#fff', // Match your app background
  },
});
