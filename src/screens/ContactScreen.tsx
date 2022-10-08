import React from 'react';
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import type {CompositeScreenProps} from '@react-navigation/native';
import type {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useSelector} from 'react-redux';

import {Card} from '../commonComponents/Card';
import {TabScreenParamList} from '../navigation/BottomTabNavigator';
import {RootStackParamList} from '../navigation/StackNavigator';
import {StoreType} from '../redux-store/store';
import {Contact} from '../types';

type Props = CompositeScreenProps<
  BottomTabScreenProps<TabScreenParamList, 'Contacts'>,
  NativeStackScreenProps<RootStackParamList>
>;
export function ContactScreen({navigation}: Props) {
  const allContacts = useSelector<StoreType, Array<Contact>>(
    state => state.contact,
  );

  const onItemClick = (contact: Contact) => {
    navigation.navigate('ContactDetailScreen', {phone: contact.phone});
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={allContacts}
        ListEmptyComponent={() => (
          <View>
            <Text>No contacts, Try adding new contact!</Text>
          </View>
        )}
        renderItem={({item}) => (
          <ContactItem {...item} onPress={() => onItemClick(item)} />
        )}
      />
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('AddContact');
        }}
        style={styles.floatButton}>
        <MaterialIcons name="person-add-alt" color={'white'} size={25} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1},
  cardContentContainer: {flexDirection: 'row', alignItems: 'center'},
  cardTextContainer: {flex: 1},
  cardTitle: {fontSize: 16, color: 'black'},
  cardSubTitle: {color: 'gray', fontSize: 12, marginTop: 8},
  floatButton: {
    position: 'absolute',
    bottom: 15,
    end: 10,
    backgroundColor: 'purple',
    borderRadius: 50,
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const ContactItem = (props: Contact & {onPress: () => void}) => {
  return (
    <Card>
      <TouchableOpacity onPress={props.onPress}>
        <View style={styles.cardContentContainer}>
          <View style={styles.cardTextContainer}>
            <Text style={styles.cardTitle}>
              {props.first_name} {props.last_name}
            </Text>
            <Text style={styles.cardSubTitle}>
              {props.message_count
                ? `Number of messages sent: ${props.message_count}`
                : 'No messages sent yet'}
            </Text>
          </View>
          <MaterialIcons name="chevron-right" size={32} color="black" />
        </View>
      </TouchableOpacity>
    </Card>
  );
};
