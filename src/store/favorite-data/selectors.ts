import { NameSpace } from '../../const';
import { Offers } from '../../types/offers';
import { State } from '../../types/state';

export const getFavoriteOffers = (state: State): Offers => state[NameSpace.Favorite].offers;

export const getFavoriteOffersDataLoadingStatus = (state: State): boolean => state[NameSpace.Favorite].isOffersDataLoading;

export const getFavoriteOfferUpdatingStatus = (state: State): boolean => state[NameSpace.Favorite].isOfferStatusUpdating;
