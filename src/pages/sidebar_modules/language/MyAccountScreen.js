import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, FlatList } from 'react-native';
import phone from '../../../assets/images/common/phone.png'
import location from '../../../assets/images/common/location.png'
import storeLocation from '../../../assets/images/common/locationGreen.png'
import rightArrow from '../../../assets/images/common/rightArrow.png'
import LinearGradient from 'react-native-linear-gradient';
import leftArrow from '../../../assets/images/splash/leftArrow.png'
import CustomHeader from '../../../components/common/CustomHeader';
const MyAccountScreen = () => {
    const menuItems = [
        { title: 'My Information', icon: require('../../../assets/images/account/accountUser.png') },
        { title: 'My Crops', icon: require('../../../assets/images/account/mycrop.png') },
        { title: 'My Assets', icon: require('../../../assets/images/account/myasset.png') },
        { title: 'My Feeds', icon: require('../../../assets/images/account/myfeed.png') },
        { title: 'Saved Feeds', icon: require('../../../assets/images/account/savefeed.png') },
        { title: 'My Groups', icon: require('../../../assets/images/account/mygroup.png') },
        { title: 'Public Groups', icon: require('../../../assets/images/account/publicgroup.png') },
        { title: 'Followers', icon: require('../../../assets/images/account/followers.png') },
        { title: 'Following', icon: require('../../../assets/images/account/following.png') },
    ];
    const gradientColors = ['#1E8153', '#4EA618']; // dark green to light green

    const renderItem = ({ item }) => {
        return (<TouchableOpacity style={styles.gridItem}>
            <Image source={item.icon} style={styles.gridIcon} />
            <Text style={styles.gridText}>{item.title}</Text>
        </TouchableOpacity>)
    }

    return (
        <ScrollView style={styles.container}>
            <LinearGradient
                colors={gradientColors}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.headerContainer} // Ensure container has height and padding
            >
                {/* Header */}
                {/* <View style={styles.header}>
                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginRight: 10 }}>
                        <Image source={leftArrow} style={{ height: 14, width: 14, tintColor: '#fff', resizeMode: 'contain', marginRight: 10 }} />
                        <Text style={styles.headerText}>My Account</Text>

                    </View>
                    <View style={styles.icons}>
                        <Image source={require('../../../assets/images/splash/BellIcon.png')} style={styles.icon} />
                        <Image source={require('../../../assets/images/splash/cart.png')} style={styles.icon} />
                    </View>
                </View> */}
                <CustomHeader
                    type="profile"
                    topTitle=" My Profile"
                    subtitle=""
                    onBackPress={() => navigation.goBack()}
                    onCartPress={() => console.log('Cart pressed')}
                    onNotificationPress={() => console.log('Notification pressed')}

                />
                {/* Profile Section */}


                <View style={styles.profileSection}>
                    <Image source={require('../../../assets/drawer/userProfile.png')} style={styles.avatar} />
                    <TouchableOpacity style={{ ...styles.editIcon, marginRight: 15 }}>
                        <Image source={require('../../../assets/images/account/edit.png')} style={{ width: 18, height: 18, }} />
                    </TouchableOpacity>
                    <Text style={styles.name}>Ramachandra</Text>
                    <View style={styles.profileInfo}>
                        <Image source={phone} style={{ width: 14, height: 14, resizeMode: 'contain', }} />
                        <Text style={styles.phone}>+91-7021234567</Text>
                    </View>
                    <View style={styles.profileInfo}>
                        <Image source={location} style={{ width: 14, height: 14, resizeMode: 'contain' }} />
                        <Text style={styles.location}>Anantapur, Andhra Pradesh</Text>
                    </View>
                    <View style={styles.profileInfo}>
                        <Image source={storeLocation} style={{ tintColor: '#fff', width: 14, height: 14, resizeMode: 'contain' }} />
                        <Text style={styles.store}>Store Code: <Text style={styles.bold}>S0584</Text> | Mana Gromor Centre A.kon...</Text>
                        <Image source={rightArrow} style={{ width: 14, height: 14, resizeMode: 'contain', marginLeft: 10 }} />
                    </View>
                </View>
            </LinearGradient>
            {/* Grid Menu */}
            {/* <View style={styles.grid}>
                {menuItems.map((item, index) => (
                    <TouchableOpacity key={index} style={styles.gridItem}>
                        <Image source={item.icon} style={styles.gridIcon} />
                        <Text style={styles.gridText}>{item.title}</Text>
                    </TouchableOpacity>
                ))}
            </View> */}
            <FlatList
                data={menuItems || []}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
                numColumns={3}
                columnWrapperStyle={{ justifyContent: 'space-between', paddingHorizontal: 10 }}
                contentContainerStyle={{ paddingVertical: 10 }}
            />
        </ScrollView>
    );
};

export default MyAccountScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F2F5F4',
    },
    header: {
        // backgroundColor: '#208b3a',
        padding: 16,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    headerContainer: {
        paddingTop: 20,
        paddingBottom: 30,
        paddingHorizontal: 16,
    },

    headerText: {
        color: '#fff',
        fontSize: 20,
        fontWeight: '600',
    },
    icons: {
        flexDirection: 'row',
        gap: 16,
    },
    icon: {
        width: 22,
        height: 22,
        tintColor: '#fff',
    },
    profileSection: {
        alignItems: 'center',
        paddingBottom: 24,
    },
    avatar: {
        width: 80,
        height: 80,
        marginTop: 8,
    },
    editIcon: {
        position: 'absolute',
        right: 130,
        top: 60,
        backgroundColor: '#fff',
        borderRadius: 20,
        padding: 4,
    },
    profileInfo: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    name: {
        fontSize: 18,
        color: '#fff',
        fontWeight: 'bold',
        marginTop: 6,
    },
    phone: {
        color: '#fff',
        marginLeft: 10
    },
    location: {
        color: '#fff',
        fontSize: 13,
        marginLeft: 10

    },
    store: {
        color: '#fff',
        fontSize: 13,
        marginTop: 4,
        marginLeft: 10,

        textAlign: 'center',
    },
    bold: {
        fontWeight: 'bold',
    },
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        margin: 10,
    },
    gridItem: {
        width: '30%',
        backgroundColor: '#fff',
        margin: 8,
        alignItems: 'center',
        borderRadius: 12,
        paddingVertical: 20,
        elevation: 2,
    },
    gridIcon: {
        width: 40,
        height: 40,
        marginBottom: 8,
    },
    gridText: {
        fontSize: 13,
        textAlign: 'center',
    },
});
