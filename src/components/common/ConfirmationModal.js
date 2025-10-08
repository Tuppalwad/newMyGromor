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
        backgroundColor: 'rgba(0,0,0,0.3)', // Optional: slight dim background
        alignItems: 'center',
    },
    modalContainer: {
        position: 'absolute',
        bottom: -30,
        // width: width - 32,
        backgroundColor: '#fff',
        paddingHorizontal: 20,
        paddingVertical: 30,
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
        alignItems: 'center',

        // Top shadow
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.2,
        shadowRadius: 6,
        // elevation: 10, // for Android
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
        justifyContent: 'center',
        alignItems: 'center',
    },
    cancelText: {
        color: '#F36D45',
        fontWeight: '600',
    },
});
