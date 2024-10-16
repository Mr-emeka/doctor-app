import Constants from 'expo-constants';
import ExpoStatusBar from 'expo-status-bar/build/ExpoStatusBar';
import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';

export default function Screen({ children, style, light, white }) {
  return (
    <SafeAreaView
      style={[styles.wrapper, light ? styles.light : styles.dark, white && styles.white, style]}>
      <ExpoStatusBar style={light ? 'light' : 'dark'} translucent />
      {children}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
  },
  light: {
    backgroundColor: '#F0F0F0',
  },
  white: { backgroundColor: '#FFF' },
  dark: {
    backgroundColor: '#1A1D3E',
  },
});
