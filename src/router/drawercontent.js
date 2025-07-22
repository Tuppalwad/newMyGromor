// import React, { useEffect, useState } from "react";
// import {
//   StyleSheet, View, Image, TouchableOpacity,
//   ImageBackground, Share, Linking, Platform
// } from "react-native";
// import { DrawerContentScrollView, DrawerItem, DrawerItemList, } from "@react-navigation/drawer";
// import { CommonActions, DrawerActions, useNavigation } from "@react-navigation/native";
// // import { palette, textSize } from "../theme";
// import { Screen } from "./screen";
// import { Icon } from "../../assets/images";
// import MediaPickerComponent from "../components/media-picker-component";
// import { UserType } from "../redux/user/type";
// import { useDispatch, useSelector } from "react-redux";
// import { useOperation } from "../redux/operation";
// import { HEToast } from "../components/toast";
// import { createLoadingSelector } from '../redux/loading-reducer';
// import { UserManager } from "../storage";
// import constants from "../config/constants";
// import { Configuration } from "../config";
// import { isEmpty } from "../utils/validator";
// import { getVersion } from 'react-native-device-info';
// import { RFValue } from "react-native-responsive-fontsize";
// import Webview_popup from "../components/webview_popup"
// import CustomPopupModal from "../components/custom-popup-modal"
// // import CTText from "../components/ctText"
// import CustomDrawercard from "../components/custom-drawercard"
// import Indicator from "../components/indicator"
// import { FarmerType } from "../redux/farmer/type";
// import { capitalize } from "lodash";
// import { defConfigImageURL } from "../pages/dashboard_Modules/tabs/home/index.service";
// import { Isplatform_IOS } from "../config/resposiveSize";
// // import { palette } from "../theme";

// const DrawerContent = (props) => {
//   UserManager.loadUser()
//   const navigation = useNavigation();
//   const operation = useOperation();
//   const dispatch = useDispatch();
//   const loadingSelector = createLoadingSelector([UserType.uploadProfileImage, FarmerType.farmerAddress, UserType.deleteAccount]);
//   const isLoading = useSelector(state => loadingSelector(state));
//   const [isLogout, setIslogout] = useState(false)
//   const [showTerms_Conditions, setShowTerms_Conditions] = useState(false)
//   const appLanguage = UserManager?.getAppMultiLanguage
//   const [showModal, setShowModal] = useState(false)
//   const [isDeleteAccountPopup, setisDeleteAccountPopup] = useState(false)
//   const farmerAddress = useSelector((state) => state.farmer.farmerAddressArray)
//   const BannerData = useSelector((state) => state.product.bannerData);

//   const getUserDetails = (tempParam) => {
//     let addressParam = { id: UserManager.getUserId, mobileNumber: UserManager.getUserMobileNumber }
//     dispatch(operation.farmer.getFarmerAddress(addressParam))
//   }


//   const Footer = () => {
//     return (
//       <View style={{
//         padding: 10, flexDirection: "row", justifyContent: "space-between",
//         alignItems: "center",
//         //  backgroundColor: palette.white
//       }}>
//         <TouchableOpacity>

//           {/* <CTText
//             textColor={palette.gray}
//             underline
//             medium
//             text={appLanguage?.terms ?? "Terms and Conditions"}
//             style={{ fontSize: RFValue(10.5) }}
//             onPress={() => { setShowTerms_Conditions(true) }} /> */}

//         </TouchableOpacity>

//         {/* <CTText
//           style={{ fontSize: RFValue(10.5) }}
//           textColor={palette.gray}
//           medium
//           text={`${Configuration.version} : ${getVersion()}${Configuration.buildNo}`} /> */}

//       </View>
//     );
//   };

//   const onPressNavigation = (Route) => {

//     if (Route == "Share_App") {
//       let refMsg = `${appLanguage.lblLetmerecommend ?? "Let me recommend you this application"} \n\n ${Isplatform_IOS ? constants.ios : constants.android}`
//       Share.share({ message: refMsg });
//     } else {
//       setisDeleteAccountPopup(true)
//     }

//   }


//   const onPressDrawerItem = (screen) => {
//     try {
//       if (Screen.logout == screen) {
//         setIslogout(false)
//         UserManager.logoutDrawer()
//         props.navigation.dispatch(
//           CommonActions.reset({
//             index: 1,
//             routes: [{ name: Screen.welcome }],
//           }),
//         );
//         props.navigation.dispatch(DrawerActions.toggleDrawer());
//         return;
//       }
//       props.navigation.dispatch(DrawerActions.toggleDrawer());
//       props.navigation.navigate(Screen);
//     } catch (e) {

//     }

//   };

//   const onPressDeleteAccount = () => {

//     let param = farmerAddress.farmerIdentityId ?? ""
//     dispatch(operation.user.getdeleteAccount(param)).then((res) => {
//       if (res?.data) {
//         setisDeleteAccountPopup(false)
//         onPressDrawerItem(Screen.logout)
//       } else {
//         dispatch(operation.user.getErrorHandling(res, "getdeleteAccount"))
//       }
//     }).catch((err) => {
//       dispatch(operation.user.getErrorHandling(err, "getdeleteAccount"))
//     });

//   }

//   const onPressAvatar = () => {
//     if ((farmerAddress?.features?.isFeedsEnabled)) {
//       navigation.navigate(Screen.myProfileScreen)
//     } else {
//       setShowModal(true)
//     }
//   }


//   const onGetImage = (item) => {
//     const file = item
//     let size = Math.round((file.fileSize / 1024))
//     if (size > 5120) {
//       HEToast(appLanguage?.lblFilesizeistoobig ?? 'File size is too big. Please select a file less than 5MB', 'error')
//     }
//     const formData = new FormData();
//     file.name = file?.fileName;
//     formData.append('file', file)
//     formData.append('farmer_id', farmerAddress.farmerIdentityId)
//     dispatch(operation.user.uploadProfileImage(formData)).then((res) => {
//       let tempParam = {
//         farmerIdentityId: farmerAddress.farmerIdentityId,
//       }
//       getUserDetails(tempParam)
//       setShowModal(false)
//       HEToast(appLanguage?.image_success_message ?? 'Image upload successfully', 'success')
//     }).catch((err) => {
//       dispatch(operation.user.getErrorHandling(err, "uploadProfileImage"))
//     })
//   }

//   let isImageAvailable = (!isEmpty(farmerAddress.profileImage)) ? true : false

//   return (
//     <View style={styles.container}>
//       <ImageBackground source={Icon.headerLeaf} style={{ padding: '4%' }}>
//         <TouchableOpacity style={{ height: 30, width: 30, alignItems: 'center', justifyContent: 'center', }} onPress={() => props.navigation.closeDrawer()}>
//           <Image source={Icon.backArrow} style={{ height: 20, width: 20,
//             //  tintColor: palette.white, 
//              }} />
//         </TouchableOpacity>

//         <View style={styles.userInfoSection}>
//           <TouchableOpacity onPress={onPressAvatar}>
//             <Image
//               style={styles.image}
//               source={isImageAvailable ? { uri: defConfigImageURL(BannerData.imageBaseURL, farmerAddress.profileImage) } : Icon.profileAvatar}
//               resizeMode="cover"
//             />

//             {farmerAddress?.isHNI &&
//               <View style={styles.crown}>
//                 <Image
//                   style={{ height: 20, width: 20,
//                     //  tintColor: palette.buttonYellow 
//                     }}
//                   source={Icon.crown}
//                 />
//               </View>
//             }
//           </TouchableOpacity>

//           <View style={{ marginLeft: "6%", width: '75%', }}>

//             {/* <CTText
//               semiBold
//               style={{ marginBottom: "4%" }}
//               textColor={palette.white}
//               fontSize={RFValue(14)}
//               text={(farmerAddress?.name && !isEmpty(farmerAddress?.name)) ? capitalize(farmerAddress?.name) : appLanguage?.welcome ?? 'Welcome'}
//             />

//             <CTText
//               textColor={palette.white}
//               fontSize={RFValue(13)}
//               medium
//               text={`+91 ${farmerAddress?.mobileNumber ?? ''}`} /> */}
//           </View>
//         </View>

//       </ImageBackground>

//       <DrawerContentScrollView showsVerticalScrollIndicator={false} {...props}>
//         <View style={{ flex: 1,
//           //  backgroundColor: palette.white 
//           }}
//            >
//           <DrawerItemList {...props} />

//           <CustomDrawercard
//             onPressname={() => {
//               if (farmerAddress?.features?.isFeedsEnabled) {
//                 props.navigation.navigate(Screen.myProfileScreen)
//               } else {
//                 props.navigation.navigate(Screen.myAccount)
//               }
//             }}
//             textName={appLanguage?.my_account ?? "My Account"}
//             imagesName={Icon.user}
//           />

//           <CustomDrawercard
//             onPressname={() => { props.navigation.navigate(Screen.myCart) }}
//             textName={appLanguage?.my_cart ?? "My Cart"}
//             imagesName={Icon.cartIcon}
//             imageStyleStatus={true}
//           />

//           <CustomDrawercard
//             onPressname={() => { props.navigation.navigate(Screen.myServiceslist) }}
//             textName={appLanguage?.my_services ?? "My Services"}
//             imagesName={Icon.cartIcon}
//             imageStyleStatus={true}
//           />
//           <CustomDrawercard
//             onPressname={() => { props.navigation.navigate(Screen.myOrderHistory) }}
//             textName={appLanguage?.orders ?? "My Orders"}
//             imagesName={Icon.myOrders}
//             imageStyleStatus={true}
//           />

//           <CustomDrawercard
//             onPressname={() => { props.navigation.navigate(Screen.bookingHistory) }}
//             textName={appLanguage?.lblmybookings ?? "My Bookings"}
//             imagesName={Icon.mybookings}
//             imageStyleStatus={true}
//           />

//           <CustomDrawercard
//             onPressname={() => { props.navigation.navigate(Screen.favouriteProduct) }}
//             textName={appLanguage?.fav_products ?? "My Favourite"}
//             imagesName={Icon.like}
//             imageStyleStatus={true}
//           />

//           {farmerAddress?.isHNI &&
//             <CustomDrawercard
//               onPressname={() => { props.navigation.navigate(Screen.myPractice) }}
//               textName={appLanguage?.my_practices ?? "My Practise"}
//               imagesName={Icon.myPractice}
//               imageStyleStatus={true}
//             />
//           }

//           <CustomDrawercard
//             onPressname={() => { props.navigation.navigate(Screen.language) }}
//             textName={appLanguage?.change_lang ?? "Language"}
//             imagesName={Icon.language}
//             imageStyleStatus={true}
//           />

//           {/* <CustomDrawercard
//               onPressname={() => { props.navigation.navigate(Screen.loyalityPoints) }}
//               textName={appLanguage?.loyality_points ?? "Loyality Points"}
//               imagesName={Icon.loyality}
//               imageStyleStatus={true}
//             /> */}

//           <CustomDrawercard
//             onPressname={() => { onPressNavigation("Share_App") }}
//             textName={appLanguage?.share_app ?? "Share App"}
//             imagesName={Icon.shareicon}
//             imageStyleStatus={false}
//           />

//           {Isplatform_IOS && (
//             <CustomDrawercard
//               onPressname={() => { onPressNavigation("Delete_Account") }}
//               textName={appLanguage?.lblDeleteaccount ?? "Delete Account"}
//               imagesName={Icon.user_Delete}
//               imageStyleStatus={true}
//             />
//           )}

//           <CustomDrawercard
//             onPressname={() => { setIslogout(true) }}
//             textName={appLanguage?.signout ?? "Sign Out"}
//             imagesName={Icon.logOut}
//             imageStyleStatus={false}
//           />

//         </View>
//       </DrawerContentScrollView>

//       <View style={{ marginHorizontal: 10, marginTop: 4, marginBottom: 4, }}>
//         <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }}
//           activeOpacity={0} onPress={() => { Linking.openURL(`tel:${Configuration.tollfreenumber_Linking}`) }} >
//           <Image source={Icon.call} style={{ height: 15, width: 15, tintColor: 'black', marginEnd: 10 }} />
//           {/* <CTText
//             fontSize={RFValue(11.5)}
//             textColor={palette.lightGrey}
//             medium
//             text={Configuration.tollfreenumber}
//           /> */}
//         </TouchableOpacity>
//       </View>

//       <Footer />

//       <CustomPopupModal
//         visible={showModal}
//         iconHideStatus={true}
//         titleHideStatus={true}
//         onPressClose={() => { setShowModal(false) }}
//         showButton={false} >
//         <View style={{ flex: 1, justifyContent: "center", width: "95%" }}>
//           <MediaPickerComponent
//             isImageComponent={true}
//             onGetImage={(item) => { onGetImage(item) }}
//             title={farmerAddress.profileImage ? (appLanguage?.edit_profile_image ?? 'Edit your profile image') : (appLanguage?.update_profile_image ?? "Upload your profile image")}
//             sizeDescription={appLanguage?.please_ensure_file_size ?? "Please ensure the file size is maximum 10MB"}
//           />
//         </View>
//       </CustomPopupModal>

//       <CustomPopupModal
//         visible={isLogout}
//         icon={Icon.warning}
//         isRed={true}
//         title={appLanguage?.warning ?? 'Warning!'}
//         buttonText={appLanguage?.yes ?? 'Yes'}
//         button2Text={appLanguage?.no ?? 'No'}
//         onPressButton2={() => { setIslogout(false) }}
//         BottomPopupStatus={true}
//         onPressDone={() => { onPressDrawerItem(Screen.logout) }}>

//         {/* <CTText
//           text={appLanguage?.logout_confirmation ?? 'Are you sure you want to logout?'}
//           fontSize={RFValue(12)}
//           semiBold
//           textColor={palette.grey}
//           style={{ textAlign: 'center' }}
//         /> */}

//       </CustomPopupModal>


//       <CustomPopupModal
//         visible={isDeleteAccountPopup}
//         icon={Icon.warning}
//         isRed={true}
//         title={appLanguage?.warning ?? 'Warning!'}
//         buttonText={appLanguage?.yes ?? 'Yes'}
//         button2Text={appLanguage?.no ?? 'No'}
//         onPressButton2={() => { setisDeleteAccountPopup(false) }}
//         BottomPopupStatus={true}
//         onPressDone={() => { onPressDeleteAccount("isDeleteAccountPopup") }}>

//         {/* <CTText
//           text={appLanguage?.lblAreyousuretodelete ?? 'Are you sure you want to Delete Account?'}
//           fontSize={RFValue(12)}
//           semiBold
//           textColor={palette.grey}
//           style={{ textAlign: 'center' }}
//         /> */}

//       </CustomPopupModal>


//       <Webview_popup
//         isPopupHidden={false}
//         popupTitle={appLanguage?.terms ?? 'Terms and Conditions'}
//         popupVisible={showTerms_Conditions}
//         onPressClose={() => { setShowTerms_Conditions(false) }}
//         WebViewURL={constants.termsAndCondition}
//       />

//       <Indicator show={isLoading} />
//     </View>
//   );
// };

// export default DrawerContent;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     // backgroundColor: palette.white,
//   },
//   userInfoSection: {
//     paddingHorizontal: "5%",
//     flexDirection: "row",
//     alignItems: 'center',
//   },

//   image: {
//     width: 80,
//     height: 80,
//     borderRadius: 40,
//     marginBottom: "5%",
//     borderWidth: 5,
//     // borderColor: palette.buttonYellow
//   },
//   crown: {
//     // backgroundColor: palette.orange,
//     justifyContent: 'center',
//     alignItems: 'center',
//     borderRadius: 50,
//     position: 'absolute',
//     right: -5, top: -5, padding: 5
//   },

// });
import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import language from '../../src/assets/drawer/language.png'
import edit from '../../src/assets/drawer/edit.png'
import location from '../../src/assets/images/common/location.png';
import phone from '../../src/assets/images/common/phone.png';
import { height } from '../config/resposiveSize';
import { SafeAreaView } from 'react-native-safe-area-context';
import { DrawerActions, useNavigation } from '@react-navigation/native';
import { Screen } from './screen';
import HomeIcong from '../../src/assets/drawer/homeIcon.png'
// import call from '../assets/drawer/call.png'
import signout from '../assets/drawer/signOut.png'
import CustomPopupModal from '../components/common/custom-popup-modal';
import { navigationRef } from './root-navigation';
import { UserManager } from '../storage';
import CTText from '../components/ctText';
import { Icon } from '../../assets/images';
import { RFValue } from 'react-native-responsive-fontsize';
import { palette } from '../theme/color';

const DrawerContent = (props) => {
  const appLanguage = UserManager?.getAppMultiLanguage
  const [isLogout, setIslogout] = useState(false)

  const navigation = useNavigation();

  const handleCloseDrawer = () => {
    props.navigation.closeDrawer()
  };


  const onPressDrawerItem = (screen) => {
    try {
      if (Screen.logout == screen) {
        setIslogout(false)
        UserManager.logoutDrawer()
        navigation.navigate(Screen.welcome);
        navigationRef.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: 'home' }], // or just 'MyCart' if you're not using the Screen object
          })
        );
        props.navigation.dispatch(DrawerActions.toggleDrawer());
        return;
      }
      props.navigation.dispatch(DrawerActions.toggleDrawer());
      props.navigation.navigate(Screen);
    } catch (e) {
      console.log(e)
    }

  };


  const renderOption = (title, icon, path) => (
    <TouchableOpacity style={styles.option}
      onPress={() => navigation.navigate(path)}
    >
      <Image source={icon} style={styles.icon} />
      <Text style={styles.optionText}>{title}</Text>
      <Image source={require('../../src/assets/drawer/forwardArrow.png')} style={{ width: 9, height: 9, marginLeft: 'auto', objectFit: 'contain' }} />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView >
        <View style={styles.header}>
          <View style={{ flexDirection: 'row' }}>
            <Image source={require('../../src/assets/drawer/userProfile.png')} style={styles.avatar} />

            <View style={{ flex: 1, marginLeft: 12 }}>
              <Text style={styles.name}>Ramachandra</Text>

              <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 2 }}>
                <Image source={phone} style={{ width: 12, height: 12, marginRight: 6 }} />
                <Text style={styles.phone}>+91-7021234567</Text>
              </View>

              <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 2 }}>
                <Image source={location} style={{ width: 12, height: 12, marginRight: 6 }} />
                <Text style={styles.location}>Anantapur, Andhra Pradesh</Text>
              </View>

            </View>
          </View>

          <TouchableOpacity style={styles.editButton}>
            <Image source={edit} style={{ width: 14, height: 14, marginRight: 6 }} />
            <Text style={styles.editText}>EDIT</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.closeIcon} onPress={handleCloseDrawer}>
            <Image source={require('../../src/assets/images/common/close.png')} style={{ width: 16, height: 16 }} resizeMode='contain' />
          </TouchableOpacity>
        </View>

        {/* Language Selection */}
        <View style={styles.languageRow}>

          <View style={{ alignItems: 'center', justifyContent: 'flex-start', flexDirection: 'row' }}>
            <Image source={language} style={{ height: 15, width: 15 }} />
            <Text style={styles.languageLabel}> Language:</Text>
          </View>
          <View style={{ alignItems: 'center', justifyContent: 'flex-start', flexDirection: 'row' }}>

            <Text style={styles.languageValue}>English</Text>
            <Image source={require('../../src/assets/drawer/forwardArrow.png')} style={{ width: 9, height: 9, objectFit: 'contain' }} />

          </View>
        </View>

        {/* Menu Options */}
        <View style={styles.section}>
          {renderOption('Home', require('../../src/assets/drawer/homeIcon.png'), Screen.homes)}
          {renderOption('My Account', require('../../src/assets/drawer/accountIcon.png'), Screen.myAccount)}
          {renderOption('My Orders', require('../../src/assets/drawer/orderIcon.png'), Screen.myOrderHistory)}
          {renderOption('My Cart', require('../../src/assets/drawer/cart.png'), Screen.myCart)}
          {renderOption('Favourite Products', require('../../src/assets/drawer/favourite.png'))}
        </View>

        <View style={styles.gridSection}>
          {renderGridOption('Shop', require('../../src/assets/drawer/shop.png'))}
          {renderGridOption('My Services', require('../../src/assets/drawer/service.png'))}
          {renderGridOption('Crop Advisory', require('../../src/assets/drawer/crop.png'))}
          {renderGridOption('Crop Doctor', require('../../src/assets/drawer/cropZoom.png'))}
        </View>

        <View style={styles.section}>
          {renderOption('Terms & Conditions', require('../../src/assets/drawer/terms.png'))}
          {renderOption('Share App', require('../../src/assets/drawer/share.png'))}
          {renderOption('Call 1800 425 2828', require('../assets/drawer/call.png'))}
        </View>
        <TouchableOpacity style={styles.signOutButton}
          onPress={() => setIslogout(true)}
        >
          <View style={styles.row}>
            <Text style={styles.signOutText}>Sign Out</Text>
            <Image source={signout} style={styles.signOutIcon} />
          </View>
        </TouchableOpacity>
      </ScrollView>

      <CustomPopupModal
        visible={isLogout}
        icon={Icon.warning}
        isRed={true}
        title={appLanguage?.warning ?? 'Warning!'}
        buttonText={appLanguage?.yes ?? 'Yes'}
        button2Text={appLanguage?.no ?? 'No'}
        onPressButton2={() => { setIslogout(false) }}
        BottomPopupStatus={true}
        onPressDone={() => { onPressDrawerItem(Screen.logout) }}>

        <CTText
          text={appLanguage?.logout_confirmation ?? 'Are you sure you want to logout?'}
          fontSize={RFValue(12)}
          semiBold
          textColor={palette.grey}
          style={{ textAlign: 'center' }}
        />

      </CustomPopupModal>
    </SafeAreaView>
  );
};



const renderGridOption = (title, icon) => (
  <TouchableOpacity style={styles.gridItem}>
    <Image source={icon} style={styles.gridIcon} />
    <Text style={styles.gridText}>{title}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    borderTopRightRadius: 12,
    borderTopLeftRadius: 12,
    // marginTop: 30

  },
  header: {
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#0A8F43',
    padding: 16,
    borderTopRightRadius: 12,
    borderTopLeftRadius: 12,
    paddingVertical: 30
  },

  closeIcon: {
    position: "absolute",
    top: 14,
    right: 15,

  },

  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 12,
  },
  name: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  phone: {
    color: '#fff',
    fontSize: 12,

  },
  location: {
    color: '#fff',
    fontSize: 12,
  },
  editButton: {
    marginLeft: 80,
    marginTop: 12,
    flexDirection: 'row',
    marginRight: 'auto',
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 12,
    paddingVertical: 4,
    paddingHorizontal: 10,
  },
  editText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '500',
  },
  languageRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 12,
    backgroundColor: '#FFFCE8'
  },
  languageLabel: {
    fontSize: 14,
    color: '#000',
    marginLeft: 10

  },
  languageValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000',
    marginRight: 10
  },
  section: {
    marginTop: 10,
    backgroundColor: '#fff',
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 8,
    margin: 12,
    marginTop: 20
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  icon: {
    width: 16,
    height: 16,
    marginRight: 16,
  },
  optionText: {
    fontSize: 14,
    color: '#000',
  },
  gridSection: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    padding: 10, width: '100%',

  },
  gridItem: {
    width: '47%',
    backgroundColor: '#fff',
    paddingVertical: 14,
    alignItems: 'left',
    borderRadius: 8,
    marginBottom: 12,
    height: 80,
  },
  gridIcon: {
    width: 16,
    height: 16,
    marginBottom: 8,
    marginLeft: 16,
  },
  gridText: {
    fontSize: 14,
    color: '#000',
    fontWeight: '500',
    marginLeft: 16,
  },
  signOutButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginHorizontal: 16,
    marginVertical: 8,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    elevation: 1,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  signOutText: {
    color: '#01AD41',
    fontSize: 16,
    fontWeight: '600',
    marginRight: 8,
  },
  signOutIcon: {
    width: 18,
    height: 18,
    tintColor: '#01AD41',
  },
});

export default DrawerContent;
