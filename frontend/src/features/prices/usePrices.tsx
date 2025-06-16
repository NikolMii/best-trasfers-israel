import { useEffect, useMemo, useState } from 'react';
import { Price } from './prices-page';
import { getPrices } from './utils';

export const usePrices = () => {
  const [prices, setPrices] = useState<Price[]>([]);
  useEffect(() => {
    getPrices().then((prices) => {
      setPrices(prices);
    });
  }, []);
  const destinations = useMemo(
    () =>
      !!prices?.length
        ? new Array(
            ...new Set(
              prices.map(({ to, from }) => [to, from]).reduce((prev, curr) => [...prev, ...curr])
            )
          )
        : [],
    [prices]
  );

  const getPrice = ({ from, to }: Omit<Price, 'price' | 'luxury' | 'premium' | 'standart'>) => {
    return prices.find(
      (price) =>
        (price.from === from && price.to === to) || (price.from === to && price.to === from)
    );
  };
  return { prices, getPrice, destinations };
};
