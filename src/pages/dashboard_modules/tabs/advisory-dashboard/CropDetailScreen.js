// src/screens/MangoCropScreen.js
import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  Image
} from 'react-native';
// import Icon from 'react-native-vector-icons/MaterialIcons';
// import IconFA from 'react-native-vector-icons/FontAwesome';
import mango from '../../../../assets/images/common/mango.png'
import calender from '../../../../assets/images/common/calender.png'
const CropDetailScreen = () => {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      
      
      {/* custom header here  */}

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
      <View style={styles.headerRow}>
        <Text style={styles.headerText}>In your “My Crop”</Text>
        <TouchableOpacity>
          <Text style={styles.summaryText}>View Summary ➜</Text>
      </TouchableOpacity>
      </View>

      {/* Card */}
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Image
            source={mango} // <-- Update your image path
            style={styles.image}
          />
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Mango</Text>
            <Text style={styles.subTitle}>Sowing Details</Text>
          </View>
        </View>

        {/* Details */}
        <View style={styles.details}>
          <View style={styles.row}>
            <Image source={calender} />
            <Text style={styles.detailText}>07 Apr 2025</Text>
          </View>
          <View style={styles.row}>
            <FontAwesome5 name="seedling" size={16} color="#00A86B" />
            <Text style={styles.detailText}>Irrigation Stage</Text>
          </View>
          <View style={styles.row}>
            <FontAwesome name="square" size={16} color="#00A86B" />
            <Text style={styles.detailText}>2 acres</Text>
          </View>
          <View style={styles.row}>
            <MaterialIcons name="water-damage" size={18} color="#00A86B" />
            <Text style={styles.detailText}>Flood Irrigation</Text>
          </View>
        </View>
        </View>

        {/* Divider */}
        <View style={styles.divider} />

        {/* Planning & Preparation Section */}
        <View style={styles.section}>
          <Text style={styles.sectionMainTitle}>Planning & Preparation</Text>
          
          {/* Introduction */}
          <View style={styles.subSection}>
            <Text style={styles.subSectionTitle}>Introduction</Text>
            <View style={styles.methodCard}>
              <Text style={styles.methodTitle}>Mango cultivation method</Text>
            </View>
          </View>

          {/* Planting Method */}
          <View style={styles.subSection}>
            <View style={styles.methodHeader}>
              <Text style={styles.methodTitle}>Planting method</Text>
              {/* <Icon name="check-circle" size={20} color="#4CAF50" /> */}
            </View>
            <View style={styles.iconsRow}>
              {/* <Icon name="favorite" size={20} color="#ff6b6b" style={styles.methodIcon} /> */}
              {/* <Icon name="favorite" size={20} color="#ff6b6b" style={styles.methodIcon} /> */}
              {/* <Icon name="favorite" size={20} color="#ff6b6b" style={styles.methodIcon} /> */}
              {/* <Icon name="favorite" size={20} color="#ff6b6b" style={styles.methodIcon} /> */}
              {/* <Icon name="favorite" size={20} color="#ff6b6b" style={styles.methodIcon} /> */}
            </View>
          </View>

          {/* Nutrient & Growth Management */}
          <View style={styles.subSection}>
            <Text style={styles.sectionSubTitle}>Nutrient & Growth Management</Text>
            
            {/* Nutrient Management */}
            <View style={styles.methodCard}>
              <View style={styles.methodHeader}>
                <Text style={styles.methodTitle}>Nutrient Management</Text>
                {/* <Icon name="check-circle" size={20} color="#4CAF50" /> */}
              </View>
              <View style={styles.iconsRow}>
                {/* <Icon name="favorite" size={20} color="#ff6b6b" style={styles.methodIcon} /> */}
                {/* <Icon name="favorite" size={20} color="#ff6b6b" style={styles.methodIcon} /> */}
                {/* <Icon name="favorite" size={20} color="#ff6b6b" style={styles.methodIcon} /> */}
                {/* <Icon name="favorite" size={20} color="#ff6b6b" style={styles.methodIcon} /> */}
              </View>
            </View>

            {/* Nutrient Deficiency */}
            <View style={styles.methodCard}>
              <View style={styles.methodHeader}>
                <Text style={styles.methodTitle}>Nutrient deficiency symptoms and their management</Text>
                {/* <Icon name="check-circle" size={20} color="#4CAF50" /> */}
              </View>
              <View style={styles.iconsRow}>
                {/* <Icon name="favorite" size={20} color="#ff6b6b" style={styles.methodIcon} /> */}
                {/* <Icon name="favorite" size={20} color="#ff6b6b" style={styles.methodIcon} /> */}
                {/* <Icon name="favorite" size={20} color="#ff6b6b" style={styles.methodIcon} /> */}
                {/* <Icon name="favorite" size={20} color="#ff6b6b" style={styles.methodIcon} /> */}
              </View>
            </View>
          </View>

          {/* Protection & Health */}
          <View style={styles.subSection}>
            <Text style={styles.sectionSubTitle}>Protection & Health</Text>
            
            {/* Plant Protection */}
            <View style={styles.methodCard}>
              <View style={styles.methodHeader}>
                <Text style={styles.methodTitle}>Plant protection control in mango</Text>
                {/* <Icon name="check-circle" size={20} color="#4CAF50" /> */}
              </View>
              <View style={styles.iconsRow}>
                {/* <Icon name="favorite" size={20} color="#ff6b6b" style={styles.methodIcon} /> */}
                {/* <Icon name="favorite" size={20} color="#ff6b6b" style={styles.methodIcon} /> */}
                {/* <Icon name="favorite" size={20} color="#ff6b6b" style={styles.methodIcon} /> */}
                {/* <Icon name="favorite" size={20} color="#ff6b6b" style={styles.methodIcon} /> */}
              </View>
            </View>

            {/* Pest Management */}
            <View style={styles.methodCard}>
              <View style={styles.methodHeader}>
                <Text style={styles.methodTitle}>Pest management</Text>
                {/* <Icon name="check-circle" size={20} color="#4CAF50" /> */}
              </View>
              <View style={styles.iconsRow}>
                {/* <Icon name="favorite" size={20} color="#ff6b6b" style={styles.methodIcon} /> */}
                {/* <Icon name="favorite" size={20} color="#ff6b6b" style={styles.methodIcon} /> */}
                {/* <Icon name="favorite" size={20} color="#ff6b6b" style={styles.methodIcon} /> */}
                {/* <Icon name="favorite" size={20} color="#ff6b6b" style={styles.methodIcon} /> */}
              </View>
            </View>

            {/* Disease Management */}
            <View style={styles.methodCard}>
              <View style={styles.methodHeader}>
                <Text style={styles.methodTitle}>Disease Management</Text>
                {/* <Icon name="check-circle" size={20} color="#4CAF50" /> */}
              </View>
              <View style={styles.iconsRow}>
                {/* <Icon name="favorite" size={20} color="#ff6b6b" style={styles.methodIcon} /> */}
                {/* <Icon name="favorite" size={20} color="#ff6b6b" style={styles.methodIcon} /> */}
              </View>
            </View>
          </View>

        </View>

        {/* Bottom Spacing */}
        <View style={styles.bottomSpacing} />

      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  placeholder: {
    width: 24,
  },
  scrollView: {
    flex: 1,
  },
  banner: {
    backgroundColor: '#e8f5e8',
    margin: 20,
    borderRadius: 12,
    padding: 16,
  },
  bannerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  bannerTitle: {
    fontSize: 16,
    color: '#2e7d32',
    fontWeight: '500',
  },
  summaryButton: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  summaryButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
  },
  section: {
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  sectionMainTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  sectionSubTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 16,
    marginTop: 8,
  },
  detailsCard: {
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    padding: 16,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
  },
  detailRowLast: {
    borderBottomWidth: 0,
  },
  detailLabel: {
    fontSize: 16,
    color: '#666',
    flex: 1,
  },
  detailValue: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    justifyContent: 'flex-end',
  },
  detailText: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
    marginLeft: 8,
  },
  divider: {
    height: 8,
    backgroundColor: '#f1f3f4',
    marginVertical: 20,
  },
  subSection: {
    marginBottom: 24,
  },
  subSectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
  },
  methodCard: {
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  methodHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  methodTitle: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
    flex: 1,
    marginRight: 12,
  },
  iconsRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  methodIcon: {
    marginRight: 12,
  },
  bottomSpacing: {
    height: 20,
  },
});

export default CropDetailScreen;