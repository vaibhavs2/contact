export type Status = 'sent' | 'pending';
export type Message = {
  message_id: string;
  message: string;
  phone: string;
  timestamp: string;
  status: Status;
};
