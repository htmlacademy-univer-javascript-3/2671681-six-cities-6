import { createReducer } from '@reduxjs/toolkit';
import { setCity, setOffers, setOffersDataLoadingStatus } from './action';
import { CITIES, CityNames } from '../const';
import { City } from '../types/city';
import { Offers } from '../types/offers';

type InitialState = {
  city: City;
  offers: Offers;
  isOffersDataLoading: boolean;
};

const initialState: InitialState = {
  city: CITIES.find((city) => city.name === CityNames.Paris)!,
  offers: [],
  isOffersDataLoading: false,
};

const reducer = createReducer(initialState, (builder) => {
  builder.addCase(setCity, (state, action) => {
    state.city = action.payload;
  });
  builder.addCase(setOffers, (state, action) => {
    state.offers = action.payload;
  });
  builder.addCase(setOffersDataLoadingStatus, (state, action) => {
    state.isOffersDataLoading = action.payload;
  });
});

export { reducer };
