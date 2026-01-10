import { Cities, City } from './types/city';
import { OfferBase } from './types/offers';

export const URL_MARKER_DEFAULT = '/img/pin.svg';
export const URL_MARKER_CURRENT = '/img/pin-active.svg';

export const TIMEOUT_SHOW_ERROR = 2000;

export const MAX_NEARBY_OFFERS_COUNT = 3;
export const MAX_REVIEWS_COUNT_PER_PAGE = 10;
export const MAX_RATING = 5;
export const MAX_IMAGES = 6;

export const MIN_COMMENT_LENGTH = 50;
export const MAX_COMMENT_LENGTH = 300;

export const AppRoute = {
  Main: '/',
  Login: '/login',
  Favorites: '/favorites',
  OfferTemplate: '/offer/:id',
  Offer: (id: OfferBase['id']) => `/offer/${id}`,
  NotFound: '/not-found',
};

export const APIRoute = {
  Offers: '/offers',
  Login: '/login',
  Logout: '/logout',
  Favorite: '/favorite',
  Offer: (offerId: string) => `/offers/${offerId}`,
  OffersNearby: (offerId: string) => `/offers/${offerId}/nearby`,
  Reviews: (offerId: string) => `/comments/${offerId}`,
  SendReview: (offerId: string) => `/comments/${offerId}`,
  ChangeFavoriteOfferStatus: (offerId: string, setIsFavorite: boolean) => `/favorite/${offerId}/${setIsFavorite ? 1 : 0}`,
};

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

export enum CityNames {
  Paris = 'Paris',
  Cologne = 'Cologne',
  Brussels = 'Brussels',
  Amsterdam = 'Amsterdam',
  Hamburg = 'Hamburg',
  Dusseldorf = 'Dusseldorf',
}

export const CITIES: Cities = [
  {
    name: CityNames.Paris,
    location: {
      latitude: 48.85341,
      longitude: 2.3488,
      zoom: 10,
    },
  },
  {
    name: CityNames.Cologne,
    location: {
      latitude: 50.93333,
      longitude: 6.95,
      zoom: 10,
    },
  },
  {
    name: CityNames.Brussels,
    location: {
      latitude: 50.85045,
      longitude: 4.34878,
      zoom: 10,
    },
  },
  {
    name: CityNames.Amsterdam,
    location: {
      latitude: 52.37403,
      longitude: 4.88969,
      zoom: 10,
    },
  },
  {
    name: CityNames.Hamburg,
    location: {
      latitude: 53.551085,
      longitude: 9.993682,
      zoom: 10,
    },
  },
  {
    name: CityNames.Dusseldorf,
    location: {
      latitude: 51.22172,
      longitude: 6.77616,
      zoom: 10,
    },
  },
];

export const DefaultCity: City = CITIES.find(
  (city) => city.name === CityNames.Paris
)!;

export enum NameSpace {
  Main = 'MAIN',
  User = 'USER',
  Offer = 'OFFER',
  Favorite = 'FAVORITE',
}
