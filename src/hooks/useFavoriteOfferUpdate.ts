import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '.';
import { getAuthorizationStatus } from '../store/user-process/selectors';
import { AppRoute, AuthorizationStatus } from '../const';
import { updateFavoriteAction } from '../store/api-actions';

export function useFavoriteOfferUpdate() {
  const dispatch = useAppDispatch();
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const navigate = useNavigate();

  return function (offerId: string, setIsFavorite: boolean) {
    if (authorizationStatus !== AuthorizationStatus.Auth) {
      navigate(AppRoute.Login);
      return;
    }

    dispatch(updateFavoriteAction({ offerId, setIsFavorite }));
  };
}
