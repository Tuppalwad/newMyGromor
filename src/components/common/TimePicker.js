import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import DatePicker from 'react-native-date-picker';


export const TimePicker = ({ time, applanguage ,onTimeSelected}) => {
    const [open, setOpen] = useState(false);

    const formatTime = (date) => {
        if (!date) return applanguage?.lblChooseTime ?? "Select Time";
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
    };

    return (
        <View>
            <TouchableOpacity onPress={() => setOpen(true)}>
                <View style={styles.inputField}>
                    <Text style={{ ...styles.timeText, color: time ? "#333333" : "#999999" }}>
                        {formatTime(time)}
                    </Text>
                    {/* <Image source={Watch} style={styles.icon} resizeMode='contain' /> */}
                </View>
            </TouchableOpacity>
            <DatePicker
                modal
                mode="time"
                open={open}
                date={time || new Date()}  // Ensure it doesn't crash on undefined time
                onConfirm={(selectedTime) => {
                    setOpen(false);
                    
                    onTimeSelected(selectedTime); // Store the formatted time
                }}
                onCancel={() => setOpen(false)}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    inputField: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        borderRadius: 8,
        paddingHorizontal: 10,
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: "#D1D5DB",
    },
    timeText: {
        fontSize: 16,
        flex: 1,
    },
    icon: {
        width: 25,
        height: 25,
        borderRadius:26
    },
});

export default TimePicker;
