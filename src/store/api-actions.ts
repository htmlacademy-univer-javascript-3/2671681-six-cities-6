import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, State } from './state';
import { AxiosInstance } from 'axios';
import { setOffers, setOffersDataLoadingStatus } from './action';
import { Offers } from '../types/offers';
import { APIRoute } from '../const';

export const fetchOffersAction = createAsyncThunk<
  void,
  undefined,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('data/fetchOffers', async (_arg, { dispatch, extra: api }) => {
  dispatch(setOffersDataLoadingStatus(true));
  const { data } = await api.get<Offers>(APIRoute.Offers);
  dispatch(setOffersDataLoadingStatus(false));
  dispatch(setOffers(data));
});
