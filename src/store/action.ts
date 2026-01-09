import { createAction } from '@reduxjs/toolkit';
import { OfferFull, Offers } from '../types/offers';
import { City } from '../types/city';
import { AuthorizationStatus } from '../const';
import { AuthInfo } from '../types/auth-info';
import { Reviews } from '../types/reviews';

export const setCity = createAction<City>('data/setCity');

export const setOffers = createAction<Offers>('data/setOffers');

export const setOffersDataLoadingStatus = createAction<boolean>(
  'data/setOffersDataLoadingStatus'
);
export const setOfferDataLoadingStatus = createAction<boolean>(
  'data/setOfferDataLoadingStatus'
);
export const setNearbyOffersDataLoadingStatus = createAction<boolean>(
  'data/setNearbyOffersDataLoadingStatus'
);
export const setReviewsDataLoadingStatus = createAction<boolean>(
  'data/setReviewsDataLoadingStatus'
);
export const setReviewDataPostingStatus = createAction<boolean>(
  'data/setReviewDataPostingStatus'
);

export const setOfferReviews = createAction<Reviews>('offer/setOfferReviews');

export const requireAuthorization = createAction<AuthorizationStatus>(
  'user/requireAuthorization'
);

export const setError = createAction<string | null>('main/setError');

export const setAuthInfo = createAction<AuthInfo | null>('user/setAuthInfo');

export const redirectToRoute = createAction<string>('main/redirectToRoute');

export const setOffer = createAction<OfferFull>('offer/setOffer');

export const setNearbyOffers = createAction<Offers>('offer/setNearbyOffers');

export const setReviews = createAction<Reviews>('offer/setReviews');
