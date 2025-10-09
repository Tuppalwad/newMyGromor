import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { Screen } from './screen';
import { height } from '../config/resposiveSize';

import Home from '../pages/dashboard_modules/tabs/home';
import LanguageScreen from '../pages/sidebar_modules/language/LanguageScreen';
import WelcomeScreen from '../pages/prelogin_modules/welcome_screen';
import SplashScreen from '../pages/prelogin_modules/splash_screen';
import Advisory from '../pages/dashboard_modules/tabs/advisory-dashboard';
import GromorStore from '../pages/dashboard_modules/tabs/gromo-store';
import VerifyOtp from '../pages/prelogin_modules/otp_verify/VerifyOtp';
import LoginScreen from '../pages/prelogin_modules/login/LoginScreen';
import { TabNavigator } from './tab-router';

import ViewAllProduct from '../pages/product_modules/components/ViewAllProduct';
import AgriVideo from '../pages/dashboard_modules/tabs/ad-video/AgriVideo';
import MyCart from '../pages/product_modules/my-cart';
import MyOrdersScreen from '../pages/product_modules/order/component/orderScreen';
import ProductCategories from '../pages/product_modules/product-category';
import ProductDetails from '../pages/product_modules/product-details';
import purchases from '../pages/product_modules/order/component/purchases';
import MyBooking from '../pages/product_modules/order/component/MyBooking';
import PurchaseDetail from '../pages/product_modules/order/component/purchases';
import MyAccountScreen from '../pages/sidebar_modules/myAccount/MyAccountScreen';
import MyServicesScreen from '../pages/service_modules/my_services';
import ViewAllCategory from '../pages/product_modules/view-all-category';
import ViewAllCategoryData from '../pages/product_modules/view-all-category';
import SimilarProudct from '../pages/product_modules/similar-product';
import DoorDeliveryComponent from '../pages/service_modules/door-delivery';
import SprayingServiceDetail from '../pages/service_modules/spraying-service';
import SelectLocationScreen from '../components/common/SelectLocationScreen';
import NewServiceRequestScreen from '../pages/service_modules/spraying-service/newService';
import SuccessScreen from '../pages/product_modules/components/SuccessScreen';
import WeatherScreen from '../pages/product_modules/weather/weatherScreen';
import NextDaysScreen from '../pages/product_modules/weather/nextdays';
import MyOrders from '../pages/product_modules/order';
import MyBookingDetails from '../pages/product_modules/order/component/MyBooking';
import UpdateLanguage from '../pages/sidebar_modules/language/UpdateLanguage';
import FavouriteProductScreen from '../pages/sidebar_modules/my-favourite';
import MyInfoScreen from '../pages/sidebar_modules/myAccount/component/myinfo/myInfoScreen';
import ChangeStoreDetailsScreen from '../pages/sidebar_modules/myAccount/change-store/ChangeStoreDetails.screen';
import MyCrop from '../pages/sidebar_modules/my-crops';
import ChangeStoreDetails from '../pages/product_modules/changeStoreDetails';
import MyCropsScreen from '../pages/sidebar_modules/my-crops';
import MyAssets from '../pages/sidebar_modules/myAccount/component/myAssets';
import MyFeedsScreen from '../pages/sidebar_modules/myAccount/component/myFeeds';
import SaveFeeds from '../pages/sidebar_modules/myAccount/component/savedFeeds';
import Followers from '../pages/sidebar_modules/myAccount/component/followers';
import Following from '../pages/sidebar_modules/myAccount/component/following';
import MyGroups from '../pages/sidebar_modules/myAccount/component/myGroups';
import MyPublicGroups from '../pages/sidebar_modules/myAccount/component/publicGroups';
import PersonalInfoScreen from '../pages/sidebar_modules/myAccount/component/myinfo';
import MarketValue from '../pages/dashboard_modules/tabs/market-value';
// import PersonalInfoScreen from '../pages/sidebar_modules/myAccount/component/myinfo';
// import WeatherScreen from '../pages/product_modules/weather/wheatherScreen';
// import MyServicesScreen from '../pages/service_module/myServices';
// import MyBookings from '../pages/product_Modules/order/MyBooking';
// import MyServicesScreen from '../pages/service_module/myServices';

import PostDetailScreen from '../pages/dashboard_modules/tabs/community/PostDetail';
import NotificationScreen from '../pages/dashboard_modules/tabs/notification';
import NewPostScreen from '../pages/dashboard_modules/tabs/community/NewPost';
import ProfileCard from '../pages/dashboard_modules/tabs/community/Profile';
import ReportModal from '../pages/dashboard_modules/tabs/community/ReportModal';
import CropDetailScreen from '../pages/dashboard_modules/tabs/advisory-dashboard/CropDetailScreen';

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

      <Stack.Screen name={Screen.viewAllCategory}
        options={{ headerShown: false }}
        component={ProductCategories} />

      <Stack.Screen name={Screen.viewAllProduct}
        options={{ headerShown: false }}
        component={ViewAllProduct}
      />

      <Stack.Screen name={Screen.productDetails}
        options={{ headerShown: false }}
        component={ProductDetails}
      />

      <Stack.Screen name={Screen.adVideo}
        options={{ headerShown: false }}
        component={AgriVideo}
      />

      <Stack.Screen
        name={Screen.myCart}
        options={{ headerShown: false }}
        component={MyCart}
      />

      <Stack.Screen
        name={Screen.MyOrder}
        options={{ headerShown: false }}
        component={MyOrders}
      />
      <Stack.Screen
        name={Screen.PurchaseDetail}
        options={{ headerShown: false }}
        component={PurchaseDetail}
      />
      <Stack.Screen
        name={Screen.BookingDetails}
        options={{ headerShown: false }}
        component={MyBookingDetails}
      />

      <Stack.Screen
        name={Screen.MyBooking}
        options={{ headerShown: false }}
        component={MyBooking}
      />
      <Stack.Screen
        name={Screen.MyAccount}
        options={{ headerShown: false }}
        component={MyAccountScreen}
      />
      <Stack.Screen
        name={Screen.MyServicesScreen}
        options={{ headerShown: false }}
        component={MyServicesScreen}
      />

      <Stack.Screen
        name={Screen.viewAllCategoryData}
        options={{ headerShown: false }}
        component={ViewAllCategoryData}
      />

      <Stack.Screen
        options={{ headerShown: false }}
        name={Screen.similarProduct}
        component={SimilarProudct}
      />

      <Stack.Screen
        options={{ headerShown: false }}
        name={Screen.DoorDelivery}
        component={DoorDeliveryComponent}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name={Screen.SprayingService}
        component={SprayingServiceDetail}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name={Screen.newServiceRequest}
        component={NewServiceRequestScreen}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name={Screen.SuccessScreen}
        component={SuccessScreen}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name={Screen.WeatherScreen}
        component={WeatherScreen}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name={Screen.NextDays}
        component={NextDaysScreen}
      />

      <Stack.Screen
        options={{ headerShown: false }}
        name={Screen.updateLanguage}
        component={UpdateLanguage}
      />

      <Stack.Screen
        options={{ headerShown: false }}
        name={Screen.favouriteProduct}
        component={FavouriteProductScreen}
      />

      <Stack.Screen
        options={{ headerShown: false }}
        name={Screen.myInfoScreen}
        component={PersonalInfoScreen}
      />

      <Stack.Screen
        options={{ headerShown: false }}
        name={Screen.mycrop}
        component={MyCropsScreen}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name={Screen.myAssets}
        component={MyAssets}
      />

      <Stack.Screen
        options={{ headerShown: false }}
        name={Screen.myFeeds}
        component={MyFeedsScreen}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name={Screen.savedFeeds}
        component={SaveFeeds}
      />

      <Stack.Screen
        options={{ headerShown: false }}
        name={Screen.followers}
        component={Followers}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name={Screen.following}
        component={Following}
      />

      <Stack.Screen
        options={{ headerShown: false }}
        name={Screen.myGroups}
        component={MyGroups}
      />

      <Stack.Screen
        options={{ headerShown: false }}
        name={Screen.publicGroups}
        component={MyPublicGroups}
      />

      <Stack.Screen
        options={{ headerShown: false }}
        name={Screen.ChangeStoreDetails}
        component={ChangeStoreDetails}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name={Screen.marketValue}
        component={MarketValue}
      />


      <Stack.Screen
        options={{ headerShown: false }}
        name={Screen.PostDetail}
        component={PostDetailScreen}
      />


      <Stack.Screen
        options={{ headerShown: false }}
        name={Screen.Notification}
        component={NotificationScreen}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name={Screen.NewPost}
        component={NewPostScreen}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name={Screen.Profile}
        component={ProfileCard}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name={Screen.ReportModal}
        component={ReportModal}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name={Screen.CropDetailScreen}
        component={CropDetailScreen}
      />
      {/* 
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
      <HomeStack.Screen name={Screen.dashboardHome} component={Home} />
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
// export const ProductStack = () => {
//   const ProductStack = createNativeStackNavigator();

//   return (
//     <ProductStack.Navigator
//       screenOptions={{
//         headerShown: false,
//       }}>
//       <ProductStack.Screen
//         name={Screen.dashboardProduct}
//         component={Products}
//       />
//     </ProductStack.Navigator>
//   );
// };
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

export const CropDoctor = () => {
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
