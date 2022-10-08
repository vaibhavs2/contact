import React from 'react';
import {StyleSheet, View, ViewStyle} from 'react-native';

type Props = {
  children: React.ReactNode;
  style?: ViewStyle;
};

export function Card(props: Props) {
  return <View style={[styles.card, props.style]}>{props.children}</View>;
}

const styles = StyleSheet.create({
  card: {
    shadowColor: 'gray',
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 2,
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 15,
    margin: 5,
  },
});
