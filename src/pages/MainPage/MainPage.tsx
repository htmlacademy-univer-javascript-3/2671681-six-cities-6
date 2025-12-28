import OffersList from '../../components/OffersList/OffersList';
import { Offers } from '../../types/offers';
import { useState } from 'react';
import Map from '../../components/Map/Map';
import CitiesList from '../../components/CitiesList/CitiesList';
import { CityNames } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { cities } from '../../mocks/cities';
import { setCity, setOffers } from '../../store/action';

type MainPageProps = {
  offers: Offers;
};

function MainPage({ offers }: MainPageProps): JSX.Element {
  const activeCity = useAppSelector((state) => state.city);
  const cityOffers = useAppSelector((state) => state.offers);
  const dispatch = useAppDispatch();

  const handleChangeCity = (cityName: CityNames) => {
    const nextCity = cities.find((city) => city.name === cityName)!;
    dispatch(setCity({ city: nextCity }));
    const nextOffers = offers.filter((offer) => offer.city === cityName);
    dispatch(setOffers({ offers: nextOffers }));
  };

  const [activeOfferId, setActiveOfferId] = useState(0);
  const activeOffer = offers.find((offer) => offer.id === activeOfferId);

  return (
    <div className="page page--gray page--main">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <a className="header__logo-link header__logo-link--active">
                <img
                  className="header__logo"
                  src="img/logo.svg"
                  alt="6 cities logo"
                  width="81"
                  height="41"
                />
              </a>
            </div>
            <nav className="header__nav">
              <ul className="header__nav-list">
                <li className="header__nav-item user">
                  <a
                    className="header__nav-link header__nav-link--profile"
                    href="#"
                  >
                    <div className="header__avatar-wrapper user__avatar-wrapper"></div>
                    <span className="header__user-name user__name">
                      Oliver.conner@gmail.com
                    </span>
                    <span className="header__favorite-count">3</span>
                  </a>
                </li>
                <li className="header__nav-item">
                  <a className="header__nav-link" href="#">
                    <span className="header__signout">Sign out</span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>

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
              setActive={(offerId: number) => {
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
