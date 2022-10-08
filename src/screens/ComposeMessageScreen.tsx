import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  Alert,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useSelector, useDispatch} from 'react-redux';

import {RootStackParamList} from '../navigation/StackNavigator';
import {StoreType} from '../redux-store/store';
import {Message} from '../types';
import {Card} from '../commonComponents/Card';
import {addMessage} from '../redux-store/messages/messageActions';
import {updateMessageCountAndOTP} from '../redux-store/contacts/contactActions';
import {sendSms} from '../APIs/smsAPI';

const generateRandomNumber = () => Math.floor(10000 + Math.random() * 90000);

type Props = NativeStackScreenProps<RootStackParamList, 'ComposeMessageScreen'>;

export function ComposeMessageScreen({navigation, route: {params}}: Props) {
  const dispatch = useDispatch();
  const messages = useSelector<StoreType, Array<Message>>(state =>
    state.message.filter(message => message.phone == params.phone),
  );
  const [getRandomOTP, setRandomOTP] = useState(generateRandomNumber());
  const [getMessage, setMessage] = useState(`Hi, Your OTP is: ${getRandomOTP}`);
  const flatlistRef = React.useRef<FlatList>(null);

  useEffect(() => {
    flatlistRef.current?.scrollToEnd?.();
  }, [messages.length]);

  const onMessageSend = async () => {
    if (!getMessage) {
      return;
    }
    const message_id = String(Date.now());
    dispatch(
      addMessage({
        message: getMessage,
        status: 'pending',
        phone: params.phone,
        message_id,
      }),
    );
    dispatch(updateMessageCountAndOTP(params.phone, getRandomOTP));
    const randomOTP = generateRandomNumber();
    setMessage(`Hi, Your OTP is: ${randomOTP}`);
    setRandomOTP(randomOTP);
    const response = await sendSms({
      text: getMessage,
      to: '+919128113757',
      message_id,
    });
    if (response.error) {
      Alert.alert('Message failed', response.message);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.container}>
        <FlatList
          ref={flatlistRef}
          data={messages}
          renderItem={({item}) => <MessageItem {...item} />}
        />
      </View>
      <View style={styles.messageBoxContainer}>
        <TextInput
          multiline
          style={styles.input}
          value={getMessage}
          onChangeText={text => {
            setMessage(text);
          }}
        />
        <TouchableOpacity onPress={onMessageSend}>
          <MaterialIcons name="send" size={30} color="purple" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

export function MessageItem(props: Message) {
  return (
    <Card>
      <Text style={styles.messageTitle}>{props.message}</Text>
      <View style={styles.statusContainer}>
        <Text style={{color: props.status == 'sent' ? 'green' : 'gray'}}>
          {props.status}
        </Text>
        <Text>{new Date(props.timestamp).toDateString()}</Text>
      </View>
    </Card>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  subContainer: {
    flex: 1,
    padding: 8,
  },
  input: {
    backgroundColor: 'rgba(128,128,128, .3)',
    borderRadius: 5,
    paddingHorizontal: 12,
    maxHeight: 100,
    minHeight: 50,
    flex: 1,
    marginEnd: 8,
  },
  statusContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 5,
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  messageTitle: {color: 'black'},
  messageBoxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    paddingStart: 8,
    paddingEnd: 5,
  },
});
