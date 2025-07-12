import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const RatingSummaryCard = () => {
    const rating = 4.6;
    const totalRatings = 21;
    const percentage = (rating / 5) * 100;

    const filledStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.3 && rating % 1 <= 0.7;
    const emptyStars = 5 - filledStars - (hasHalfStar ? 1 : 0);

    const rotation = percentage > 50 ? 180 : (percentage / 100) * 360;
    const secondRotation = percentage > 50 ? ((percentage - 50) / 50) * 180 : 0;

    return (
        <View style={styles.card}>
            <View style={styles.row}>
                {/* Custom Progress Circle */}
                <View style={styles.circleWrapper}>
                    <View style={styles.baseCircle} />
                    <View style={[styles.progressCircle, { transform: [{ rotateZ: `${(rating / 5) * 360}deg` }] }]} />
                    <View style={styles.innerCircle}>
                        <Text style={styles.ratingText}>{rating}</Text>
                        <Text style={styles.outOf}>Out of 5</Text>
                    </View>
                </View>


                {/* Rating Details */}
                <View style={styles.details}>
                    <Text style={styles.excellent}>Excellent</Text>
                    <View style={styles.stars}>
                        {Array.from({ length: filledStars }).map((_, i) => (
                            <Text key={`f-${i}`} style={styles.star}>★</Text>
                        ))}
                        {hasHalfStar && <Text style={styles.star}>☆</Text>}
                        {Array.from({ length: emptyStars }).map((_, i) => (
                            <Text key={`e-${i}`} style={styles.star}>☆</Text>
                        ))}
                    </View>
                    <Text style={styles.ratingCount}>{totalRatings} ratings</Text>
                </View>
            </View>

            {/* Button */}
            <TouchableOpacity style={styles.rateButton}>
                <Text style={styles.rateButtonText}>Rate Product</Text>
            </TouchableOpacity>
        </View>
    );
};

export default RatingSummaryCard;

const styles = StyleSheet.create({
    card: {
        borderWidth: 1,
        borderColor: '#00A651',
        borderRadius: 8,
        padding: 16,
        margin: 16,
        backgroundColor: '#fff',
    },
    row: {
        flexDirection: 'row',
        marginBottom: 16,
    },
    circleWrapper: {
        width: 100,
        height: 100,
        justifyContent: 'center',
        alignItems: 'center',
    },

    baseCircle: {
        position: 'absolute',
        width: 100,
        height: 100,
        borderRadius: 50,
        borderWidth: 8,
        borderColor: '#D1D1D1',
    },

    progressCircle: {
        position: 'absolute',
        width: 100,
        height: 100,
        borderRadius: 50,
        borderWidth: 8,
        borderColor: '#00A651',
        borderLeftColor: 'transparent',
        borderBottomColor: 'transparent',
        borderRightColor: 'transparent',
    },

    innerCircle: {
        width: 70,
        height: 70,
        borderRadius: 35,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1,
    },

    ratingText: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#000',
    },
    outOf: {
        fontSize: 12,
        color: '#333',
    },
    details: {
        flex: 1,
        justifyContent: 'center',
        marginLeft: 16,
    },
    excellent: {
        fontSize: 16,
        fontWeight: '600',
        color: '#00A651',
        marginBottom: 6,
    },
    stars: {
        flexDirection: 'row',
        marginBottom: 4,
    },
    star: {
        fontSize: 18,
        color: '#FFC107',
        marginRight: 2,
    },
    ratingCount: {
        fontSize: 13,
        color: '#777',
    },
    rateButton: {
        borderWidth: 1,
        borderColor: '#00A651',
        paddingVertical: 10,
        borderRadius: 6,
        alignItems: 'center',
    },
    rateButtonText: {
        color: '#00A651',
        fontWeight: '600',
        fontSize: 14,
    },
});
