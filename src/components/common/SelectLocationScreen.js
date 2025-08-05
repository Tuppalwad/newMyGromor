import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  PermissionsAndroid,
  Platform,
  Image,
  SafeAreaView,
  Alert,
} from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';

import LocationIcon from '../../assets/images/common/locationGreen.png';
import locationPin from '../../assets/images/common/locationPin.png';
import { HEToast } from '../toast';
import CustomButton from './CustomButton';


const SelectLocationScreen = ({ navigation }) => {
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    requestLocationPermission();
  }, []);

  const requestLocationPermission = async () => {
    try {
      if (Platform.OS === 'android') {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          getCurrentLocation();
        } else {
          Alert.alert('Permission Denied', 'Location permission is required.');
          setLoading(false);
        }
      } else {
        getCurrentLocation();
      }
    } catch (err) {
      console.warn(err);
      setLoading(false);
    }
  };

  const getCurrentLocation = () => {
    Geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setLocation({
          latitude,
          longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        });
        setLoading(false);
      },
      (error) => {
        console.warn(error.message);
        // Alert.alert('Error', 'Could not fetch location.');
        HEToast("Could not fetch location.", "error")
        setLoading(false);
      },
      { enableHighAccuracy: false, timeout: 15000, maximumAge: 10000 }
    );
  };

  const onMapPress = (e) => {
    const coords = e.nativeEvent.coordinate;
    setLocation((prev) => ({
      ...prev,
      latitude: coords?.latitude,
      longitude: coords?.longitude,
    }));
  };

  const onMarkerDragEnd = (e) => {
    const coords = e.nativeEvent.coordinate;
    setLocation((prev) => ({
      ...prev,
      latitude: coords?.latitude,
      longitude: coords?.longitude,
    }));
  };

  const handleSave = () => {
    if (location) {
      console.log('Selected LatLong:', location?.latitude, location?.longitude);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Image source={LocationIcon} style={styles.headerIcon} />
          <Text style={styles.title}>Select Location</Text>
        </View>
        <TouchableOpacity style={styles.closeButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={{ color: '#fff', fontWeight: 'bold' }}>X</Text>
        </TouchableOpacity>
      </View>

      {/* Map */}
      <View style={styles.mapContainer}>
        {!loading && location ? (
          <MapView
            style={styles.map}
            region={location}
            onPress={onMapPress}
            provider={Platform.OS === 'android' ? PROVIDER_GOOGLE : undefined}
            showsUserLocation
            showsMyLocationButton
            loadingEnabled
          >
            <Marker
              coordinate={location}
              draggable
              onDragEnd={onMarkerDragEnd}
            />
          </MapView>
        ) : (
          <View style={styles.loaderContainer}>
            <Text>Loading map...</Text>
          </View>
        )}
      </View>

      {/* Bottom Buttons */}
      <View style={styles.bottomButtons}>
        <TouchableOpacity style={styles.locationButton} onPress={getCurrentLocation}>
          <Image source={locationPin} style={styles.buttonIcon} />
          <Text style={styles.buttonText}>Use my current location</Text>
        </TouchableOpacity>

        <CustomButton
          title={"Save"}
          onPress={() => { }}
          show={false}
          disabled={false}
        />

      </View>
    </SafeAreaView>
  );
};

export default SelectLocationScreen;


const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: 34
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerIcon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
    marginRight: 6,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
  },
  closeButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#01AD41',
    justifyContent: 'center',
    alignItems: 'center',
  },
  mapContainer: {
    flex: 1,
    paddingHorizontal: 16,
    marginTop: 10,
  },
  map: {
    flex: 1,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomButtons: {

    position: 'absolute',
    bottom: 20,
    left: 16,
    right: 16,
  },
  locationButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e6f9ed',
    padding: 12,
    borderRadius: 10,
    borderColor: '#2ecc71',
    borderWidth: 1,
    marginBottom: 10,
  },
  saveButton: {
    backgroundColor: '#2ecc71',
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    fontWeight: '600',
    color: '#000',
  },
  buttonIcon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
    marginRight: 10,
  },
});
