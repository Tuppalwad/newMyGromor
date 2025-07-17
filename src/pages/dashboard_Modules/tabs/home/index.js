import { StyleSheet, Text, View, ScrollView, SafeAreaView, TextInput, Image, FlatList, Dimensions } from 'react-native';
import React from 'react';
import CustomHeader from '../../../../components/common/CustomHeader';
import Slider from '../../../../components/Slider';
import { useNavigation } from '@react-navigation/native';
import ServiceCard from '../../../../components/home/ServiceCard';
import searchIcon from '../../../../assets/images/splash/search.png'
// Import your custom components: SearchBar, Slider, ServiceCard, FooterBar, etc.
import Weather from '../../../../assets/images/common/Weather.png';
import RightArrow from '../../../../assets/images/common/rightArrow.png';
import LinearGradient from 'react-native-linear-gradient';
const services = [
  { title: 'Buy Products', screen: 'ShopScreen' },
  { title: 'Spraying Services', screen: '' },
  { title: 'Door Delivery', screen: '' },
  { title: 'Gromor Store', screen: '' },
  { title: 'Crop Doctor', screen: '' },
  { title: 'My Crop Advisory', screen: '' },
  { title: 'Ask the Experts', screen: '' },
  { title: 'Agri Video', screen: 'AgriVideo' },
  { title: 'Fertilizer Calculator', screen: '' },
];

const numColumns = 3;
const screenWidth = Dimensions.get('window').width;
const itemSize = screenWidth / numColumns;


const HomeScreen = () => {
  const navigation = useNavigation();

  const renderItem = ({ item }) => (
    <View style={styles.cardWrapper}>
      <ServiceCard
        title={item.title}
        icon={''}
        onPress={() => item.screen && navigation.navigate(item.screen)}
      />
    </View>
  );
  return (
    <SafeAreaView style={styles.container}>
      {/* Top Weather Strip */}
      <LinearGradient
        colors={['#f1e096ff', '#FFFFFF']}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={styles.container}
      >
        <View style={styles.weatherStrip}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Image source={Weather} style={{ width: 16, height: 16, marginRight: 4 }} resizeMode='contain' />
            <Text style={styles.weatherText}> 31°C  Partly cloudy and light winds</Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={styles.weatherLink}>View</Text>
            <Image source={RightArrow} style={{ width: 8, height: 8, marginLeft: 4, tintColor: '#6AB42D' }} resizeMode='contain' />
          </View>
        </View>

        {/* Header */}
        <CustomHeader
          type="home"
          welcomeText="Ramachandra"
          onMenuPress={() => navigation.openDrawer()}
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
            <Slider />
          </View>

          {/* Service Section */}
          <FlatList
            data={services}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
            numColumns={numColumns}
            contentContainerStyle={styles.servicesContainer}
          />

          {/* Any Other Sections */}
        </ScrollView>

        {/* Bottom Footer */}
        <View style={styles.footerBar}>
          <Text>Store Code: S0584 | Mana Gromor Centre Akola ▼</Text>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#fff',
  },
  weatherStrip: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',      // vertically center content
    // backgroundColor: '#f5f5f5',
    paddingVertical: 8,        // increased padding
    height: 40,
    paddingHorizontal: 16,
  },
  servicesContainer: {
    marginTop: 24,
  },
  cardWrapper: {
    width: itemSize,
    // padding: 10,
    alignItems: 'center',
  },
  weatherText: {
    fontSize: 12,
    color: '#333',
    lineHeight: 10
  },
  weatherLink: {
    fontSize: 12,
    color: '#6AB42D',
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
    paddingVertical: 8,
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
    // paddingHorizontal: 16,
  },
  sliderContainer: {
    marginTop: 16,
  },

  footerBar: {
    padding: 10,
    borderTopWidth: 1,
    borderColor: '#ddd',
    alignItems: 'center',
    backgroundColor: '#DAFDE7'
  },
});
