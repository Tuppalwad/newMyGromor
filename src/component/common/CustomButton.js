import React from 'react';
import { TouchableOpacity, Text, StyleSheet, Image, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import colors from '../../utils/theam';
import RightArrow from '../../assets/images/common/rightArrow.png'

const CustomButton = ({ title, onPress, style, textStyle }) => {
    return (
        <TouchableOpacity onPress={onPress} style={style} activeOpacity={0.8}>
            <LinearGradient
                colors={['#1E8153', '#4EA618']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.button}
            >
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={[styles.buttonText, textStyle]}>{title}</Text>
                    <Image source={RightArrow} resizeMode='contain' style={styles.rightarow} />
                </View>
            </LinearGradient>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        backgroundColor: colors.primary,
        paddingVertical: 14,
        paddingHorizontal: 24,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        lineHeight: 20,
        color: colors.white,
        fontSize: 16,
        fontWeight: '600',
    },
    rightarow: {
        width: 10,
        height: 10,
        marginLeft: 10,
    }
});

export default CustomButton;
