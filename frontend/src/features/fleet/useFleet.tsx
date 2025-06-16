import { useEffect, useState } from 'react';
import { Car } from '../orders/types';
import { getCars } from './utils';

export const useFleet = () => {
  const [fleet, setFleet] = useState<Car[]>([]);
  useEffect(() => {
    getCars().then((cars) => {
      const carsWithImages = cars.map((car) => {
        car.images;
        return { ...car, images: car.images?.map((path) => `images/cars/${car.id}/${path}`) ?? [] };
      });
      console.log(carsWithImages);
      
      setFleet(carsWithImages);
    });
  }, []);

  return fleet;
};
