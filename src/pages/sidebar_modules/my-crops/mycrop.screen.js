

import { StyleSheet, Text, View, TouchableOpacity, Image, FlatList, ScrollView, Modal } from 'react-native'
import React, { useEffect, useState } from 'react'
import CustomHeader from '../../../components/common/CustomHeader'
import myCrop from '../../../assets/images/common/cropIcon.png'
import forwordArrow from '../../../assets/images/common/rightArrow.png'
import leaves from '../../../assets/images/common/leaves.png'
import CustomRadioButton from '../../../components/common/CustomRadioButton'
import colors from '../../../utils/theam'
import CustomButton from '../../../components/common/CustomButton'
import { useSelector } from 'react-redux'
import { defConfigImageURL } from '../../dashboard_modules/tabs/home/index.service'
import { Icon } from '../../../../assets/images'
import moment from 'moment'
const MyCropConatiner = ({ }) => {
    const cropList = useSelector((state) => state.advisory.myCropList)
    const cropListed = useSelector((state) => state.advisory.HNICropList)
    const BannerData = useSelector(state => state.product.bannerData);

    const [visible, setVisible] = useState(false);

    const crops = [
        {
            id: 1,
            name: "Mango",
            date: "06-07-2025",
            stage: "Seeding Stage",
            area: "2 acres",
            image: null,
        },
        {
            id: 2,
            name: "Black Gram",
            date: "06-07-2025",
            stage: "Seeding Stage",
            area: "2 acres",
            image: null,
        },
    ]

    const renderCropCard = ({ item }) => (
        <TouchableOpacity style={styles.card}>
            <View style={{ flexDirection: "row" }}>
                <Image source={item.image} style={styles.cropImage} />
                <Text></Text>

            </View>
            <View style={{ width: "100%", borderWidth: 1, borderColor: "#A3D2B5" }}></View>
            <View style={{ flex: 1, marginLeft: 10 }}>
                <Text style={styles.cropName}>{item.name}</Text>
                <Text style={styles.cropDetail}>Sowing Date: {moment(item?.dateOfSowing).format('DD-MM-YYYY')}</Text>
                <Text style={styles.cropDetail}>Stage: {item.cropName}</Text>
                <Text style={styles.cropDetail}>Coverage Area: {item?.acerage}</Text>
            </View>
            <Image
                source={forwordArrow}
                style={{ width: 20, height: 20, resizeMode: 'contain' }}
            />
        </TouchableOpacity>
    )

    const renderItem = ({ item }) => {
        return (
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', marginVertical: 10 }}>
                <View style={[styles.radioOuter, true && styles.radioOuterSelected]}>
                    {true && <View style={styles.radioInner} />}
                </View>
                <Image
                    defaultSource={Icon.noProductImage}
                    source={{ uri: defConfigImageURL(BannerData.imageBaseURL, item?.imageKey) }}
                    style={{ width: 90, height: 90, resizeMode: 'cover', borderRadius: 8, marginHorizontal: 6 }}
                />
                <Text style={{ marginLeft: 10, fontWeight: 500, fontSize: 14 }}>{item?.cropIdentifier}</Text>
            </View>
        )
    }

    return (
        <View style={{ flex: 1, backgroundColor: '#F4F4F4' }}>
            {/* Header */}
            <CustomHeader
                type="info"
                topTitle="My Crops"
                subtitle=""
                onBackPress={() => navigation.goBack()}
                onCartPress={() => console.log("Order pressed")}
                onNotificationPress={() => console.log("Notification pressed")}
            />

            <View style={{ padding: 16 }}>
                {/* Top Banner */}
                <View style={styles.banner}>
                    <Image
                        source={myCrop}
                        style={styles.bannerImg}
                    />
                    <Text style={styles.bannerText}>Your added crops are listed below</Text>
                </View>

                {/* Total Crops & Add Button */}
                <View style={styles.headerRow}>
                    <Text style={styles.totalCrops}>Total {cropList.length ?? 0} Crops</Text>
                    <TouchableOpacity style={styles.addButton} onPress={() => setVisible(true)}>
                        <Text style={styles.addText}>+ Add Crop</Text>
                    </TouchableOpacity>

                </View>

                {/* Crop List */}
                <FlatList
                    data={cropList}
                    renderItem={renderCropCard}
                    keyExtractor={(item) => item.id.toString()}
                    contentContainerStyle={{ paddingBottom: 20 }}
                />
            </View>
            <Modal
                transparent
                animationType="slide"
                visible={visible}
                onRequestClose={() => setVisible(false)}
            >
                <View style={styles.overlay}>
                    <View style={styles.bottomSheet}>
                        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                            <Image
                                source={leaves}
                                style={{ width: 24, height: 25, resizeMode: 'contain', }}
                            />
                            <Text style={{ ...styles.sheetTitle, paddingVertical: 10 }}>Select Crop to Add</Text>
                        </View>
                        <View style={{ width: "100%", padding: 10, borderRadius: 8, backgroundColor: "#DAFDE7" }}>
                            <Text style={{ fontWeight: 700, fontSize: 14 }}>Vegetables</Text>
                        </View>
                        {/* Example crop options (static for now) */}
                        <FlatList
                            data={cropListed}
                            renderItem={(item) => renderItem(item)}
                        />

                        <View style={styles.sheetActions}>
                            <View style={{ width: '48%' }}>
                                <TouchableOpacity style={styles.cancelButton} onPress={() => { setVisible(false) }}>
                                    <Text style={styles.cancelText}>Cancel</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{ width: "48%" }}>
                                <CustomButton
                                    title={'Proceed'}
                                    onPress={() => { }}
                                    disabled={false}
                                    show={false}
                                />
                            </View>
                        </View>
                    </View>
                </View>
            </Modal>


        </View>
    )
}

export default MyCropConatiner

const styles = StyleSheet.create({
    banner: {
        backgroundColor: "#fff",
        borderRadius: 8,
        padding: 16,
        alignItems: "center",
        marginBottom: 16,
    },
    bannerImg: {
        width: 60,
        height: 60,
        marginBottom: 10,
        resizeMode: "contain",
    },
    bannerText: {
        fontSize: 14,
        color: "#333",
        textAlign: "center",
    },
    headerRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 12,
    },
    totalCrops: { fontSize: 14, fontWeight: "600", color: "#333" },
    addButton: {
        backgroundColor: "green",
        paddingHorizontal: 14,
        paddingVertical: 8,
        borderRadius: 6,
    },
    addText: { color: "#fff", fontWeight: "600" },

    card: {
        backgroundColor: "#fff",
        borderRadius: 8,
        padding: 12,
        marginBottom: 12,
        shadowColor: "#000",
        shadowOpacity: 0.05,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
        elevation: 2,
    },
    cropImage: { width: 60, height: 60, borderRadius: 8 },
    cropName: { fontSize: 15, fontWeight: "bold", color: "#000" },
    cropDetail: { fontSize: 13, color: "gray", marginTop: 2 },
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.3)', // Optional: slight dim background
        alignItems: 'center',
        justifyContent: 'flex-end'
    },

    bottomSheet: {
        backgroundColor: '#fff',
        width: '100%',
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
        padding: 20,
        maxHeight: '70%',
    },
    sheetTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 16,
        textAlign: 'center',
    },
    cropOption: {
        paddingVertical: 12,
        // borderBottomWidth: 1,
        // borderBottomColor: '#eee',
    },
    cropText: {
        fontSize: 15,
        color: '#333',
    },
    sheetActions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
    },
    cancelBtn: {
        padding: 12,
        borderRadius: 6,
        backgroundColor: '#f0f0f0',
        flex: 1,
        marginRight: 10,
        alignItems: 'center',
    },
    proceedBtn: {
        padding: 12,
        borderRadius: 6,
        backgroundColor: 'green',
        flex: 1,
        marginLeft: 10,
        alignItems: 'center',
    },

    radioOuter: {
        width: 18,
        height: 18,
        borderRadius: 9,
        borderWidth: 2,
        borderColor: colors.primary,
        alignItems: 'center',
        justifyContent: 'center',
    },
    radioOuterSelected: {
        borderColor: colors.primary,
    },
    radioInner: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: colors.primary,
    },

    cancelButton: {
        borderWidth: 1,
        borderColor: '#F36D45',
        borderRadius: 8,
        paddingVertical: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    cancelText: {
        color: '#F36D45',
        fontWeight: '600',
    },

})
