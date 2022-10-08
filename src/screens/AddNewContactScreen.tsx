import React, {useState} from 'react';
import {
  Alert,
  Button,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {useDispatch} from 'react-redux';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {RootStackParamList} from '../navigation/StackNavigator';
import {addContact} from '../redux-store/contacts/contactActions';

type Props = NativeStackScreenProps<RootStackParamList, 'AddContact'>;

export function AddNewContactScreen({navigation}: Props) {
  const dispatch = useDispatch();
  const [getContact, setContact] = useState({
    phone: '',
    first_name: '',
    last_name: '',
  });
  const [getError, setError] = useState('');

  const onInputChange = (
    value: string,
    key: 'phone' | 'first_name' | 'last_name',
  ) => {
    setError('');
    setContact({...getContact, [key]: value});
  };

  const closeModal = () => {
    navigation.pop();
  };

  const addContactToStore = () => {
    if (!getContact.first_name) {
      setError("First Name can't be empty!");
    } else if (!getContact.last_name) {
      setError("Last Name can't be empty!");
    } else if (!getContact.phone || getContact.phone.length !== 10) {
      setError('Enter a valid phone number');
    } else {
      dispatch(addContact(getContact));
      Alert.alert('Contact Added!', 'Contact has been added!', [
        {text: 'OK', onPress: closeModal},
      ]);
    }
  };
  return (
    <View style={{backgroundColor: 'rgba(34,44,48, .5)', flex: 1}}>
      <View style={{flexDirection: 'row-reverse', marginStart: 15}}>
        <TouchableOpacity onPress={closeModal}>
          <MaterialIcons name="close" size={32} color="white" />
        </TouchableOpacity>
      </View>

      <TouchableWithoutFeedback onPress={closeModal}>
        <View style={{flex: 1}}>
          <View style={{flex: 1}} />
          <TouchableWithoutFeedback>
            <View
              style={{
                backgroundColor: 'white',
                paddingHorizontal: 15,
                borderTopLeftRadius: 12,
                borderTopRightRadius: 12,
                padding: 15,
              }}>
              <CustomInput
                title="First Name"
                value={getContact.first_name}
                onChange={value => {
                  onInputChange(value, 'first_name');
                }}
              />
              <CustomInput
                title="Last Name"
                value={getContact.last_name}
                onChange={value => {
                  onInputChange(value, 'last_name');
                }}
              />
              <CustomInput
                title="Phone number"
                phone
                value={getContact.phone}
                onChange={value => {
                  onInputChange(value, 'phone');
                }}
              />
              <View style={{marginVertical: 20}}>
                <Text
                  style={{color: 'red', textAlign: 'center', marginBottom: 5}}>
                  {getError}
                </Text>
                <Button title="Add contact" onPress={addContactToStore} />
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
}

const CustomInput = (props: {
  title: string;
  value: string;
  phone?: boolean;
  onChange?: (text: string) => void;
}) => {
  return (
    <View>
      <Text>{props.title}</Text>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          borderWidth: 1,
          borderRadius: 5,
          marginTop: 5,
          marginBottom: 15,
          marginStart: 5,
          paddingStart: 8,
        }}>
        {props.phone && <Text style={{fontSize: 14}}>+91</Text>}
        <TextInput
          keyboardType={props.phone ? 'numeric' : 'default'}
          maxLength={props.phone ? 10 : undefined}
          onChangeText={props.onChange}
          value={props.value}
          style={{
            flex: 1,
            paddingVertical: 12,
            paddingHorizontal: 12,
          }}
        />
      </View>
    </View>
  );
};
