import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import LinearGradient from 'react-native-linear-gradient'; // Make sure you have this installed
import { useNavigation } from '@react-navigation/native';
import checkIcon from '../../../assets/images/common/checkIcon.png'
import SprayingServiceDetail from '../../service_modules/spraying-service';
const SuccessScreen = () => {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <Image
                source={checkIcon} // Replace with your tick icon path
                style={styles.checkIcon}
            />

            <Text style={styles.title}>Submitted Successfully!</Text>
            <Text style={styles.subtitle}>
                Your service has been placed successfully.{"\n"}
                <Text style={styles.serviceId}>Service ID #CD250701031942</Text>
            </Text>

            <TouchableOpacity style={styles.buttonContainer} onPress={() => navigation.navigate(SprayingServiceDetail)}>
                <LinearGradient
                    colors={['#1E8153', '#4EA618']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={styles.gradientButton}
                >
                    <Text style={styles.buttonText}>View Order</Text>
                </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity
                onPress={() => navigation.navigate('Home')}
                style={styles.homeLink}
            >
                <Text style={styles.homeText}>Go to Home</Text>
                <Text style={styles.arrow}>{' >'}</Text>
            </TouchableOpacity>
        </View>
    );
};

export default SuccessScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#fff',
    },
    checkIcon: {
        width: 60,
        height: 60,
        marginBottom: 20,
    },
    title: {
        fontSize: 20,
        fontWeight: '700',
        marginBottom: 10,
        textAlign: 'center',
        color: '#000',
    },
    subtitle: {
        fontSize: 14,
        color: '#666',
        textAlign: 'center',
        marginBottom: 30,
        lineHeight: 20,
    },
    serviceId: {
        color: '#000',
    },
    buttonContainer: {
        width: '100%',
        marginBottom: 20,
    },
    gradientButton: {
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
    homeLink: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    homeText: {
        color: '#27B25C',
        fontSize: 16,
        fontWeight: '600',
    },
    arrow: {
        color: '#27B25C',
        fontSize: 18,
    },
});
