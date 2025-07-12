import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    FlatList
} from 'react-native';
import RatingSummaryCard from './RatingSummaryCard'; // This is your custom progress circle component

const reviews = [
    {
        id: '1',
        rating: 3,
        date: '27 Apr 2025',
        comment:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra.',
        productImage: require('../../../assets/images/shop/mygrow.png'),
        userName: 'Kissanlal Yadav',
        verified: true,
        userImage: require('../../../assets/images/shop/user.png'),
    },
    // Add more reviews as needed
];

const CustomerReviews = () => {
    const renderStars = (count) => {
        const filledStars = '★'.repeat(count);
        const emptyStars = '☆'.repeat(5 - count);
        return (
            <Text style={styles.starRating}>
                {filledStars}
                {emptyStars}
            </Text>
        );
    };

    const renderReview = ({ item }) => (
        <View style={styles.reviewCard}>
            {renderStars(item.rating)}
            <Text style={styles.reviewDate}>{item.date}</Text>
            <Text style={styles.reviewComment}>{item.comment}</Text>
            <Image source={item.productImage} style={styles.reviewProductImage} />
            <View style={styles.reviewerInfo}>
                <Image source={item.userImage} style={styles.userImage} />
                <View>
                    <Text style={styles.reviewerName}>{item.userName}</Text>
                    {item.verified && (
                        <Text style={styles.verifiedText}>✔ Verified Purchase</Text>
                    )}
                </View>
            </View>
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

            {/* Rating Summary */}
            <RatingSummaryCard />

            {/* Reviews */}
            <FlatList
                data={reviews}
                renderItem={renderReview}
                keyExtractor={(item) => item.id}
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
