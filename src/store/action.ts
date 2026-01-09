import { createAction } from '@reduxjs/toolkit';
import { Offers } from '../types/offers';
import { City } from '../types/city';
import { AuthorizationStatus } from '../const';
import { AuthInfo } from '../types/auth-info';

export const setCity = createAction<City>('data/setCity');

export const setOffers = createAction<Offers>('data/setOffers');

export const setOffersDataLoadingStatus = createAction<boolean>(
  'data/setOffersDataLoadingStatus'
);

export const requireAuthorization = createAction<AuthorizationStatus>(
  'user/requireAuthorization'
);

export const setError = createAction<string | null>('main/setError');

export const setAuthInfo = createAction<AuthInfo | null>('user/setAuthInfo');

export const redirectToRoute = createAction<string>('main/redirectToRoute');
