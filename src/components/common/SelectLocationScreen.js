import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  PermissionsAndroid,
  Platform
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';

const SelectLocationScreen = () => {
  const [location, setLocation] = useState({
    latitude: 19.18,
    longitude: 78.68,
    latitudeDelta: 0.05,
    longitudeDelta: 0.05,
  });

  useEffect(() => {
    requestLocationPermission();
  }, []);

  const requestLocationPermission = async () => {
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        getCurrentLocation();
      }
    } else {
      getCurrentLocation();
    }
  };

  const getCurrentLocation = () => {
    Geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          ...location,
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      (error) => {
        console.warn(error.message);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  };

  const onMapPress = (e) => {
    const coords = e.nativeEvent.coordinate;
    setLocation({
      ...location,
      latitude: coords.latitude,
      longitude: coords.longitude,
    });
  };

  const handleSave = () => {
    console.log('Selected LatLong:', location.latitude, location.longitude);
    // You can pass this data to parent or store in global state
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>📍 Select Location</Text>

      <MapView
        style={styles.map}
        region={location}
        onPress={onMapPress}
      >
        <Marker coordinate={location} />
      </MapView>

      <TouchableOpacity style={styles.locationButton} onPress={getCurrentLocation}>
        <Text style={styles.buttonText}>📍 Use my current location</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.buttonText}>Save</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SelectLocationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff'
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
    textAlign: 'center',
  },
  map: {
    width: '100%',
    height: '65%',
    borderRadius: 10,
  },
  locationButton: {
    backgroundColor: '#e6f9ed',
    padding: 12,
    borderRadius: 10,
    marginTop: 15,
    borderColor: '#2ecc71',
    borderWidth: 1,
  },
  saveButton: {
    backgroundColor: '#2ecc71',
    padding: 14,
    borderRadius: 10,
    marginTop: 10,
  },
  buttonText: {
    textAlign: 'center',
    color: '#000',
    fontWeight: '600',
  },
});
