import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, State } from '../types/state';
import { AxiosInstance } from 'axios';
import { redirectToRoute } from './action';
import { OfferFull, OfferId, Offers } from '../types/offers';
import { APIRoute, AppRoute, TIMEOUT_SHOW_ERROR } from '../const';
import { AuthDate } from '../types/auth-data';
import { AuthInfo } from '../types/auth-info';
import { dropToken, saveToken } from '../services/token';
import { Reviews, Review, ReviewData } from '../types/reviews';
import { setError } from './main-data/main-data';

export const clearErrorAction = createAsyncThunk<
  void,
  undefined,
  { dispatch: AppDispatch }
>('main/clearError', (_arg, { dispatch }) => {
  setTimeout(() => dispatch(setError(null)), TIMEOUT_SHOW_ERROR);
});

export const fetchOffersAction = createAsyncThunk<
  Offers,
  undefined,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('data/fetchOffers', async (_arg, { extra: api }) => {
  const { data } = await api.get<Offers>(APIRoute.Offers);
  return data;
});

export const checkAuthAction = createAsyncThunk<
  AuthInfo,
  undefined,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('user/checkAuth', async (_arg, { extra: api }) => {
  const { data } = await api.get<AuthInfo>(APIRoute.Login);
  return data;
});

export const loginAction = createAsyncThunk<
  AuthInfo,
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
  dispatch(redirectToRoute(AppRoute.Main));
  return data;
});

export const logoutAction = createAsyncThunk<
  void,
  undefined,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('user/logout', async (_arg, { extra: api }) => {
  await api.delete(APIRoute.Logout);
  dropToken();
});

export const fetchOfferAction = createAsyncThunk<
  OfferFull | null,
  OfferId,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('data/fetchOffer', async (offerId, { dispatch, extra: api }) => {
  try {
    const { data } = await api.get<OfferFull>(APIRoute.Offer(offerId));
    return data;
  } catch {
    dispatch(redirectToRoute(AppRoute.NotFound));
  }
  return null;
});

export const fetchNearbyOffersAction = createAsyncThunk<
  Offers,
  OfferId,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('data/fetchNearbyOffers', async (offerId, { extra: api }) => {
  const { data } = await api.get<Offers>(APIRoute.OffersNearby(offerId));
  return data;
});

export const fetchOfferReviewsAction = createAsyncThunk<
  Reviews,
  OfferId,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('data/fetchOfferReviews', async (offerId, { extra: api }) => {
  const { data } = await api.get<Reviews>(APIRoute.Reviews(offerId));
  return data;
});

export const sendOfferReviewAction = createAsyncThunk<
  Review,
  { offerId: OfferId; reviewData: ReviewData },
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('data/sendOfferReview', async ({ offerId, reviewData }, { extra: api }) => {
  const { data } = await api.post<Review>(
    APIRoute.SendReview(offerId),
    reviewData
  );
  return data;
});
