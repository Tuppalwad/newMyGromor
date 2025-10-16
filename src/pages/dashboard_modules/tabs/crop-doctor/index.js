import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
// import { Bell, ShoppingCart } from 'lucide-react-native';
import takePicture from '../../../../assets/images/common/takePicture.png';
import diagnosis from '../../../../assets/images/common/diagnosis.png';
import medicine from '../../../../assets/images/common/medicine.png';
import healthy from '../../../../assets/images/common/healthy.png';
import unhealthy from '../../../../assets/images/common/unhealthy.png';
import arrow from '../../../../assets/images/common/arrow.png';
import CustomButton from '../../../../components/common/CustomButton';
import CustomHeader from '../../../../components/common/CustomHeader';
import rightArrow from '../../../../assets/images/common/rightArrow.png';
import UploadImageModal from './UplodeImageModel';

const CropDoctorScreen = ({navigation}) => {

  const [isModalVisible, setIsModalVisible] = useState(false);
  const historyData = [
    {
      id: 1,
      status: 'Healthy',
      crop: 'Mango',
      date: '06-07-2025',
      image: healthy,
      label: 'Healthy',
    },
    {
      id: 2,
      status: 'Nitrogen Deficiency',
      crop: 'Mango',
      date: '06-07-2025',
      image: unhealthy,
      label: 'Unhealthy',
    },
  ];

  return (
    <View style={styles.container}>
      {/* Header */}
      {/* <View style={styles.header}>
        <Text style={styles.headerTitle}>Crop Doctor</Text>
        <View style={styles.headerIcons}> */}
      {/* <Bell size={20} color="#000" style={styles.icon} /> */}
      {/* <ShoppingCart size={20} color="#000" /> */}
      {/* </View>
      </View> */}
      <CustomHeader
        type="services"
        topTitle="Crop Doctor"
        subtitle=""
        onBackPress={() => navigation.goBack()}
        onCartPress={() => console.log('Cart pressed')}
        onNotificationPress={() => console.log('Notification pressed')}
        style={styles.header}
      />

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Heal Section */}
        <View style={styles.healCard}>
          <Text style={styles.healTitle}>Heal your Crop</Text>

          <View style={styles.stepsRow}>
            <View style={styles.step}>
              <Text style={styles.stepNumber}>STEP 1</Text>
              <Image source={takePicture} style={styles.stepIcon} />
              <Text style={styles.stepText}>Take a Picture</Text>
            </View>
            <Image source={arrow} style={styles.arrow} />
            <View style={styles.step}>
              <Text style={styles.stepNumber}>STEP 2</Text>
              <Image source={diagnosis} style={styles.stepIcon} />
              <Text style={styles.stepText}>See Diagnosis</Text>
            </View>
            <Image source={arrow} style={styles.arrow} />
            <View style={styles.step}>
              <Text style={styles.stepNumber}>STEP 3</Text>
              <Image source={medicine} style={styles.stepIcon} />
              <Text style={styles.stepText}>Get Medicine</Text>
            </View>
          </View>

          {/* <LinearGradient colors={['#4CAF50', '#2E7D32']} style={styles.button}>
            <TouchableOpacity>
              <Text style={styles.buttonText}>Take a Picture</Text>
            </TouchableOpacity>
          </LinearGradient> */}
          <CustomButton
            title="Take a Picture"
            onPress={() => setIsModalVisible(true)}
          />
          <UploadImageModal
        visible={isModalVisible}
        onClose={() => setIsModalVisible(false)} // 👈 close modal
      />
        </View>

        {/* Diagnosis History */}
        <View style={styles.historySection}>
          <Text style={styles.historyTitle}>Diagnosis History</Text>

          {historyData.map((item) => (
            
              <View key={item.id} style={styles.historyCard}>
                <View>
                  <Image source={item.image} style={styles.historyImage} />
                </View>
                <View style={{ flex: 1, justifyContent: 'space-between' }}>
                  <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', marginBottom: 8, gap: 20 }}>

                    <Text style={styles.statusText}>{item.status}</Text>
                    <View
                      style={[
                        styles.statusBadge,
                        {
                          backgroundColor:
                            item.label === 'Healthy' ? '#E8F5E9' : '#FFEBEE',
                          marginLeft: 10,
                        },
                      ]}
                    >
                      <Text
                        style={{
                          color: item.label === 'Healthy' ? '#4CAF50' : '#E53935',
                          fontWeight: '500',
                        }}
                      >
                        {item.label}
                      </Text>
                    </View>
                  </View>
                  <View style={styles.greenUnderline}></View>
                  <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 8 }}>
                    <View style={styles.historyInfo}>
                      <Text style={styles.cropText}>Crop: {item.crop}</Text>
                      <Text style={styles.dateText}>Date: {item.date}</Text>
                    </View>
                    <TouchableOpacity>
                      <Image
                        source={rightArrow}
                        style={{
                          width: 16,
                          height: 16,
                          tintColor: "#000",
                          resizeMode: "contain",
                        }}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default CropDoctorScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F6F8FA' },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  headerTitle: { fontSize: 18, fontWeight: '600', color: '#000' },
  headerIcons: { flexDirection: 'row', gap: 12 },
  healCard: {
    backgroundColor: '#fff',
    margin: 16,
    borderRadius: 4,
    padding: 16,
    elevation: 2,
  },
  healTitle: { fontSize: 16, fontWeight: '600', textAlign: 'center', marginBottom: 16 },
  stepsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    paddingVertical: 10,
  },
  step: { alignItems: 'center', marginHorizontal: 6, paddingHorizontal: 10 },
  stepIcon: { width: 36, height: 32, marginBottom: 10, resizeMode: 'contain' },
  stepNumber: { fontSize: 10, fontWeight: '500', marginBottom: 10, fontStyle: 'italic', color: '#878787' },
  stepText: { fontSize: 12, color: '#000', fontWeight: '400' },
  arrow: { width: 24, height: 43, resizeMode: 'contain' },
  button: {
    borderRadius: 8,
    alignItems: 'center',
    paddingVertical: 12,
  },
  buttonText: { color: '#fff', fontWeight: '600' },
  historySection: { paddingHorizontal: 16, marginBottom: 90 },
  historyTitle: { fontSize: 16, fontWeight: '600', marginBottom: 8 },
  historyCard: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    borderRadius: 12,
    padding: 10,
    alignItems: 'center',
    marginBottom: 12,
    elevation: 1,
  },
  historyImage: { width: 50, height: 50, borderRadius: 8, marginRight: 12 },
  historyInfo: { flex: 1 },
  statusText: { fontSize: 14, fontWeight: '600', color: '#000' },
  cropText: { fontSize: 13, fontWeight: 600, color: '#4E4E4E' },
  dateText: { fontSize: 13, fontWeight: 40, color: '#777' },
  statusBadge: {
    borderRadius: 8,
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#004D25',
    paddingVertical: 12,
  },
  navItem: { color: '#fff', fontSize: 12 },
  greenUnderline: {
    position: 'absolute',
    bottom: 35,
    height: 1,
    backgroundColor: '#01AD41',
    width: '100%',
    justifyContent: 'center'
  },
  activeNav: { color: '#8AE67F', fontWeight: '600' },
});
