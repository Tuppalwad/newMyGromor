import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from './src/pages/splash';
import HomeScreen from './src/pages/home';
import WelcomeScreen from './src/pages/welcome';
import LanguageScreen from './src/pages/language/LanguageScreen';
import LoginScreen from './src/pages/login/LoginScreen';
import VerifyOtp from './src/pages/login/VerifyOtp';
import ShopScreen from './src/pages/shop/ShopScreen';
import ViewAllProduct from './src/component/shop/ViewAllProduct';
import ProductDetail from './src/component/shop/ProductDetail';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name='WelcomeScreen' component={WelcomeScreen} />
        <Stack.Screen name='language' component={LanguageScreen} />
        <Stack.Screen name='Login' component={LoginScreen} />
        <Stack.Screen name='VerifyOtp' component={VerifyOtp} />
        <Stack.Screen name='ShopScreen' component={ShopScreen} />
        <Stack.Screen name='AllProduct' component={ViewAllProduct} />
        <Stack.Screen name='ProductDetail' component={ProductDetail} />



      </Stack.Navigator>
    </NavigationContainer>
  );
}
