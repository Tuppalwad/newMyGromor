import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    Modal,
} from 'react-native';
// import { X } from 'lucide-react-native';
// import { Picker } from '@react-native-picker/picker'; // install: npm install @react-native-picker/picker
import healthy from '../../../../assets/images/common/healthy.png';
import takePicture from '../../../../assets/images/common/takePicture.png';
import LinearGradient from 'react-native-linear-gradient';
import downArrow from '../../../../assets/images/common/downArrow.png'
import close from '../../../../assets/images/common/close.png';
import HealthyCropScreen from './HealthyCropScreen';
import { Screen } from '../../../../router/screen';
import { useNavigation } from '@react-navigation/native';

const CropImageModal = ({ visible, onClose }) => {
    const [selectedCrop, setSelectedCrop] = useState('Mango');
    const [dropdownVisible, setDropdownVisible] = useState(false); // Added missing state
 const navigation= useNavigation();

    return (
        <Modal visible={visible} transparent animationType="fade">
            <View style={styles.overlay}>
                <View style={styles.modalContainer}>
                    {/* Close Button */}
                    <TouchableOpacity style={styles.closeBtn} onPress={onClose}>
                        <Image source={close} style={{width:12, height:12, tintColor: '#000'}} />
                        {/* <X size={20} color="#000" /> */}
                    </TouchableOpacity>

                    {/* Header Icon */}
                    <Image
                        source={takePicture} // replace with your header icon
                        style={styles.headerIcon}
                    />

                    {/* Title */}
                    <Text style={styles.title}>Your crop image</Text>

                    {/* Uploaded Image */}
                    <Image
                        source={healthy} // replace with actual uploaded image
                        style={styles.imagePreview}
                    />

                    {/* Dropdown */}
                    <View style={styles.dropdownContainer}>
                        <Text style={styles.label}>Select Crop</Text>

                        <TouchableOpacity
                            style={styles.pickerWrapper}
                            onPress={() => setDropdownVisible(!dropdownVisible)}
                        >
                        <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                            <Text style={styles.selectedText}>{selectedCrop}</Text>
                            <Image source={downArrow} style={{width: 12, height: 12, tintColor: '#000', resizeMode: 'contain'}} />
                        </View>
                        </TouchableOpacity>
                        {dropdownVisible && (
                            <View style={styles.dropdownList}>
                                {['Mango', 'Tomato', 'Cotton', 'Wheat'].map((crop) => (
                                    <TouchableOpacity
                                        key={crop}
                                        style={styles.dropdownItem}
                                        onPress={() => {
                                            setSelectedCrop(crop);
                                            setDropdownVisible(false);
                                        }}
                                    >
                                        <Text style={{fontSize: 16, fontWeight: '400'}}>{crop}</Text>
                                    </TouchableOpacity>
                                ))}
                            </View>
                        )}
                    </View>


                    {/* Buttons */}
                    <View style={styles.buttonRow}>
                        <TouchableOpacity style={styles.changeBtn} >
                            {/* onPress={onChangeImage} */}
                            <Text style={styles.changeBtnText}>Change Image</Text>
                        </TouchableOpacity>

                        <LinearGradient
                            colors={['#1E8153', '#4EA618']}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                            style={styles.diagnosisBtn}
                        >
                            <TouchableOpacity onPress={()=>navigation.navigate(Screen.HealthyCropScreen)} >

                                <Text style={styles.diagnosisBtnText}>See Diagnosis</Text>
                            </TouchableOpacity>
                        </LinearGradient>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

export default CropImageModal;

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.3)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContainer: {
        width: '85%',
        backgroundColor: '#fff',
        borderRadius: 16,
        padding: 20,
        alignItems: 'center',
        position: 'relative',
    },
    closeBtn: {
        position: 'absolute',
        top: 14,
        right: 14,
    },
    headerIcon: {
        width: 40,
        height: 40,
        marginBottom: 10,
        resizeMode: 'contain',
    },
    title: {
        fontSize: 16,
        fontWeight: '700',
        color: '#000',
        marginBottom: 10,
    },
    imagePreview: {
        width: '100%',
        height: 150,
        borderRadius: 8,
        resizeMode: 'cover',
        marginBottom: 14,
    },
    dropdownContainer: {
        width: '100%',
        marginBottom: 16,
    },
    label: {
        fontSize: 14,
        fontWeight: '600',
        color: '#4E4E4E',
        marginBottom: 4,
    },
    pickerWrapper: {
        borderWidth: 1,
        borderColor: '#B4B4B4',
        borderRadius: 4,
        paddingHorizontal: 10,
        paddingVertical: 8,
        justifyContent: 'center',
        // overflow: 'hidden',
    },
    picker: {
        height: 40,
        color: '#000',
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    changeBtn: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#E57300',
        borderRadius: 4,
        paddingVertical: 10,
        alignItems: 'center',
        marginRight: 8,
    },
    changeBtnText: {
        color: '#E57300',
        fontWeight: '600',
    },
    diagnosisBtn: {
        flex: 1,
        // backgroundColor: '#2E7D32',
        borderRadius: 4,
        paddingVertical: 10,
        alignItems: 'center',
    },
    diagnosisBtnText: {
        color: '#fff',
        fontWeight: '600',
    },
});
