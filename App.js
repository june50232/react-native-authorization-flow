import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as SecureStore from 'expo-secure-store';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createDrawerNavigator } from "@react-navigation/drawer";
import { MaterialCommunityIcons } from 'react-native-vector-icons';
import { 
  Landing, 
  LoginScreen, 
  SignUpScreen, 
  HomeScreen, 
  SplashScreen,
  DetailScreen,
  ChosenScreen,
  ProfileScreen,
  FavoriteScreen
} from "./screens/index";
import Routes from './Route';
import { 
  Provider as PaperProvider,
  BottomNavigation,
  Button,
} from 'react-native-paper';

const Auth = createNativeStackNavigator();
export const AuthContext = React.createContext();

export default function App({ navigation }) {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'music', title: 'Music', icon: 'queue-music' },
    { key: 'albums', title: 'Albums', icon: 'album' },
    { key: 'recents', title: 'Recents', icon: 'history' },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    home: HomeScreen, 
    detail: DetailScreen,
    choson: ChosenScreen,
    profile: ProfileScreen,
    favorite: FavoriteScreen
  });

  const [state, dispatch] = React.useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'RESTORE_TOKEN': 
          return {
            ...prevState,
            userToken: action.token,
            isLoading: false,
          };
        case 'SIGN_IN':
          return {
            ...prevState,
            isSignOut: false,
            userToken: action.token,
          }
        case 'SIGN_UP':
          return {
            ...prevState,
            isSignOut: false,
            userToken: action.token,
          }
        case 'SIGN_OUT': 
          return {
            ...prevState,
            isSignout: true,
            userToken: null
          }
      }
    }, {
      isLoading: true,
      isSignout: false,
      userToken: null
    }
  ) 

  React.useEffect(() => {
    const bootstrapAsync = async () => {
      let userToken;

      try {
        userToken = await SecureStore.getItemAsync('userToken');
      } catch (e) {
        // TODO: Restoring token failed
      }
      
      // TODO: After restoring token, we may need to validate it in production apps

      dispatch({ type: 'RESTORE_TOKEN', token: userToken })
    }
    bootstrapAsync()
  }, [])

  const authContext = React.useMemo(
    () => ({
      signIn: async (data) => {
        dispatch({ type: 'SIGN_IN', token: 'test-token' });
      },
      signOut: () => dispatch({ type: 'SIGN_OUT' }),
      signUp: async (data) => {
        dispatch({ type: 'SIGN_UP', token: 'test-token' })
      }
    }), 
    []
  )

  return (
      <AuthContext.Provider value={authContext}>
        <PaperProvider>
          <NavigationContainer>
              {state.isLoading ? 
                 <LoadingScreen />
                : 
                (state.userToken == null 
                ? <AuthStackScreen />
                : <AppDrawerScreen />)
              }
          </NavigationContainer>
        </PaperProvider>
      </AuthContext.Provider>
    
  )
}

const Drawer = createDrawerNavigator()
export const AppDrawerScreen = () => (
  <Drawer.Navigator 
    //drawerPosition="right"
    screenOptions={{
      drawerStyle: {
        backgroundColor: '#c6cbef',
        width: 240,
      },
    }}
    >
    <Drawer.Screen
      name="Home"
      component={AppTabScreen}
      // options={{ 
      //   drawerLabel: "Home" 
      // }}
    />
    <Drawer.Screen
      name="Settings"
      component={ProfileScreen}
      options={{
        gestureEnabled: true,
      }}
    />
  </Drawer.Navigator>
)

export const LoadingScreen = () => (
  <Auth.Screen 
    name="Splash" 
    component={SplashScreen} 
    options={{
      headerBackButtonMenuEnabled: false,
      headerShown: false,
      statusBarHidden: true
    }}
  />
)

export const AuthStackScreen = () => {
  return (
    <Auth.Navigator
      initialRouteName="login"
      headerMode="screen"
    >
    <Auth.Screen 
      name="login" 
      component={LoginScreen} 
      options={{
        headerBackButtonMenuEnabled: false,
        headerShown: false,
        statusBarHidden: true,
        tabBarIcon: ({ color }) => (
          <MaterialCommunityIcons name="login" color={color} size={26} />
        ),
      }}
    />
    <Auth.Screen 
      name="signUp" 
      options={{
        headerBackButtonMenuEnabled: false,
        headerShown: false,
        tabBarIcon: ({ color }) => (
          <MaterialCommunityIcons name="account-plus" color={color} size={26} />
        ),
      }}
      component={SignUpScreen} 
    />
  </Auth.Navigator>
  );
};

const Tab = createMaterialBottomTabNavigator();
export const AppTabScreen = () => {
  return (
    <Tab.Navigator
      initialRouteName="home"
      shifting={true}
      sceneAnimationEnabled={false}
    >
      <Tab.Screen 
        name="home" 
        component={HomeScreen} 
        options={{
          title: 'List',
          headerBackButtonMenuEnabled: false,
          tabBarIcon: 'view-grid',
        }}
      />
      <Tab.Screen 
        name="Favorite" 
        component={FavoriteScreen} 
        options={{
          title: 'favorite',
          headerBackButtonMenuEnabled: false,
          tabBarIcon: 'star',
        }}
      />
      <Tab.Screen 
        name="Chosen" 
        component={ChosenScreen} 
        options={{
          title: 'My Car',
          headerBackButtonMenuEnabled: false,
          tabBarIcon: 'car-connected',
        }}
      />
    </Tab.Navigator>
  );
};


