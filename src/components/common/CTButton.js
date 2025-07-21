import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { height, width } from '../../config/resposiveSize';
import { palette } from '../../theme/color';
import { typography } from '../../theme/typography';
import CTText from '../ctText';


const CTButton = ({
    text,
    onPress,
    textColor = 'white',
    containerStyle,
    enableDebounce = false,
    disabled = false,
    disabledColor = '#4C8E30',
    icon,
    tintColor,
    fontSize = RFValue(13),
    type2,
    onPressIn,
    onPressOut,
    numberOfLines = 1,
    svgIcon,
    textAlign = 'center',
    BG_Status = false,
}) => {
    const colors = palette;
    const font = typography;

    const styles = style(colors);
    const [hasPressed, setHasPressed] = useState(false);

    return (
        <TouchableOpacity
            onPress={() => {
                if (enableDebounce) {
                    if (!hasPressed) {
                        onPress();
                        setHasPressed(true);
                    } else {
                        setTimeout(() => {
                            setHasPressed(false);
                        }, 1000);
                    }
                } else {
                    onPress();
                }
            }}
            onPressIn={onPressIn}
            onPressOut={onPressOut}
            style={[
                styles.container,
                containerStyle,
                disabled && { backgroundColor: colors.buttondisabled },
                type2 && styles.container2,
                disabled && type2 && styles.containerdisabled,
            ]}
            disabled={disabled}>
            {icon && (
                <Image
                    source={icon}
                    style={{
                        width: (width / 100) * 6,
                        height: (width / 100) * 6,
                        marginEnd: (width / 100) * 4,
                        tintColor: colors.tintColor,
                    }}
                    resizeMode={'contain'}
                />
            )}
            {svgIcon}
            <CTText
                text={text}
                textColor={textColor}
                semiBold
                style={{ textAlign }}
                fontSize={fontSize}
                numberOfLines={numberOfLines}
            />
        </TouchableOpacity>
    );
};
export default CTButton;

const style = props =>
    StyleSheet.create({
        container: {
            elevation: 2,
            backgroundColor: palette.buttonBg,
            paddingVertical: 10,
            shadowColor: palette.black,
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.5,
            shadowRadius: 1,
            borderRadius: 6,
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: (height / 100) * 5.5,
            flexDirection: 'row',
        },
        container2: {
            borderWidth: 1,
            borderColor: palette.buttonBg,
            backgroundColor: palette.white,
        },
        containerdisabled: {
            borderWidth: 1,
            borderColor: palette.lightOrangerBorder,
            backgroundColor: palette.lightGrayBg,
        },
    });
