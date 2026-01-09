import { createReducer } from '@reduxjs/toolkit';
import {
  requireAuthorization,
  setCity,
  setError,
  setOffers,
  setOffersDataLoadingStatus,
  setAuthInfo,
  setOffer,
  setNearbyOffers,
  setReviews,
  setNearbyOffersDataLoadingStatus,
  setReviewsDataLoadingStatus,
  setReviewDataPostingStatus,
  setOfferDataLoadingStatus,
} from './action';
import { AuthorizationStatus, CITIES, CityNames } from '../const';
import { City } from '../types/city';
import { OfferFull, Offers } from '../types/offers';
import { AuthInfo } from '../types/auth-info';
import { Reviews } from '../types/reviews';

type InitialState = {
  city: City;
  offers: Offers;
  isOffersDataLoading: boolean;
  isOfferDataLoading: boolean;
  isNearbyOffersDataLoading: boolean;
  isReviewsDataLoading: boolean;
  isReviewDataPosting: boolean;
  authorizationStatus: AuthorizationStatus;
  error: string | null;
  authInfo: AuthInfo | null;
  offer: OfferFull | null;
  nearbyOffers: Offers;
  reviews: Reviews;
};

const initialState: InitialState = {
  city: CITIES.find((city) => city.name === CityNames.Paris)!,
  offers: [],
  isOffersDataLoading: false,
  isOfferDataLoading: false,
  isNearbyOffersDataLoading: false,
  isReviewsDataLoading: false,
  isReviewDataPosting: false,
  authorizationStatus: AuthorizationStatus.Unknown,
  error: null,
  authInfo: null,
  offer: null,
  nearbyOffers: [],
  reviews: [],
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setCity, (state, action) => {
      state.city = action.payload;
    })
    .addCase(setOffers, (state, action) => {
      state.offers = action.payload;
    })
    .addCase(setOffersDataLoadingStatus, (state, action) => {
      state.isOffersDataLoading = action.payload;
    })
    .addCase(setOfferDataLoadingStatus, (state, action) => {
      state.isOfferDataLoading = action.payload;
    })
    .addCase(setNearbyOffersDataLoadingStatus, (state, action) => {
      state.isNearbyOffersDataLoading = action.payload;
    })
    .addCase(setReviewsDataLoadingStatus, (state, action) => {
      state.isReviewsDataLoading = action.payload;
    })
    .addCase(setReviewDataPostingStatus, (state, action) => {
      state.isReviewDataPosting = action.payload;
    })
    .addCase(requireAuthorization, (state, action) => {
      state.authorizationStatus = action.payload;
    })
    .addCase(setError, (state, action) => {
      state.error = action.payload;
    })
    .addCase(setAuthInfo, (state, action) => {
      state.authInfo = action.payload;
    })
    .addCase(setOffer, (state, action) => {
      state.offer = action.payload;
    })
    .addCase(setNearbyOffers, (state, action) => {
      state.nearbyOffers = action.payload;
    })
    .addCase(setReviews, (state, action) => {
      state.reviews = action.payload;
    });
});

export { reducer };
