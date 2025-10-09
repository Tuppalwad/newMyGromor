import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, FlatList } from 'react-native'
import React from 'react'
import timeIcon from '../../../assets/images/common/timeIcon.png'
import phoneIcon from '../../../assets/images/common/phoneIcon.png'
import direction from '../../../assets/images/common/direction.png'
import location from '../../../assets/images/common/location.png'
import CustomHeader from '../../../components/common/CustomHeader'

const ChangeStoreDetailsContainer = ({ navigation,
    isLoading, appLanguage, gromorStoreData,
    updateStore, handleOnpressdone, showDelete, handleOnpressclose, farmerAddress, currentLocation
}) => {

    const renderItem = (item) => {
        return (
            <View style={styles.card}>
                <Image
                    source={require('../../../assets/images/common/shop.png')} // 🔥 Replace this with your store image
                    style={styles.storeImage}
                />
                {/* Store Name */}
                <View style={{ backgroundColor: '#DAFDE7', padding: 10 }}>
                    <Text style={styles.storeTitle}>Apla gromor centre arjuni maragaon</Text>
                    <View style={styles.storeCodeRow}>
                        <Text style={styles.storeCode}>Store Code: S0393</Text>
                        <Text style={styles.storeDistance}>779.06 km</Text>
                    </View>
                </View>
                <View style={{ paddingHorizontal: 16, paddingVertical: 10 }}>

                    {/* Store Address */}
                    <View style={{ flexDirection: 'row' }}>
                        <Image
                            source={location}
                            style={{ width: 20, height: 20, resizeMode: 'contain' }}
                        />
                        <Text style={styles.storeAddress}>
                            Aapla gromor center, coromandel international limited, d.no. 1882/1/1648/1, dabana road, arjun moragaon-441701, gondia district, maharastra state.
                        </Text>
                    </View>
                    {/* Timings & Call */}
                    <View style={{ flexDirection: "row", justifyContent: 'space-between' }}>
                        <View style={styles.infoRow}>
                            <Image
                                source={timeIcon}
                                style={{ width: 20, height: 20, resizeMode: 'contain' }}
                            />
                            <Text style={styles.infoText}>Mon - Fri : 8 AM - 8 PM</Text>
                            <Text style={styles.infoText}>+91 8978780010</Text>
                        </View>
                        <View style={styles.infoRow}>
                            <TouchableOpacity style={styles.callButton}>
                                <Image
                                    source={phoneIcon}
                                    style={{ width: 20, height: 20, resizeMode: 'contain' }}
                                />
                                <Text style={styles.callText}>Call us</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* Choose Store Button */}
                    <TouchableOpacity style={styles.chooseBtn}>
                        <Text style={styles.chooseText}>Choose this Store</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    return (
        <View style={{ flex: 1, backgroundColor: '#F4F4F4', }}>
            {/* Header */}
            <CustomHeader
                type="info"
                topTitle="Change Store"
                subtitle=""
                onBackPress={() => navigation.goBack()}
                onCartPress={() => console.log("Order pressed")}
                onNotificationPress={() => console.log("Notification pressed")}
            />

            <View contentContainerStyle={{ padding: 16 }}>
                {/* Current Location */}
                <View style={styles.locationRow}>
                    {/* <Ionicons name="location-outline" size={20} color="green" /> */}
                    <Text style={styles.locationText}>Current Location</Text>
                    <View style={{ marginLeft: 18 }}>
                        <Text style={styles.locationSub}>Eksar Village</Text>
                        <Text style={styles.locationCoords}>{`${currentLocation.latitude},${currentLocation.longitude}`}</Text>
                    </View>
                </View>

                {/* Store Count */}
                <Text style={styles.storeCount}>2 Stores</Text>

                <FlatList
                    data={gromorStoreData || []}
                    renderItem={(item) => renderItem(item)}
                    keyExtractor={(item) => item.id.toString()}
                    contentContainerStyle={{ paddingBottom: 20 }}
                />

            </View>
        </View>
    )
}

export default ChangeStoreDetailsContainer

const styles = StyleSheet.create({
    locationRow: {
        flexDirection: "row",
        alignItems: "flex-start",
        marginBottom: 12,
        backgroundColor: '#F2F8F4',
        padding: 10
    },
    locationText: { fontSize: 14, color: "#01AD41", fontWeight: "600" },
    locationSub: { fontSize: 14, color: "#000", marginTop: 2 },
    locationCoords: { fontSize: 12, color: "gray", marginTop: 2 },

    storeCount: { fontSize: 14, fontWeight: "600", marginVertical: 8, color: "#333", paddingHorizontal: 16 },

    card: {
        backgroundColor: "#fff",
        borderRadius: 10,
        // padding: 12,
        marginTop: 8,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 5,
        elevation: 3,
    },
    storeImage: { width: "100%", height: 150, borderRadius: 8 },
    storeTitle: { fontSize: 16, fontWeight: "bold", marginTop: 8, color: "#000" },
    storeCodeRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 4,
    },
    storeCode: { fontSize: 13, color: "green", fontWeight: "600" },
    storeDistance: { fontSize: 13, color: "#333" },

    storeAddress: { fontSize: 13, color: "gray", marginVertical: 8 },

    infoRow: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 4,
    },
    infoText: { marginLeft: 6, fontSize: 13, color: "#333" },
    callButton: {
        marginLeft: "auto",
        borderWidth: 1,
        borderColor: "orange",
        borderRadius: 6,
        paddingHorizontal: 10,
        paddingVertical: 4,
    },
    callText: { color: "orange", fontSize: 13, fontWeight: "600" },

    chooseBtn: {
        backgroundColor: "green",
        borderRadius: 6,
        marginTop: 12,
        paddingVertical: 12,
        alignItems: "center",
    },
    chooseText: { color: "#fff", fontWeight: "bold", fontSize: 15 },
})
