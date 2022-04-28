import * as React from 'react';
import { Text, View, StyleSheet, Alert } from 'react-native';
import Constants from 'expo-constants';

import { Card, TextInput, Button } from 'react-native-paper';
import { useForm, useController } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import { useLinkTo } from '@react-navigation/native';
import { AuthContext } from '../App'

export default function SignUpScreen() {
  const linkTo = useLinkTo();
   const { signUp } = React.useContext(AuthContext);
  const { control, handleSubmit } = useForm();
  const onSubmit = (data) => {
      signUp(data)
    };

  return (
    <View style={styles.container}>
      <Input
        name="Name"
        control={control}
      />
      <Input
        name="Email"
        control={control}
      />
      <Input
        name="Mobile"
        control={control}
      />
      <Input
        name="Password"
        control={control}
      />
      <Button 
        mode="contained" 
        onPress={handleSubmit(onSubmit)}
      >
        Sign Up
      </Button>
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

const Input = ({ name, control }) => {
  const { field, formState } = useController({
    control,
    defaultValue: '',
    name,
    rules: {
      required: true,
    }
  })
  return (
    <>
    <TextInput 
      value={field.value}
      onChangeText={field.onChange}
      label={name}
      maxLength={225}
    />
    <ErrorMessage
      errors={formState.errors} 
      name={name}
      message={`${name} is required`}
      render={({ message }) => <p style={{ color: 'red' }}>{message}</p>}
    />
    </>
  )
}