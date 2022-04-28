import * as React from 'react';
import { View, StyleSheet, ImageBackground } from 'react-native';
import Constants from 'expo-constants';
import { useLinkTo } from '@react-navigation/native';

import { Text, TouchableRipple } from 'react-native-paper';

export default function Landing() {
  const linkTo = useLinkTo();
  return (
    <TouchableRipple
      onPress={() => linkTo('/login')}
      rippleColor="rgba(0, 0, 0, .32)"
      style={styles.container}
    >
      <ImageBackground 
      source={{ 
        uri:'https://img.freepik.com/free-vector/electric-car-concept-illustration_114360-1161.jpg?w=1480'
        //"../assets/landing-bg.jpeg" 
        }} 
      resizeMode="cover" 
      style={styles.image}
      >
        <Text>Press anywhere to start.</Text>
      </ImageBackground>
    </TouchableRipple>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
    padding: 8,
    // textAlign: 'center',
    background: 'no-repeat center/80% url("../assets/landing-bg.png")'
  },
  image: {
    flex: 1,
    justifyContent: "center"
  },
});
