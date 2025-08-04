import React from 'react';
import {
    Modal,
    View,
    Text,
    TouchableOpacity,
    Image,
    StyleSheet,
    Dimensions,
} from 'react-native';
import WarningIcon from '../../assets/images/common/warningIcon.png'; // Adjust path as needed
import CustomButton from './CustomButton';

const { width } = Dimensions.get('window');

const ConfirmationModal = ({
    visible,
    title = 'Confirm',
    subtitle = 'Are you sure you want to continue this payment?',
    icon = WarningIcon,
    onCancel,
    onConfirm,
    position = 'bottom', // 'bottom' or 'center'
}) => {
    const overlayPositionStyle = {
        justifyContent: position === 'center' ? 'center' : 'flex-end',
    };

    return (
        <Modal
            transparent
            animationType="slide"
            visible={visible}
            onRequestClose={onCancel}
        >
            <View style={[styles.overlay, overlayPositionStyle]}>
                <View style={styles.modalContainer}>
                    <Image source={icon} style={styles.icon} />
                    <Text style={styles.title}>{title}</Text>
                    <Text style={styles.subtitle}>{subtitle}</Text>
                    <View style={styles.buttonContainer}>
                        <View style={{ width: '48%' }}>
                            <TouchableOpacity style={styles.cancelButton} onPress={onCancel}>
                                <Text style={styles.cancelText}>Cancel</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={{ width: '48%' }}>

                            <CustomButton
                                title={"Confirm"}
                                onPress={onConfirm}
                                show={false}
                            />
                        </View>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

export default ConfirmationModal;

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        paddingHorizontal: 16,
    },
    modalContainer: {
        backgroundColor: '#fff',
        // padding: 20,
        paddingHorizontal: 20,
        paddingVertical: 30,
        borderRadius: 16,
        alignItems: 'center',
    },
    icon: {
        width: 32,
        height: 32,
        marginBottom: 12,
    },
    title: {
        fontSize: 18,
        fontWeight: '700',
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 14,
        color: '#555',
        textAlign: 'center',
        marginBottom: 30,
    },
    buttonContainer: {
        flexDirection: 'row',
        gap: 12,
    },
    cancelButton: {
        borderWidth: 1,
        borderColor: '#F36D45',
        borderRadius: 8,
        paddingVertical: 10,
        justifyContent:'center',
        alignItems:'center',
        textAlign:'center'
    },
    cancelText: {
        color: '#F36D45',
        fontWeight: '600',
    },
    confirmButton: {
        backgroundColor: '#30C45A',
        borderRadius: 8,
        paddingVertical: 10,
        paddingHorizontal: 20,
    },
    confirmText: {
        color: '#fff',
        fontWeight: '600',
    },
});
