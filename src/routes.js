import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';

import { StatusBar } from 'react-native';
import { colors } from './assets/theme.json';
import util from './util';

import { navigationRef } from './services/navigation';

import Tour from './pages/Tour';
import Login from './pages/Login';
import Home from './pages/Home';
import Ranking from './pages/Ranking';
import Payment from './pages/Payment';
import Timer from './pages/Timer';
import Balance from './pages/Balance';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function HomeTabs() {
  return (
    <Tab.Navigator
      tabBarOptions={{
        style: {
          backgroundColor: colors.dark,
          borderTopWidth: 0,
        },
        activeTintColor: colors.light,
      }}
    >
      <Tab.Screen
        name="Home"
        options={{
          tabBarLabel: 'Desafio',
          tabBarIcon: ({ color, size }) => (
            <Icon name="calendar-check" color={color} size={size} />
          ),
        }}
        component={Home}
      />
      <Tab.Screen
        options={{
          tabBarLabel: 'Ranking',
          tabBarIcon: ({ color, size }) => (
            <Icon name="account-group" color={color} size={size} />
          ),
        }}
        name="Ranking"
        component={Ranking}
      />
      <Tab.Screen
        options={{
          tabBarLabel: 'Saldo',
          tabBarIcon: ({ color, size }) => (
            <Icon name="cash" color={color} size={size} />
          ),
        }}
        name="Balance"
        component={Balance}
      />
    </Tab.Navigator>
  );
}

export default function Routes() {
  return (
    <>
      <StatusBar backgroundColor={colors.dark} />
      <NavigationContainer
        options={{ animationEnabled: true }}
        ref={navigationRef}
      >
        <Stack.Navigator
          options={{ animationEnabled: true }}
          initialRouteName="Login"
        >
          <Stack.Screen
            options={{ headerShown: false }}
            name="Home"
            component={HomeTabs}
          />

          <Stack.Screen
            options={{ headerShown: false }}
            name="Tour"
            component={Tour}
          />
          <Stack.Screen
            options={{ headerShown: false }}
            name="Login"
            component={Login}
          />
          <Stack.Screen
            options={{ headerShown: false }}
            name="Timer"
            component={Timer}
          />
          <Stack.Screen
            options={{ headerShown: false }}
            name="Payment"
            component={Payment}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
