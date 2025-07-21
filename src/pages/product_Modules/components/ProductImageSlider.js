import React, { useRef } from 'react';
import {
    View,
    Text,
    Image,
    Animated,
    StyleSheet,
    Dimensions,
    FlatList,
} from 'react-native';
import { defConfigImageURL } from '../../dashboard_Modules/tabs/home/index.service';

const screenWidth = Dimensions.get('window').width;

const ProductImageSlider = ({ productData, BannerData }) => {
    const scrollX = useRef(new Animated.Value(0)).current;

    const imageList = [productData?.side1, productData?.side2, productData?.side3, productData?.side4]
        .filter(Boolean)
        .map((imgId) => defConfigImageURL(BannerData.imageBaseURL, imgId));

    return (
        <View style={styles.imageContainer}>
            <View style={styles.badgeContainer}>
                <Text style={styles.badgeText}>{productData?.brand}</Text>
            </View>

            <Animated.FlatList
                data={imageList}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item, index) => index.toString()}
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                    { useNativeDriver: false }
                )}
                renderItem={({ item }) => (
                    <Image
                        source={{ uri: item }}
                        style={styles.productImage}
                        resizeMode="contain"
                    />
                )}
            />

            <View style={styles.carouselDots}>
                {imageList.map((_, index) => {
                    const inputRange = [
                        (index - 1) * screenWidth,
                        index * screenWidth,
                        (index + 1) * screenWidth,
                    ];

                    const dotWidth = scrollX.interpolate({
                        inputRange,
                        outputRange: [8, 8, 8],
                        extrapolate: 'clamp',
                    });

                    const dotColor = scrollX.interpolate({
                        inputRange,
                        outputRange: ['#ccc', '#0A8F43', '#ccc'],
                        extrapolate: 'clamp',
                    });

                    return (
                        <Animated.View
                            key={index}
                            style={[styles.dot, { width: dotWidth, backgroundColor: dotColor }]}
                        />
                    );
                })}
            </View>
        </View>
    );
};

export default ProductImageSlider;

const styles = StyleSheet.create({
    imageContainer: {
        alignItems: 'center',
        backgroundColor: '#fff',
        paddingVertical: 30,
    },
    badgeContainer: {
        position: 'absolute',
        top: 10,
        left: 10,
        backgroundColor: '#FFD700',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderTopRightRadius: 10,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        zIndex: 1,
    },
    badgeText: {
        color: 'white',
        fontWeight: 'bold',
    },
    productImage: {
        width: screenWidth,
        height: 250,
    },
    carouselDots: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 8,
        marginBottom: 12,
    },
    dot: {
        height: 8,
        borderRadius: 4,
        marginHorizontal: 4,
    },
});
