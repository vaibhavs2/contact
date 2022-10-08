import React from 'react';
import {View, Text, StyleSheet, FlatList, TouchableOpacity} from 'react-native';
import type {CompositeScreenProps} from '@react-navigation/native';
import type {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useSelector} from 'react-redux';

import {TabScreenParamList} from '../navigation/BottomTabNavigator';
import {RootStackParamList} from '../navigation/StackNavigator';
import {Contact} from '../types';
import {StoreType} from '../redux-store/store';
import {Card} from '../commonComponents/Card';

type Props = CompositeScreenProps<
  BottomTabScreenProps<TabScreenParamList, 'Contacts'>,
  NativeStackScreenProps<RootStackParamList>
>;

function getSortedFilteredPhones(contacts: Array<Contact>) {
  return contacts
    .filter(contact => contact.message_count)
    .sort(
      (a, b) =>
        new Date(b.last_message_sent_at!).valueOf() -
        new Date(a.last_message_sent_at!).valueOf(),
    );
}

export function MessageScreen({navigation}: Props) {
  const messageContactList = useSelector<StoreType, Array<Contact>>(state =>
    getSortedFilteredPhones(state.contact),
  );

  return (
    <View style={{flex: 1}}>
      <FlatList
        data={messageContactList}
        ListEmptyComponent={() => (
          <View>
            <Text>No messages to show yet!</Text>
          </View>
        )}
        renderItem={({item}) => (
          <MessageItem
            {...item}
            onPress={() => {
              navigation.navigate('ComposeMessageScreen', {phone: item.phone});
            }}
          />
        )}
      />
    </View>
  );
}

const MessageItem = (item: Contact & {onPress: () => void}) => {
  return (
    <Card>
      <TouchableOpacity onPress={item.onPress}>
        <View>
          <Text style={[styles.textColor, styles.titleFont]}>
            {item.first_name} {item.last_name}
          </Text>
          <Text style={[styles.textColor, styles.timeFont]}>
            Last sent OTP -- {item.last_otp_sent}
          </Text>
          <Text style={styles.timeFont}>
            {new Date(item.last_message_sent_at!).toDateString()}
          </Text>
        </View>
      </TouchableOpacity>
    </Card>
  );
};

const styles = StyleSheet.create({
  textColor: {color: 'black'},
  titleFont: {fontSize: 16},
  timeFont: {fontSize: 12},
});
