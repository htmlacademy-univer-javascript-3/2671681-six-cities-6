import { createReducer } from '@reduxjs/toolkit';
import { offers } from '../mocks/offers';
import { setCity, setOffers } from './action';
import { cities } from '../mocks/cities';
import { CityNames } from '../const';

const initialState = {
  city: cities.find((city) => city.name === CityNames.Paris)!,
  offers: offers.filter((offer) => offer.city === CityNames.Paris),
};

const reducer = createReducer(initialState, (builder) => {
  builder.addCase(setCity, (state, action) => {
    state.city = action.payload.city;
  });
  builder.addCase(setOffers, (state, action) => {
    state.offers = action.payload.offers;
  });
});

export { reducer };
