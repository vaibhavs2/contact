import * as React from 'react';
import {Text, View, StyleSheet, ScrollView, Button} from 'react-native';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useSelector} from 'react-redux';

import {Card} from '../commonComponents/Card';
import {RootStackParamList} from '../navigation/StackNavigator';
import {Contact} from '../types';
import {StoreType} from '../redux-store/store';

type Props = NativeStackScreenProps<RootStackParamList, 'ContactDetailScreen'>;

export function ContactDetailScreen({navigation, route: {params}}: Props) {
  const contactDetail = useSelector<StoreType, Contact>(
    state => state.contact.find(contact => contact.phone == params.phone)!,
  );
  const profileName = contactDetail.first_name[0] + contactDetail.last_name[0];

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={{alignItems: 'center'}}>
          <Card style={styles.profile}>
            <Text style={{fontWeight: 'bold', fontSize: 32, color: 'white'}}>
              {profileName.toUpperCase()}
            </Text>
          </Card>
          <Text style={{fontSize: 20, fontWeight: '600', marginVertical: 15}}>
            {contactDetail.first_name} {contactDetail.last_name}
          </Text>
        </View>
        <Card style={{borderRadius: 8}}>
          <DataPlaceHolder title={'Phone Number'} value={params.phone} />
          <DataPlaceHolder
            title={'Contact Created on'}
            value={new Date(contactDetail.contact_added_at).toDateString()}
          />
          {contactDetail.message_count ? (
            <>
              <DataPlaceHolder
                title={'Last messages sent at'}
                value={new Date(
                  contactDetail.last_message_sent_at!,
                ).toDateString()}
              />
              <DataPlaceHolder
                title={'Number of messages sent:'}
                value={String(contactDetail.message_count)}
              />
            </>
          ) : (
            <Text style={styles.noMessage}>No messages sent yet!</Text>
          )}
        </Card>
      </ScrollView>
      <Button
        title="Send message"
        color="purple"
        onPress={() => {
          navigation.navigate('ComposeMessageScreen', {phone: params.phone});
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
    padding: 8,
    paddingBottom: 15,
  },
  profile: {
    height: 90,
    width: 90,
    borderRadius: 45,
    backgroundColor: 'purple',
    justifyContent: 'center',
    alignItems: 'center',
    shadowRadius: 5,
  },
  noMessage: {
    marginVertical: 12,
  },

  card: {
    shadowColor: 'gray',
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 1,
    shadowRadius: 2,
    elevation: 1,
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 15,
  },
});

const DataPlaceHolder = (props: {title: string; value: string}) => {
  return (
    <View style={{marginBottom: 15}}>
      <Text style={{marginTop: 8}}>{props.title}</Text>
      <Text
        style={{
          marginTop: 5,
          backgroundColor: 'rgba(128,128,128, .2)',
          paddingVertical: 15,
          borderRadius: 5,
          paddingHorizontal: 8,
        }}>
        {props.value}
      </Text>
    </View>
  );
};
