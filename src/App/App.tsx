import { Route, Routes } from 'react-router-dom';
import MainPage from '../pages/main-page/main-page';
import LoginPage from '../pages/login-page/login-page';
import FavoritesPage from '../pages/favorites-page/favorites-page';
import OfferPage from '../pages/offer-page/offer-page';
import NotFound from '../pages/not-found/not-found';
import PrivateRoute from '../components/private-route/private-route';
import { AppRoute } from '../const';
import { useAppSelector } from '../hooks';
import Spinner from '../components/spinner/spinner';
import HistoryRouter from '../components/history-router/history-router';
import browserHistory from '../browser-history';
import { getIsOffersDataLoading } from '../store/main-data/selectors';

function App(): JSX.Element {
  const isOffersDataLoading = useAppSelector(getIsOffersDataLoading);

  if (isOffersDataLoading) {
    return <Spinner />;
  }

  return (
    <HistoryRouter history={browserHistory}>
      <Routes>
        <Route path={AppRoute.Main} element={<MainPage />} />
        <Route path={AppRoute.Login} element={<LoginPage />} />
        <Route
          path={AppRoute.Favorites}
          element={
            <PrivateRoute>
              <FavoritesPage />
            </PrivateRoute>
          }
        />
        <Route path={AppRoute.OfferTemplate} element={<OfferPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </HistoryRouter>
  );
}

export default App;
