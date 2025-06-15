import { PricesTable } from './prices-page';
import Papa from 'papaparse';
import axios from 'axios';

export function getPrices(): Promise<PricesTable> {
  return axios
    .get('/prices.csv')
    .then((res) => res.data())
    .then((csvText) => {
      const parsed = Papa.parse(csvText, { header: true });
      return parsed.data;
    })
    .catch((err) => console.error('Error loading CSV:', err));
}
