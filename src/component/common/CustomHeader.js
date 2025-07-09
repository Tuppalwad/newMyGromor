import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput } from 'react-native';
import colors from '../../utils/theam'; // Your color file
import menuIcon from '../../assets/images/splash/menu.png';
import leftArrow from '../../assets/images/splash/leftArrow.png';
// import backIcon from '../../assets/images/splash/back.png';
import bellIcon from '../../assets/images/splash/bell.png';
import cartIcon from '../../assets/images/splash/cart.png';
import redDot from '../../assets/images/splash/redDot.png';
import searchIcon from '../../assets/images/splash/search.png';
import locationIcon from '../../assets/images/splash/location.png';

export default function CustomHeader({
    type = 'home', // 'home' or 'shop'
    welcomeText = '',
    showLocation = false,
    storeCode = '',
    locationName = '',
    onBackPress,
    onMenuPress,
    onCartPress,
    onNotificationPress,
    onSearch,
    subtitle = '',
}) {
    return (
        <View>
            <View style={styles.headerContainer}>
                <View style={styles.leftSection}>
                    {type === 'home' ? (
                        <TouchableOpacity onPress={onMenuPress}>
                            <Image source={menuIcon} style={styles.icon} />
                        </TouchableOpacity>
                    ) : (
                        <TouchableOpacity onPress={onBackPress}>
                            <Image source={leftArrow} style={styles.icon} />
                        </TouchableOpacity>
                    )}
                    {type === 'home' ? (
                        <View style={styles.welcomeBox}>
                            <Image source={require('../../assets/images/splash/logo.png')} style={styles.logo} />
                            <View>
                                <Text style={styles.welcome}>Welcome</Text>
                                <Text style={styles.username}>{welcomeText}</Text>
                            </View>
                        </View>
                    ) : (
                        <View>
                            <Text style={styles.shopTitle}>Shop</Text>
                            <Text style={styles.shopSubTitle}>{subtitle}</Text>

                            {showLocation && (
                                <View style={styles.storeDetails}>
                                    <Image source={locationIcon} style={styles.locationIcon} />
                                    <Text style={styles.storeText}>Store Code: {storeCode} | {locationName}</Text>
                                </View>
                            )}
                        </View>
                    )}
                </View>

                <View style={styles.rightSection}>
                    <TouchableOpacity onPress={onNotificationPress} style={styles.iconWrapper}>
                        <Image source={bellIcon} style={styles.icon} />
                        <Image source={redDot} style={styles.redDot} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={onCartPress}>
                        <Image source={cartIcon} style={styles.icon} />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingTop: 20,
        paddingBottom: 10,
        backgroundColor: '#fff',
    },
    leftSection: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    welcomeBox: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 10,
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
        marginLeft: 8,

    },
    storeDetails: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 8,
        marginTop: 2,
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
        width: 22,
        height: 22,
        resizeMode: 'contain',
    },

});
