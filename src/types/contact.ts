export type Contact = {
  phone: string;
  first_name: string;
  last_name: string;
  message_count: number;
  contact_added_at: string;
  last_message_sent_at: string | null;
  last_otp_sent: number | null;
};
