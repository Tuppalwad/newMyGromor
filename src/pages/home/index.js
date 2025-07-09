import { StyleSheet, Text, View, ScrollView, SafeAreaView, TextInput, Image } from 'react-native';
import React from 'react';
import CustomHeader from '../../component/common/CustomHeader';
import Slider from '../../component/Slider';
import { useNavigation } from '@react-navigation/native';
import ServiceCard from '../../component/home/ServiceCard';
import searchIcon from '../../assets/images/splash/search.png'
// Import your custom components: SearchBar, Slider, ServiceCard, FooterBar, etc.

const HomeScreen = () => {
  const navigation = useNavigation();

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
      // onSearch={(text) => console.log('Search:', text)}
      />

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <TextInput
          placeholder="Search for Seeds"
          placeholderTextColor="#999"
          style={styles.searchInput}
        // onChangeText={onSearch}
        />
        <Image source={searchIcon} style={styles.searchIcon} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>
        {/* Slider */}
        <View style={styles.sliderContainer}>
          {/* <Text>Slider Component Here</Text> */}
          <Slider />
          {/* Replace with your Slider component */}
        </View>

        {/* Service Section */}
        <View style={styles.servicesContainer}>
          <Text>Services Grid (Buy Products, Spraying, Delivery, etc.)</Text>
          <ServiceCard
            title="Shop"
            icon={''}
            onPress={() => navigation.navigate('ShopScreen')}
          />
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
    alignItems: 'center',      // vertically center content
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 16,
    paddingVertical: 8,        // increased padding
    height: 40,                // increased height (adjust as needed)
  },
  weatherText: {
    fontSize: 12,
    color: '#333',
    lineHeight: 10
  },
  weatherLink: {
    fontSize: 12,
    color: '#0A8F43',
    fontWeight: '500',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    marginHorizontal: 16,
    marginBottom: 8,
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 40,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: '#333',
  },
  searchIcon: {
    width: 16,
    height: 16,
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
