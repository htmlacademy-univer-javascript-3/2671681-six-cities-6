import OfferCard from '../OfferCard/OfferCard';
import { Offers } from '../../types/offers';
import { CityNames } from '../../const';
import { SortOptions, SortType } from '../SortOptions/SortOptions';
import { useState } from 'react';

type OffersListProps = {
  offers: Offers;
  setActive: (offerId: number) => void;
  activeCity: CityNames;
};

function OffersList({
  offers,
  setActive,
  activeCity,
}: OffersListProps): JSX.Element {
  const [activeSort, setActiveSort] = useState<SortType>(SortType.Popular);
  return (
    <section className="cities__places places">
      <h2 className="visually-hidden">Places</h2>
      <b className="places__found">
        {offers.length} places to stay in {activeCity}
      </b>
      <SortOptions activeSort={activeSort} onSortChange={setActiveSort} />
      <div className="cities__places-list places__list tabs__content">
        {offers.map((offer) => (
          <OfferCard
            key={offer.id}
            offer={offer}
            variant="cities"
            setActive={setActive}
          />
        ))}
      </div>
    </section>
  );
}

export default OffersList;
