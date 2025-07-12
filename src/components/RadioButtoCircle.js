// src/components/RadioButtonCircle.js
import React from 'react';
import { View, StyleSheet } from 'react-native';
import colors from '../utils/theam';

const RadioButtonCircle = ({ selected }) => {
    return (
        <View style={[styles.radioOuter, selected && styles.radioOuterSelected]}>
            {selected && <View style={styles.radioInner} />}
        </View>
    );
};

const styles = StyleSheet.create({
    radioOuter: {
        width: 20,
        height: 20,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: colors.primary,
        alignItems: 'center',
        justifyContent: 'center',
    },
    radioOuterSelected: {
        borderColor: colors.primary,
    },
    radioInner: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: colors.primary,
    },
});

export default RadioButtonCircle;
