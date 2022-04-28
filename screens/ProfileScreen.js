import * as React from 'react';
import { Text, View, StyleSheet, Alert } from 'react-native';
import Constants from 'expo-constants';

// or any pure javascript modules available in npm
import { Card, TextInput, Button } from 'react-native-paper';
import { useForm, useController } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';

export default function CarListScreen() {

  return (
    <View style={styles.container}>
      fszf
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
});

