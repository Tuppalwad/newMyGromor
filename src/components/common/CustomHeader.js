import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput } from 'react-native';
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
import { useSelector } from 'react-redux';
import Share from '../../assets/images/common/share.png';
import Hart from '../../assets/drawer/favourite.png';


export default function CustomHeader({
    type = 'home', // 'home' or 'shop'
    welcomeText = '',
    showLocation = false,
    // storeCode = '',
    locationName = '',
    onBackPress,
    onMenuPress,
    onCartPress,
    onNotificationPress,
    onSearch,
    subtitle = '',
    topTitle,
}) {
    const StoreCodeDetails = useSelector(
        state => state.farmer.farmerStoreCodeDetails,
    );
    const { storeName, storeCode, address, contactDetails } = StoreCodeDetails


    return (
        <View>
            <View style={{
                ...styles.headerContainer,
                backgroundColor: type == "home" ? "transperent" : '#fff',

            }}>
                <View style={styles.leftSection}>
                    {type === 'home' ? (
                        <TouchableOpacity onPress={onMenuPress}>
                            <Image source={menuIcon} style={styles.icon} resizeMode='contain' />
                        </TouchableOpacity>
                    ) : (
                        <TouchableOpacity onPress={onBackPress}>
                            <Image source={leftArrow} style={styles.icon} resizeMode='contain' />
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
                            <Text style={styles.shopTitle}>{topTitle}</Text>
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
                                <TouchableOpacity onPress={Share} style={{ marginRight: 15 }}>
                                    <Image source={Share} style={styles.icon} resizeMode='contain' />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={Hart} style={{ marginRight: 15 }}>
                                    <Image source={Hart} style={styles.icon} resizeMode='contain' />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={onCartPress} style={{ marginRight: 15 }}>
                                    <Image source={cartIcon} style={styles.icon} resizeMode='contain' />
                                </TouchableOpacity>
                            </View>
                        ) :
                            <>
                                <TouchableOpacity onPress={onNotificationPress} style={styles.iconWrapper}>
                                    <Image source={bellIcon} style={styles.icon} resizeMode='contain' />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={onCartPress}>
                                    <Image source={cartIcon} style={styles.icon} resizeMode='contain' />
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
        color: '#222',
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
        width: 16,
        height: 16,
        resizeMode: 'contain',
    },

});
