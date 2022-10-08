import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import {ContactScreen} from '../screens/ContactScreen';
import {MessageScreen} from '../screens/MessagesScreen';

export type TabScreens = 'Contacts' | 'Messages';

export type TabScreenParamList = {
  Messages: undefined;
  Contacts: undefined;
};

const BottomTab = createBottomTabNavigator<TabScreenParamList>();

export function BottomTabNavigator() {
  return (
    <BottomTab.Navigator screenOptions={{headerShown: false}}>
      <BottomTab.Screen
        name="Contacts"
        component={ContactScreen}
        options={{
          tabBarIcon: ({color}) => (
            <MaterialIcons name="contacts" size={22} color={color} />
          ),
        }}
      />
      <BottomTab.Screen
        name="Messages"
        component={MessageScreen}
        options={{
          tabBarIcon: ({color}) => (
            <MaterialIcons name="message" size={22} color={color} />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
}
