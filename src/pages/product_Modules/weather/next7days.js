import React from 'react';
import { View, Text, Image, ScrollView, StyleSheet } from 'react-native';
import wind from '../../../assets/images/common/wind.png';
import humidity from '../../../assets/images/common/humidity.png';
import raindrop from '../../../assets/images/common/raindrop.png'
const Next7DaysScreen = () => {
    const data = [
        {
            day: 'Today',
            date: '18/06',
            icon: require('../../../assets/images/common/rain.png'),
            wind: '21 km/h',
            humidity: '86%',
            rain: '91%',
            description: 'Heavy Rain',
            temp: '21°/32°',
            isToday: true,
        },
        {
            day: 'Thu',
            date: '19/06',
            icon: require('../../../assets/images/common/rain.png'),
            wind: '10 km/h',
            humidity: '69%',
            rain: '80%',
            description: 'Light Rain',
            temp: '25°/35°',
        },
        {
            day: 'Fri',
            date: '20/06',
            icon: require('../../../assets/images/common/rain.png'),
            wind: '12 km/h',
            humidity: '52%',
            rain: '10%',
            description: 'Clear Sky',
            temp: '26°/37°',
        },
        {
            day: 'Sat',
            date: '21/06',
            icon: require('../../../assets/images/common/rain.png'),
            wind: '12 km/h',
            humidity: '32%',
            rain: '10%',
            description: 'Mostly Cloudy',
            temp: '26°/38°',
        },
    ];

    return (
        <ScrollView style={styles.container}>
            {data.map((item, index) => (
                <View
                    key={index}
                    style={[styles.card, item.isToday && styles.todayHighlight]}
                >
                    {/* Top Row */}
                    <View style={styles.rowTop}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <View>
                                <Text style={styles.dayText}>{item.day}</Text>
                                <Text style={styles.dateText}>{item.date}</Text>
                            </View>
                            <Image source={item.icon} style={styles.icon} />
                        </View>

                        <View style={styles.stats}>
                            <View >
                                <Image source={wind} style={styles.statsImg} />
                                <Text style={styles.statText}>{item.wind}</Text>
                            </View>
                            <View >
                                <Image source={humidity} style={styles.statsImg} />
                                <Text style={styles.statText}>{item.humidity}</Text>
                            </View>
                            <View >
                                <Image source={raindrop} style={styles.statsImg} />
                                <Text style={styles.statText}>{item.rain}</Text>
                            </View>
                        </View>
                    </View>

                    {/* Bottom Row */}
                    <View style={styles.rowBottom}>
                        <Text style={styles.description}>{item.description}</Text>
                        <Text style={styles.temp}>{item.temp}</Text>
                    </View>
                </View>
            ))}
        </ScrollView>
    );
};

export default Next7DaysScreen;

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#f0f0f0',
        flex: 1,
        paddingVertical: 10,
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 12,
        marginHorizontal: 16,
        marginVertical: 8,
        elevation: 2,
    },
    todayHighlight: {
        borderWidth: 1.5,
        borderColor: '#28a745',
    },
    rowTop: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    dayText: {
        fontSize: 16,
        fontWeight: '700',
        marginRight: 6,
    },
    dateText: {
        fontSize: 14,
        color: '#666',
    },
    icon: {
        width: 28,
        height: 28,
        marginLeft: 8,
    },
    stats: {
        flexDirection: 'row',
        gap: 16,
    },
    statsImg: {
        height: 22,
        width: 22
    },
    statText: {
        fontSize: 13,
        color: '#000',
        fontWeight: '600',
        marginHorizontal: 4,
    },
    rowBottom: {
        marginTop: 10,
        borderTopWidth: 1,
        borderColor: '#F2F8F4',
        paddingTop: 8,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    description: {
        color: '#28a745',
        fontWeight: '600',
    },
    temp: {
        fontWeight: '600',
    },
});
