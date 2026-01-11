import { createSelector } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { State } from '../../types/state';

export const getMainData = (state: State) => state[NameSpace.Main];

export const getCity = (state: State) =>
  state[NameSpace.Main].city;

export const getOffers = (state: State) =>
  state[NameSpace.Main].offers;

export const getIsOffersDataLoading = (state: State) =>
  state[NameSpace.Main].isOffersDataLoading;

export const getError = (state: State) =>
  state[NameSpace.Main].error;

export const getCityOffers = createSelector(
  [getOffers, getCity],
  (offers, city) => offers.filter((offer) => offer.city.name === city.name)
);
