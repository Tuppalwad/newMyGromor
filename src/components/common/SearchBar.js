import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  Image,
  Animated,
  Text,
  TouchableOpacity,
} from 'react-native';
import searchIcon from '../../assets/images/splash/search.png';
import { useSelector } from 'react-redux';

const SearchBar = ({ onChangeText, value, onPressFilter }) => {
  const placeholderItems = ['seeds', 'Potato', 'Onion'];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [text, setText] = useState('');
  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const interval = setInterval(() => {
      if (text.length === 0) {
        Animated.timing(animatedValue, {
          toValue: -20,
          duration: 400,
          useNativeDriver: true,
        }).start(() => {
          setCurrentIndex(prev => (prev + 1) % placeholderItems.length);
          animatedValue.setValue(0); // Reset after animation
        });
      }
    }, 2500);

    return () => clearInterval(interval);
  }, [text]);

  const handleTextChange = (inputText) => {
    setText(inputText);
    onChangeText?.(inputText);
  };
  const appLanguages = useSelector(state => state.user.appMultiLanguage);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        onChangeText={handleTextChange}
        value={value}
        placeholder=""
        placeholderTextColor="#999"
      />
      {text.length === 0 && (
        <View style={styles.placeholderWrapper}>
          <Text style={styles.staticText}>{appLanguages.search_for ?? "Search for"}</Text>
          <View style={styles.animatedWrapper}>
            <Animated.View
              style={{
                transform: [{ translateY: animatedValue }],
              }}
            >
              <Text style={styles.animatedText}>
                {placeholderItems[currentIndex]}
              </Text>
              <Text style={styles.animatedText}>
                {placeholderItems[(currentIndex + 1) % placeholderItems.length]}
              </Text>
            </Animated.View>
          </View>
        </View>
      )}
      <TouchableOpacity onPress={onPressFilter} >
        <Image source={searchIcon} style={styles.icon} />
      </TouchableOpacity>
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    paddingVertical: 12,
  },
  input: {
    flex: 1,
    fontSize: 14,
    color: '#333',
    paddingHorizontal: 16,
    paddingVertical: 5,
  },
  placeholderWrapper: {
    position: 'absolute',
    left: 24,
    top: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  staticText: {
    marginLeft: 5,
    fontSize: 14,
    color: '#999',
  },
  animatedWrapper: {
    height: 20,
    overflow: 'hidden',
  },
  animatedText: {
    fontSize: 14,
    color: '#333',
    fontWeight: '600',
    lineHeight: 20,
  },
  icon: {
    width: 16,
    height: 16,
    marginRight: 10,
    tintColor: 'green',
  },
});
