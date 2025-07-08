// src/components/CustomLoginRadioButton.js
import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import colors from '../utils/theam';
import RadioButtonCircle from './RadioButtoCircle';

const CustomLoginRadioButton = ({ selected, onPress, label }) => {
    return (
        <TouchableOpacity style={styles.item} onPress={onPress}>
            <RadioButtonCircle selected={selected} />
            <Text style={[styles.label, selected && styles.selectedLabel]}>{label}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 6,
    },
    label: {
        lineHeight: 20,
        fontSize: 16,
        marginLeft: 8,
        color: '#333',
    },
    selectedLabel: {
        fontWeight: '600',
        color: colors.primary,
    },
});

export default CustomLoginRadioButton;
