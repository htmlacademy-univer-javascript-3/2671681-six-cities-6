import { datatype, address, image, name, internet, lorem } from 'faker';
import { CityNames } from '../const';
import { City, Location } from '../types/city';
import { OfferBase, OfferFull } from '../types/offers';
import { Review } from '../types/reviews';
import { AuthInfo } from '../types/auth-info';
import { User } from '../types/user';
import { createAPI } from '../services/api';
import { Action, ThunkDispatch } from '@reduxjs/toolkit';
import { State } from '../types/state';

export type AppThunkDispatch = ThunkDispatch<State, ReturnType<typeof createAPI>, Action>;

export const extractActionsTypes = (actions: Action<string>[]) => actions.map(({ type }) => type);

export const makeFakeLocation = (): Location => ({
  latitude: Number(address.latitude()),
  longitude: Number(address.longitude()),
  zoom: datatype.number({ min: 5, max: 18 }),
});


export const makeFakeCity = (): City => ({
  name: CityNames.Paris,
  location: makeFakeLocation(),
});


export const makeFakeUser = (): User => ({
  name: name.findName(),
  avatarUrl: image.avatar(),
  isPro: datatype.boolean(),
});


export const makeFakeAuthInfo = (): AuthInfo => ({
  name: name.findName(),
  avatarUrl: image.avatar(),
  isPro: datatype.boolean(),
  email: internet.email(),
  token: datatype.uuid(),
});


export const makeFakeOfferBase = (): OfferBase => ({
  id: datatype.uuid(),
  title: lorem.words(3),
  type: 'apartment',
  price: datatype.number({ min: 50, max: 500 }),
  city: makeFakeCity(),
  location: makeFakeLocation(),
  isFavorite: datatype.boolean(),
  isPremium: datatype.boolean(),
  rating: datatype.float({ min: 1, max: 5, precision: 0.1 }),
  previewImage: image.imageUrl(),
});


export const makeFakeOfferFull = (): OfferFull => ({
  ...makeFakeOfferBase(),
  description: lorem.sentences(2),
  bedrooms: datatype.number({ min: 1, max: 5 }),
  goods: ['Wi-Fi', 'Heating', 'Kitchen', 'Cable TV'].slice(0, datatype.number({ min: 1, max: 4 })),
  host: makeFakeUser(),
  images: new Array(5).fill(null).map(() => image.imageUrl()),
  maxAdults: datatype.number({ min: 1, max: 6 }),
});


export const makeFakeReview = (): Review => ({
  id: datatype.uuid(),
  date: new Date().toISOString(),
  user: makeFakeUser(),
  comment: lorem.sentence(),
  rating: datatype.number({ min: 1, max: 5 }),
});
