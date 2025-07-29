import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import CustomHeader from '../../../components/common/CustomHeader';
import timer from '../../../assets/images/splash/timer.png'
import sprayingService from '../../../assets/images/common/SprayingService.png'
import { SafeAreaView } from 'react-native-safe-area-context';
import calender from '../../../assets/images/common/calender.png'
import remark from '../../../assets/images/common/remark.png'
import shop from '../../../assets/images/common/shop.png'
import location from '../../../assets/images/common/location.png';
import phone from '../../../assets/images/common/phone.png'

export default function SprayingServiceDetail({ navigation }) {
    const steps = [
        {
            title: 'Booked',
            time: '4:00 PM, Thursday, 07-05-2025',
            completed: true,
        },
        {
            title: 'In-Process',
            time: '4:00 PM, Thursday, 07-05-2025',
            completed: false,
        },
        {
            title: 'completed',

        }
    ]
    return (
        <SafeAreaView style={{
            flex: 1,
        }}>
            <View>
                <CustomHeader
                    type="services"
                    topTitle="Spraying Services Details"
                    subtitle=""
                    onBackPress={() => navigation.goBack()}
                    onCartPress={() => console.log('Cart pressed')}
                    onNotificationPress={() => console.log('Notification pressed')}
                    style={styles.header}
                />
            </View>

            <ScrollView style={styles.container}>
                {/* Header */}


                {/* Service ID card */}
                <View style={styles.card}>
                    <Image source={sprayingService} style={{ height: 24, width: 24, tintColor: 'green' }} />
                    <Text style={styles.serviceId}>Service ID</Text>
                    <Text style={styles.serviceCode}>SS25050212857</Text>
                    <View style={styles.statusBadge}>
                        <Image source={timer} style={{ height: 15, width: 15, marginRight: 10, tintColor: '#4E4600' }} />
                        <Text style={styles.statusText}> In-progress</Text>
                    </View>
                </View>

                {/* Service Details */}
                <Text style={styles.sectionTitle}>Service Details</Text>
                <View style={styles.detailCard}>
                    <Row label="Booking Date" value="06-05-2025" />
                    <Row label="Store Code" value="S0393" />
                    < View style={{ height: 1, backgroundColor: '#A3D2B5', marginVertical: 8 }} />

                    <Row label="Crop" value="Bengal Gram" />
                    <Row label="Area to be covered" value="90 acres" />
                    <Row label="Actual Acreage" value="0 acre" />
                    < View style={{ height: 1, backgroundColor: '#A3D2B5', marginVertical: 8 }} />

                    <Row label="Base Rate" value="₹400" />
                    <Row label="Discount" value="- ₹4,500" />
                    <Row label="Estimated Charges" value="₹31,500" />
                    <Row label="Total Amount" value="₹27,400" bold />
                </View>

                {/* Spraying Service Details */}
                <Text style={styles.sectionTitle}>Spraying Service Details</Text>
                <View style={styles.detailCard}>
                    <View style={styles.cardItem}>
                        <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
                            <Image source={calender} style={styles.cardImage} />
                            <Text style={styles.remarksTitle}>Schedule Date </Text>
                        </View>
                        <Text>10-07-2025</Text>
                    </View>
                    <View style={styles.cardItem}>
                        <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
                            <Image source={timer} style={styles.cardImage} />
                            <Text style={styles.remarksTitle}>Preferred Time</Text>
                        </View>
                        <Text>10:45 AM</Text>
                    </View>
                    <View style={styles.cardItem}>
                        <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>

                            <Image source={remark} style={styles.cardImage} />
                            <Text style={styles.remarksTitle}>Remarks</Text>
                        </View>
                        <Text style={styles.remarksText}>Please call before arriving for the service.</Text>
                    </View>
                </View>
                {/* farmer address */}
                <Text style={styles.sectionTitle}>Farmer Address</Text>
                <View style={styles.addressCard}>
                    <Text >
                        Plot no. 2-4-197/A, Cinema Road,Below {'\n'}
                        Margadarsi Office, Adilabad, Begumpet {'\n'}
                        Telangana, 504001
                    </Text>
                </View>
                {/* service tracking */}
                <Text style={styles.sectionTitle}>Order Tracking</Text>

                <View style={styles.timelineContainer}>
                    {steps.map((step, index) => (
                        <View key={index} style={styles.stepRow}>
                            {/* Icon + Line */}
                            <View style={styles.iconColumn}>
                                <View style={[
                                    styles.iconCircle,
                                    step.completed ? styles.completedCircle : styles.pendingCircle
                                ]}>
                                    {step.completed && <Text style={styles.check}>✔</Text>}
                                </View>
                                {index < steps.length - 1 && (
                                    <View
                                        style={[
                                            styles.verticalLine,
                                            steps[index + 1].completed ? styles.completedLine : styles.pendingLine
                                        ]}
                                    />
                                )}
                            </View>

                            {/* Content */}
                            <View style={styles.textColumn}>
                                <Text
                                    style={[
                                        styles.stepTitle,
                                        step.completed ? styles.completedText : styles.pendingText
                                    ]}
                                >
                                    {step.title}
                                </Text>
                                {step.time && (
                                    <Text style={styles.timeText}>{step.time}</Text>
                                )}
                            </View>
                        </View>
                    ))}
                </View>


                {/* Other Details */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Other Details</Text>
                    <View style={styles.otherDetailCard}>
                        <View style={styles.detailRow}>
                            <Text>Number of Farmer(s)</Text>
                            <Text>2</Text>
                        </View>
                        <View style={styles.detailRow}>
                            <Text>Alternate Contact</Text>
                            <Text style={styles.highlightText}>+91 9999912345</Text>
                        </View>

                        < View style={{ height: 1, backgroundColor: '#A3D2B5', marginVertical: 8 }} />

                        <View style={styles.detailRow}>
                            <Text>Farm Accessible by four-wheeler</Text>
                            <Text>Yes</Text>
                        </View>
                        <View style={styles.detailRow}>
                            <Text>High-voltage lines on farmland</Text>
                            <Text>No</Text>
                        </View>
                    </View>
                </View>

                {/* store address */}

                <Text style={styles.storeHeading}>Store Address</Text>

                <View style={styles.StoreCard}>
                    <View style={styles.storeCodeBox}>
                        <Text style={styles.storeCodeLabel}><Image source={shop} style={{ height: 15, width: 15, tintColor: '#2E7D32' }} /> Store Code:</Text>
                        <Text style={styles.storeCodeValue}> S0393</Text>
                    </View>

                    <View style={styles.addressBlock}>
                        <Image source={location} style={{ height: 15, width: 15, tintColor: '#000', marginTop: 4 }} />
                        <View>
                            <Text style={styles.locationTitle}> Mana Gromor Centre A.kondapuram</Text>
                            <Text style={styles.addressText}>
                                Coromandel International Ltd,{'\n'}
                                c/o Mana Gromor Center, Building No. 110/1,{'\n'}
                                A.kondapuram, Putlur Mandal, Anantapur
                            </Text>
                        </View>
                    </View>

                    <View style={styles.phoneBlock}>
                        <Image source={phone} style={{ height: 10, width: 10, tintColor: '#000', marginTop: 4 }} />
                        <Text style={styles.phoneText}>+91 8978780010</Text>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

// Reusable row component
const Row = ({ label, value, bold }) => (
    <View style={styles.row}>
        <Text style={styles.rowLabel}>{label}</Text>
        <Text style={[styles.rowValue, bold && { fontWeight: 'bold' }]}>{value}</Text>
    </View>
);

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#ebebebf1',
        paddingHorizontal: 15,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 15,
        marginBottom: 10,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    icons: {
        flexDirection: 'row',
        gap: 12,
    },
    icon: {
        fontSize: 20,
    },
    card: {
        backgroundColor: '#fcfcfbde',
        borderRadius: 12,
        alignItems: 'center',
        paddingVertical: 20,
        marginBottom: 15,
        marginTop: 15
    },
    serviceLabel: {
        fontSize: 24,
        marginBottom: 5,
    },
    serviceId: {
        fontSize: 14,
        color: '#6B7280',
    },
    serviceCode: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    statusBadge: {
        backgroundColor: '#FFF8BC',
        paddingHorizontal: 12,
        paddingVertical: 4,
        borderRadius: 15,
        flexDirection: 'row',
    },
    statusText: {
        fontSize: 12,
        fontWeight: '500',
        color: '#4E4600',
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 10,
        marginBottom: 5,
    },
    detailCard: {
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 15,
        marginBottom: 15,
    },
    cardItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10
    },
    cardImage: {
        marginTop: 4,
        height: 16,
        width: 16,
        tintColor: '#01AD41'
    },
    addressCard: {
        color: '#000',
        fontSize: 14,
        fontWeight: 400,
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 15,
        marginBottom: 15,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 4,
    },
    rowLabel: {
        color: '#4B5563',
    },
    rowValue: {
        color: '#111827',
    },

    remarksTitle: {
        marginLeft: 10,
        // fontWeight: '500',
        marginBottom: 2,
    },
    remarksText: {
        color: '#000',
        fontSize: 14,
        fontWeight: 400,
        width: 80,
        textAlign: 'right',
    },
    timelineContainer: {
        backgroundColor: '#fff',
        padding: 12,
        borderRadius: 8,
    },
    stepRow: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: 20,
        position: 'relative',
    },
    iconColumn: {
        alignItems: 'center',
        width: 30,
    },
    iconCircle: {
        width: 18,
        height: 18,
        borderRadius: 9,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ccc',
    },
    completed: {
        backgroundColor: '#21BA45',
    },
    pending: {
        backgroundColor: '#E0E0E0',
    },
    check: {
        color: 'white',
        fontSize: 12,
        fontWeight: 'bold',
    },
    verticalLine: {
        width: 2,
        flex: 1,
        backgroundColor: '#ccc',
        marginTop: 2,
    },
    completedLine: {
        color: 'green'
    },
    textColumn: {
        marginLeft: 12,
        flex: 1,
    },
    stepTitle: {
        fontSize: 14,
        color: '#555',
    },
    completedText: {
        color: '#000',
        fontWeight: '500',
    },
    timeText: {
        fontSize: 13,
        color: '#777',
        marginTop: 2,
    },
    otherDetailCard: {
        borderRadius: 10,
        padding: 15,
        backgroundColor: '#fff'
    },
    detailRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    highlightText: {
        color: '#00A300',
    },
    storeHeading: {
        fontSize: 16,
        fontWeight: '600',
        color: '#000',
        marginBottom: 10,
        marginTop: 30,
    },
    StoreCard: {
        backgroundColor: '#fff',
        padding: 12,
        borderRadius: 8,
        marginBottom: 40,

    },
    storeCodeBox: {
        backgroundColor: '#E5F9ED',
        paddingVertical: 4,
        paddingHorizontal: 10,
        borderRadius: 6,
        flexDirection: 'row',
        alignSelf: 'flex-start',
        marginBottom: 10,
    },
    storeCodeLabel: {
        fontWeight: '500',
        color: '#2E7D32',
    },
    storeCodeValue: {
        fontWeight: '700',
        color: '#2E7D32',
    },
    addressBlock: {
        marginBottom: 10,
        flexDirection: 'row'
    },
    locationTitle: {
        fontWeight: '600',
        color: '#000',
        fontSize: 14,
        marginBottom: 4,
        marginLeft: 12
    },
    addressText: {
        color: '#555',
        fontSize: 13,
        marginLeft: 12,
        lineHeight: 18
    },
    phoneBlock: {
        marginTop: 5,
        flexDirection: 'row',
    },
    phoneText: {
        fontSize: 13,
        color: '#000',
        marginLeft: 12
    },
});
