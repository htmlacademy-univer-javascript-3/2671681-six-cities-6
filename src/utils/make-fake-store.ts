import { State } from '../types/state';
import { AuthorizationStatus, DefaultCity, NameSpace } from '../const';

export const makeFakeStore = (initialState?: Partial<State>): Partial<State> => ({
  [NameSpace.Main]: {
    city: DefaultCity,
    offers: [],
    isOffersDataLoading: false,
    error: null,
  },
  [NameSpace.Offer]: {
    offer: null,
    nearbyOffers: [],
    reviews: [],
    isOfferDataLoading: false,
    isNearbyOffersDataLoading: false,
    isReviewsDataLoading: false,
    isReviewDataPosting: false,
  },
  [NameSpace.User]: {
    authorizationStatus: AuthorizationStatus.NoAuth,
    authInfo: null,
  },
  [NameSpace.Favorite]: {
    offers: [],
    isOffersDataLoading: false,
    isOfferStatusUpdating: false,
  },
  ...initialState,
});
