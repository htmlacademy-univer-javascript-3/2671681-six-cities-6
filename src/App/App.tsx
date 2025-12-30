import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MainPage from '../pages/MainPage/MainPage';
import LoginPage from '../pages/LoginPage/LoginPage';
import FavoritesPage from '../pages/FavoritesPage/FavoritesPage';
import OfferPage from '../pages/OfferPage/OfferPage';
import NotFound from '../pages/NotFound/NotFound';
import PrivateRoute from '../components/PrivateRoute/PrivateRoute';
import { AppRoute, AuthorizationStatus } from '../const';
import { useAppSelector } from '../hooks';
import Spinner from '../components/Spinner/Spinner';

function App(): JSX.Element {
  const isOffersDataLoading = useAppSelector(
    (state) => state.isOffersDataLoading
  );

  if (isOffersDataLoading) {
    return <Spinner />;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path={AppRoute.Main} element={<MainPage />} />
        <Route path={AppRoute.Login} element={<LoginPage />} />
        <Route
          path={AppRoute.Favorites}
          element={
            <PrivateRoute authorizationStatus={AuthorizationStatus.Auth}>
              <FavoritesPage />
            </PrivateRoute>
          }
        />
        <Route path={AppRoute.OfferTemplate} element={<OfferPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
