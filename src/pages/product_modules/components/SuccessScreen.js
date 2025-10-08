import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, BackHandler } from 'react-native';
import LinearGradient from 'react-native-linear-gradient'; // Make sure you have this installed
import { useNavigation } from '@react-navigation/native';
import Sucess from '../../../assets/images/common/success1.png'
import { useDispatch, useSelector } from 'react-redux';
import { Screen } from '../../../router/screen';

const SuccessScreen = ({ path, state, title, subtitle, setShowSuccess }) => {
    const navigation = useNavigation();
    const appLanguages = useSelector(state => state.user.appMultiLanguage);
    useEffect(() => {

        const backAction = () => {
            setShowSuccess(false); // close map instead of navigating back
            return true;
        };

        const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            backAction
        );

        return () => backHandler.remove();
    }, []);


    return (
        <View style={styles.container}>

            {!title?.toLowerCase().includes("failed") ?
                <Image
                    source={Sucess}
                    style={{ width: 50, height: 50, resizeMode: 'contain' }}
                /> : <View style={{ borderRadius: 25, width: 50, height: 50, justifyContent: 'center', alignItems: 'center', backgroundColor: 'red' }}>
                    <Text style={{ color: '#fff' }}>X</Text>
                </View>
            }



            <Text style={styles.title}>{appLanguages.successful_message ?? "Submitted Successfully!"}</Text>
            <Text style={styles.subtitle}>
                {appLanguages.successful_submessage ?? "Your service has been placed successfully."}{"\n"}
                <Text style={styles.serviceId}>{appLanguages.lblServiceId ?? "Service ID"} {id}</Text>
            </Text>

            <TouchableOpacity style={styles.buttonContainer} onPress={() => { setShowSuccess(false), navigation.navigate(path, { state: state }) }}>
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
                onPress={() => { setShowSuccess(false), navigation.navigate(Screen.homes) }}
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
