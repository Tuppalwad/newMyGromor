import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  PermissionsAndroid,
  Platform,
  Image,
  SafeAreaView,
  BackHandler,
  ActivityIndicator,
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import { height, Isplatform_Android, width } from '../../config/resposiveSize';
import { useRoute } from '@react-navigation/native';
import CustomButton from './CustomButton';

const SelectLocationScreen = ({ address, setShowMap, setAddress }) => {
  // const address = useRoute().params?.address;
  const [region, setRegion] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const mapRef = useRef(null);
  useEffect(() => {
    requestLocationPermission();

    const backAction = () => {
      setShowMap(false); // close map instead of navigating back
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction
    );

    return () => backHandler.remove();
  }, []);


  const requestLocationPermission = async () => {
    try {
      setLoading(true);
      setError(null);

      // ✅ If lat/lng exists in address, don't fetch current location
      if (address?.latitude && address?.longitude) {
        setRegion({
          latitude:
            address?.latitude !== 0 ? address?.latitude : 28.6448,
          longitude:
            address?.longitude !== 0
              ? address?.longitude
              : 77.216721,
          latitudeDelta: 0.08,
          longitudeDelta: 0.08,
        })
        setSelectedLocation({
          latitude:
            address?.latitude !== 0 ? address?.latitude : 28.6448,
          longitude:
            address?.longitude !== 0
              ? address?.longitude
              : 77.216721,
        })
        setLoading(false); // Stop loading, since you already have coordinates
        return;
      }

      if (Platform.OS === 'android') {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          getCurrentLocation();
        } else {
          setError('Location permission denied');
          setLoading(false);
        }
      } else {
        getCurrentLocation();
      }
    } catch (err) {
      setError('Error requesting location permission');
      setLoading(false);
    }
    finally {
      setLoading(false);

    }
  };

  const getCurrentLocation = () => {
    Geolocation.getCurrentPosition(
      position => {
        const location = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        };
        setSelectedLocation(location);

        if (mapRef.current) {
          mapRef.current.animateToRegion({
            ...location,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }, 1000);
        }
      },
      error => {
        console.log(error);
      },
      { enableHighAccuracy: false, timeout: 15000, maximumAge: 10000 }
    );
  };


  const handleMapPress = event => {
    const { coordinate } = event.nativeEvent;
    setSelectedLocation(coordinate);
  };

  const handleSave = () => {
    if (selectedLocation) {
      getAddressFromLatLng(selectedLocation.latitude, selectedLocation.longitude)
    }
  };



  const getAddressFromLatLng = async (lat, lng) => {
    try {
      const geocodeURL = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=AIzaSyCq0fPRd6ZESlaPMP_JjVoy6MziX8ndvB8`;

      const response = await fetch(geocodeURL);
      const data = await response.json();

      if (data.status === 'OK' && data.results.length > 0) {
        const fullAddress = data.results[0];
        const formattedAddress = fullAddress.formatted_address;
        const addressParts = formattedAddress.split(',');

        const address1 = addressParts.slice(0, 2).join(',').trim();
        const address2 = addressParts.slice(2).join(',').trim();

        const components = fullAddress.address_components;

        let city = '';
        let state = '';
        let pincode = '';

        components.forEach(component => {
          if (component.types.includes('locality')) {
            city = component.long_name;
          }
          if (component.types.includes('administrative_area_level_1')) {
            state = component.long_name;
          }
          if (component.types.includes('postal_code')) {
            pincode = component.long_name;
          }
        });

        setAddress(prev => ({
          ...prev,
          address1: address1,
          address2: address2,
          city: city,
          state: state,
          pincode: pincode,
          latitude: lat,
          longitude: lng
        }));

        // Optionally close map if you want
        setShowMap(false);

      } else {
        console.error('Geocoding failed:', data.status);
      }
    } catch (error) {
      console.error('Error fetching address:', error);
    }
  };


  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Image
            source={require('../../assets/images/common/locationGreen.png')}
            style={styles.headerIcon}
            resizeMode='contain'
          />
          <Text style={styles.title}>Select Location</Text>
        </View>
        <TouchableOpacity
          style={styles.closeButton}
          onPress={() => setShowMap(false)}
        >
          <Text style={styles.closeButtonText}>X</Text>
        </TouchableOpacity>
      </View>

      {/* Map */}
      <View style={styles.mapContainer}>
        {loading ? (
          <View style={styles.loaderContainer}>
            <ActivityIndicator size="large" color="#2ecc71" />
            <Text style={styles.loadingText}>Loading map...</Text>
          </View>
        ) : error ? (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{error}</Text>
            <TouchableOpacity
              style={styles.retryButton}
              onPress={requestLocationPermission}
            >
              <Text style={styles.retryButtonText}>Retry</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={{ paddingHorizontal: 16, paddingVertical: 10, borderRadius: 10, flex: 1 }}>
            <MapView
              ref={mapRef}
              style={styles.map}
              initialRegion={region}
              onPress={handleMapPress}
              enableZoomControl={true}
              showsMyLocationButton={true}
              followsUserLocation={true}
              showsUserLocation={!Isplatform_Android}
              userLocationPriority={'high'}
              mapType="standard"
            >
              {selectedLocation && (
                <Marker
                  draggable={true}
                  coordinate={selectedLocation}
                />
              )}
            </MapView>

          </View>
        )}
      </View>

      {/* Bottom Buttons */}
      <View style={styles.bottomContainer}>
        <TouchableOpacity
          style={styles.locationButton}
          onPress={getCurrentLocation}
          disabled={loading}
        >
          <Image
            source={require('../../assets/images/common/locationPin.png')}
            style={styles.buttonIcon}
          />
          <Text style={styles.buttonText}>Use my current location</Text>
        </TouchableOpacity>

        <CustomButton
          title="Save"
          onPress={handleSave}
          disabled={!selectedLocation}
          show={false}
        />

      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    marginTop: 30,
    backgroundColor: '#fff',
  },
  header: {
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerIcon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  closeButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#01AD41',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  mapContainer: {
    flex: 1,
    paddingHorizontal: 16,
    marginVertical: 20,
    borderRadius: 10
  },
  map: {
    paddingHorizontal: 16,
    borderRadius: 10,
    ...StyleSheet.absoluteFillObject,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: '#f9f9f9',
  },
  loadingText: {
    marginTop: 10,
    color: '#666',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    padding: 20,
  },
  errorText: {
    color: '#e74c3c',
    marginBottom: 20,
    textAlign: 'center',
  },
  retryButton: {
    backgroundColor: '#2ecc71',
    padding: 12,
    borderRadius: 8,
    minWidth: 100,
  },
  retryButtonText: {
    color: '#fff',
    fontWeight: '600',
    textAlign: 'center',
  },
  bottomContainer: {
    padding: 16,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  locationButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e6f9ed',
    padding: 14,
    borderRadius: 10,
    borderColor: '#2ecc71',
    borderWidth: 1,
    marginBottom: 15,
  },
  buttonText: {
    fontWeight: '600',
    color: '#000',
  },
  buttonIcon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  saveButton: {
    backgroundColor: '#2ecc71',
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: '#95a5a6',
  },
  saveButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default SelectLocationScreen;
