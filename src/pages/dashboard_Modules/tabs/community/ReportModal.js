import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  SafeAreaView,
} from 'react-native';
import { BlurView } from 'expo-blur'; // Optional: for blur effect
import LinearGradient from 'react-native-linear-gradient';

const ReportModal = ({ isVisible, onClose, onSubmit }) => {
  const [selectedOption, setSelectedOption] = React.useState(null);

  const reportOptions = [
    { id: 'nudity', label: 'Nudity' },
    { id: 'unauthorized_sales', label: 'Unauthorized sales' },
    { id: 'spam', label: 'Spam' },
    { id: 'violence', label: 'Violence' },
    { id: 'terrorism', label: 'Terrorism' },
    { id: 'hate_speech', label: 'Hate speech' },
    { id: 'false_information', label: 'False information' },
    { id: 'something_else', label: 'Something else' },
  ];

  const handleSubmit = () => {
    if (selectedOption && onSubmit) {
      onSubmit(selectedOption);
    }
    setSelectedOption(null);
  };

  const handleClose = () => {
    setSelectedOption(null);
    onClose();
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={handleClose}
    >
      <View style={styles.modalContainer}>
        {/* Backdrop */}
        <TouchableOpacity 
          style={styles.backdrop} 
          activeOpacity={1} 
          onPress={handleClose}
        />
        
        {/* Modal Content */}
        <View style={styles.modalContent}>
          <View style={styles.handle} />
          
          <Text style={styles.title}>Report</Text>
          
          {/* Report Options */}
          <View style={styles.optionsContainer}>
            {reportOptions.map((option) => (
              <TouchableOpacity
                key={option.id}
                style={[
                  styles.option,
                  selectedOption === option.id && styles.optionSelected
                ]}
                onPress={() => setSelectedOption(option.id)}
              >
                <View style={styles.checkbox}>
                  {selectedOption === option.id && (
                    <View style={styles.checkboxSelected} />
                  )}
                </View>
                <Text style={styles.optionText}>{option.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
          
          {/* Action Buttons */}
          <View style={styles.actionsContainer}>
            <TouchableOpacity 
              style={[styles.button, styles.cancelButton]} 
              onPress={handleClose}
            >
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[
                styles.button
              ]} 
              onPress={handleSubmit}
              disabled={!selectedOption}
            >
                 <LinearGradient
                                        colors={['#1E8153', '#4EA618']}
                                        start={{ x: 0, y: 0 }}
                                        end={{ x: 1, y: 0 }}
                                        style={{ padding: 10, borderRadius: 4, flexDirection: 'row', gap: 6, alignItems: 'center', width: 160, justifyContent: 'center', height: 45 }}
                                    >

              <Text style={styles.submitButtonText}>Submit</Text>
                                    </LinearGradient>
            </TouchableOpacity>
          </View>
          
          {/* Safe area for devices with notches */}
          <SafeAreaView style={styles.safeArea} />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 10,
    maxHeight: '80%',
  },
  handle: {
    width: 40,
    height: 4,
    backgroundColor: '#E5E5E5',
    borderRadius: 2,
    alignSelf: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#000',
  },
  optionsContainer: {
    marginBottom: 20,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderRadius: 8,
    marginBottom: 4,
  },
  optionSelected: {
    backgroundColor: '#F0F8FF',
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#E5E5E5',
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxSelected: {
    width: 12,
    height: 12,
    borderRadius: 2,
    backgroundColor: '#007AFF',
  },
  optionText: {
    fontSize: 16,
    color: '#000',
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  button: {
    flex: 1,
    // paddingVertical: 5,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelButton: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#D6752D',
  },
  submitButtonDisabled: {
    backgroundColor: '#C7C7CC',
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#D6752D',
  },
  submitButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: 'white',
  },
  safeArea: {
    backgroundColor: 'white',
  },
});

export default ReportModal;