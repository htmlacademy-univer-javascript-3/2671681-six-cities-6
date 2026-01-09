import { Cities } from './types/city';
import { OfferBase } from './types/offers';

export const URL_MARKER_DEFAULT = '/img/pin.svg';
export const URL_MARKER_CURRENT = '/img/pin-active.svg';

export const TIMEOUT_SHOW_ERROR = 2000;

export const AppRoute = {
  Main: '/',
  Login: '/login',
  Favorites: '/favorites',
  OfferTemplate: '/offer/:id',
  Offer: (id: OfferBase['id']) => `/offer/${id}`,
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

//to-do: тут можно const и функции
export enum APIRoute {
  Offers = 'offers',
  Favorite = 'favorite',
  Comments = 'comments',
  Login = 'login',
  Logout = 'logout',
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
