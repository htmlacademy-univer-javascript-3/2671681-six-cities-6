import OffersList from '../../components/OffersList/OffersList';
import { OfferBase } from '../../types/offers';
import { useState } from 'react';
import Map from '../../components/Map/Map';
import CitiesList from '../../components/CitiesList/CitiesList';
import { CITIES, CityNames } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { setCity } from '../../store/main-data/main-data';
import { getCity, getOffers } from '../../store/main-data/selectors';
import Header from '../../components/Header/Header';

function MainPage(): JSX.Element {
  const activeCity = useAppSelector(getCity);
  const offers = useAppSelector(getOffers);

  const cityOffers = offers.filter(
    (offer) => offer.city.name === activeCity.name
  );

  const dispatch = useAppDispatch();

  const handleChangeCity = (cityName: CityNames) => {
    const nextCity = CITIES.find((city) => city.name === cityName)!;
    dispatch(setCity(nextCity));
  };

  const [activeOfferId, setActiveOfferId] = useState<OfferBase['id'] | null>(
    null
  );
  const activeOffer = offers.find((offer) => offer.id === activeOfferId);

  return (
    <div className="page page--gray page--main">
      <Header />

      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <CitiesList
            activeCity={activeCity.name}
            setActive={handleChangeCity}
          />
        </div>
        <div className="cities">
          <div className="cities__places-container container">
            <OffersList
              offers={cityOffers}
              activeCity={activeCity.name}
              setActive={(offerId: OfferBase['id']) => {
                setActiveOfferId(offerId);
              }}
            />
            <div className="cities__right-section">
              <Map
                variant="cities__map"
                selectedOffer={activeOffer}
                offers={cityOffers}
                city={activeCity}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default MainPage;
