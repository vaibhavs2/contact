import {ActionAddMessage, ActionUpdateMessageStatus} from './actionType';

export function addMessage(
  payload: ActionAddMessage['payload'],
): ActionAddMessage {
  return {
    type: 'ADD_MESSAGE',
    payload,
  };
}

export function updateContactMessageStatus(
  payload: ActionUpdateMessageStatus['payload'],
): ActionUpdateMessageStatus {
  return {
    type: 'UPDATE_STATUS',
    payload,
  };
}
