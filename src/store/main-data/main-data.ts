import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DefaultCity, NameSpace } from '../../const';
import { MainData } from '../../types/state';
import { City } from '../../types/city';
import { fetchOffersAction } from '../api-actions';

const initialState: MainData = {
  city: DefaultCity,
  offers: [],
  isOffersDataLoading: false,
  error: null,
};

export const mainData = createSlice({
  name: NameSpace.Main,
  initialState,
  reducers: {
    setCity: (state, action: PayloadAction<City>) => {
      state.city = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchOffersAction.pending, (state) => {
        state.isOffersDataLoading = true;
      })
      .addCase(fetchOffersAction.fulfilled, (state, action) => {
        state.isOffersDataLoading = false;
        state.offers = action.payload;
      })
      .addCase(fetchOffersAction.rejected, (state) => {
        state.isOffersDataLoading = false;
      });
  },
});

export const { setCity, setError } = mainData.actions;
