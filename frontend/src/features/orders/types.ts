import { CLASSES } from './consts';

export interface Email {
  subject: string;
  text: string;
  to: string;
}

export interface Car {
  id: string;
  capacity: number;
  class: VehicleClass;
  year: number;
  name: string;
  pax: number
  images: string[];
}

export type VehicleClass = (typeof CLASSES)[number];
