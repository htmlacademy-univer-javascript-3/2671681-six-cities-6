import { Route, Routes } from 'react-router-dom';
import MainPage from '../pages/MainPage/MainPage';
import LoginPage from '../pages/LoginPage/LoginPage';
import FavoritesPage from '../pages/FavoritesPage/FavoritesPage';
import OfferPage from '../pages/OfferPage/OfferPage';
import NotFound from '../pages/NotFound/NotFound';
import PrivateRoute from '../components/PrivateRoute/PrivateRoute';
import { AppRoute } from '../const';
import { useAppSelector } from '../hooks';
import Spinner from '../components/Spinner/Spinner';
import HistoryRouter from '../components/HistoryRouter/HistoryRouter';
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
