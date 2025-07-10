// import React, { useEffect, useRef } from 'react';
// import {
//     View,
//     Image,
//     StyleSheet,
//     Animated,
//     Dimensions,
// } from 'react-native';

// import Logo from '../../assets/images/splash/logo.png';
// import Tree from '../../assets/images/splash/tree.png';
// import Brand from '../../assets/images/splash/brand.png';

// const { width, height } = Dimensions.get('window');

// const SplashScreen = () => {
//     const logoTranslateY = useRef(new Animated.Value(0)).current; // Center initially
//     const treeScale = useRef(new Animated.Value(1.1)).current;

//     const treeOpacity = useRef(new Animated.Value(0)).current;

//     useEffect(() => {
//         setTimeout(() => {
//             Animated.parallel([
//                 // Move logo from center to top
//                 Animated.timing(logoTranslateY, {
//                     toValue: -height * 0.33,
//                     duration: 800,
//                     useNativeDriver: true,
//                 }),
//                 // Zoom out + fade in tree
//                 Animated.timing(treeOpacity, {
//                     toValue: 1,
//                     duration: 1000,
//                     useNativeDriver: true,
//                 }),
//                 Animated.timing(treeScale, {
//                     toValue: 1.3,
//                     duration: 1000,
//                     useNativeDriver: true,
//                 }),
//             ]).start();
//         }, 1000);
//     }, []);

//     return (
//         <View style={styles.container}>
//             {/* Background Tree with animation */}
//             <Animated.Image
//                 source={Tree}
//                 style={[
//                     styles.tree,
//                     {
//                         opacity: treeOpacity,
//                         transform: [{ scale: treeScale }],
//                     },
//                 ]}
//                 resizeMode="cover"
//             />

//             {/* Logo animated from center to top */}
//             <Animated.Image
//                 source={Logo}
//                 style={[
//                     styles.logo,
//                     {
//                         transform: [{ translateY: logoTranslateY }],
//                     },
//                 ]}
//                 resizeMode="contain"
//             />

//             {/* Static Brand image at bottom */}
//             <Image source={Brand} style={styles.brand} resizeMode="contain" />
//         </View>
//     );
// };

// export default SplashScreen;



import React, { useEffect, useRef } from 'react';
import {
    View,
    Image,
    StyleSheet,
    Animated,
    Dimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native'; // 🔁 ADD THIS

import Logo from '../../assets/images/splash/logo.png';
import Tree from '../../assets/images/splash/tree.png';
import Brand from '../../assets/images/splash/brand.png';

const { width, height } = Dimensions.get('window');

const SplashScreen = () => {
    const logoTranslateY = useRef(new Animated.Value(0)).current;
    const treeScale = useRef(new Animated.Value(1.1)).current;
    const treeOpacity = useRef(new Animated.Value(0)).current;
    const navigation = useNavigation(); // 🔁 ADD THIS

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
                    toValue: 1.3,
                    duration: 1000,
                    useNativeDriver: true,
                }),
            ]).start(() => {
                // 👇 Navigate after animation completes
                navigation.replace('language');
            });
        }, 1500);
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
