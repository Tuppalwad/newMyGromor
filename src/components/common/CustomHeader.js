import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput, Share } from 'react-native';
import colors from '../../utils/theam'; // Your color file
import menuIcon from '../../assets/images/splash/menu.png';
import leftArrow from '../../assets/images/splash/leftArrow.png';
// import backIcon from '../../assets/images/splash/back.png';
import bellIcon from '../../assets/images/splash/BellIcon.png';
import cartIcon from '../../assets/images/splash/cart.png';
import redDot from '../../assets/images/splash/redDot.png';
import searchIcon from '../../assets/images/splash/search.png';
import locationIcon from '../../assets/images/splash/location.png';
import LinearGradient from 'react-native-linear-gradient';
import { useDispatch, useSelector } from 'react-redux';
import ShareIcon from '../../assets/images/common/share.png';
import Hart from '../../assets/drawer/favourite.png';
import { useNavigation } from '@react-navigation/native';
import { Screen } from '../../router/screen';
import LikeIcon from '../../assets/images/common/LikeIcon.png'
import { getPreviousAddress } from '../../redux/user/operation';
import { Isplatform_Android } from '../../config/resposiveSize';
import constants from '../../config/constants';

export default function CustomHeader({
    type = 'home', // 'home' or 'shop'
    welcomeText = '',
    showLocation = false,
    // storeCode = '',
    locationName = '',
    onBackPress,
    onMenuPress,
    // onCartPress,
    onNotificationPress,
    onSearch,
    subtitle = '',
    topTitle,
    onPressFavourite,
    itemData,
    isFav,
    onPressDeleteFav

}) {
    const dispatch = useDispatch()
    const StoreCodeDetails = useSelector(
        state => state.farmer.farmerStoreCodeDetails,
    );
    const { storeName, storeCode, address, contactDetails } = StoreCodeDetails
    const navigation = useNavigation()
    const onCartPress = () => { setPreviousAddress(), navigation.navigate(Screen.myCart) }
    const cartDataArray = useSelector(state => state.product.cartData);
    const cartBookingDataArray = useSelector(
        state => state.product.cartBookingData,
    );
    const cartCount = (cartDataArray?.length || 0) + (cartBookingDataArray.length || 0);
    const farmerAddress = useSelector(state => state.farmer.farmerAddressArray);

    const setPreviousAddress = async () => {
        try {
            await dispatch(getPreviousAddress(farmerAddress.farmerIdentityId))
        } catch (error) {
            console.log(error)
        }
    }

    const onPressShare = () => {
        let refMsg = `Check this item \n\n ${Isplatform_Android ? constants.android : constants.ios
            }`;
        Share.share({
            message: refMsg,
        });
    };


    return (
        <View>
            <View style={{
                ...styles.headerContainer,
                backgroundColor: ["home", "profile"].includes(type) ? "transperent" : '#fff',

            }}>
                <View style={styles.leftSection}>
                    {type === 'home' ? (
                        <TouchableOpacity onPress={onMenuPress}>
                            <Image source={menuIcon} style={styles.icon} resizeMode='contain' />
                        </TouchableOpacity>
                    ) : (
                        <TouchableOpacity onPress={onBackPress}>
                            <Image source={leftArrow} style={{
                                ...styles.icon,
                                tintColor: type == "profile" ? "#fff" : '#222',

                            }} resizeMode='contain' />
                        </TouchableOpacity>
                    )}


                    {type === 'home' ? (
                        <View style={styles.welcomeBox}>
                            <Image source={require('../../assets/images/splash/logo.png')} style={styles.logo} resizeMode='contain' />
                            <View style={{ marginLeft: 8 }}>
                                <Text style={styles.welcome}>Welcome</Text>
                                <Text style={styles.username}>{welcomeText}</Text>
                            </View>
                        </View>
                    ) : (
                        <View style={{ marginLeft: 10 }}>
                            <Text style={{
                                ...styles.shopTitle,
                                color: type == "profile" ? "#fff" : '#222',

                            }}>{topTitle}</Text>
                            {showLocation && (
                                <View style={styles.storeDetails}>
                                    <Image source={locationIcon} style={styles.locationIcon} resizeMode='contain' />
                                    <Text style={{ marginLeft: 5 }}>Store Code: {storeCode} | {storeName?.slice(0, 10) + "..."}</Text>

                                </View>
                            )}
                        </View>
                    )}
                </View>

                <View style={styles.rightSection}>
                    {
                        type == "detail" ? (
                            <View style={{ flexDirection: 'row' }}>
                                <TouchableOpacity onPress={onPressShare} style={{ marginRight: 15 }}>
                                    <Image source={ShareIcon} style={styles.icon} resizeMode='contain' />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => {
                                    isFav ? onPressDeleteFav(itemData) : onPressFavourite(itemData)
                                }}
                                    style={{ marginRight: 15 }} >
                                    {isFav ? <Image source={LikeIcon} style={{ width: 25, height: 25 }} resizeMode='contain' /> : <Image source={Hart} style={styles.icon} resizeMode='contain' />}
                                </TouchableOpacity>

                                <TouchableOpacity onPress={onCartPress} style={{ marginRight: 15 }}>
                                    <View style={{ position: 'relative' }}>
                                        <Image source={cartIcon} style={styles.carticon} resizeMode="contain" />

                                        {cartCount > 0 && (
                                            <View style={styles.badge}>
                                                <Text style={styles.badgeText}>{cartCount}</Text>
                                            </View>
                                        )}
                                    </View>
                                </TouchableOpacity>

                            </View>
                        ) :
                            <>
                                <TouchableOpacity onPress={onNotificationPress} style={styles.iconWrapper}>
                                    <Image source={bellIcon} style={{
                                        width: 22,
                                        height: 22,
                                        tintColor: type == "profile" ? "#fff" : '#222',

                                    }} resizeMode='contain' />
                                </TouchableOpacity>

                                <TouchableOpacity onPress={onCartPress} style={{ marginRight: 15 }}>
                                    <View style={{ position: 'relative' }}>
                                        <Image source={cartIcon} style={{
                                            ...styles.carticon,
                                            tintColor: type == "profile" ? "#fff" : '#222',
                                        }} resizeMode="contain" />

                                        {cartCount > 0 && (
                                            <View style={styles.badge}>
                                                <Text style={styles.badgeText}>{cartCount}</Text>
                                            </View>
                                        )}
                                    </View>
                                </TouchableOpacity>

                            </>
                    }
                </View>
            </View>
        </View>
        // </LinearGradient>
    );
}

const styles = StyleSheet.create({
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingTop: 14,
        paddingBottom: 10,
    },
    leftSection: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    welcomeBox: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 20,
    },
    logo: {
        width: 40,
        height: 40,
        marginRight: 8,
        resizeMode: 'contain',
    },
    welcome: {
        fontSize: 12,
        color: '#555',
    },
    username: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#222',
    },
    shopTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft: 8,
    },
    shopSubTitle: {
        fontSize: 12,
        lineHeight: 10,
        fontWeight: 'bold',
        color: '#222',
        marginLeft: 2,
        // marginTop: 10

    },
    storeDetails: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 8,
        marginTop: 10,
        alignItems: 'center'
    },
    locationIcon: {
        width: 12,
        height: 12,
        marginRight: 4,
    },
    storeText: {
        fontSize: 12,
        color: '#666',
    },
    rightSection: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    iconWrapper: {
        marginRight: 16,
        position: 'relative',
    },
    redDot: {
        width: 8,
        height: 8,
        position: 'absolute',
        top: -2,
        right: -2,
    },
    icon: {
        width: 18,
        height: 18,
        resizeMode: 'contain',
    },

    carticon: {
        width: 24,
        height: 24,
        resizeMode: 'contain',
    },

    badge: {
        position: 'absolute',
        top: -8,
        right: -8,
        backgroundColor: 'red',
        borderRadius: 10,
        paddingHorizontal: 5,
        minWidth: 18,
        height: 18,
        justifyContent: 'center',
        alignItems: 'center',
    },

    badgeText: {
        color: '#fff',
        fontSize: 10,
        fontWeight: 'bold',
    },


});
