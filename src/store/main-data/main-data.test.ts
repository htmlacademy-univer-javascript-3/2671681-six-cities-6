import { describe, it, expect } from 'vitest';
import { mainData } from './main-data';
import { MainData } from '../../types/state';
import { DefaultCity } from '../../const';
import { fetchOffersAction, logoutAction, updateFavoriteAction } from '../api-actions';
import { setCity, setError } from './main-data';
import { makeFakeOfferBase, makeFakeCity } from '../../utils/test-mocks';

describe('mainData', () => {
  const initialState: MainData = {
    city: DefaultCity,
    offers: [],
    isOffersDataLoading: false,
    error: null,
  };

  it('should return initial state with undefined', () => {
    const action = { type: 'unknown' };
    const result = mainData.reducer(undefined, action);

    expect(result).toEqual(initialState);
  });

  it('should set city with setCity action', () => {
    const newCity = makeFakeCity();
    const action = setCity(newCity);
    const result = mainData.reducer(initialState, action);

    expect(result.city).toEqual(newCity);
  });

  it('should set error with setError action', () => {
    const errorMessage = 'Test error';
    const action = setError(errorMessage);
    const result = mainData.reducer(initialState, action);

    expect(result.error).toBe(errorMessage);
  });

  it('should clear error with setError action', () => {
    const stateWithError = { ...initialState, error: 'Some error' };
    const action = setError(null);
    const result = mainData.reducer(stateWithError, action);

    expect(result.error).toBeNull();
  });

  it('should set isOffersDataLoading to true on fetchOffersAction.pending', () => {
    const action = { type: fetchOffersAction.pending.type };
    const result = mainData.reducer(initialState, action);

    expect(result.isOffersDataLoading).toBe(true);
  });

  it('should set offers and isOffersDataLoading to false on fetchOffersAction.fulfilled', () => {
    const offers = [makeFakeOfferBase(), makeFakeOfferBase()];
    const action = {
      type: fetchOffersAction.fulfilled.type,
      payload: offers,
    };
    const result = mainData.reducer(initialState, action);

    expect(result.offers).toEqual(offers);
    expect(result.isOffersDataLoading).toBe(false);
  });

  it('should set isOffersDataLoading to false on fetchOffersAction.rejected', () => {
    const loadingState = { ...initialState, isOffersDataLoading: true };
    const action = { type: fetchOffersAction.rejected.type };
    const result = mainData.reducer(loadingState, action);

    expect(result.isOffersDataLoading).toBe(false);
  });

  it('should update offer in offers array on updateFavoriteAction.fulfilled', () => {
    const existingOffer = makeFakeOfferBase();
    const updatedOffer = { ...existingOffer, isFavorite: true };
    const state = { ...initialState, offers: [existingOffer] };
    const action = {
      type: updateFavoriteAction.fulfilled.type,
      payload: updatedOffer,
    };
    const result = mainData.reducer(state, action);

    expect(result.offers[0]).toEqual(updatedOffer);
    expect(result.offers[0].isFavorite).toBe(true);
  });

  it('should not update offer if it is not in offers array on updateFavoriteAction.fulfilled', () => {
    const existingOffer = makeFakeOfferBase();
    const otherOffer = { ...makeFakeOfferBase(), id: '2' };
    const state = { ...initialState, offers: [existingOffer] };
    const action = {
      type: updateFavoriteAction.fulfilled.type,
      payload: otherOffer,
    };
    const result = mainData.reducer(state, action);

    expect(result.offers).toEqual([existingOffer]);
  });

  it('should set all offers isFavorite to false on logoutAction.fulfilled', () => {
    const offers = [
      { ...makeFakeOfferBase(), id: '1', isFavorite: true },
      { ...makeFakeOfferBase(), id: '2', isFavorite: true },
    ];
    const state = { ...initialState, offers };
    const action = { type: logoutAction.fulfilled.type };
    const result = mainData.reducer(state, action);

    expect(result.offers[0].isFavorite).toBe(false);
    expect(result.offers[1].isFavorite).toBe(false);
  });
});
