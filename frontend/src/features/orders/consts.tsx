import { VehicleClass } from './types';

export const DESTINATIONS = ['Ben Gurion Airport', 'Jerusalem', 'Tel Aviv', 'Haifa'] as const;
export const CLASSES = ['Luxury', 'Premium'] as const;

export const PRICES: Record<VehicleClass, Record<string, Record<string, number>>> = {
  Luxury: {
    'Ben Gurion Airport': {
      Jerusalem: 350,
      'Tel Aviv': 200,
      Haifa: 550,
    },
    Jerusalem: {
      'Tel Aviv': 300,
      Haifa: 650,
      'Ben Gurion Airport': 350,
    },
    'Tel Aviv': {
      Jerusalem: 300,
      Haifa: 450,
      'Ben Gurion Airport': 200,
    },
  },
  Premium: {
    'Ben Gurion Airport': {
      Jerusalem: 450,
      'Tel Aviv': 250,
      Haifa: 650,
    },
    Jerusalem: {
      'Tel Aviv': 400,
      Haifa: 750,
      'Ben Gurion Airport': 450,
    },
    'Tel Aviv': {
      Jerusalem: 400,
      Haifa: 550,
      'Ben Gurion Airport': 250,
    },
  },
};

export const phoneRegex = /^(?:\+972|972|0)(?:[23489]|5[0123456789])[-\s]?\d{7}$/;

export const COMPANY_CONFIG = {
  email: 'sample.email',
};
