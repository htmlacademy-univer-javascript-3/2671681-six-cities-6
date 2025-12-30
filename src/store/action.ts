import { createAction } from '@reduxjs/toolkit';
import { Offers } from '../types/offers';
import { City } from '../types/city';

export const setCity = createAction<City>('data/setCity');

export const setOffers = createAction<Offers>('data/setOffers');

export const setOffersDataLoadingStatus = createAction<boolean>(
  'data/setOffersDataLoadingStatus'
);
