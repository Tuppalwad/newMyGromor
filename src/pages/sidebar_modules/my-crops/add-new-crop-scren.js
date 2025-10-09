import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    ScrollView,
    Platform,
} from 'react-native';
import React, { useState } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';

const AddNewCropScreen = () => {
    const [coverageArea, setCoverageArea] = useState('');
    const [areaType, setAreaType] = useState('Acre');
    const [date, setDate] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [soilType, setSoilType] = useState('');
    const [irrigationMethod, setIrrigationMethod] = useState('');
    const [isLeased, setIsLeased] = useState(false);

    const soilOptions = [
        'Red Soil',
        'Black Soil',
        'Sandy Soil',
        'Loamy Soil',
        'Silt Soil',
        'Mixed Soil',
        'Problematic Soil',
        'Other',
    ];

    const irrigationOptions = [
        'Flood Irrigation',
        'Drip Irrigation',
        'Sprinkler Irrigation',
        'Other',
    ];

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Mango</Text>
            <Text style={styles.required}>*All fields are required</Text>

            <Text style={styles.sectionTitle}>Crop Details</Text>

            {/* Coverage Area Input */}
            <View style={styles.row}>
                <View style={styles.halfInput}>
                    <Text style={styles.label}>Coverage Area</Text>
                    <TextInput
                        style={styles.input}
                        keyboardType="numeric"
                        value={coverageArea}
                        onChangeText={setCoverageArea}
                        placeholder="0"
                    />
                </View>

                {/* Area Type Picker */}
                <View style={styles.halfInput}>
                    <Text style={styles.label}>Type</Text>
                    <View style={styles.pickerWrapper}>
                        <Picker
                            selectedValue={areaType}
                            onValueChange={(itemValue) => setAreaType(itemValue)}
                            style={styles.picker}
                        >
                            <Picker.Item label="Acre" value="Acre" />
                            <Picker.Item label="Hectare" value="Hectare" />
                            <Picker.Item label="Sq Ft" value="Sq Ft" />
                        </Picker>
                    </View>
                </View>
            </View>

            {/* Sowing Date */}
            <View style={{ marginTop: 16 }}>
                <Text style={styles.label}>Crop Sowing Date</Text>
                <TouchableOpacity
                    style={styles.dateInput}
                    onPress={() => setShowDatePicker(true)}
                >
                    <Text style={{ color: date ? '#000' : '#aaa' }}>
                        {date ? date.toDateString() : 'Select Date'}
                    </Text>
                </TouchableOpacity>
                {showDatePicker && (
                    <DateTimePicker
                        value={date}
                        mode="date"
                        display="default"
                        onChange={(event, selectedDate) => {
                            setShowDatePicker(Platform.OS === 'ios');
                            if (selectedDate) setDate(selectedDate);
                        }}
                    />
                )}
            </View>

            {/* Leased Checkbox (simple toggle for now) */}
            <TouchableOpacity
                style={styles.checkboxContainer}
                onPress={() => setIsLeased(!isLeased)}
            >
                <View style={styles.checkbox}>
                    {isLeased && <View style={styles.checked} />}
                </View>
                <Text>Leased</Text>
            </TouchableOpacity>

            {/* Soil Type Radio Buttons */}
            <View style={styles.section}>
                <Text style={styles.sectionLabel}>Soil Type <Text style={styles.optional}>(optional)</Text></Text>
                {soilOptions.map((option, index) => (
                    <TouchableOpacity
                        key={index}
                        style={styles.radioOption}
                        onPress={() => setSoilType(option)}
                    >
                        <View style={styles.radioCircle}>
                            {soilType === option && <View style={styles.radioDot} />}
                        </View>
                        <Text>{option}</Text>
                    </TouchableOpacity>
                ))}
            </View>

            {/* Irrigation Method */}
            <View style={styles.section}>
                <Text style={styles.sectionLabel}>Irrigation Method <Text style={styles.optional}>(optional)</Text></Text>
                {irrigationOptions.map((option, index) => (
                    <TouchableOpacity
                        key={index}
                        style={styles.radioOption}
                        onPress={() => setIrrigationMethod(option)}
                    >
                        <View style={styles.radioCircle}>
                            {irrigationMethod === option && <View style={styles.radioDot} />}
                        </View>
                        <Text>{option}</Text>
                    </TouchableOpacity>
                ))}
            </View>

            {/* Bottom Buttons */}
            <View style={styles.buttonRow}>
                <TouchableOpacity style={styles.cancelBtn}>
                    <Text style={{ color: 'black' }}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.saveBtn}>
                    <Text style={{ color: 'white' }}>Save</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

export default AddNewCropScreen;


const styles = StyleSheet.create({
    container: {
        padding: 16,
        backgroundColor: '#f4f4f4',
        paddingBottom: 40,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    required: {
        color: 'red',
        marginBottom: 10,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: '600',
        marginVertical: 10,
        color: '#333',
    },
    label: {
        fontSize: 14,
        color: '#333',
        marginBottom: 4,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    halfInput: {
        flex: 1,
        marginRight: 8,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 6,
        padding: 10,
        backgroundColor: '#fff',
    },
    pickerWrapper: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 6,
        backgroundColor: '#fff',
    },
    picker: {
        height: 44,
        width: '100%',
    },
    dateInput: {
        padding: 10,
        backgroundColor: '#fff',
        borderRadius: 6,
        borderWidth: 1,
        borderColor: '#ccc',
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 16,
    },
    checkbox: {
        width: 20,
        height: 20,
        borderWidth: 1,
        borderColor: '#000',
        marginRight: 8,
        alignItems: 'center',
        justifyContent: 'center',
    },
    checked: {
        width: 12,
        height: 12,
        backgroundColor: '#000',
    },
    section: {
        marginTop: 20,
        backgroundColor: '#fff',
        padding: 10,
        borderRadius: 6,
    },
    sectionLabel: {
        fontWeight: '600',
        marginBottom: 10,
        fontSize: 15,
    },
    optional: {
        fontWeight: 'normal',
        fontSize: 13,
        color: 'red',
    },
    radioOption: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    radioCircle: {
        height: 20,
        width: 20,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#333',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 10,
    },
    radioDot: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: '#333',
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 30,
    },
    cancelBtn: {
        flex: 1,
        padding: 14,
        borderRadius: 6,
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#ccc',
        marginRight: 10,
        alignItems: 'center',
    },
    saveBtn: {
        flex: 1,
        padding: 14,
        borderRadius: 6,
        backgroundColor: 'green',
        marginLeft: 10,
        alignItems: 'center',
    },
});
