import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
// import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const orders = [
    { id: 1, status: 'In-progress', color: '#FFF3CD', textColor: '#856404' },
    { id: 2, status: 'Delivered', color: '#D4EDDA', textColor: '#155724' },
    { id: 3, status: 'Payment Failed', color: '#F8D7DA', textColor: '#721C24' },
    { id: 4, status: 'Cancelled', color: '#F8D7DA', textColor: '#721C24' },
];

export default function MyOrdersScreen() {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>My Orders</Text>
                <View style={styles.headerIcons}>
                    <Icon name="bell-outline" size={22} color="#000" style={styles.icon} />
                    <Icon name="cart-outline" size={22} color="#000" />
                </View>
            </View>

            <View style={styles.tabContainer}>
                <TouchableOpacity style={styles.activeTab}>
                    <Icon name="cube" size={18} color="#00A859" />
                    <Text style={styles.activeTabText}> My Purchases</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Text style={styles.inactiveTabText}>My Bookings</Text>
                </TouchableOpacity>
            </View>

            <ScrollView style={styles.content}>
                <Text style={styles.totalText}>Total 134 Purchases</Text>

                {orders.map((item, index) => (
                    <View key={index} style={styles.card}>
                        <View style={styles.cardHeader}>
                            <Text style={styles.orderLabel}>Order No.</Text>
                            <View style={[styles.statusBadge, { backgroundColor: item.color }]}>
                                <Text style={[styles.statusText, { color: item.textColor }]}>{item.status}</Text>
                            </View>
                        </View>
                        <Text style={styles.orderNumber}>PP250506844158</Text>
                        <Text style={styles.amount}>Order Amount: ₹3618</Text>
                        <View style={styles.footerRow}>
                            <Text style={styles.date}>Order Date: 06-05-2025</Text>
                            <Icon name="chevron-right" size={22} color="#000" />
                        </View>
                    </View>
                ))}
            </ScrollView>

            <LinearGradient
                colors={['#1E8153', '#4EA618']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.filterButtonWrapper}
            >
                <TouchableOpacity style={styles.filterButton}>
                    <Icon name="filter-variant" size={18} color="#fff" />
                    <Text style={styles.filterText}> Filters</Text>
                </TouchableOpacity>
            </LinearGradient>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F4F4F4',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 16,
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    headerText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    headerIcons: {
        flexDirection: 'row',
    },
    icon: {
        marginRight: 12,
    },
    tabContainer: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        paddingHorizontal: 16,
        paddingBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    activeTab: {
        flexDirection: 'row',
        borderBottomWidth: 2,
        borderBottomColor: '#00A859',
        paddingBottom: 6,
        marginRight: 24,
    },
    activeTabText: {
        color: '#00A859',
        fontWeight: 'bold',
        fontSize: 14,
    },
    inactiveTabText: {
        fontSize: 14,
        color: '#888',
        paddingBottom: 6,
    },
    content: {
        flex: 1,
        paddingHorizontal: 16,
    },
    totalText: {
        fontSize: 14,
        marginVertical: 12,
    },
    card: {
        backgroundColor: '#fff',
        padding: 12,
        borderRadius: 8,
        marginBottom: 12,
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 4,
    },
    orderLabel: {
        fontWeight: '600',
        fontSize: 14,
    },
    statusBadge: {
        borderRadius: 20,
        paddingHorizontal: 10,
        paddingVertical: 2,
    },
    statusText: {
        fontSize: 12,
        fontWeight: '600',
    },
    orderNumber: {
        fontSize: 14,
        marginBottom: 4,
    },
    amount: {
        fontWeight: '600',
        marginBottom: 4,
    },
    date: {
        color: '#777',
    },
    footerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    filterButtonWrapper: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        padding: 12,
    },
    filterButton: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    filterText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
});
