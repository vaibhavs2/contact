import {Status} from '../../types';

type ActionAddMessage = {
  type: 'ADD_MESSAGE';
  payload: {
    message: string;
    phone: string;
    status: Status;
    message_id: string;
  };
};

type ActionUpdateMessageStatus = {
  type: 'UPDATE_STATUS';
  payload: {
    message_id: string;
    status: Status;
  };
};

export type MessageActionType = ActionUpdateMessageStatus | ActionAddMessage;

export type {ActionUpdateMessageStatus, ActionAddMessage};
