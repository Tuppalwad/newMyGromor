import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet, FlatList } from 'react-native';
// import { Ionicons } from '@expo/vector-icons'; // or use any icon package

const SortModal = ({ modalVisible, setModalVisible }) => {
  const [selectedSort, setSelectedSort] = useState('Popular');
  const appLanguages = useSelector(state => state.user.appMultiLanguage);

  const sortOptions = [
    'Newest',
    'Popular',
    'Price - Low to High',
    'Price - High to Low',
    'Top Selling',
  ];

  const handleSelect = (option) => {
    setSelectedSort(option);
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <Modal
        transparent
        animationType="slide"
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableOpacity style={styles.overlay} onPress={() => setModalVisible(false)} />

        <View style={styles.modalView}>

          <View style={styles.header}>
            <View></View>
            <View style={{ flexDirection: 'column', alignItems: 'center' }}>
              <Text style={styles.title}>{appLanguages.filter ?? "Filter"}</Text>
              <TouchableOpacity>
                <Text style={styles.clearAll}>{appLanguages.reset ?? "Reset"}</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Text style={styles.close}>✕</Text>
            </TouchableOpacity>
          </View>


          {sortOptions.map((option, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.option,
                selectedSort === option && styles.selectedOption,
              ]}
              onPress={() => handleSelect(option)}
            >
              <Text style={[
                styles.optionText,
                selectedSort === option && styles.selectedText,
              ]}>
                {option}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </Modal>
    </View>
  );
};

export default SortModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  close: {
    fontSize: 12,
    lineHeight: 10,
    fontWeight: 600,
    position: 'relative',
    marginTop: -20,
    padding: 10
  },
  clearAll: {
    color: '#0A8F43',
    marginTop: 8,
    fontSize: 14
  },
  openButton: {
    backgroundColor: '#6200ee',
    padding: 12,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
  },
  overlay: {
    flex: 1,
    backgroundColor: '#00000066',
  },
  modalView: {
    backgroundColor: 'white',
    padding: 16,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    maxHeight: '60%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 30,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
  },
  reset: {
    color: 'green',
    marginVertical: 12,
    fontWeight: '500',
  },
  option: {
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderRadius: 8,
  },
  selectedOption: {
    backgroundColor: '#ccf7dd',
  },
  optionText: {
    fontSize: 16,
  },
  selectedText: {
    fontWeight: 'bold',
  },
});
