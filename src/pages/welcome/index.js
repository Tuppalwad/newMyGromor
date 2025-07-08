import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
// import CustomButton from '../components/CustomButton';
import Logo from '../../assets/images/splash/logo.png';
import Store from '../../assets/images/welcome/store.png'
import CustomButton from '../../component/common/CustomButton';
import colors from '../../utils/theam';


const WelcomeScreen = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Image
                source={Logo}
                style={styles.logo}
                resizeMode="contain"
            />

            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <Text style={styles.heading}>Trusted by</Text>
                <Text style={styles.subheading}>30,00,000+ Farmers</Text>
            </View>

            <Image
                source={Store} // add your image here
                style={styles.image}
                resizeMode="cover"
            />

            <Text style={styles.description}>
                MyGromor is your One-Stop-Shop for all agricultural needs.
            </Text>

            <CustomButton
                title="Login  →"
                onPress={() => navigation.navigate('language')}
                style={styles.button}
                textStyle={{ fontWeight: 'bold' }}
            />
        </View>
    );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
        alignItems: 'center',
        paddingHorizontal: 24,
        paddingTop: 40,
        justifyContent: 'space-between',
    },
    logo: {
        width: 100,
        height: 100,
        marginTop: 40,
    },
    heading: {
        fontSize: 18,
        color: colors.textPrimary,
        marginTop: 24,
    },
    subheading: {
        fontSize: 22,
        fontWeight: 'bold',
        color: colors.textPrimary,
        marginBottom: 16,
        marginTop: 10
    },
    image: {
        width: '100%',
        height: 249,
        // borderRadius: 16,
        borderBottomRightRadius: 50,
        borderTopLeftRadius: 50,
        marginBottom: 16,
    },
    description: {
        textAlign: 'center',
        fontSize: 16,
        color: colors.textSecondary,
        marginBottom: 24,
    },
    button: {
        width: '100%',
        marginBottom: 30,
    },
});
