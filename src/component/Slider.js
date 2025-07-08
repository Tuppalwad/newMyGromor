import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';

const { width } = Dimensions.get('window');

const sliderData = [
    {
        id: '1',
        title: 'Book your DBT Fertilizer',
        description: 'Dummy text dummy text',
        buttonText: 'Book Now',
    },
    {
        id: '2',
        title: 'Top Inputs',
        description: 'Dummy text dummy text',
        buttonText: 'Buy Now',
    },
];

const Slider = () => {
    const [activeIndex, setActiveIndex] = useState('');
    const renderItem = ({ item }) => (
        <View style={[styles.slide, { marginHorizontal: 8 }]}>
            <View style={styles.slideContent}>
                <View>
                    <Text style={styles.title}>{item.title}</Text>
                    <Text style={styles.description}>{item.description}</Text>
                </View>
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>{item.buttonText}</Text>
                </TouchableOpacity>
            </View>
        </View>

    );

    return (
        <View>
            <Carousel
                width={width}
                height={130}
                autoPlay
                data={sliderData}
                scrollAnimationDuration={1000}
                renderItem={renderItem}
                onSnapToItem={index => setActiveIndex(index)}  // track current index
            />

            <View style={styles.paginationContainer}>
                {sliderData.map((_, index) => (
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
        padding: 16,
        height: 130,
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
