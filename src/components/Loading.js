import React from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";

export const Loading = () => {
  return (

      <ActivityIndicator color="#000" animating size="large" style={styles.spinner}  />
  );
};



const styles = StyleSheet.create({
  spinner: {
    position: 'absolute',
    top: 80,
    left: 0,
    right: 0,
    bottom: 0,
    // flex: 1,
    backgroundColor: 'transparent',
    zIndex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
