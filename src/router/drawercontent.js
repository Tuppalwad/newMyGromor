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
import signout from '../assets/drawer/signOut.png'
import { navigationRef } from './root-navigation';
import { UserManager } from '../storage';
import CTText from '../components/ctText';
import { Icon } from '../../assets/images';
import { RFValue } from 'react-native-responsive-fontsize';
import { palette } from '../theme/color';
import CustomPopupModal from '../components/common/CustomPopupModal';

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
