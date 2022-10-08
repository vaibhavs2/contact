type AddContact = {
  type: 'ADD_CONTACT';
  payload: {
    phone: string;
    first_name: string;
    last_name: string;
  };
};

type DeleteContact = {
  type: 'DELETE_CONTACT';
  payload: {
    phone: string;
  };
};

type UpdateMessageCountAndOTP = {
  type: 'ADD_MESSAGE_COUNT_OTP';
  payload: {
    phone: string;
    last_otp_sent: number;
  };
};
export type ContactActionTypes =
  | AddContact
  | DeleteContact
  | UpdateMessageCountAndOTP;

export type {AddContact, DeleteContact, UpdateMessageCountAndOTP};
