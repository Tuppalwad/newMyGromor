import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
// import CustomHeader from '../../../components/common/CustomHeader';
import location from '../../../assets/images/splash/location.png'
import CustomHeader from '../../../components/common/CustomHeader';
import Next7DaysScreen from './next7days';
const WeatherScreen = () => {
    const [activeTab, setActiveTab] = useState('Today');
    const [selectedHour, setSelectedHour] = useState(null);
    const weatherData = {
        location: 'Anantapur, Andhra Pradesh',
        date: 'Mon, Jun 16',
        temperature: 29,
        min: 26,
        max: 38,
        weatherType: 'Light Rain with Sun',
        wind: '6 km/h',
        humidity: '22%',
        rain: '0.31%',
        hourly: [
            { time: '03 PM', temp: 29, rain: '91%', icon: require('../../../assets/images/common/suncloud.png'), Icon: require('../../../assets/images/common/raindrop.png') },
            { time: '04 PM', temp: 26, rain: '95%', icon: require('../../../assets/images/common/rain.png'), Icon: require('../../../assets/images/common/raindrop.png') },
            { time: '05 PM', temp: 25, rain: '98%', icon: require('../../../assets/images/common/rain.png'), Icon: require('../../../assets/images/common/raindrop.png') },
            { time: '06 PM', temp: 24, rain: '99%', icon: require('../../../assets/images/common/rain.png'), Icon: require('../../../assets/images/common/raindrop.png') },
            { time: '07 PM', temp: 21, rain: '97%', icon: require('../../../assets/images/common/rain.png'), Icon: require('../../../assets/images/common/raindrop.png') },
            { time: '08 PM', temp: 22, rain: '90%', icon: require('../../../assets/images/common/rain.png'), Icon: require('../../../assets/images/common/raindrop.png') },
            { time: '09 PM', temp: 24, rain: '80%', icon: require('../../../assets/images/common/rain.png'), Icon: require('../../../assets/images/common/raindrop.png') },
            { time: '10 PM', temp: 27, rain: '88%', icon: require('../../../assets/images/common/rain.png'), Icon: require('../../../assets/images/common/raindrop.png') },
            { time: '11 PM', temp: 26, rain: '94%', icon: require('../../../assets/images/common/rain.png'), Icon: require('../../../assets/images/common/raindrop.png') },
        ],
    };

    return (
        <>
            {/* Header */}
            <CustomHeader
                type="Wheather Forcast"
                topTitle="Wheather Forcast"
                subtitle=""
                onBackPress={() => navigation.goBack()}
                onCartPress={() => console.log('wheather pressed')}
                onNotificationPress={() => console.log('Notification pressed')}
            />

            {/* Tabs */}
            <View style={styles.tabs}>
                {['Today', 'Next 7 Days', 'Monthly'].map((tab) => (
                    <TouchableOpacity key={tab} onPress={() => setActiveTab(tab)}>
                        <Text style={[styles.tab, activeTab === tab && styles.activeTab]}>{tab}</Text>
                    </TouchableOpacity>
                ))}
            </View>
            <ScrollView style={styles.container}>
                {activeTab === 'Today' && (
                    <>
                        {/* Weather Card */}
                        <View style={styles.weatherCard}>
                            <Text style={styles.dateText}>{weatherData.date}</Text>
                            <View style={{ flexDirection: 'row' }}>
                                <Image source={location} style={{ marginTop: 4, height: 14, width: 12, tintColor: '#147045' }} />
                                <Text style={styles.locationText}>{weatherData.location}</Text>
                            </View>

                            <View style={styles.weatherInfoRow}>
                                <View>
                                    <Text style={styles.temperature}>{weatherData.temperature}°C</Text>
                                    <Text style={styles.minMax}>Min: {weatherData.min}°C   Max: {weatherData.max}°C</Text>
                                </View>
                                <Image
                                    source={require('../../../assets/images/common/suncloud.png')}
                                    style={styles.weatherIcon}
                                />
                            </View>
                            <View style={{ backgroundColor: '#F2F8F4', marginTop: 30, borderRadius: 8 }}>
                                <View style={styles.statusBanner}>
                                    <Text style={styles.statusText}>{weatherData.weatherType}</Text>
                                </View>

                                <View style={styles.weatherStats}>
                                    <View style={styles.statItem}>
                                        <Image source={require('../../../assets/images/common/wind.png')} style={styles.statIcon} />
                                        <Text style={styles.statValue}>{weatherData.wind}</Text>
                                        <Text style={styles.statLabel}>Wind</Text>
                                    </View>
                                    <View style={styles.divider} />
                                    <View style={styles.statItem}>
                                        <Image source={require('../../../assets/images/common/humidity.png')} style={styles.statIcon} />
                                        <Text style={styles.statValue}>{weatherData.humidity}</Text>
                                        <Text style={styles.statLabel}>Humidity</Text>
                                    </View>
                                    <View style={styles.divider} />
                                    <View style={styles.statItem}>
                                        <Image source={require('../../../assets/images/common/raindrop.png')} style={styles.statIcon} />
                                        <Text style={styles.statValue}>{weatherData.rain}</Text>
                                        <Text style={styles.statLabel}>Rain</Text>
                                    </View>
                                </View>
                            </View>
                        </View>

                        {/* Hourly Forecast */}
                        <Text style={styles.hourlyTitle}>Today’s Hourly</Text>
                        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.hourlyScroll}>
                            {weatherData.hourly.map((hour, index) => (
                                <TouchableOpacity
                                    key={index}
                                    onPress={() => setSelectedHour(hour.time)}
                                    style={[
                                        styles.hourCard,
                                        selectedHour === hour.time && styles.hourCardActive
                                    ]}
                                >
                                    <Text style={[
                                        styles.hourText,
                                        selectedHour === hour.time && styles.highlightedText
                                    ]}>
                                        {hour.time}
                                    </Text>
                                    <Image source={hour.icon} style={styles.hourIcon} />
                                    <Text style={styles.hourTemp}>{hour.temp}°C</Text>
                                    <View style={{ flexDirection: 'row' }}>
                                        <Image source={hour.Icon} style={{ height: 16, width: 16 }} />
                                        <Text style={styles.hourRain}>{hour.rain}</Text>
                                    </View>
                                </TouchableOpacity>
                            ))}
                        </ScrollView>
                    </>
                )}

                {activeTab === 'Next 7 Days' && (
                    // <View style={styles.placeholderBox}>
                    //     <Text style={styles.placeholderText}>
                    //         {activeTab} data will be displayed here.
                    //     </Text>
                    // </View>
                    <Next7DaysScreen />
                )}
                {activeTab === 'Monthly' && (
                    <Next7DaysScreen />
                )}
            </ScrollView>
        </>
    );
};

export default WeatherScreen;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#e6e6e6e8',
        paddingHorizontal: 10,
        // paddingTop: 20,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: '600',
    },
    headerIcons: {
        flexDirection: 'row',
        gap: 16,
    },
    icon: {
        width: 24,
        height: 24,
    },
    tabs: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        // marginVertical: 16,
        paddingVertical: 16,
        // backgroundColor: '#fff'
        backgroundColor: '#f5f8f7ff'
    },
    tab: {
        fontSize: 16,
        color: '#888',
    },
    activeTab: {
        color: '#2BA56D',
        fontWeight: '700',
        borderBottomWidth: 2,
        borderBottomColor: '#2BA56D',
        paddingBottom: 4,
    },
    weatherCard: {
        backgroundColor: '#fff',
        borderRadius: 4,
        padding: 16,
        marginBottom: 20,
        marginTop: 10
    },
    dateText: {
        fontSize: 14,
        fontWeight: '500',
        marginBottom: 4,
    },
    locationText: {
        fontSize: 14,
        color: '#147045',
        fontWeight: '500',
        marginBottom: 16,
        marginLeft: 6,
    },
    weatherInfoRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    temperature: {
        fontSize: 58,
        fontWeight: '600',
        color: '#147045',
    },
    minMax: {
        fontSize: 12,
        fontWeight: 400,
        color: '#4E4E4E',
        marginTop: 4,
    },
    weatherIcon: {
        width: 84,
        height: 84,
        marginRight: 20
    },
    statusBanner: {
        backgroundColor: '#DAFDE7',
        padding: 8,
        borderRadius: 8,
        // marginTop: 16,
    },
    statusText: {
        color: '#147045',
        fontWeight: '600',
        textAlign: 'center',
    },
    weatherStats: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 16,
    },
    statItem: {
        alignItems: 'center',
        width: '33%',
    },
    statIcon: {
        width: 20,
        height: 20,
        marginBottom: 6,
    },
    statValue: {
        fontWeight: '600',
    },
    statLabel: {
        fontSize: 12,
        color: '#777',
    },
    divider: {
        width: 1,
        height: 81,
        backgroundColor: '#DFDFDF', // light grey line like in your screenshot
        marginHorizontal: 3,       // spacing on both sides
    },
    hourlyTitle: {
        fontSize: 16,
        fontWeight: '700',
        marginBottom: 15,
    },
    hourlyScroll: {
        marginBottom: 40,
    },
    hourCard: {
        backgroundColor: '#fff',
        borderRadius: 4,
        padding: 12,
        alignItems: 'center',
        marginRight: 10,
        width: 90,
    },
    hourCardActive: {
        borderWidth: 1,
        borderColor: '#01AD41',
        // padding: 20
    },
    hourText: {
        fontSize: 14,
        marginBottom: 6,
        fontWeight: 600
    },
    hourIcon: {
        width: 30,
        height: 30,
        marginBottom: 6,
        marginTop: 10
    },
    hourTemp: {
        fontWeight: '700',
        fontSize: 16,
        color: '#004F34',
        marginBottom: 10
    },
    hourRain: {
        fontSize: 12,
        color: '#000',
    },
});
