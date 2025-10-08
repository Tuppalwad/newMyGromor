import React, { useEffect } from 'react';
import { View, Text, Image, ScrollView, StyleSheet } from 'react-native';
import wind from '../../../assets/images/common/wind.png';
import humidity from '../../../assets/images/common/humidity.png';
import raindrop from '../../../assets/images/common/raindrop.png'
import { useDispatch, useSelector } from 'react-redux';
import { useOperation } from '../../../redux/operation';
import { WEATHER_APP_KEY } from '../../../config';
import userManager from '../../../storage/user-manager';
import Indicator from '../../../components/common/Indicator';

const NextDaysScreen = ({ days, isLoading }) => {
    const operation = useOperation();
    const monthlyWeatherData = useSelector(state => state.weather.monthlyWeather);
    const userLocation = userManager.getUserLocation;
    const dispatch = useDispatch();

    useEffect(() => {
        let params = {
            units: 'metric',
            appid: WEATHER_APP_KEY,
            lat: userLocation?.latitude,
            lon: userLocation?.longitude,
            cnt: days,
        };
        dispatch(operation.weather.getMonthlyWeather(params));
    }, []);

    // Helper function to get weather icon based on condition code
    const getWeatherIcon = (weatherId) => {
        if (weatherId >= 200 && weatherId < 300) {
            return require('../../../assets/images/common/rain.png'); // thunderstorm
        } else if (weatherId >= 300 && weatherId < 500) {
            return require('../../../assets/images/common/raindrop.png'); // drizzle
        } else if (weatherId >= 500 && weatherId < 600) {
            return require('../../../assets/images/common/rain.png'); // rain
        } else if (weatherId >= 600 && weatherId < 700) {
            return require('../../../assets/images/common/snow.png'); // snow
        } else if (weatherId >= 700 && weatherId < 800) {
            return require('../../../assets/images/common/fog.png'); // atmosphere
        } else if (weatherId === 800) {
            return require('../../../assets/images/common/sun.png'); // clear
        } else if (weatherId > 800) {
            return require('../../../assets/images/common/suncloud.png'); // clouds
        }
        return require('../../../assets/images/common/suncloud.png'); // default
    };

    // Format the date to display day and date
    const formatDate = (timestamp) => {
        const date = new Date(timestamp * 1000);
        const day = date.toLocaleDateString('en-US', { weekday: 'short' });
        const formattedDate = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
        return { day, date: formattedDate };
    };

    // Format the weekly data for display
    const formatWeeklyData = () => {
        if (!monthlyWeatherData || !monthlyWeatherData.list || monthlyWeatherData.list.length === 0) return [];

        return monthlyWeatherData.list.map((dayData, index) => {
            const { day, date } = formatDate(dayData.dt);
            const weatherCondition = dayData.weather[0].id;

            return {
                day,
                date,
                icon: getWeatherIcon(weatherCondition),
                wind: `${dayData.speed} km/h`,
                humidity: `${dayData.humidity}%`,
                rain: `${dayData.rain || 0}%`,
                description: dayData.weather[0].description.charAt(0).toUpperCase() +
                    dayData.weather[0].description.slice(1),
                temp: `${Math.round(dayData.temp.day)}°C`,
                isToday: index === 0
            };
        });
    };

    const weeklyData = formatWeeklyData();

    return (
        <ScrollView style={styles.container}>
            {weeklyData.map((item, index) => (
                <View
                    key={index}
                    style={[styles.card, item.isToday && styles.todayHighlight]}
                >
                    {/* Top Row */}
                    <View style={styles.rowTop}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                            <View>
                                <Text style={styles.dayText}>{item.day}</Text>
                                <Text style={styles.dateText}>{item.date}</Text>
                            </View>
                            <Image source={item.icon} style={{ ...styles.icon, marginLeft: 20 }} />
                        </View>
                        <View style={styles.divider} />

                        <View style={styles.stats}>
                            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                <Image source={wind} style={styles.statsImg} />
                                <Text style={styles.statText}>{item.wind}</Text>
                            </View >
                            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                <Image source={humidity} style={styles.statsImg} />
                                <Text style={styles.statText}>{item.humidity}</Text>
                            </View>
                            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
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
            <Indicator show={isLoading} />
        </ScrollView>
    );
};

export default NextDaysScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingVertical: 10,
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 10,
        marginVertical: 8,
    },
    todayHighlight: {
        borderWidth: 1.5,
        borderColor: '#28a745',
    },
    rowTop: {
        padding: 12,
        paddingHorizontal: 12,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    dayText: {
        fontSize: 18,
        fontWeight: '700',
        marginRight: 6,
    },
    dateText: {
        fontSize: 16,
        fontWeight: 600,
        color: '#4E4E4E',
    },
    icon: {
        width: 36,
        height: 36,
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
    divider: {
        width: 1,
        height: 81,
        backgroundColor: '#DFDFDF',
        marginHorizontal: 3,
    },
    rowBottom: {
        marginTop: 10,
        paddingHorizontal: 10,
        paddingVertical: 10,
        borderRadius: 10,
        backgroundColor: '#F2F8F4',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    description: {
        color: '#147045',
        fontWeight: '600',
    },
    temp: {
        color: '#147045',
        fontWeight: '600',
    },
});