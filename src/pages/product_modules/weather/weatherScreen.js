import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
// import CustomHeader from '../../../components/common/CustomHeader';
import location from '../../../assets/images/splash/location.png'
import CustomHeader from '../../../components/common/CustomHeader';
import NextDaysScreen from './nextdays';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import Indicator from '../../../components/common/Indicator';
import { FarmerType } from '../../../redux/farmer/type';
import { WeatherType } from '../../../redux/weather-report/type';
import { createLoadingSelector } from '../../../redux/loading-reducer';
const WeatherScreen = ({ navigation }) => {
    const [activeTab, setActiveTab] = useState('Today');
    const [selectedHour, setSelectedHour] = useState(null);
    const hourlyWeatherData = useSelector(state => state.weather.hourlyWeather);
    const monthlyWeatherData = useSelector(state => state.weather.monthlyWeather);
    const currentWeatherData = useSelector(state => state.weather.currentWeather);
    const loadingSelector = createLoadingSelector([
        WeatherType.location,
        WeatherType.monthlyWeather,
        WeatherType.weather,
        WeatherType.currentWeather,
    ]);
    const isLoading = useSelector(state => loadingSelector(state));

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

    // Format the hourly data for display
    const formatHourlyData = () => {
        if (!hourlyWeatherData || hourlyWeatherData.length === 0) return [];

        return hourlyWeatherData.map((hour) => {
            const date = new Date(hour.dt * 1000);
            const time = date.toLocaleTimeString([], { hour: '2-digit' });
            const weatherCondition = hour.weather[0].id;

            return {
                time: `${time}`,
                temp: Math.round(hour.main.temp),
                rain: hour.rain ? `${Math.round(hour.rain['1h'] * 100)}%` : '0%',
                icon: getWeatherIcon(weatherCondition),
                Icon: require('../../../assets/images/common/raindrop.png')
            };
        });
    };

    // Get current date
    const getCurrentDate = () => {
        if (!currentWeatherData || !currentWeatherData.dt) return 'Mon, Jun 16';

        const date = new Date(currentWeatherData.dt * 1000);
        return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
    };

    // Format weather type description
    const getWeatherType = () => {
        if (!currentWeatherData || !currentWeatherData.weather || currentWeatherData.weather.length === 0)
            return 'Light Rain with Sun';

        const weather = currentWeatherData.weather[0];
        return weather.description.charAt(0).toUpperCase() + weather.description.slice(1);
    };

    const weatherData = {
        location: currentWeatherData?.name || 'Mali and Munjeri',
        date: getCurrentDate(),
        temperature: currentWeatherData?.main?.temp ? Math.round(currentWeatherData.main.temp) : 29,
        min: currentWeatherData?.main?.temp_min ? Math.round(currentWeatherData.main.temp_min) : 26,
        max: currentWeatherData?.main?.temp_max ? Math.round(currentWeatherData.main.temp_max) : 38,
        weatherType: getWeatherType(),
        wind: currentWeatherData?.wind?.speed ? `${currentWeatherData.wind.speed} km/h` : '6 km/h',
        humidity: currentWeatherData?.main?.humidity ? `${currentWeatherData.main.humidity}%` : '22%',
        rain: hourlyWeatherData?.[0]?.rain ? `${Math.round(hourlyWeatherData[0].rain['1h'] * 100)}%` : '0%',
        hourly: formatHourlyData()
    };

    return (
        <View style={styles.container}>
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
            <ScrollView style={{ paddingHorizontal: '16' }}>
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
                                    source={getWeatherIcon(currentWeatherData?.weather?.[0]?.id || 804)}
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
                        <Text style={styles.hourlyTitle}>Today's Hourly</Text>
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
                    <NextDaysScreen days={7} isLoading={isLoading} />
                )}
                {activeTab === 'Monthly' && (
                    <NextDaysScreen
                        isLoading={isLoading}
                        days={new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).getDate() > 30 ? 30 : new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).getDate()}
                    />
                )}

            </ScrollView>
            <Indicator show={isLoading} />

        </View>
    );
};

export default WeatherScreen;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: '#e6e6e6e8',
        // paddingHorizontal: 10,
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
        paddingVertical: 16,
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
