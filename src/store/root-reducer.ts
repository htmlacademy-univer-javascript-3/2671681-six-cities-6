import { combineReducers } from '@reduxjs/toolkit';
import { NameSpace } from '../const';
import { mainData } from './main-data/main-data';
import { offerData } from './offer-data/offer-data';
import { userProcess } from './user-process/user-process';
import { favoriteData } from './favorite-data/favorite-data';

export const rootReducer = combineReducers({
  [NameSpace.Main]: mainData.reducer,
  [NameSpace.Offer]: offerData.reducer,
  [NameSpace.User]: userProcess.reducer,
  [NameSpace.Favorite]:favoriteData.reducer
});
