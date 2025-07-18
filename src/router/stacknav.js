import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import AntIcon from 'react-native-vector-icons/AntDesign';
import {
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
// import { Icon } from '../../assets/images';
// import { palette } from '../theme';

// import {TabNavigator} from './tab-router';
import { Screen } from './screen';
// import { UserManager } from '../storage';

// import CheckoutNewScreen from '../pages/checkout_new';

// import SplashContainer from '../pages/prelogin_Modules/splash-screen';
// import WelcomeContainer from '../pages/prelogin_Modules/welcome-screen';
// import Login from '../pages/prelogin_Modules/login';
// import OtpScreen from '../pages/prelogin_Modules/otp-screen';
// import WelcomeHNI from '../pages/prelogin_Modules/welcome-HNI';

// import HomeComponent from '../pages/dashboard_Modules/tabs/home';
// import AdVideoScreen from '../pages/dashboard_Modules/tabs/ad-video';
// import GromorStore from '../pages/dashboard_Modules/tabs/gromo-store';
// import AdvisoryDashboard from '../pages/dashboard_Modules/tabs/advisory-dashboard';
// import HomeMarketValue from '../pages/dashboard_Modules/tabs/market-value/marketvalue';
// import ViewAllDealers from '../pages/dashboard_Modules/tabs/view-all-dealers';
// import MyServices from '../pages/dashboard_Modules/tabs/my-services';
// import MyServicesDelivery from '../pages/dashboard_Modules/tabs/my-services/my-services-delivery.screen';

// import MyAccountContainer from '../pages/sidebar_Modules/myAccount';
// import NotificationScreen from '../pages/sidebar_Modules/notification';
// import LanguageScreen from '../pages/sidebar_Modules/language';
// import FavouriteProductScreen from '../pages/sidebar_Modules/product-favourites';
// import MyCart from '../pages/sidebar_Modules/my-cart';
// import LoyalityPointsScreen from '../pages/sidebar_Modules/loyality-points';
// import MyPractice from '../pages/sidebar_Modules/my-practice';
// import Testimonial from '../pages/sidebar_Modules/testimonial';
// import PlantixScreen from '../pages/sidebar_Modules/plantix';

// import ViewAllProduct from '../pages/product_Modules/view-all-product';
// import ViewAllCategory from '../pages/product_Modules/view-all-category';
// import ReviewProduct from '../pages/product_Modules/review-product';
// import ProductScreen from '../pages/product_Modules/products';
// import ViewAllReview from '../pages/product_Modules/view-all-review';
// import ProductDetails from '../pages/product_Modules/product-details';
// import ChangeStoreDetailsScreen from '../pages/product_Modules/changeStoreDetails';
// import SimilarProudct from '../pages/product_Modules/similar-product';

// import MyOrderHistory from '../pages/order_Modules/my-order-history';
// import MyBookingHistory from '../pages/order_Modules/my-booking-history';
// import BookingStatus from '../pages/order_Modules/bookingStatus';

// import DeliveryStatus from '../pages/order_Modules/delivery-status';
// import PostFeedScreen from '../pages/sidebar_Modules/postFeed';
// import createFeedScreen from '../pages/sidebar_Modules/postFeed/tabs/createFeed';

// import feedMyProfileScreen from '../pages/sidebar_Modules/postFeed/tabs/feedMyProfile';
// import GroupDetails from '../pages/sidebar_Modules/postFeed/Groups';

// import PlantixSummaryScreen from '../pages/sidebar_Modules/plantix/plantixSummary';
// import PlantixDetailsContainer from '../pages/sidebar_Modules/plantix/PlantixDetails';

// import FylloScreen from '../pages/sidebar_Modules/fyllo';
// import MyProfileContainer from '../pages/sidebar_Modules/myProfile';

//Old Version ...
// import ChatApp from '../pages/Backup_Modules/chat';
import { height } from '../config/resposiveSize';
// import SparyServiceDetail from '../pages/dashboard_Modules/tabs/my-services/Components/SparyServiceDetail';
// import ListOfApplyedService from '../pages/dashboard_Modules/tabs/my-services/Components/ListOfApplyedService';
// import PlantixRecommndation from '../pages/sidebar_Modules/plantix/plantixSummary/recommndation.screen';
// import ServiceDetailsScreen from '../pages/dashboard_Modules/tabs/my-services/Components/ServiceDetailsScreen';
// import CTText from '../components/ctText';
import HomeScreen from '../pages/dashboard_Modules/tabs/home';
import LanguageScreen from '../pages/sidebar_modules/language/LanguageScreen';
import WelcomeScreen from '../pages/prelogin_Modules/welcome_screen';
import SplashScreen from '../pages/prelogin_Modules/splash_screen';
import Advisory from '../pages/dashboard_Modules/tabs/advisory-dashboard';
import Products from '../pages/product_Modules/products';
import GromorStore from '../pages/dashboard_Modules/tabs/gromo-store';
import VerifyOtp from '../pages/prelogin_Modules/otp_verify/VerifyOtp';
import LoginScreen from '../pages/prelogin_Modules/login/LoginScreen';
import { TabNavigator } from './tab-router';
import ShopScreen from '../pages/product_Modules/product-category/ShopScreen';
import ViewAllProduct from '../pages/product_Modules/components/ViewAllProduct';
import ProductDetail from '../pages/product_Modules/components/ProductDetail';
import AgriVideo from '../pages/dashboard_Modules/tabs/ad-video/AgriVideo';
import Cart from '../pages/product_Modules/my-cart';
import MyOrdersScreen from '../pages/product_Modules/order/orderScreen';

const Stack = createNativeStackNavigator();

const StackNav = ({ navigation }) => {
  // const appLanguage = UserManager?.getAppMultiLanguage;
  const screenOptions = {
    animationEnabled: false,
    // eslint-disable-next-line react/no-unstable-nested-components
    // header: ({ navigation, route }) => (
    //   <ImageBackground
    //     source={Icon.headerLeaf}
    //     style={styles.defaultHeaderContainer}>
    //     <View style={styles.defaultHeader}>
    //       <TouchableOpacity onPress={() => navigation.goBack()}>
    //         <AntIcon name="left" size={25} color={palette.white} />
    //       </TouchableOpacity>
    //       <CTText
    //         style={{ marginLeft: '6%' }}
    //         textColor={palette.white}
    //         text={route.params}
    //       />
    //     </View>
    //   </ImageBackground>
    // ),
  };

  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen
        options={{ headerShown: false }}
        name={Screen.splash}
        component={SplashScreen}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name={Screen.welcome}
        component={WelcomeScreen}
      />

      <Stack.Screen
        options={{ headerShown: false }}
        name={Screen.language}
        component={LanguageScreen}
      />

      {/* <Stack.Screen
        options={{ headerShown: false }}
        name={Screen.homes}
        component={HomeScreen}
      /> */}

      <Stack.Screen
        options={{ headerShown: false }}
        name={Screen.login}
        component={LoginScreen}
      />

      <Stack.Screen
        options={{ headerShown: false }}
        name={Screen.otpscreen}
        component={VerifyOtp}
      />

      <Stack.Screen
        options={{ headerShown: false }}
        name={Screen.homes}
        component={TabNavigator}
      />

      <Stack.Screen name='ShopScreen'
        options={{ headerShown: false }}
        component={ShopScreen} />

      <Stack.Screen name='AllProduct'
        options={{ headerShown: false }}
        component={ViewAllProduct}
      />

      <Stack.Screen name='ProductDetail'
        options={{ headerShown: false }}
        component={ProductDetail}
      />

      <Stack.Screen name='AgriVideo'
        options={{ headerShown: false }}
        component={AgriVideo}
      />


      <Stack.Screen
        name='Cart'
        options={{ headerShown: false }}
        // name={Screen.myCart}
        component={Cart}
      />

      <Stack.Screen
        name='Order'
        options={{ headerShown: false }}
        // name={Screen.myCart}
        component={MyOrdersScreen}
      />
      {/* <Stack.Screen
        options={{headerShown: false}}
        name={Screen.FeedProfile}
        component={feedMyProfileScreen}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name={Screen.createFeed}
        component={createFeedScreen}
      />

    
      

    
     
      <Stack.Screen
        options={{headerShown: false}}
        name={Screen.cropAdvisory}
        component={AdvisoryDashboard}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name={Screen.gromorStore}
        component={GromorStore}
      />

      <Stack.Screen
        options={{headerShown: false}}
        name={Screen.notification}
        component={NotificationScreen}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name={Screen.myAccount}
        component={MyAccountContainer}
      />

      <Stack.Screen
        options={{headerShown: false}}
        name={Screen.productDetails}
        component={ProductDetails}
      />

      <Stack.Screen
        options={{headerShown: false}}
        name={Screen.similarProduct}
        component={SimilarProudct}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name={Screen.favouriteProduct}
        component={FavouriteProductScreen}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name={Screen.viewAllProduct}
        component={ViewAllProduct}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name={Screen.viewAllCategory}
        component={ViewAllCategory}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name={Screen.reviewProduct}
        component={ReviewProduct}
      />

      <Stack.Screen
        options={{headerShown: false}}
        name={Screen.serviceDetails}
        component={ServiceDetailsScreen}
      />

      <Stack.Screen
        options={{headerShown: false}}
        name={Screen.myCart}
        component={MyCart}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name={Screen.myPractice}
        component={MyPractice}
      />

      <Stack.Screen
        options={{headerShown: false}}
        name={Screen.myOrderHistory}
        component={MyOrderHistory}
      />

      <Stack.Screen
        options={{headerShown: false}}
        name={Screen.deliveryStatus}
        component={DeliveryStatus}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name={Screen.loyalityPoints}
        component={LoyalityPointsScreen}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name={Screen.marketValue}
        component={HomeMarketValue}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name={Screen.welcomeHNI}
        component={WelcomeHNI}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name={Screen.viewAllDealers}
        component={ViewAllDealers}
      />

      <Stack.Screen
        options={{headerShown: false}}
        name={Screen.viewAllReview}
        component={ViewAllReview}
      />

      <Stack.Screen
        options={{headerShown: false}}
        name={Screen.testimonial}
        component={Testimonial}
      />

      <Stack.Screen
        options={{headerShown: false}}
        name={Screen.adVideo}
        component={AdVideoScreen}
      />

      <Stack.Screen
        options={{title: 'Chat with us'}}
        name={Screen.chat}
        component={ChatApp}
      />

      <Stack.Screen
        options={{headerShown: false}}
        name={Screen.Plantix}
        component={PlantixScreen}
      />

      <Stack.Screen
        options={{headerShown: false}}
        name={Screen.checkoutNew}
        component={CheckoutNewScreen}
      />

      <Stack.Screen
        options={{headerShown: false}}
        name={Screen.bookingHistory}
        component={MyBookingHistory}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name={Screen.ChangeStoreDetails}
        component={ChangeStoreDetailsScreen}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name={Screen.bookingStatus}
        component={BookingStatus}
      />

      <Stack.Screen
        options={{headerShown: false}}
        name={Screen.GroupDetails}
        component={GroupDetails}
      />

      <Stack.Screen
        options={{headerShown: false}}
        name={Screen.PlantixSummary}
        component={PlantixSummaryScreen}
      />

      <Stack.Screen
        options={{headerShown: false}}
        name={Screen.PlantixSummaryDetails}
        component={PlantixDetailsContainer}
      />
       <Stack.Screen
        options={{headerShown: false}}
        name={Screen.PlantixRecommndation}
        component={PlantixRecommndation}
      />

      <Stack.Screen
        options={{headerShown: false}}
        name={Screen.FylloScreen}
        component={FylloScreen}
      />

      <Stack.Screen
        options={{headerShown: false}}
        name={Screen.myProfileScreen}
        component={MyProfileContainer}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name={Screen.myServices}
        component={MyServices}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name={Screen.myServicesDelivery}
        component={MyServicesDelivery}
      />
        <Stack.Screen
        options={{headerShown: false}}
        name={Screen.SprayingServicsDetail}
        component={SparyServiceDetail}
      />
       <Stack.Screen
        options={{headerShown: false}}
        name={Screen.myServiceslist}
        component={ListOfApplyedService}
      /> */}
    </Stack.Navigator>
  );
};

export const HomeStack = () => {
  const HomeStack = createNativeStackNavigator();

  return (
    <HomeStack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <HomeStack.Screen name={Screen.dashboardHome} component={HomeScreen} />
    </HomeStack.Navigator>
  );
};

export const CropAdvStack = () => {
  const CropAdvStack = createNativeStackNavigator();

  return (
    <CropAdvStack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <CropAdvStack.Screen
        name={Screen.dashboardCropAdv}
        component={Advisory}
      />
    </CropAdvStack.Navigator>
  );
};
export const ProductStack = () => {
  const ProductStack = createNativeStackNavigator();

  return (
    <ProductStack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <ProductStack.Screen
        name={Screen.dashboardProduct}
        component={Products}
      />
    </ProductStack.Navigator>
  );
};
export const GromorStack = () => {
  const GromorStack = createNativeStackNavigator();

  return (
    <GromorStack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <GromorStack.Screen
        name={Screen.dashboardStore}
        component={GromorStore}
      />
    </GromorStack.Navigator>
  );
};

export default StackNav;

const styles = StyleSheet.create({
  defaultHeaderContainer: {
    height: height / 10,
    paddingTop: '6%',
  },
  defaultHeader: {
    flexDirection: 'row',
    paddingHorizontal: '6%',
    alignItems: 'center',
  },
  headerContainer: {
    height: height / 6,
    paddingTop: '6%',
  },
  header: {
    flexDirection: 'row',
    paddingHorizontal: '6%',
    paddingTop: '4%',
    height: 80,
    justifyContent: 'space-between',
  },
});
