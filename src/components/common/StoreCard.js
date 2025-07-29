import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking, Image } from 'react-native';
import Location from '../../assets/images/common/location.png'
import Contact from '../../assets/images/common/phone.png'
import Shop from '../../assets/images/common/shop.png'



export default StoreCard = ({ storeCode, storeName, addressLines, phoneNumber }) => {
    return (
        <View style={styles.card}>
            {/* Store Code Section */}
            <View style={styles.codeContainer}>
                <Image source={Shop} style={styles.icon} />
                <Text style={styles.storeCodeText}>
                    Store Code: <Text style={styles.code}>{storeCode}</Text>
                </Text>
            </View>

            {/* Address Section */}
            <View style={styles.section}>
                {/* <FontAwesome name="map-marker" size={16} color="#000" style={styles.icon} /> */}
                <Image source={Location} style={{ ...styles.icon, marginTop: 4, tintColor: '#4E4E4E' }} />

                <View style={{ marginLeft: 10 }}>
                    <Text style={styles.title}>{storeName}</Text>
                    {addressLines.map((line, index) => (
                        <Text key={index} style={styles.text}>{line}</Text>
                    ))}
                </View>
            </View>

            {/* Phone Section */}
            <TouchableOpacity
                style={{ ...styles.section, marginTop: 6 }}
                onPress={() => Linking.openURL(`tel:${phoneNumber}`)}
            >
                <Image source={Contact} style={{ ...styles.icon, marginTop: 4, tintColor: '#4E4E4E' }} />
                <Text style={styles.text}>{"+ " + phoneNumber}</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 12,
        // margin: 10,
        // elevation: 3,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 6,
        shadowOffset: { width: 0, height: 3 },
    },
    codeContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#E6F4EA',
        padding: 6,
        borderRadius: 20,
        marginBottom: 10,
        width: '50%'
    },
    storeCodeText: {
        marginLeft: 6,
        fontWeight: '600',
        color: '#2E7D32',
    },
    code: {
        fontWeight: '700',
    },
    section: {
        flexDirection: 'row',
        alignItems: 'flex-start',
    },
    icon: {
        width: 14,
        height: 14,
        resizeMode: 'contain',
        tintColor: '#2E7D32'
        // marginRight: 8,
        // marginTop: 3,
    },
    title: {
        fontWeight: '700',
        fontSize: 15,
        marginBottom: 2,
    },
    text: {
        fontSize: 14,
        color: '#333',
        marginLeft: 10
    },
});

