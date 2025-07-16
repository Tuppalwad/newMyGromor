
import React, { useEffect, useRef, useState } from 'react';
import {
    View,
    Image,
    StyleSheet,
    Animated,
    Dimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native'; // 🔁 ADD THIS

import Logo from '../../../assets/images/splash/logo.png';
import Tree from '../../../assets/images/splash/tree.jpg';
import Brand from '../../../assets/images/splash/brand.png';
import { Screen } from '../../../router/screen';

const { width, height } = Dimensions.get('window');

const SplashScreen = () => {

    const logoTranslateY = useRef(new Animated.Value(0)).current;
    const treeScale = useRef(new Animated.Value(1.6)).current;
    const treeOpacity = useRef(new Animated.Value(0)).current;
    const navigation = useNavigation(); 

    useEffect(() => {
        setTimeout(() => {
            Animated.parallel([
                Animated.timing(logoTranslateY, {
                    toValue: -height * 0.33,
                    duration: 800,
                    useNativeDriver: true,
                }),
                Animated.timing(treeOpacity, {
                    toValue: 1,
                    duration: 1000,
                    useNativeDriver: true,
                }),
                Animated.timing(treeScale, {
                    toValue: 1.0,
                    duration: 1000,
                    useNativeDriver: true,
                }),
            ]).start(() => {
                // 👇 Navigate after animation completes
                navigation.replace(Screen.welcome);
            });
        }, 1000);
    }, []);

    return (
        <View style={styles.container}>
            <Animated.Image
                source={Tree}
                style={[
                    styles.tree,
                    {
                        opacity: treeOpacity,
                        transform: [{ scale: treeScale }],
                    },
                ]}
                resizeMode="cover"
            />
            <Animated.Image
                source={Logo}
                style={[
                    styles.logo,
                    {
                        transform: [{ translateY: logoTranslateY }],
                    },
                ]}
                resizeMode="contain"
            />
            <Image source={Brand} style={styles.brand} resizeMode="contain" />
        </View>
    );
};

export default SplashScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    logo: {
        width: 150,
        height: 150,
        zIndex: 2,
    },
    tree: {
        position: 'absolute',
        top: 0,
        left: 0,
        width,
        height,
        zIndex: 1,
    },
    brand: {
        position: 'absolute',
        bottom: 20,
        width: 150,
        height: 40,
        zIndex: 3,
    },
});
