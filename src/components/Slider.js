import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions, Image } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import { useSelector } from 'react-redux';

const { width } = Dimensions.get('window');

const Slider = () => {
    const [activeIndex, setActiveIndex] = useState('');
    const bannerDataFromReducer = useSelector(state => state.product.bannerData);
    const imageBaseUrl = bannerDataFromReducer?.imageBaseURL

    const renderItem = ({ item }) => (

        <View style={[styles.slide, { marginHorizontal: 8 }]}>
            <View style={styles.slideContent}>
                {item?.bannerImage ? (
                    <Image
                        source={{ uri: imageBaseUrl + item.bannerImage }}
                        resizeMode="contain"
                        style={{ width: '100%', height: 200 }} // Add appropriate dimensions
                    />
                ) : null}

            </View>
        </View>

    );

    return (
        <View>
            <Carousel
                width={width}
                height={160}
                autoPlay
                data={bannerDataFromReducer?.data || []}
                scrollAnimationDuration={1000}
                renderItem={renderItem}
                onSnapToItem={index => setActiveIndex(index)}  // track current index
            />

            <View style={styles.paginationContainer}>
                {(bannerDataFromReducer?.data || []).map((_, index) => (
                    <View
                        key={index}
                        style={[
                            styles.dot,
                            { opacity: index === activeIndex ? 1 : 0.3 },
                        ]}
                    />
                ))}
            </View>
        </View >
    );
};

export default Slider;

const styles = StyleSheet.create({
    slide: {
        backgroundColor: '#F5F5F5',
        borderRadius: 12,
        paddingHorizontal: 16,
        height: 150,
        justifyContent: 'center',
    },
    slideContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#000',
        marginBottom: 6,
    },
    description: {
        fontSize: 12,
        color: '#555',
    },
    button: {
        backgroundColor: '#000',
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 6,
    },
    buttonText: {
        color: '#fff',
        fontSize: 12,
    },
    paginationContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 8,
    },
    dot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#000',
        marginHorizontal: 4,
    },

});
