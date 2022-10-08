import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {StackNavigator} from './StackNavigator';

export function AppNavigationContainer() {
  return (
    <NavigationContainer>
      <StackNavigator />
    </NavigationContainer>
  );
}
