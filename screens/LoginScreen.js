import * as React from 'react';
import { Text, View, StyleSheet, Alert } from 'react-native';
import Constants from 'expo-constants';
import { useLinkTo } from '@react-navigation/native'
import { Card, TextInput, Button } from 'react-native-paper';
import { useForm, useController } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import { AuthContext } from '../App'

export default function LoginScreen({ navigation }) {
  const linkTo = useLinkTo();
  const { control, handleSubmit } = useForm();
  const { signIn } = React.useContext(AuthContext);
  const onSubmit = (data) => {
      Alert.alert(JSON.stringify(data));
      signIn(data)
    };

  return (
    <View style={styles.container}>
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
        LogIn
      </Button>
      <Button 
        mode="text" 
        onPress={() => navigation.push("signUp")}
      >
        No account? Sign Up
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
      required: true, // TODO: regx
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