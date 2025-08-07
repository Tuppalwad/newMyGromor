import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import LinearGradient from 'react-native-linear-gradient'; // Make sure you have this installed
import { useNavigation } from '@react-navigation/native';
import Sucess from '../../../assets/images/common/success.gif'
import SprayingServiceDetail from '../../service_modules/spraying-service';
import SuccessGif from '../../../components/common/SuccessGif';
import { Screen } from '../../../router/screen';
const SuccessScreen = ({ id }) => {
    const navigation = useNavigation();
    const appLanguages = useSelector(state => state.user.appMultiLanguage);

    return (
        <View style={styles.container}>

            <View style={{ marginBottom: 20, width: 100, height: 100, borderRadius: 50, backgroundColor: '#ffffff', justifyContent: 'center', alignItems: 'center' }}>

                <SuccessGif image={Sucess} />

            </View>

            <Text style={styles.title}>{appLanguages.successful_message ?? "Submitted Successfully!"}</Text>
            <Text style={styles.subtitle}>
                {appLanguages.successful_submessage ?? "Your service has been placed successfully."}{"\n"}
                <Text style={styles.serviceId}>{appLanguages.lblServiceId ?? "Service ID"} {id}</Text>
            </Text>

            <TouchableOpacity style={styles.buttonContainer} onPress={() => navigation.navigate('')}>
                <LinearGradient
                    colors={['#1E8153', '#4EA618']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={styles.gradientButton}
                >
                    <Text style={styles.buttonText}>{appLanguages.view_order ?? "View Order"}</Text>
                </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity
                onPress={() => navigation.navigate(Screen.homes)}
                style={styles.homeLink}
            >
                <Text style={styles.homeText}>{appLanguages.go_to_home ?? "Go to Home"}</Text>
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
        width: 50,
        height: 50,
        marginBottom: 20,
        resizeMode: 'contain'
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
        width: '50%',
        marginBottom: 20,
    },
    gradientButton: {
        paddingVertical: 14,
        borderRadius: 10,
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
