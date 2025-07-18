import React from 'react';
import { TouchableOpacity, Text, StyleSheet, Image } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import colors from '../../utils/theam';
import RightArrowIcon from '../../assets/images/common/rightArrow.png';

const CustomButton = ({ title, onPress, style, textStyle, disabled }) => {
    const gradientColors = disabled ? ['#ccc', '#ccc'] : ['#1E8153', '#4EA618'];

    return (
        <TouchableOpacity
            onPress={!disabled ? onPress : null}
            style={[style, disabled && { opacity: 0.6 }]}
            activeOpacity={0.8}
            disabled={disabled}
        >
            <LinearGradient
                colors={gradientColors}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={[styles.button, disabled && styles.disabledButton]}
            >
                <Text style={[styles.buttonText, textStyle]}>{title}</Text>
                <Image
                    source={RightArrowIcon}
                    style={{ width: 10, height: 10, marginLeft: 10, tintColor: 'white' }}
                    resizeMode="contain"
                />
            </LinearGradient>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        paddingVertical: 10,
        paddingHorizontal: 30,
        borderRadius: 4,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        
    },
    buttonText: {
        lineHeight: 20,
        color: colors.white,
        fontSize: 16,
        fontWeight: '600',
    },
    disabledButton: {
        // Optional additional styles for disabled state
    },
});

export default CustomButton;
