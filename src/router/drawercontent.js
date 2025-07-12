import React, { useEffect, useState } from "react";
import {
  StyleSheet, View, Image, TouchableOpacity,
  ImageBackground, Share, Linking, Platform
} from "react-native";
import { DrawerContentScrollView, DrawerItem, DrawerItemList, } from "@react-navigation/drawer";
import { CommonActions, DrawerActions, useNavigation } from "@react-navigation/native";
// import { palette, textSize } from "../theme";
import { Screen } from "./screen";
import { Icon } from "../../assets/images";
import MediaPickerComponent from "../components/media-picker-component";
import { UserType } from "../redux/user/type";
import { useDispatch, useSelector } from "react-redux";
import { useOperation } from "../redux/operation";
import { HEToast } from "../components/toast";
import { createLoadingSelector } from '../redux/loading-reducer';
import { UserManager } from "../storage";
import constants from "../config/constants";
import { Configuration } from "../config";
import { isEmpty } from "../utils/validator";
import { getVersion } from 'react-native-device-info';
import { RFValue } from "react-native-responsive-fontsize";
import Webview_popup from "../components/webview_popup"
import CustomPopupModal from "../components/custom-popup-modal"
// import CTText from "../components/ctText"
import CustomDrawercard from "../components/custom-drawercard"
import Indicator from "../components/indicator"
import { FarmerType } from "../redux/farmer/type";
import { capitalize } from "lodash";
import { defConfigImageURL } from "../pages/dashboard_Modules/tabs/home/index.service";
import { Isplatform_IOS } from "../config/resposiveSize";
// import { palette } from "../theme";

const DrawerContent = (props) => {
  UserManager.loadUser()
  const navigation = useNavigation();
  const operation = useOperation();
  const dispatch = useDispatch();
  const loadingSelector = createLoadingSelector([UserType.uploadProfileImage, FarmerType.farmerAddress, UserType.deleteAccount]);
  const isLoading = useSelector(state => loadingSelector(state));
  const [isLogout, setIslogout] = useState(false)
  const [showTerms_Conditions, setShowTerms_Conditions] = useState(false)
  const appLanguage = UserManager?.getAppMultiLanguage
  const [showModal, setShowModal] = useState(false)
  const [isDeleteAccountPopup, setisDeleteAccountPopup] = useState(false)
  const farmerAddress = useSelector((state) => state.farmer.farmerAddressArray)
  const BannerData = useSelector((state) => state.product.bannerData);

  const getUserDetails = (tempParam) => {
    let addressParam = { id: UserManager.getUserId, mobileNumber: UserManager.getUserMobileNumber }
    dispatch(operation.farmer.getFarmerAddress(addressParam))
  }


  const Footer = () => {
    return (
      <View style={{
        padding: 10, flexDirection: "row", justifyContent: "space-between",
        alignItems: "center",
        //  backgroundColor: palette.white
      }}>
        <TouchableOpacity>

          {/* <CTText
            textColor={palette.gray}
            underline
            medium
            text={appLanguage?.terms ?? "Terms and Conditions"}
            style={{ fontSize: RFValue(10.5) }}
            onPress={() => { setShowTerms_Conditions(true) }} /> */}

        </TouchableOpacity>

        {/* <CTText
          style={{ fontSize: RFValue(10.5) }}
          textColor={palette.gray}
          medium
          text={`${Configuration.version} : ${getVersion()}${Configuration.buildNo}`} /> */}

      </View>
    );
  };

  const onPressNavigation = (Route) => {

    if (Route == "Share_App") {
      let refMsg = `${appLanguage.lblLetmerecommend ?? "Let me recommend you this application"} \n\n ${Isplatform_IOS ? constants.ios : constants.android}`
      Share.share({ message: refMsg });
    } else {
      setisDeleteAccountPopup(true)
    }

  }


  const onPressDrawerItem = (screen) => {
    try {
      if (Screen.logout == screen) {
        setIslogout(false)
        UserManager.logoutDrawer()
        props.navigation.dispatch(
          CommonActions.reset({
            index: 1,
            routes: [{ name: Screen.welcome }],
          }),
        );
        props.navigation.dispatch(DrawerActions.toggleDrawer());
        return;
      }
      props.navigation.dispatch(DrawerActions.toggleDrawer());
      props.navigation.navigate(Screen);
    } catch (e) {

    }

  };

  const onPressDeleteAccount = () => {

    let param = farmerAddress.farmerIdentityId ?? ""
    dispatch(operation.user.getdeleteAccount(param)).then((res) => {
      if (res?.data) {
        setisDeleteAccountPopup(false)
        onPressDrawerItem(Screen.logout)
      } else {
        dispatch(operation.user.getErrorHandling(res, "getdeleteAccount"))
      }
    }).catch((err) => {
      dispatch(operation.user.getErrorHandling(err, "getdeleteAccount"))
    });

  }

  const onPressAvatar = () => {
    if ((farmerAddress?.features?.isFeedsEnabled)) {
      navigation.navigate(Screen.myProfileScreen)
    } else {
      setShowModal(true)
    }
  }


  const onGetImage = (item) => {
    const file = item
    let size = Math.round((file.fileSize / 1024))
    if (size > 5120) {
      HEToast(appLanguage?.lblFilesizeistoobig ?? 'File size is too big. Please select a file less than 5MB', 'error')
    }
    const formData = new FormData();
    file.name = file?.fileName;
    formData.append('file', file)
    formData.append('farmer_id', farmerAddress.farmerIdentityId)
    dispatch(operation.user.uploadProfileImage(formData)).then((res) => {
      let tempParam = {
        farmerIdentityId: farmerAddress.farmerIdentityId,
      }
      getUserDetails(tempParam)
      setShowModal(false)
      HEToast(appLanguage?.image_success_message ?? 'Image upload successfully', 'success')
    }).catch((err) => {
      dispatch(operation.user.getErrorHandling(err, "uploadProfileImage"))
    })
  }

  let isImageAvailable = (!isEmpty(farmerAddress.profileImage)) ? true : false

  return (
    <View style={styles.container}>
      <ImageBackground source={Icon.headerLeaf} style={{ padding: '4%' }}>
        <TouchableOpacity style={{ height: 30, width: 30, alignItems: 'center', justifyContent: 'center', }} onPress={() => props.navigation.closeDrawer()}>
          <Image source={Icon.backArrow} style={{ height: 20, width: 20,
            //  tintColor: palette.white, 
             }} />
        </TouchableOpacity>

        <View style={styles.userInfoSection}>
          <TouchableOpacity onPress={onPressAvatar}>
            <Image
              style={styles.image}
              source={isImageAvailable ? { uri: defConfigImageURL(BannerData.imageBaseURL, farmerAddress.profileImage) } : Icon.profileAvatar}
              resizeMode="cover"
            />

            {farmerAddress?.isHNI &&
              <View style={styles.crown}>
                <Image
                  style={{ height: 20, width: 20,
                    //  tintColor: palette.buttonYellow 
                    }}
                  source={Icon.crown}
                />
              </View>
            }
          </TouchableOpacity>

          <View style={{ marginLeft: "6%", width: '75%', }}>

            {/* <CTText
              semiBold
              style={{ marginBottom: "4%" }}
              textColor={palette.white}
              fontSize={RFValue(14)}
              text={(farmerAddress?.name && !isEmpty(farmerAddress?.name)) ? capitalize(farmerAddress?.name) : appLanguage?.welcome ?? 'Welcome'}
            />

            <CTText
              textColor={palette.white}
              fontSize={RFValue(13)}
              medium
              text={`+91 ${farmerAddress?.mobileNumber ?? ''}`} /> */}
          </View>
        </View>

      </ImageBackground>

      <DrawerContentScrollView showsVerticalScrollIndicator={false} {...props}>
        <View style={{ flex: 1,
          //  backgroundColor: palette.white 
          }}
           >
          <DrawerItemList {...props} />

          <CustomDrawercard
            onPressname={() => {
              if (farmerAddress?.features?.isFeedsEnabled) {
                props.navigation.navigate(Screen.myProfileScreen)
              } else {
                props.navigation.navigate(Screen.myAccount)
              }
            }}
            textName={appLanguage?.my_account ?? "My Account"}
            imagesName={Icon.user}
          />

          <CustomDrawercard
            onPressname={() => { props.navigation.navigate(Screen.myCart) }}
            textName={appLanguage?.my_cart ?? "My Cart"}
            imagesName={Icon.cartIcon}
            imageStyleStatus={true}
          />

          <CustomDrawercard
            onPressname={() => { props.navigation.navigate(Screen.myServiceslist) }}
            textName={appLanguage?.my_services ?? "My Services"}
            imagesName={Icon.cartIcon}
            imageStyleStatus={true}
          />
          <CustomDrawercard
            onPressname={() => { props.navigation.navigate(Screen.myOrderHistory) }}
            textName={appLanguage?.orders ?? "My Orders"}
            imagesName={Icon.myOrders}
            imageStyleStatus={true}
          />

          <CustomDrawercard
            onPressname={() => { props.navigation.navigate(Screen.bookingHistory) }}
            textName={appLanguage?.lblmybookings ?? "My Bookings"}
            imagesName={Icon.mybookings}
            imageStyleStatus={true}
          />

          <CustomDrawercard
            onPressname={() => { props.navigation.navigate(Screen.favouriteProduct) }}
            textName={appLanguage?.fav_products ?? "My Favourite"}
            imagesName={Icon.like}
            imageStyleStatus={true}
          />

          {farmerAddress?.isHNI &&
            <CustomDrawercard
              onPressname={() => { props.navigation.navigate(Screen.myPractice) }}
              textName={appLanguage?.my_practices ?? "My Practise"}
              imagesName={Icon.myPractice}
              imageStyleStatus={true}
            />
          }

          <CustomDrawercard
            onPressname={() => { props.navigation.navigate(Screen.language) }}
            textName={appLanguage?.change_lang ?? "Language"}
            imagesName={Icon.language}
            imageStyleStatus={true}
          />

          {/* <CustomDrawercard
              onPressname={() => { props.navigation.navigate(Screen.loyalityPoints) }}
              textName={appLanguage?.loyality_points ?? "Loyality Points"}
              imagesName={Icon.loyality}
              imageStyleStatus={true}
            /> */}

          <CustomDrawercard
            onPressname={() => { onPressNavigation("Share_App") }}
            textName={appLanguage?.share_app ?? "Share App"}
            imagesName={Icon.shareicon}
            imageStyleStatus={false}
          />

          {Isplatform_IOS && (
            <CustomDrawercard
              onPressname={() => { onPressNavigation("Delete_Account") }}
              textName={appLanguage?.lblDeleteaccount ?? "Delete Account"}
              imagesName={Icon.user_Delete}
              imageStyleStatus={true}
            />
          )}

          <CustomDrawercard
            onPressname={() => { setIslogout(true) }}
            textName={appLanguage?.signout ?? "Sign Out"}
            imagesName={Icon.logOut}
            imageStyleStatus={false}
          />

        </View>
      </DrawerContentScrollView>

      <View style={{ marginHorizontal: 10, marginTop: 4, marginBottom: 4, }}>
        <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }}
          activeOpacity={0} onPress={() => { Linking.openURL(`tel:${Configuration.tollfreenumber_Linking}`) }} >
          <Image source={Icon.call} style={{ height: 15, width: 15, tintColor: 'black', marginEnd: 10 }} />
          {/* <CTText
            fontSize={RFValue(11.5)}
            textColor={palette.lightGrey}
            medium
            text={Configuration.tollfreenumber}
          /> */}
        </TouchableOpacity>
      </View>

      <Footer />

      <CustomPopupModal
        visible={showModal}
        iconHideStatus={true}
        titleHideStatus={true}
        onPressClose={() => { setShowModal(false) }}
        showButton={false} >
        <View style={{ flex: 1, justifyContent: "center", width: "95%" }}>
          <MediaPickerComponent
            isImageComponent={true}
            onGetImage={(item) => { onGetImage(item) }}
            title={farmerAddress.profileImage ? (appLanguage?.edit_profile_image ?? 'Edit your profile image') : (appLanguage?.update_profile_image ?? "Upload your profile image")}
            sizeDescription={appLanguage?.please_ensure_file_size ?? "Please ensure the file size is maximum 10MB"}
          />
        </View>
      </CustomPopupModal>

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

        {/* <CTText
          text={appLanguage?.logout_confirmation ?? 'Are you sure you want to logout?'}
          fontSize={RFValue(12)}
          semiBold
          textColor={palette.grey}
          style={{ textAlign: 'center' }}
        /> */}

      </CustomPopupModal>


      <CustomPopupModal
        visible={isDeleteAccountPopup}
        icon={Icon.warning}
        isRed={true}
        title={appLanguage?.warning ?? 'Warning!'}
        buttonText={appLanguage?.yes ?? 'Yes'}
        button2Text={appLanguage?.no ?? 'No'}
        onPressButton2={() => { setisDeleteAccountPopup(false) }}
        BottomPopupStatus={true}
        onPressDone={() => { onPressDeleteAccount("isDeleteAccountPopup") }}>

        {/* <CTText
          text={appLanguage?.lblAreyousuretodelete ?? 'Are you sure you want to Delete Account?'}
          fontSize={RFValue(12)}
          semiBold
          textColor={palette.grey}
          style={{ textAlign: 'center' }}
        /> */}

      </CustomPopupModal>


      <Webview_popup
        isPopupHidden={false}
        popupTitle={appLanguage?.terms ?? 'Terms and Conditions'}
        popupVisible={showTerms_Conditions}
        onPressClose={() => { setShowTerms_Conditions(false) }}
        WebViewURL={constants.termsAndCondition}
      />

      <Indicator show={isLoading} />
    </View>
  );
};

export default DrawerContent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: palette.white,
  },
  userInfoSection: {
    paddingHorizontal: "5%",
    flexDirection: "row",
    alignItems: 'center',
  },

  image: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: "5%",
    borderWidth: 5,
    // borderColor: palette.buttonYellow
  },
  crown: {
    // backgroundColor: palette.orange,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    position: 'absolute',
    right: -5, top: -5, padding: 5
  },

});
