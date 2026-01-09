import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, State } from './state';
import { AxiosInstance } from 'axios';
import {
  redirectToRoute,
  requireAuthorization,
  setAuthInfo,
  setError,
  setNearbyOffers,
  setNearbyOffersDataLoadingStatus,
  setOffer,
  setOfferDataLoadingStatus,
  setOffers,
  setOffersDataLoadingStatus,
  setReviews,
  setReviewsDataLoadingStatus,
} from './action';
import { OfferFull, OfferId, Offers } from '../types/offers';
import {
  APIRoute,
  AppRoute,
  AuthorizationStatus,
  TIMEOUT_SHOW_ERROR,
} from '../const';
import { AuthDate } from '../types/auth-data';
import { AuthInfo } from '../types/auth-info';
import { dropToken, saveToken } from '../services/token';
import { store } from '.';
import { Reviews } from '../types/reviews';

export const clearErrorAction = createAsyncThunk('main/clearError', () => {
  setTimeout(() => store.dispatch(setError(null)), TIMEOUT_SHOW_ERROR);
});

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

export const checkAuthAction = createAsyncThunk<
  void,
  undefined,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('user/checkAuth', async (_arg, { dispatch, extra: api }) => {
  try {
    const { data } = await api.get<AuthInfo>(APIRoute.Login);
    dispatch(requireAuthorization(AuthorizationStatus.Auth));
    dispatch(setAuthInfo(data));
  } catch {
    dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
  }
});

export const loginAction = createAsyncThunk<
  void,
  AuthDate,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('user/login', async ({ email, password }, { dispatch, extra: api }) => {
  const { data } = await api.post<AuthInfo>(APIRoute.Login, {
    email,
    password,
  });
  saveToken(data.token);
  dispatch(requireAuthorization(AuthorizationStatus.Auth));
  dispatch(setAuthInfo(data));
  dispatch(redirectToRoute(AppRoute.Main));
});

export const logoutAction = createAsyncThunk<
  void,
  undefined,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('user/logout', async (_arg, { dispatch, extra: api }) => {
  await api.delete(APIRoute.Logout);
  dropToken();
  dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
  dispatch(setAuthInfo(null));
});

export const fetchOfferAction = createAsyncThunk<
  void,
  OfferId,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('data/fetchOffer', async (offerId, { dispatch, extra: api }) => {
  dispatch(setOfferDataLoadingStatus(true));
  try {
    const { data } = await api.get<OfferFull>(APIRoute.Offer(offerId));
    dispatch(setOffer(data));
  } catch {
    dispatch(redirectToRoute(AppRoute.NotFound));
  } finally {
    dispatch(setOfferDataLoadingStatus(false));
  }
});

export const fetchNearbyOffersAction = createAsyncThunk<
  void,
  OfferId,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('data/fetchNearbyOffers', async (offerId, { dispatch, extra: api }) => {
  dispatch(setNearbyOffersDataLoadingStatus(true));
  const { data } = await api.get<Offers>(APIRoute.OffersNearby(offerId));
  dispatch(setNearbyOffersDataLoadingStatus(false));
  dispatch(setNearbyOffers(data));
});

export const fetchOfferReviewsAction = createAsyncThunk<
  void,
  OfferId,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('data/fetchOfferReviews', async (offerId, { dispatch, extra: api }) => {
  dispatch(setReviewsDataLoadingStatus(true));
  const { data } = await api.get<Reviews>(APIRoute.Reviews(offerId));
  dispatch(setReviewsDataLoadingStatus(false));
  dispatch(setReviews(data));
});
