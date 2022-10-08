import {type Message} from '../../types';
import {MessageActionType} from './actionType';

const initialState: Array<Message> = [];

export function messageReducer(
  state = initialState,
  action: MessageActionType,
): Array<Message> {
  switch (action.type) {
    case 'ADD_MESSAGE':
      return [
        ...state,
        {
          ...action.payload,
          timestamp: new Date().toISOString(),
        },
      ];

    case 'UPDATE_STATUS':
      return state.map(message =>
        message.message_id == action.payload.message_id
          ? {...message, status: 'sent'}
          : message,
      );

    default:
      return state;
  }
}
