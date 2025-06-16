import { Price } from './prices-page';
import axios from 'axios';

export function getPrices(): Promise<Price[]> {
  return axios
    .get('/api/prices')
    .then((res) => res.data)
    .catch((err) => console.error('Error loading prices:', err));
}
