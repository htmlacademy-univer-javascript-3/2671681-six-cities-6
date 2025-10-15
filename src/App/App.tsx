import {BrowserRouter, Route, Routes} from 'react-router-dom';
import MainPage from '../pages/MainPage/MainPage';
import LoginPage from '../pages/LoginPage/LoginPage';
import FavoritesPage from '../pages/FavoritesPage/FavoritesPage';
import OfferPage from '../pages/OfferPage/OfferPage';
import NotFound from '../pages/NotFound/NotFound';
import PrivateRoute from '../components/PrivateRoute/PrivateRoute';
import { AppRoute, AuthorizationStatus } from '../const';


type AppProps = {
  offerCount: number;
};

function App({ offerCount }: AppProps): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={AppRoute.Main} element={<MainPage offerCount={offerCount} />} />
        <Route path={AppRoute.Login} element={<LoginPage />} />
        <Route path={AppRoute.Favorites} element={
          <PrivateRoute authorizationStatus={AuthorizationStatus.NoAuth}>
            <FavoritesPage />
          </PrivateRoute>
        }
        />
        <Route path={AppRoute.Offer} element={<OfferPage />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
