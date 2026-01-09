import { createReducer } from '@reduxjs/toolkit';
import {
  requireAuthorization,
  setCity,
  setError,
  setOffers,
  setOffersDataLoadingStatus,
  setAuthInfo,
} from './action';
import { AuthorizationStatus, CITIES, CityNames } from '../const';
import { City } from '../types/city';
import { Offers } from '../types/offers';
import { AuthInfo } from '../types/auth-info';

type InitialState = {
  city: City;
  offers: Offers;
  isOffersDataLoading: boolean;
  authorizationStatus: AuthorizationStatus;
  error: string | null;
  authInfo: AuthInfo | null;
};

const initialState: InitialState = {
  city: CITIES.find((city) => city.name === CityNames.Paris)!,
  offers: [],
  isOffersDataLoading: false,
  authorizationStatus: AuthorizationStatus.Unknown,
  error: null,
  authInfo: null,
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
    .addCase(requireAuthorization, (state, action) => {
      state.authorizationStatus = action.payload;
    })
    .addCase(setError, (state, action) => {
      state.error = action.payload;
    })
    .addCase(setAuthInfo, (state, action) => {
      state.authInfo = action.payload;
    });
});

export { reducer };
