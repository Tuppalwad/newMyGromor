import React from 'react';
import { SafeAreaView, StyleSheet, StatusBar, Platform } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { CProvider } from './src/redux';
import AppStack from './src/router/router';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <CProvider>
      <SafeAreaView style={styles.safeArea}>
        <StatusBar barStyle="dark-content" backgroundColor="#fff" />
        <AppStack />
      </SafeAreaView>
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
