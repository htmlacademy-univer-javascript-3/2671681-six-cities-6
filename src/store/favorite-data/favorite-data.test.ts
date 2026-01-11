import { describe, it, expect } from 'vitest';
import { favoriteData } from './favorite-data';
import { FavoriteData } from '../../types/state';
import {
  fetchFavoriteOffersAction,
  updateFavoriteAction,
  logoutAction,
} from '../api-actions';
import { clearFavoriteOffers } from './favorite-data';
import { makeFakeOfferBase } from '../../utils/test-mocks';

describe('favoriteData', () => {
  const initialState: FavoriteData = {
    offers: [],
    isOffersDataLoading: false,
    isOfferStatusUpdating: false,
  };

  it('should return initial state with undefined', () => {
    const action = { type: 'unknown' };
    const result = favoriteData.reducer(undefined, action);

    expect(result).toEqual(initialState);
  });

  describe('clearFavoriteOffers', () => {
    it('should clear offers array', () => {
      const offers = [makeFakeOfferBase(), makeFakeOfferBase()];
      const state = { ...initialState, offers };
      const action = clearFavoriteOffers();
      const result = favoriteData.reducer(state, action);

      expect(result.offers).toEqual([]);
    });
  });

  describe('fetchFavoriteOffersAction', () => {
    it('should set isOffersDataLoading to true on pending', () => {
      const action = { type: fetchFavoriteOffersAction.pending.type };
      const result = favoriteData.reducer(initialState, action);

      expect(result.isOffersDataLoading).toBe(true);
    });

    it('should set offers and isOffersDataLoading to false on fulfilled', () => {
      const offers = [makeFakeOfferBase(), makeFakeOfferBase()];
      const action = {
        type: fetchFavoriteOffersAction.fulfilled.type,
        payload: offers,
      };
      const result = favoriteData.reducer(initialState, action);

      expect(result.offers).toEqual(offers);
      expect(result.isOffersDataLoading).toBe(false);
    });

    it('should set isOffersDataLoading to false on rejected', () => {
      const loadingState = { ...initialState, isOffersDataLoading: true };
      const action = { type: fetchFavoriteOffersAction.rejected.type };
      const result = favoriteData.reducer(loadingState, action);

      expect(result.isOffersDataLoading).toBe(false);
    });
  });

  describe('updateFavoriteAction', () => {
    it('should set isOfferStatusUpdating to true on pending', () => {
      const action = { type: updateFavoriteAction.pending.type };
      const result = favoriteData.reducer(initialState, action);

      expect(result.isOfferStatusUpdating).toBe(true);
    });

    it('should add offer to offers array if it is favorite and not exists', () => {
      const newOffer = { ...makeFakeOfferBase(), id: '1', isFavorite: true };
      const action = {
        type: updateFavoriteAction.fulfilled.type,
        payload: newOffer,
      };
      const result = favoriteData.reducer(initialState, action);

      expect(result.offers).toHaveLength(1);
      expect(result.offers[0]).toEqual(newOffer);
      expect(result.isOfferStatusUpdating).toBe(false);
    });

    it('should update offer in offers array if it is favorite and exists', () => {
      const existingOffer = { ...makeFakeOfferBase(), id: '1', isFavorite: true };
      const updatedOffer = { ...existingOffer, title: 'Updated Title' };
      const state = { ...initialState, offers: [existingOffer] };
      const action = {
        type: updateFavoriteAction.fulfilled.type,
        payload: updatedOffer,
      };
      const result = favoriteData.reducer(state, action);

      expect(result.offers).toHaveLength(1);
      expect(result.offers[0]).toEqual(updatedOffer);
      expect(result.isOfferStatusUpdating).toBe(false);
    });

    it('should remove offer from offers array if it is not favorite', () => {
      const existingOffer = { ...makeFakeOfferBase(), id: '1', isFavorite: true };
      const updatedOffer = { ...existingOffer, isFavorite: false };
      const state = { ...initialState, offers: [existingOffer] };
      const action = {
        type: updateFavoriteAction.fulfilled.type,
        payload: updatedOffer,
      };
      const result = favoriteData.reducer(state, action);

      expect(result.offers).toEqual([]);
      expect(result.isOfferStatusUpdating).toBe(false);
    });

    it('should add offer to beginning of array when adding new favorite', () => {
      const existingOffer = { ...makeFakeOfferBase(), id: '1', isFavorite: true };
      const newOffer = { ...makeFakeOfferBase(), id: '2', isFavorite: true };
      const state = { ...initialState, offers: [existingOffer] };
      const action = {
        type: updateFavoriteAction.fulfilled.type,
        payload: newOffer,
      };
      const result = favoriteData.reducer(state, action);

      expect(result.offers).toHaveLength(2);
      expect(result.offers[0]).toEqual(newOffer);
      expect(result.offers[1]).toEqual(existingOffer);
    });

    it('should set isOfferStatusUpdating to false on rejected', () => {
      const updatingState = { ...initialState, isOfferStatusUpdating: true };
      const action = { type: updateFavoriteAction.rejected.type };
      const result = favoriteData.reducer(updatingState, action);

      expect(result.isOfferStatusUpdating).toBe(false);
    });
  });

  describe('logoutAction', () => {
    it('should clear offers array on fulfilled', () => {
      const offers = [makeFakeOfferBase(), makeFakeOfferBase()];
      const state = { ...initialState, offers };
      const action = { type: logoutAction.fulfilled.type };
      const result = favoriteData.reducer(state, action);

      expect(result.offers).toEqual([]);
    });
  });
});
