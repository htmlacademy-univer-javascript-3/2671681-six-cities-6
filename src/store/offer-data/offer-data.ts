import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { OfferData } from '../../types/state';
import { NameSpace } from '../../const';
import {
  fetchNearbyOffersAction,
  fetchOfferAction,
  fetchOfferReviewsAction,
  logoutAction,
  sendOfferReviewAction,
  updateFavoriteAction,
} from '../api-actions';
import { OfferFull, Offers } from '../../types/offers';
import { Review } from '../../types/reviews';

const initialState: OfferData = {
  offer: null,
  nearbyOffers: [],
  reviews: [],
  isOfferDataLoading: false,
  isNearbyOffersDataLoading: false,
  isReviewsDataLoading: false,
  isReviewDataPosting: false,
};

export const offerData = createSlice({
  name: NameSpace.Offer,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchOfferAction.pending, (state) => {
        state.isOfferDataLoading = true;
      })
      .addCase(
        fetchOfferAction.fulfilled,
        (state, action: PayloadAction<OfferFull | null>) => {
          state.offer = action.payload;
          state.isOfferDataLoading = false;
        }
      )
      .addCase(fetchOfferAction.rejected, (state) => {
        state.isOfferDataLoading = false;
        state.offer = null;
      })

      .addCase(fetchNearbyOffersAction.pending, (state) => {
        state.isNearbyOffersDataLoading = true;
      })
      .addCase(
        fetchNearbyOffersAction.fulfilled,
        (state, action: PayloadAction<Offers>) => {
          state.nearbyOffers = action.payload;
          state.isNearbyOffersDataLoading = false;
        }
      )
      .addCase(fetchNearbyOffersAction.rejected, (state) => {
        state.nearbyOffers = [];
        state.isNearbyOffersDataLoading = false;
      })

      .addCase(fetchOfferReviewsAction.pending, (state) => {
        state.isReviewsDataLoading = true;
      })
      .addCase(fetchOfferReviewsAction.fulfilled, (state, action) => {
        state.reviews = action.payload;
        state.isReviewsDataLoading = false;
      })
      .addCase(fetchOfferReviewsAction.rejected, (state) => {
        state.reviews = [];
        state.isReviewsDataLoading = false;
      })

      .addCase(sendOfferReviewAction.pending, (state) => {
        state.isReviewDataPosting = true;
      })
      .addCase(
        sendOfferReviewAction.fulfilled,
        (state, action: PayloadAction<Review>) => {
          state.reviews = [action.payload, ...state.reviews];
          state.isReviewDataPosting = false;
        }
      )
      .addCase(sendOfferReviewAction.rejected, (state) => {
        state.isReviewDataPosting = false;
      })
      .addCase(updateFavoriteAction.fulfilled, (state, action) => {
        const updatedOffer = action.payload;
        const updatedOfferIndex = state.nearbyOffers.findIndex((offer) => offer.id === updatedOffer.id);

        if (state.offer?.id === updatedOffer.id) {
          state.offer = updatedOffer;
        }

        if (updatedOfferIndex !== -1) {
          state.nearbyOffers[updatedOfferIndex] = action.payload;
        }
      })
      .addCase(logoutAction.fulfilled, (state) => {
        if (state.offer) {
          state.offer.isFavorite = false;
        }

        state.nearbyOffers = state.nearbyOffers.map((offer) => ({...offer, isFavorite: false}));
      });
  },
});
