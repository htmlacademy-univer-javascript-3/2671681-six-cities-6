import { OfferBase } from '../../types/offers';
import { useState, useMemo, useCallback } from 'react';
import MemoizedCitiesList from '../../components/CitiesList/CitiesList';
import { CITIES, CityNames } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { setCity } from '../../store/main-data/main-data';
import { getCity, getCityOffers } from '../../store/main-data/selectors';
import MemoizedHeader from '../../components/Header/Header';
import MainContainer from '../../components/MainContainer/MainContainer';
import EmptyMainContainer from '../../components/EmptyMainContainer/EmptyMainContainer';

function MainPage(): JSX.Element {
  const activeCity = useAppSelector(getCity);
  const cityOffers = useAppSelector(getCityOffers);

  const dispatch = useAppDispatch();

  const handleChangeCity = useCallback(
    (cityName: CityNames) => {
      const nextCity = CITIES.find((city) => city.name === cityName)!;
      dispatch(setCity(nextCity));
    },
    [dispatch]
  );

  const [activeOfferId, setActiveOfferId] = useState<OfferBase['id'] | null>(
    null
  );

  const activeOffer = useMemo(
    () => cityOffers.find((offer) => offer.id === activeOfferId),
    [cityOffers, activeOfferId]
  );

  const handleSetActive = useCallback(
    (offerId: OfferBase['id']) => {
      setActiveOfferId(offerId);
    },
    []
  );

  return (
    <div className="page page--gray page--main">
      <MemoizedHeader />

      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <MemoizedCitiesList
            activeCity={activeCity.name}
            setActive={handleChangeCity}
          />
        </div>
        <div className="cities">
          {cityOffers.length === 0 ? (
            <EmptyMainContainer />
          ) : (
            <MainContainer
              cityOffers={cityOffers}
              city={activeCity}
              activeOffer={activeOffer}
              setActive={handleSetActive}
            />
          )}
        </div>
      </main>
    </div>
  );
}

export default MainPage;
