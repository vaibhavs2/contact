import {Contact} from '../../types';
import {ContactActionTypes} from './actionTypes';

const initialState: Array<Contact> = [];

export function contactReducer(
  state: Array<Contact> = initialState,
  action: ContactActionTypes,
): Array<Contact> {
  switch (action.type) {
    case 'ADD_CONTACT':
      return [
        {
          ...action.payload,
          contact_added_at: new Date().toISOString(),
          last_message_sent_at: null,
          last_otp_sent: null,
          message_count: 0,
        },
        ...state,
      ];

    case 'DELETE_CONTACT':
      return state.filter(contact => contact.phone != action.payload.phone);

    case 'ADD_MESSAGE_COUNT_OTP':
      return state.map(contact =>
        action.payload.phone == contact.phone
          ? {
              ...contact,
              message_count: (contact.message_count || 0) + 1,
              last_message_sent_at: new Date().toISOString(),
              last_otp_sent: action.payload.last_otp_sent,
            }
          : contact,
      );
    default:
      return state;
  }
}
