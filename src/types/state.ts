import { AuthorizationStatus } from '../const';
import { store } from '../store';
import { AuthInfo } from './auth-info';
import { City } from './city';
import { OfferFull, Offers } from './offers';
import { Reviews } from './reviews';

export type MainData = {
  city: City;
  offers: Offers;
  isOffersDataLoading: boolean;
  error: string | null;
};

export type OfferData = {
  offer: OfferFull | null;
  nearbyOffers: Offers;
  reviews: Reviews;
  isOfferDataLoading: boolean;
  isNearbyOffersDataLoading: boolean;
  isReviewsDataLoading: boolean;
  isReviewDataPosting: boolean;
};

export type UserProcess = {
  authorizationStatus: AuthorizationStatus;
  authInfo: AuthInfo | null;
};

export type FavoriteData = {
  offers: Offers;
  isOffersDataLoading: boolean;
  isOfferStatusUpdating: boolean;
}

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
