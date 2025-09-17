// import React, { useEffect, useState } from 'react';
// import {
//   SafeAreaView,
//   StyleSheet,
//   StatusBar,
//   Platform,
//   PermissionsAndroid,
//   View,
// } from 'react-native';
// import { CProvider } from './src/redux';
// import AppStack from './src/router/router';
// import Toast from 'react-native-toast-message';
// import { ToastConfig } from './src/components/toast';
// import messaging from '@react-native-firebase/messaging';
// import CustomPopupModal from './src/components/common/CustomPopupModal';
// import NetInfo from '@react-native-community/netinfo';
// import { Icon } from './assets/images';
// import { UserManager } from './src/storage';
// import CTText from './src/components/ctText';

// const requestUserPermission = async () => {
//   const authStatus = await messaging().requestPermission();

//   const enabled =
//     authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
//     authStatus === messaging.AuthorizationStatus.PROVISIONAL;

//   if (enabled) {
//     const fcmToken = await getFcmToken();
//     UserManager.updateFcmToken(fcmToken);

//     console.log('FCM Token:', fcmToken);
//   }
// };

// const getFcmToken = async () => {
//   try {
//     const fcmToken = await messaging().getToken();
//     if (fcmToken) {
//       console.log('Your Firebase Token is:', fcmToken);
//       return fcmToken;
//     } else {
//       console.log('Failed to get FCM token');
//     }
//   } catch (error) {
//     console.log('Error getting FCM token:', error);
//   }
// };

// const App = () => {
//   const appLanguage = UserManager?.getAppMultiLanguage;

//   const [show, setShow] = useState(false);
//   const [hookedshow, setHookedshow] = useState({ visible: false, Message: '' });

//   const unsubscribe = NetInfo.addEventListener(states => {
//     if (show === states.isConnected) {
//       setShow(!states.isConnected);
//     }
//   });

//   useEffect(() => {
//     // Permission for Android (only for completeness; messaging().requestPermission() is enough for iOS)
//     if (Platform.OS === 'android') {
//       PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);
//     }

//     requestUserPermission();

//     // Foreground messages
//     const unsubscribeMessage = messaging().onMessage(async remoteMessage => {
//       // if (remoteMessage?.notification?.title) {
//       //   Toast.show({
//       //     type: 'info',
//       //     text1: remoteMessage.notification.title,
//       //     text2: remoteMessage.notification.body ?? '',
//       //   });
//       // } else {
//       //   console.warn('Notification format is invalid', remoteMessage);
//       // }
//       console.log(remoteMessage, 'nnnnnnnnnnnnnnnnnnn')
//     });

//     // When app is opened from background via notification
//     const unsubscribeOpenedApp = messaging().onNotificationOpenedApp(remoteMessage => {
//       console.log('App opened from background notification:', remoteMessage);
//     });

//     // When app is opened from quit state
//     messaging()
//       .getInitialNotification()
//       .then(remoteMessage => {
//         if (remoteMessage) {
//           console.log('App opened from quit state notification:', remoteMessage);
//         }
//       });

//     return () => {
//       unsubscribeMessage();
//       unsubscribeOpenedApp();
//       unsubscribe()
//     };
//   }, []);

//   // Background handler (must be outside any component)
//   useEffect(() => {
//     messaging().setBackgroundMessageHandler(async remoteMessage => {
//       console.log('Message handled in the background!', remoteMessage);
//     });
//   }, []);

//   return (
//     <CProvider>
//       <StatusBar barStyle="dark-content" backgroundColor="#000" />
//       <Toast config={ToastConfig} />
//       <AppStack />
//       <CustomPopupModal
//           visible={show}
//           icon={Icon.warning}
//           marginTop_Status={true}
//           isRed={true}
//           title={
//             appLanguage?.lblnointernetconnection ?? 'No Internet Connection'
//           }
//           showButton={false}>
//           <View style={{ justifyContent: 'center', padding: 15 }}>
//             <CTText
//               text={
//                 appLanguage?.lblturninternetconnection ??
//                 'Turn on internet connection to continue'
//               }
//             />
//           </View>
//         </CustomPopupModal>

//         <CustomPopupModal
//           visible={hookedshow.visible ?? false}
//           icon={Icon.warning}
//           isRed={true}
//           marginTop_Status={true}
//           title={`${hookedshow.Message} detected`}
//           buttonText={"Okay"}
//           onPressDone={() => { setHookedshow({ visible: false, Message: "" }) }}
//           showButton1={false}>
//           <View style={{ justifyContent: 'center', padding: 10 }}>
//             <CTText
//               text={`${appLanguage?.lblWearesorrybut ??
//                 'We are sorry but due to security concerns My Gromor cannot be used on'
//                 } ${hookedshow.Message}.`}
//               semiBold
//             />

//             <CTText
//               style={{ marginTop: 10 }}
//               text={
//                 appLanguage.lblGotoSettings ??
//                 'Go to Settings and scroll to the System section (on Android 8 and above, go to Settings > System)'
//               }
//               medium
//               nestedtext={
//                 appLanguage.lblTapDeveloperOptions ??
//                 'Tap Developer Options. Tap the button to toggle developer options Off. USB Debugging is included in the Developer Options.'
//               }
//             />
//           </View>
//         </CustomPopupModal>
//     </CProvider>
//   );
// };

// export default App;

// const styles = StyleSheet.create({
//   safeArea: {
//     flex: 1,
//     paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
//     backgroundColor: '#000',
//   },
// });




// import React, { useEffect, useState } from 'react';
// import { SafeAreaView, StyleSheet, View, StatusBar, Alert } from 'react-native';
// import AppStack from './src/router/router';
// import { CProvider } from './src/redux';
// import Toast from 'react-native-toast-message';
// import { ToastConfig } from './src/components/toast';
// import { UserManager } from './src/storage';
// import NetInfo from '@react-native-community/netinfo';
// import { Icon } from './assets/images';
// import PushNotification from 'react-native-push-notification';
// import { Platform } from 'react-native';
// // import PushNotificationIOS from '@react-native-community/push-notification-ios';
// import {  requestPermission } from '@react-native-firebase/messaging';
// import messaging from '@react-native-firebase/messaging';
// import JailMonkey from 'jail-monkey';
// import { setJSExceptionHandler } from 'react-native-exception-handler';
// import RNRestart from 'react-native-restart';
// import CustomPopupModal from './src/components/common/CustomPopupModal';
// import CTText from './src/components/ctText';
// import { Isplatform_Android } from './src/config/resposiveSize';

// // import { setJSExceptionHandler } from 'react-native-exception-handler';

// const App = () => {
//   const [show, setShow] = useState(false);
//   const [hookedshow, setHookedshow] = useState({ visible: false, Message: '' });
//   const appLanguage = UserManager?.getAppMultiLanguage;

//   // ✅ JS Exception Handler Setup
//   useEffect(() => {
//     setJSExceptionHandler(errorHandler);
//   }, []);

//   // ✅ NetInfo Listener Fix
//   useEffect(() => {
//     const unsubscribe = NetInfo.addEventListener(states => {
//       if (show === states.isConnected) {
//         setShow(!states.isConnected);
//       }
//     });

//     return () => {
//       unsubscribe();
//     };
//   }, [show]);

//   // ✅ Notification Permission and Root Check
//   useEffect(() => {
//     if (Isplatform_Android) {
//       requestPermission('NOTIFICATIONS');
//       if (JailMonkey.hookDetected()) {
//         setHookedshow({ visible: true, Message: 'Rooted device' });
//       }
//       if (JailMonkey.isJailBroken()) {
//         setHookedshow({ visible: true, Message: 'Jail Broken' });
//       }
//     }
//   }, []);

//   // ✅ Messaging Setup
//   useEffect(() => {
//     messaging()
//       .getToken()
//       .then(token => {
//         console.log('FCM Token:', token);
//         UserManager.updateFcmToken(token);
//       });

//     const unsubscribeMessage = messaging().onMessage(response => {
//       if (Platform.OS !== 'ios') {
//         showNotification(response.notification);
//       }
//     });

//     messaging().setBackgroundMessageHandler(async remoteMessage => {
//       // Background FCM received
//     });

//     return () => {
//       unsubscribeMessage();
//     };
//   }, []);

//   useEffect(() => {
//     messaging().onNotificationOpenedApp(remoteMessage => {
//       console.log('Notification caused app to open:', remoteMessage.notification);
//     });
//   }, []);

//   const showNotification = (notification) => {
//     PushNotification.localNotification({
//       title: notification.title,
//       message: notification.body,
//     });
//   };

//   const errorHandler = (e, isFatal) => {
//     if (isFatal) {
//       Alert.alert(
//         appLanguage.lblUnexpectederror ?? 'Unexpected error occurred',
//         `Error: ${e.name} ${e.message}`,
//         [
//           {
//             text: appLanguage.lblRestart ?? 'Restart',
//             onPress: () => {
//               RNRestart.restart();
//             },
//           },
//         ]
//       );
//     } else {
//       console.log(e);
//     }
//   };

//   // ✅ Render JSX (no setJSExceptionHandler inside JSX!)
//   return (
//     <CProvider>
//       <SafeAreaView style={{ flex: 1 }}>
//         <SafeAreaView style={styles.container}>
//           <StatusBar barStyle="light-content" />
//           <AppStack />
//           <Toast config={ToastConfig} />

//           <CustomPopupModal
//             visible={show}
//             icon={Icon.warning}
//             marginTop_Status
//             isRed
//             title={appLanguage?.lblnointernetconnection ?? 'No Internet Connection'}
//             showButton={false}>
//             <View style={{ justifyContent: 'center', padding: 15 }}>
//               <CTText
//                 text={appLanguage?.lblturninternetconnection ?? 'Turn on internet connection to continue'}
//               />
//             </View>
//           </CustomPopupModal>

//           <CustomPopupModal
//             visible={hookedshow.visible ?? false}
//             icon={Icon.warning}
//             isRed
//             marginTop_Status
//             title={`${hookedshow.Message} detected`}
//             showButton1={false}>
//             <View style={{ justifyContent: 'center', padding: 10 }}>
//               <CTText
//                 text={`${appLanguage?.lblWearesorrybut ?? 'We are sorry but due to security concerns My Gromor cannot be used on'} ${hookedshow.Message}.`}
//                 semiBold
//               />
//               <CTText
//                 style={{ marginTop: 10 }}
//                 text={appLanguage.lblGotoSettings ?? 'Go to Settings and scroll to the System section...'}
//                 medium
//                 nestedtext={appLanguage.lblTapDeveloperOptions ?? 'Tap Developer Options. USB Debugging is included.'}
//               />
//             </View>
//           </CustomPopupModal>
//         </SafeAreaView>
//       </SafeAreaView>
//     </CProvider>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
// });

// export default App;


import React, { useEffect, useState } from 'react';
import { Alert, Platform, SafeAreaView, StatusBar, Text, View } from 'react-native';
import messaging from '@react-native-firebase/messaging';
import PushNotification from 'react-native-push-notification';
import NetInfo from '@react-native-community/netinfo';
import AppStack from './src/router/router';
import { CProvider } from './src/redux';
import Toast from 'react-native-toast-message';
import { ToastConfig } from './src/components/toast';
import { UserManager } from './src/storage';

const App = () => {
  const [isConnected, setIsConnected] = useState(true);

  // ✅ Setup NetInfo listener
  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsConnected(state.isConnected);
    });
    return () => unsubscribe();
  }, []);

  // ✅ Firebase Push Notification Setup
  useEffect(() => {
    const requestPermission = async () => {
      const authStatus = await messaging().requestPermission();
      const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;

      if (enabled) {
        const token = await messaging().getToken();
        console.log('FCM Token:', token);
        // You can send this token to your backend
      }
    };

    requestPermission();

    // Foreground notifications
    const unsubscribeMessage = messaging().onMessage(async remoteMessage => {
      PushNotification.localNotification({
        title: remoteMessage.notification.title,
        message: remoteMessage.notification.body,
      });
    });

    // Background/opened app notifications
    messaging().onNotificationOpenedApp(remoteMessage => {
      console.log('App opened from background:', remoteMessage.notification);
    });


    messaging()
      .getToken()
      .then(token => {
        console.log('NOTIFICATION 123 : config 2 --->', token);
        UserManager.updateFcmToken(token);
      });


    // Cold start notifications
    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage) {
          console.log('App opened from quit state:', remoteMessage.notification);
        }
      });

    return () => unsubscribeMessage();
  }, []);

  return (
    <CProvider>
      <View style={{ flex: 1 }}>
        <StatusBar barStyle="dark-content" />
        <AppStack />
        <Toast config={ToastConfig} />
        {!isConnected && (
          <View style={{ position: 'absolute', top: 0, left: 0, right: 0, backgroundColor: '#ffcdd2', padding: 16, zIndex: 999 }}>
            <Text style={{ color: '#b71c1c', fontWeight: 'bold', fontSize: 16 }}>No Internet</Text>
            <Text style={{ color: '#b71c1c', fontSize: 14 }}>Please check your internet connection.</Text>
          </View>
        )}
      </View>
    </CProvider>
  );
};

export default App;
