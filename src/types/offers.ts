import { CityNames } from '../const';

export type Features = {
  type: string;
  bedrooms: number;
  maxAdults: number;
};

export type WhoMeet = {
  photo: string;
  name: string;
  pro: boolean;
  description: string[];
};

export type Point = {
  lat: number;
  lng: number;
};

export type Offer = {
  id: number;
  premium: boolean;
  bookmark: boolean;
  title: string;
  city: CityNames;
  rating: number;
  photo: string[];
  features: Features;
  price: number;
  inside: string[];
  whoMeet: WhoMeet;
  point: Point;
};

export type Offers = Offer[];

export type OffersByCityItem = {
  city: CityNames;
  offers: Offer[];
};

export type OffersByCityItems = OffersByCityItem[];
