import { StyleSheet, Text, View, ScrollView, SafeAreaView } from 'react-native';
import React from 'react';
import CustomHeader from '../../component/common/CustomHeader';
// Import your custom components: SearchBar, Slider, ServiceCard, FooterBar, etc.

const HomeScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      {/* Top Weather Strip */}
      <View style={styles.weatherStrip}>
        <Text style={styles.weatherText}>31°C  Partly cloudy and light winds</Text>
        <Text style={styles.weatherLink}>View</Text>
      </View>

      {/* Header */}
      <CustomHeader
        type="home"
        welcomeText="Ramachandra"
        onMenuPress={() => console.log('Menu pressed')}
        onCartPress={() => console.log('Cart pressed')}
        onNotificationPress={() => console.log('Notification pressed')}
        onSearch={(text) => console.log('Search:', text)}
      />

      <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>
        {/* Slider */}
        <View style={styles.sliderContainer}>
          <Text>Slider Component Here</Text>
          {/* Replace with your Slider component */}
        </View>

        {/* Service Section */}
        <View style={styles.servicesContainer}>
          <Text>Services Grid (Buy Products, Spraying, Delivery, etc.)</Text>
          {/* Create a ServiceGrid component */}
        </View>

        {/* Any Other Sections */}
      </ScrollView>

      {/* Bottom Footer */}
      <View style={styles.footerBar}>
        <Text>Store Code: S0584 | Mana Gromor Centre Akola ▼</Text>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  weatherStrip: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 16,
    paddingVertical: 6,
  },
  weatherText: {
    fontSize: 12,
    color: '#333',
  },
  weatherLink: {
    fontSize: 12,
    color: '#0A8F43',
    fontWeight: '500',
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 16,
  },
  sliderContainer: {
    marginTop: 16,
  },
  servicesContainer: {
    marginTop: 24,
  },
  footerBar: {
    padding: 10,
    borderTopWidth: 1,
    borderColor: '#ddd',
    alignItems: 'center',
  },
});
