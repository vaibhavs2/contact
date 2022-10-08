import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {ContactDetailScreen} from '../screens/ContactDetailScreen';
import {ComposeMessageScreen} from '../screens/ComposeMessageScreen';
import {BottomTabNavigator} from './BottomTabNavigator';
import {Contact} from '../types';
import {AddNewContactScreen} from '../screens/AddNewContactScreen';

type StackScreens =
  | 'Home'
  | 'ContactDetailScreen'
  | 'ComposeMessageScreen'
  | 'AddContact';

export type RootStackParamList = {
  Home: undefined;
  ContactDetailScreen: {phone: string};
  ComposeMessageScreen: {phone: string};
  AddContact: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export function StackNavigator() {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={BottomTabNavigator} />
      <Stack.Group
        screenOptions={{
          presentation: 'containedTransparentModal',
          animation: 'slide_from_bottom',
        }}>
        <Stack.Screen
          name="AddContact"
          component={AddNewContactScreen}
          options={{headerShown: false}}
        />
      </Stack.Group>
      <Stack.Screen
        name="ContactDetailScreen"
        options={{title: 'Contact Detail'}}
        component={ContactDetailScreen}
      />
      <Stack.Screen
        name="ComposeMessageScreen"
        options={{title: 'Message'}}
        component={ComposeMessageScreen}
      />
    </Stack.Navigator>
  );
}
