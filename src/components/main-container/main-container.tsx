import { City } from '../../types/city';
import { OfferBase, Offers } from '../../types/offers';
import MemoizedMap from '../map/map';
import MemoizedOffersList from '../offers-list/offers-list';

type MainContainerProps = {
  cityOffers: Offers;
  city: City;
  activeOffer: OfferBase | undefined;
  setActive: (offerId: OfferBase['id']) => void;
}

function MainContainer({ cityOffers, city, activeOffer, setActive }: MainContainerProps): JSX.Element {
  return (
    <div className="cities__places-container container">
      <MemoizedOffersList
        offers={cityOffers}
        activeCity={city.name}
        setActive={setActive}
      />
      <div className="cities__right-section">
        <MemoizedMap
          variant="cities__map"
          selectedOffer={activeOffer}
          offers={cityOffers}
          city={city}
        />
      </div>
    </div>
  );
}

export default MainContainer;
