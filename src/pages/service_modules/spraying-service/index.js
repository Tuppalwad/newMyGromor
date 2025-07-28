import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import CustomHeader from '../../../components/common/CustomHeader';
import timer from '../../../assets/images/splash/timer.png'
import sprayingService from '../../../assets/images/common/SprayingService.png'
export default function SprayingServiceDetail() {
    return (
        <>
            <View>

                <CustomHeader
                    type="services"
                    topTitle="SPraying Services Details"
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
                        <Image source={timer} style={{ height: 15, width: 15, marginRight: 10 }} />
                        <Text style={styles.statusText}> In-progress</Text>
                    </View>
                </View>

                {/* Service Details */}
                <Text style={styles.sectionTitle}>Service Details</Text>
                <View style={styles.detailCard}>
                    <Row label="Booking Date" value="06-05-2025" />
                    <Row label="Store Code" value="S0393" />
                    <Row label="Crop" value="Bengal Gram" />
                    <Row label="Area to be covered" value="90 acres" />
                    <Row label="Actual Acreage" value="0 acre" />
                    <View style={styles.divider} />
                    <Row label="Base Rate" value="₹400" />
                    <Row label="Discount" value="- ₹4,500" />
                    <Row label="Estimated Charges" value="₹31,500" />
                    <Row label="Total Amount" value="₹27,400" bold />
                </View>

                {/* Spraying Service Details */}
                <Text style={styles.sectionTitle}>Spraying Service Details</Text>
                <View style={styles.detailCard}>
                    <Row label="🗓️ Scheduled Date" value="10-07-2025" />
                    <Row label="⏰ Preferred Time" value="10:45 AM" />
                    <View style={{ marginTop: 10 }}>
                        <Text style={styles.remarksTitle}>📝 Remarks</Text>
                        <Text style={styles.remarksText}>Please call before arriving for the service.</Text>
                    </View>
                </View>
            </ScrollView>
        </>
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
        flex: 1,
        backgroundColor: '#ebebebf1',
        // paddingHorizontal: 15,
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
        color: '#78350F',
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
    divider: {
        borderBottomWidth: 1,
        borderBottomColor: '#E5E7EB',
        marginVertical: 8,
    },
    remarksTitle: {
        fontWeight: '500',
        marginBottom: 2,
    },
    remarksText: {
        color: '#4B5563',
        fontSize: 13,
    },
});
