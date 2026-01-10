import { createSlice } from '@reduxjs/toolkit';
import { FavoriteData } from '../../types/state';
import { fetchFavoriteOffersAction, logoutAction, updateFavoriteAction } from '../api-actions';
import { NameSpace } from '../../const';

const initialState: FavoriteData = {
  offers: [],
  isOffersDataLoading: false,
  isOfferStatusUpdating: false,
};

export const favoriteData = createSlice({
  name: NameSpace.Favorite,
  initialState,
  reducers: {
    clearFavoriteOffers: (state) => {
      state.offers = [];
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchFavoriteOffersAction.pending, (state) => {
        state.isOffersDataLoading = true;
      })
      .addCase(fetchFavoriteOffersAction.fulfilled, (state, action) => {
        state.isOffersDataLoading = false;
        state.offers = action.payload;
      })
      .addCase(fetchFavoriteOffersAction.rejected, (state) => {
        state.isOffersDataLoading = false;
      })

      .addCase(updateFavoriteAction.pending, (state) => {
        state.isOfferStatusUpdating = true;
      })
      .addCase(updateFavoriteAction.fulfilled, (state, action) => {
        const updatedOffer = action.payload;
        const updatedOfferIndex = state.offers.findIndex((offer) => offer.id === updatedOffer.id);

        if (updatedOffer.isFavorite && updatedOfferIndex === -1) {
          state.offers = [updatedOffer, ...state.offers];
        } else if (updatedOffer.isFavorite) {
          state.offers[updatedOfferIndex] = updatedOffer;
        } else {
          state.offers = state.offers.filter((offer) => offer.id !== updatedOffer.id);
        }

        state.isOfferStatusUpdating = false;
      })
      .addCase(updateFavoriteAction.rejected, (state) => {
        state.isOfferStatusUpdating = false;
      })

      .addCase(logoutAction.fulfilled, (state) => {
        state.offers = [];
      });
  }
});

export const { clearFavoriteOffers } = favoriteData.actions;
