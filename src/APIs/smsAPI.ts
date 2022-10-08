import {updateContactMessageStatus} from '../redux-store/messages/messageActions';
import {storeDispatch} from '../redux-store/store';

export async function makeRequest(url: string, init?: RequestInit) {
  try {
    const response = await fetch(url, init);
    if (response.ok) {
      const responseJson = await response.json();
      return {error: false, data: responseJson, message: ''};
    }
    throw {error: true, data: undefined, message: response.statusText};
  } catch (error: any) {
    return {
      error: true,
      data: undefined,
      message: error.message || 'Network request failed',
    };
  }
}

type SmsContent = {
  text: string;
  to: string;
  message_id: string;
};
export async function sendSms(props: SmsContent) {
  const headers = {
    'Content-Type': 'application/json',
  };
  const body = {
    from: 'Vonage APIs',
    text: props.text,
    to: props.to,
    api_key: 'c8d2f8c2',
    api_secret: 'Imhm42GpAPUa8SPP',
  };
  const response = await makeRequest('https://rest.nexmo.com/sms/json', {
    headers,
    method: 'POST',
    body: JSON.stringify(body),
  });
  if (response.error) {
    return {error: true, message: 'Message request failed'};
  }
  if (response.data.messages[0].status == '0') {
    storeDispatch(
      updateContactMessageStatus({
        message_id: props.message_id,
        status: 'sent',
      }),
    );
    return {error: false, message: 'sent'};
  }
  return {error: true, message: 'Message sending failed'};
}
