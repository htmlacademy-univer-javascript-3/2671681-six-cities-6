import { describe, it, expect } from 'vitest';
import { offerData } from './offer-data';
import { OfferData } from '../../types/state';
import {
  fetchOfferAction,
  fetchNearbyOffersAction,
  fetchOfferReviewsAction,
  sendOfferReviewAction,
  updateFavoriteAction,
  logoutAction,
} from '../api-actions';
import { makeFakeOfferFull, makeFakeOfferBase, makeFakeReview } from '../../utils/test-mocks';

describe('offerData', () => {
  const initialState: OfferData = {
    offer: null,
    nearbyOffers: [],
    reviews: [],
    isOfferDataLoading: false,
    isNearbyOffersDataLoading: false,
    isReviewsDataLoading: false,
    isReviewDataPosting: false,
  };

  it('should return initial state with undefined', () => {
    const action = { type: 'unknown' };
    const result = offerData.reducer(undefined, action);

    expect(result).toEqual(initialState);
  });

  describe('fetchOfferAction', () => {
    it('should set isOfferDataLoading to true on pending', () => {
      const action = { type: fetchOfferAction.pending.type };
      const result = offerData.reducer(initialState, action);

      expect(result.isOfferDataLoading).toBe(true);
    });

    it('should set offer and isOfferDataLoading to false on fulfilled', () => {
      const offer = makeFakeOfferFull();
      const action = {
        type: fetchOfferAction.fulfilled.type,
        payload: offer,
      };
      const result = offerData.reducer(initialState, action);

      expect(result.offer).toEqual(offer);
      expect(result.isOfferDataLoading).toBe(false);
    });

    it('should set offer to null and isOfferDataLoading to false on rejected', () => {
      const stateWithOffer = { ...initialState, offer: makeFakeOfferFull(), isOfferDataLoading: true };
      const action = { type: fetchOfferAction.rejected.type };
      const result = offerData.reducer(stateWithOffer, action);

      expect(result.offer).toBeNull();
      expect(result.isOfferDataLoading).toBe(false);
    });
  });

  describe('fetchNearbyOffersAction', () => {
    it('should set isNearbyOffersDataLoading to true on pending', () => {
      const action = { type: fetchNearbyOffersAction.pending.type };
      const result = offerData.reducer(initialState, action);

      expect(result.isNearbyOffersDataLoading).toBe(true);
    });

    it('should set nearbyOffers and isNearbyOffersDataLoading to false on fulfilled', () => {
      const nearbyOffers = [makeFakeOfferBase(), makeFakeOfferBase()];
      const action = {
        type: fetchNearbyOffersAction.fulfilled.type,
        payload: nearbyOffers,
      };
      const result = offerData.reducer(initialState, action);

      expect(result.nearbyOffers).toEqual(nearbyOffers);
      expect(result.isNearbyOffersDataLoading).toBe(false);
    });

    it('should set nearbyOffers to empty array and isNearbyOffersDataLoading to false on rejected', () => {
      const stateWithOffers = {
        ...initialState,
        nearbyOffers: [makeFakeOfferBase()],
        isNearbyOffersDataLoading: true,
      };
      const action = { type: fetchNearbyOffersAction.rejected.type };
      const result = offerData.reducer(stateWithOffers, action);

      expect(result.nearbyOffers).toEqual([]);
      expect(result.isNearbyOffersDataLoading).toBe(false);
    });
  });

  describe('fetchOfferReviewsAction', () => {
    it('should set isReviewsDataLoading to true on pending', () => {
      const action = { type: fetchOfferReviewsAction.pending.type };
      const result = offerData.reducer(initialState, action);

      expect(result.isReviewsDataLoading).toBe(true);
    });

    it('should set reviews and isReviewsDataLoading to false on fulfilled', () => {
      const reviews = [makeFakeReview(), makeFakeReview()];
      const action = {
        type: fetchOfferReviewsAction.fulfilled.type,
        payload: reviews,
      };
      const result = offerData.reducer(initialState, action);

      expect(result.reviews).toEqual(reviews);
      expect(result.isReviewsDataLoading).toBe(false);
    });

    it('should set reviews to empty array and isReviewsDataLoading to false on rejected', () => {
      const stateWithReviews = {
        ...initialState,
        reviews: [makeFakeReview()],
        isReviewsDataLoading: true,
      };
      const action = { type: fetchOfferReviewsAction.rejected.type };
      const result = offerData.reducer(stateWithReviews, action);

      expect(result.reviews).toEqual([]);
      expect(result.isReviewsDataLoading).toBe(false);
    });
  });

  describe('sendOfferReviewAction', () => {
    it('should set isReviewDataPosting to true on pending', () => {
      const action = { type: sendOfferReviewAction.pending.type };
      const result = offerData.reducer(initialState, action);

      expect(result.isReviewDataPosting).toBe(true);
    });

    it('should add review to beginning of reviews array and set isReviewDataPosting to false on fulfilled', () => {
      const existingReview = makeFakeReview();
      const newReview = { ...makeFakeReview(), id: '2', comment: 'New comment' };
      const state = { ...initialState, reviews: [existingReview] };
      const action = {
        type: sendOfferReviewAction.fulfilled.type,
        payload: newReview,
      };
      const result = offerData.reducer(state, action);

      expect(result.reviews).toHaveLength(2);
      expect(result.reviews[0]).toEqual(newReview);
      expect(result.reviews[1]).toEqual(existingReview);
      expect(result.isReviewDataPosting).toBe(false);
    });

    it('should set isReviewDataPosting to false on rejected', () => {
      const stateWithPosting = { ...initialState, isReviewDataPosting: true };
      const action = { type: sendOfferReviewAction.rejected.type };
      const result = offerData.reducer(stateWithPosting, action);

      expect(result.isReviewDataPosting).toBe(false);
    });
  });

  describe('updateFavoriteAction', () => {
    it('should update offer if it matches current offer id', () => {
      const currentOffer = makeFakeOfferFull();
      const updatedOffer = { ...currentOffer, isFavorite: true };
      const state = { ...initialState, offer: currentOffer };
      const action = {
        type: updateFavoriteAction.fulfilled.type,
        payload: updatedOffer,
      };
      const result = offerData.reducer(state, action);

      expect(result.offer).toEqual(updatedOffer);
      expect(result.offer?.isFavorite).toBe(true);
    });

    it('should update nearby offer if it exists in nearbyOffers', () => {
      const nearbyOffer = makeFakeOfferBase();
      const updatedOffer = { ...nearbyOffer, isFavorite: true };
      const state = { ...initialState, nearbyOffers: [nearbyOffer] };
      const action = {
        type: updateFavoriteAction.fulfilled.type,
        payload: updatedOffer,
      };
      const result = offerData.reducer(state, action);

      expect(result.nearbyOffers[0]).toEqual(updatedOffer);
      expect(result.nearbyOffers[0].isFavorite).toBe(true);
    });

    it('should update both offer and nearbyOffer if they match', () => {
      const offerId = '1';
      const currentOffer = { ...makeFakeOfferFull(), id: offerId };
      const nearbyOffer = { ...makeFakeOfferBase(), id: offerId };
      const updatedOffer = { ...currentOffer, isFavorite: true };
      const state = {
        ...initialState,
        offer: currentOffer,
        nearbyOffers: [nearbyOffer],
      };
      const action = {
        type: updateFavoriteAction.fulfilled.type,
        payload: updatedOffer,
      };
      const result = offerData.reducer(state, action);

      expect(result.offer).toEqual(updatedOffer);
      expect(result.nearbyOffers[0]).toEqual(updatedOffer);
    });
  });

  describe('logoutAction', () => {
    it('should set offer isFavorite to false if offer exists', () => {
      const offer = { ...makeFakeOfferFull(), isFavorite: true };
      const state = { ...initialState, offer };
      const action = { type: logoutAction.fulfilled.type };
      const result = offerData.reducer(state, action);

      expect(result.offer?.isFavorite).toBe(false);
    });

    it('should set all nearbyOffers isFavorite to false', () => {
      const nearbyOffers = [
        { ...makeFakeOfferBase(), id: '1', isFavorite: true },
        { ...makeFakeOfferBase(), id: '2', isFavorite: true },
      ];
      const state = { ...initialState, nearbyOffers };
      const action = { type: logoutAction.fulfilled.type };
      const result = offerData.reducer(state, action);

      expect(result.nearbyOffers[0].isFavorite).toBe(false);
      expect(result.nearbyOffers[1].isFavorite).toBe(false);
    });

    it('should handle logout when offer is null', () => {
      const nearbyOffers = [
        { ...makeFakeOfferBase(), id: '1', isFavorite: true },
      ];
      const state = { ...initialState, offer: null, nearbyOffers };
      const action = { type: logoutAction.fulfilled.type };
      const result = offerData.reducer(state, action);

      expect(result.offer).toBeNull();
      expect(result.nearbyOffers[0].isFavorite).toBe(false);
    });
  });
});
