import 'react-native-gesture-handler';
import React from 'react';
import { StatusBar } from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

const AuthStack = createStackNavigator();

import Login from './src/screens/login';
import Pacientes from './src/screens/pacientes';
import Medicos from './src/screens/medicos';

export default function Stack() {
  return (
    <NavigationContainer>
      <StatusBar
        hidden={true}
      />

      <AuthStack.Navigator
        initialRouteName="Login"
        screenOptions={{
          headerShown: false,
        }}>
        <AuthStack.Screen name="Login" component={Login} />
        <AuthStack.Screen name="Pacientes" component={Pacientes} />
        <AuthStack.Screen name="Medicos" component={Medicos} />
      </AuthStack.Navigator>
    </NavigationContainer>
  );
}