import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Screen } from './screen';


const Stack = createNativeStackNavigator();




const StackNav = ({ navigation }) => {
    // const appLanguage = UserManager?.getAppMultiLanguage;
    // const screenOptions = {
    //     animationEnabled: false,
    //     // eslint-disable-next-line react/no-unstable-nested-components
    //     header: ({ navigation, route }) => (
    //         <ImageBackground
    //             source={Icon.headerLeaf}
    //             style={styles.defaultHeaderContainer}>
    //             <View style={styles.defaultHeader}>
    //                 <TouchableOpacity onPress={() => navigation.goBack()}>
    //                     <AntIcon name="left" size={25} color={palette.white} />
    //                 </TouchableOpacity>
    //                 <CTText
    //                     style={{ marginLeft: '6%' }}
    //                     textColor={palette.white}
    //                     text={route.params}
    //                 />
    //             </View>
    //         </ImageBackground>
    //     ),
    // };

    return (
        <Stack.Navigator screenOptions={screenOptions}>
            <Stack.Screen
                options={{ headerShown: false }}
                name={Screen.splash}
                component={SplashContainer}
            />
            <Stack.Screen
                options={{ headerShown: false }}
                name={Screen.welcome}
                component={WelcomeContainer}
            />

            <Stack.Screen
                options={{ headerShown: false }}
                name={Screen.language}
                component={LanguageScreen}
            />

            <Stack.Screen
                options={{ headerShown: false }}
                name={Screen.login}
                component={Login}
            />
            <Stack.Screen
                options={{ headerShown: false }}
                name={Screen.otpscreen}
                component={OtpScreen}
            />
            <Stack.Screen
                options={{ headerShown: false }}
                name={Screen.dashboard}
                component={TabNavigator}
            />

            {/* 

      <Stack.Screen
        options={{headerShown: false}}
        name={Screen.dashboard}
        component={TabNavigator}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name={Screen.homes}
        component={HomeComponent}
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
