import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import ProgressCircle from './ProgressCircle';

const RatingSummaryCard = ({ average, selectedRating, reviewCount, setSelectedRating }) => {
    const rating = average;
    const percentage = (rating / 5) * 100;

    const rotation = percentage > 50 ? 180 : (percentage / 100) * 360;
    const secondRotation = percentage > 50 ? ((percentage - 50) / 50) * 180 : 0;

    const getRatingLabel = (rating) => {
        if (rating >= 4.5) return 'Excellent';
        if (rating >= 3.5) return 'Good';
        if (rating >= 2.5) return 'Average';
        if (rating > 0) return 'Poor';
        return '';
    };

    const renderStars = (count, interactive = false) => {
        return (
            <View style={{ flexDirection: 'row' }}>
                {[1, 2, 3, 4, 5].map((i) => (
                    <TouchableOpacity
                        key={i}
                        disabled={!interactive}
                        onPress={() => setSelectedRating(i)}
                    >
                        <Text style={{ fontSize: 20, color: i <= count ? '#FFC107' : '#ccc' }}>
                            ★
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>
        );
    };


    return (
        <View style={styles.card}>
            <View style={styles.row}>

                <ProgressCircle average={4.2} size={120} strokeWidth={10} />

                {/* Rating Details */}
                <View style={styles.details}>
                    <Text style={styles.excellent}>{getRatingLabel(selectedRating)}</Text>
                    {renderStars(selectedRating, true)}
                    <Text style={styles.ratingCount}>{reviewCount} ratings</Text>
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
    // circleWrapper: {
    //     width: 100,
    //     height: 100,
    //     justifyContent: 'center',
    //     alignItems: 'center',
    // },

    // baseCircle: {
    //     position: 'absolute',
    //     width: 100,
    //     height: 100,
    //     borderRadius: 50,
    //     borderWidth: 8,
    //     borderColor: '#D1D1D1',
    // },

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
    progressHalf: {
        position: 'absolute',
        width: 100,
        height: 100,
        borderRadius: 50,
        borderWidth: 8,
        borderColor: '#00A651',
        borderLeftColor: 'transparent',
        borderBottomColor: 'transparent',
        borderRightColor: 'transparent',
        top: 0,
        left: 0,
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

    rightWrap: {
        position: 'absolute',
        width: 100,
        height: 100,
        overflow: 'hidden',
        justifyContent: 'center',
        alignItems: 'center',
    },

    leftWrap: {
        position: 'absolute',
        width: 100,
        height: 100,
        overflow: 'hidden',
        justifyContent: 'center',
        alignItems: 'center',
        transform: [{ rotate: '180deg' }],
    },

    halfCircle: {
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

});
