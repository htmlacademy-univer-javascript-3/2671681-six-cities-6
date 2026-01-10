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

export const getCityOffers = (state: State) => {
  const offers = state[NameSpace.Main].offers;
  const city = state[NameSpace.Main].city;
  return offers.filter((offer) => offer.city.name === city.name);
};
