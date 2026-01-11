import { useMemo } from 'react';
import { useAppSelector } from '.';
import { getFavoriteOffers } from '../store/favorite-data/selectors';
import { Offers, OffersByCityItems } from '../types/offers';

const groupOffersByCity = (offers: Offers): OffersByCityItems =>
  offers.reduce<OffersByCityItems>((acc, offer) => {
    const city = offer.city.name;
    const group = acc.find((item) => item.city === city);

    if (group) {
      group.offers.push(offer);
    } else {
      acc.push({
        city,
        offers: [offer],
      });
    }

    return acc;
  }, []);

export const useOffersByCity = (): OffersByCityItems => {
  const favouriteOffers = useAppSelector(getFavoriteOffers);

  return useMemo(
    () => groupOffersByCity(favouriteOffers),
    [favouriteOffers]
  );
};


