import { CityNames } from '../const';
import { City, Location } from './city';
import { User } from './user';

export type OfferId = string;

export type OfferBase = {
  id: OfferId;
  title: string;
  type: string;
  price: number;
  city: City;
  location: Location;
  isFavorite: boolean;
  isPremium: boolean;
  rating: number;
  previewImage: string;
};

export type OfferFull = OfferBase & {
  description: string;
  bedrooms: number;
  goods: string[];
  host: User;
  images: string[];
  maxAdults: number;
};

export type Offers = OfferBase[];

export type OffersByCityItem = {
  city: CityNames;
  offers: OfferBase[];
};

export type OffersByCityItems = OffersByCityItem[];
