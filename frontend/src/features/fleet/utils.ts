import axios from 'axios';
import { Car } from '../orders/types';

export function getCars(): Promise<Car[]> {
  return axios
    .get('/api/cars')
    .then((res) => res.data)
    .catch((err) => console.error('Error loading prices:', err));
}

export function getImages(id: string) {
  return axios
    .get(`cars/${id}/*.png`)
    .then((res) => res.data())
    .catch((err) => console.error('Error loading images:', err));
}
