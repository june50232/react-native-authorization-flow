import * as React from 'react';
import { Text, View } from 'react-native';
import { 
  ActivityIndicator, 
  Colors 
} from 'react-native-paper';

const SplashScreen = () => {
  return (
    <View>
      <ActivityIndicator animating={true} color={Colors.red800} />
    </View>
  )
}

export default SplashScreen