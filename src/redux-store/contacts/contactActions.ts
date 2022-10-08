import {
  AddContact,
  DeleteContact,
  UpdateMessageCountAndOTP,
} from './actionTypes';

export function addContact(payload: AddContact['payload']): AddContact {
  return {
    type: 'ADD_CONTACT',
    payload,
  };
}

export function deleteContact(phone: string): DeleteContact {
  return {
    type: 'DELETE_CONTACT',
    payload: {phone},
  };
}

export function updateMessageCountAndOTP(
  phone: string,
  last_otp_sent: number,
): UpdateMessageCountAndOTP {
  return {
    type: 'ADD_MESSAGE_COUNT_OTP',
    payload: {phone, last_otp_sent},
  };
}
