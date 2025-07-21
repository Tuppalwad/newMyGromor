import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ProgressCircle = ({ average = 0, size = 100, strokeWidth = 10 }) => {
  const percentage = Math.min(average / 5, 1); // out of 5
  const rotation = percentage * 360;

  return (
    <View style={[styles.container, { width: size, height: size }]}>
      {/* Outer circle */}
      <View style={[styles.backgroundCircle, {
        width: size,
        height: size,
        borderRadius: size / 2,
        borderWidth: strokeWidth,
      }]} />

      {/* Progress (half-circle masking trick) */}
      <View style={[
        styles.progressContainer,
        {
          width: size,
          height: size,
        },
      ]}>
        <View style={[
          styles.leftHalf,
          {
            width: size,
            height: size,
            borderRadius: size / 2,
            borderWidth: strokeWidth,
          }
        ]} />
        <View style={[
          styles.rightHalf,
          {
            width: size,
            height: size,
            borderRadius: size / 2,
            borderWidth: strokeWidth,
            transform: [{ rotateZ: `${rotation > 180 ? 180 : rotation}deg` }],
          }
        ]} />
        {rotation > 180 && (
          <View style={[
            styles.rightHalfOverlay,
            {
              width: size,
              height: size,
              borderRadius: size / 2,
              borderWidth: strokeWidth,
              transform: [{ rotateZ: `${rotation - 180}deg` }],
            }
          ]} />
        )}
      </View>

      {/* Center Text */}
      <View style={styles.label}>
        <Text style={styles.averageText}>{average.toFixed(1)}</Text>
        <Text style={styles.outOfText}>out of 5</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  backgroundCircle: {
    position: 'absolute',
    borderColor: '#e0e0e0',
  },
  progressContainer: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
  leftHalf: {
    position: 'absolute',
    borderColor: '#00A651',
    borderRightColor: 'transparent',
    borderBottomColor: 'transparent',
    transform: [{ rotateZ: '0deg' }],
  },
  rightHalf: {
    position: 'absolute',
    borderColor: '#00A651',
    borderLeftColor: 'transparent',
    borderBottomColor: 'transparent',
  },
  rightHalfOverlay: {
    position: 'absolute',
    borderColor: '#00A651',
    borderRightColor: 'transparent',
    borderBottomColor: 'transparent',
  },
  label: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
  averageText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  outOfText: {
    fontSize: 12,
    color: '#666',
  },
});

export default ProgressCircle;
