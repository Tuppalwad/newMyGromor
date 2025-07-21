import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    FlatList
} from 'react-native';
import RatingSummaryCard from './RatingSummaryCard';
// import { Circle } from 'react-native-progress'; // if using a progress circle
// import RatingSummaryCard from './RatingSummaryCard';

const backendData = {
    data: [
        {
            id: 27,
            name: "Khajavali",
            description: "",
            fiveStartRating: 5,
            createdOn: "2024-08-22T12:31:17.4317912",
            farmerIdentityId: "d49892e4-ebdb-4069-8f0d-d4bda8565b1f"
        }
    ],
    average: 5
};

const CustomerReviews = () => {
    const [selectedRating, setSelectedRating] = useState(0);
    const average = backendData.average;
    const reviewCount = backendData.data.length;

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


    const renderReview = ({ item }) => (
        <View style={styles.reviewCard}>
            {renderStars(item.fiveStartRating)}
            <Text style={styles.reviewDate}>
                {new Date(item.createdOn).toDateString()}
            </Text>
            <Text style={styles.reviewerName}>{item.name}</Text>
            <Text style={styles.reviewComment}>{item.description || 'No comment provided.'}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.title}>Customer Reviews</Text>
                <TouchableOpacity>
                    <Text style={styles.viewAll}>View All</Text>
                </TouchableOpacity>
            </View>

            <RatingSummaryCard average={3} selectedRating={selectedRating} reviewCount={reviewCount} setSelectedRating={setSelectedRating} />

            {/* Render Reviews */}
            <FlatList
                data={backendData.data}
                renderItem={renderReview}
                keyExtractor={(item) => item.id.toString()}
                scrollEnabled={false}
            />
        </View>
    );
};

export default CustomerReviews;



const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F2F2F2',
        paddingVertical: 16,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        marginBottom: 12,
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#000',
    },
    viewAll: {
        fontSize: 12,
        color: '#1E8153',
        fontWeight: '500',
    },
    starRating: {
        fontSize: 16,
        color: '#FFC107',
        marginBottom: 4,
    },

    ratingBox: {
        backgroundColor: '#fff',
        padding: 16,
        marginHorizontal: 16,
        borderRadius: 10,
        alignItems: 'center',
        marginBottom: 16,
    },
    ratingValue: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#1E8153',
    },
    ratingSub: {
        fontSize: 12,
        color: '#555',
        marginBottom: 4,
    },
    ratingText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#1E8153',
        marginBottom: 4,
    },
    ratingCount: {
        fontSize: 12,
        color: '#888',
        marginTop: 4,
    },
    rateButton: {
        marginTop: 12,
        borderWidth: 1,
        borderColor: '#1E8153',
        paddingVertical: 6,
        paddingHorizontal: 20,
        borderRadius: 6,
    },
    rateButtonText: {
        color: '#1E8153',
        fontWeight: '500',
        fontSize: 14,
    },
    reviewCard: {
        backgroundColor: '#fff',
        padding: 16,
        marginTop: 12,
        marginHorizontal: 16,
        borderRadius: 10,
    },
    reviewDate: {
        fontSize: 12,
        color: '#888',
        marginVertical: 4,
    },
    reviewComment: {
        fontSize: 14,
        color: '#333',
        marginVertical: 6,
    },
    reviewProductImage: {
        height: 60,
        width: 60,
        borderRadius: 6,
        marginVertical: 6,
    },
    reviewerInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
    },
    userImage: {
        width: 32,
        height: 32,
        borderRadius: 16,
        marginRight: 10,
    },
    reviewerName: {
        fontSize: 14,
        fontWeight: '600',
        color: '#000',
    },
    verifiedText: {
        fontSize: 12,
        color: '#1E8153',
    },
});
