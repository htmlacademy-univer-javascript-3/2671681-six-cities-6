import { createAction } from '@reduxjs/toolkit';
import { Offers } from '../types/offers';
import { City } from '../types/city';

export const setCity = createAction<{ city: City }>('main/setCity');

export const setOffers = createAction<{ offers: Offers }>('main/setOffers');
