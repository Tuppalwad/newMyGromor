import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const PriceDetails = ({ priceData, styles }) => {
    return (
        <View style={styles.priceBox}>
            <View style={styles.priceRow}>
                <Text style={styles.label}>Sub Total</Text>
                <Text style={styles.value}>₹{priceData?.subTotal}</Text>
            </View>
            <View style={styles.priceRow}>
                <Text style={styles.label}>Discount</Text>
                <Text style={styles.discount}>- ₹{priceData?.discount}</Text>
            </View>
            <View style={styles.priceRow}>
                <Text style={styles.label}>Delivery Charges</Text>
                <Text style={styles.value}>₹{priceData?.deliverCharges}</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.priceRow}>
                <Text style={styles.totalLabel}>Total Amount</Text>
                <Text style={styles.totalValue}>₹{priceData?.totalCost}</Text>
            </View>
        </View>
    )
}

export default PriceDetails

const styles = StyleSheet.create({})