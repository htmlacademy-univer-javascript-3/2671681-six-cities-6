import { NameSpace } from '../../const';
import { State } from '../../types/state';
import { City } from '../../types/city';
import { Offers } from '../../types/offers';

export const getCity = (state: State): City => state[NameSpace.Main].city;

export const getOffers = (state: State): Offers => state[NameSpace.Main].offers;

export const getIsOffersDataLoading = (state: State): boolean =>
  state[NameSpace.Main].isOffersDataLoading;

export const getError = (state: State): string | null =>
  state[NameSpace.Main].error;
