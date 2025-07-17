import { Text, TouchableOpacity, View, Image, StyleSheet } from 'react-native';
import React, { useRef, useState } from 'react';
import { Icon } from '../../assets/images';
// import { palette } from '../theme';
// import CTText from '../components/ctText';
import { RFValue } from 'react-native-responsive-fontsize';
// import { palette } from '../theme/color';
export const TabBar = ({ state, descriptors, navigation }) => {
    const styles = style({
        white: '#FFFFFF',
        orange: '#FFA500',
        green: '#008000',
        black: '#000000',
        seperator: 'rgba(69, 69, 85, 0.4)',
        blue: '#00BFFF',
        bg: '#F5F5F5',

    });

    const tabIcon = [
        Icon.home,
        Icon.crop,
        Icon.Feeds,
        Icon.product,
        Icon.marketValue,
    ];

    return (

        <View style={styles.container}>
            {state.routes.map((route, index) => {
                const isFocused = state.index === index;
                const { options } = descriptors[route.key];

                const label = options.tabBarLabel !== undefined
                    ? options.tabBarLabel
                    : options.title !== undefined ? options.title : route.name;

                return (
                    <TouchableOpacity
                        style={styles.itemView}
                        key={index.toString()}
                        onPress={() => {
                            navigation.navigate(route.name);
                        }}>
                        <Image
                            source={tabIcon[index]}
                            resizeMode={'contain'}
                            style={[styles.image, isFocused && { tintColor: "orange" }]}
                        />

                        {/* <CTText
                            text={label}
                            semiBold={isFocused}
                            fontSize={RFValue(7.3)}
                            style={{
                                color: isFocused ? palette.green : 'rgba(69, 69, 85, 0.7)',
                                marginTop: 5, textAlign: 'center',
                            }}
                            numberOfLines={1}
                        /> */}

                        <Text
                            style={[styles.text, {
                                color: isFocused ? "orange" : 'rgba(69, 69, 85, 0.7)',
                                fontSize: RFValue(7.3),
                            }]}
                            numberOfLines={1}>
                            {label}
                        </Text>

                    </TouchableOpacity>
                );

            })}
        </View >
    );
};

const style = props =>
    StyleSheet.create({
        container: {
            flexDirection: 'row',
            backgroundColor: props.white,
            height: 50,
            // backgroundColor: 'red',
            elevation: 20,
            shadowColor: props.black,
            shadowOffset: { width: 1, height: 0 },
            shadowOpacity: 0.5,
            shadowRadius: 1,
        },
        itemView: {
            flex: 1,
            alignItems: 'center',
            height: 50,

            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: props.white,
            alignSelf: 'flex-end',
        },
        item: {
            alignItems: 'center',
            height: 50,
            width: '100%',

            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'white',
            // elevation: 2,
            // shadowColor: props.black,
            // shadowOffset: { width: 1, height: 0 },
            // shadowOpacity: 0.5,
            // shadowRadius: 0,
            zIndex: 5
        },
        centerItemView: {
            flex: 1,
            alignItems: 'center',
            height: 70,
            justifyContent: 'flex-end',
            backgroundColor: props.bg,
        },
        image: {
            width: 15,
            height: 15,
            tintColor: 'rgba(69, 69, 85, 0.4)',
            alignSelf: 'center',
        },
        imageContainer: {
            height: 42,
            width: 42,
            borderRadius: 21,
            backgroundColor: props.blue,
            alignItems: 'center',
            justifyContent: 'center',

            borderColor: 'white',
            borderWidth: 2,
            position: 'absolute',
            top: -0,
            elevation: 3,
        },
        centerImage: {
            width: 24,
            height: 19,
            tintColor: 'white',
        },
        text: {
            fontSize: 11,
            marginTop: 5,
        },
        centerText: {
            fontSize: 11,
            marginTop: 5,
            alignSelf: 'flex-end',
            marginBottom: 8,
        },

        image: {
            width: 15,
            height: 15,
            tintColor: props.seperator,
            alignSelf: 'center',
        },
    });
