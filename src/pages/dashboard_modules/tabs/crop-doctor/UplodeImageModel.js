import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Modal } from 'react-native';
import camera from '../../../../assets/images/common/camera.png'; 
import gallery from '../../../../assets/images/common/galleryUplode.png';
import takePicture from '../../../../assets/images/common/takePicture.png';
import close from '../../../../assets/images/common/close.png';
import CropImageModal from './CropImageModel';

const UploadImageModal = ({ visible, onClose }) => {
  const [isCropModalVisible, setIsCropModalVisible] = useState(false);

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          {/* Close Button */}
          <TouchableOpacity style={styles.closeBtn} onPress={onClose}>
            <Image source={close} style={{ tintColor: '#000', width: 12, height: 12 }} />
          </TouchableOpacity>

          {/* Icon */}
          <Image source={takePicture} style={styles.icon} />

          {/* Title */}
          <Text style={styles.title}>Upload your crop image</Text>
          <Text style={styles.subtitle}>Please ensure the file size is maximum</Text>
          <Text style={styles.boldText}>5MB</Text>

          {/* Buttons */}
          <View style={styles.optionContainer}>
            <TouchableOpacity
              style={styles.optionBox}
              onPress={() => setIsCropModalVisible(true)}>
              <Image source={camera} style={styles.optionIcon} />
              <Text style={styles.optionText}>Camera</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.optionBox}
              onPress={() => setIsCropModalVisible(true)}>
              <Image source={gallery} style={styles.optionIcon} />
              <Text style={styles.optionText}>Gallery</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* ✅ Only one instance of CropImageModal */}
      <CropImageModal
        visible={isCropModalVisible}
        onClose={() => setIsCropModalVisible(false)}
      />
    </Modal>
  );
};

export default UploadImageModal;

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
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    padding: 20,
    alignItems: 'center',
    position: 'relative',
  },
  closeBtn: {
    position: 'absolute',
    top: 14,
    right: 14,
  },
  icon: {
    width: 32,
    height: 32,
    marginBottom: 12,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#000',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: '400',
    color: '#1D2125',
    textAlign: 'center',
},
boldText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#000',
    marginBottom: 20,
  },
  optionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
  },
  optionBox: {
    flex: 1,
    backgroundColor: '#F2F8F4',
    borderRadius: 4,
    alignItems: 'center',
    paddingVertical: 20,
    marginHorizontal: 6,
  },
  optionIcon: {
    width: 34,
    height: 34,
    marginBottom: 10,
    resizeMode: 'contain',
  },
  optionText: {
    fontSize: 13,
    color: '#000',
    fontWeight: '600',
  },
});
