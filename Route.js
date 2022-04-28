import * as React from 'react';
import { LoginScreen, SignUpScreen, CarListScreen } from "./screens/index"

const Routes = [
  {
    name: "signUp", 
    options: {
      headerBackButtonMenuEnabled: false,
      headerShown: false
    },
    component: <SignUpScreen />
  }, {
    name: "login", 
    options: {
      headerBackButtonMenuEnabled: false,
      headerShown: false
    },
    component: <LoginScreen />
  }, {
    name: "carList", 
    options: {
      title: 'Cars',
      headerBackButtonMenuEnabled: false
    },
    component: <CarListScreen />
  }, 
]

export default Routes