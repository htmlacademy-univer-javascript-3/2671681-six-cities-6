import { NameSpace } from '../../const';
import { State } from '../../types/state';
import { Offers } from '../../types/offers';
import { Reviews } from '../../types/reviews';

export const getOfferData = (state: State) => state[NameSpace.Offer];

export const getOffer = (state: State) =>
  state[NameSpace.Offer].offer;

export const getNearbyOffers = (state: State): Offers =>
  state[NameSpace.Offer].nearbyOffers;

export const getReviews = (state: State): Reviews =>
  state[NameSpace.Offer].reviews;

export const getIsOfferDataLoading = (state: State): boolean =>
  state[NameSpace.Offer].isOfferDataLoading;

export const getIsNearbyOffersDataLoading = (state: State): boolean =>
  state[NameSpace.Offer].isNearbyOffersDataLoading;

export const getIsReviewsDataLoading = (state: State): boolean =>
  state[NameSpace.Offer].isReviewsDataLoading;

export const getIsReviewDataPosting = (state: State): boolean =>
  state[NameSpace.Offer].isReviewDataPosting;
