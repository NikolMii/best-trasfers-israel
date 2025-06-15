import axios from 'axios';
import { Email } from './types';

export function sendEmail({ subject, text, to }: Email) {
  axios
    .post('/send-email', {
      to,
      subject,
      text,
    })
    .then(() => alert('Email sent!'))
    .catch((error: unknown) => {
      console.error(error);
      alert('Failed to send email');
    });
}
