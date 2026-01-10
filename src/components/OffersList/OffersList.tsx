import { memo, useMemo, useState, useCallback } from 'react';
import MemoizedOfferCard from '../OfferCard/OfferCard';
import { OfferBase, Offers } from '../../types/offers';
import { CityNames } from '../../const';
import { SortOptions, SortType } from '../SortOptions/SortOptions';

type OffersListProps = {
  offers: Offers;
  setActive: (offerId: OfferBase['id']) => void;
  activeCity: CityNames;
};

function OffersList({
  offers,
  setActive,
  activeCity,
}: OffersListProps): JSX.Element {
  const [activeSort, setActiveSort] = useState<SortType>(SortType.Popular);

  const sortedOffers = useMemo(() => {
    const sorted = [...offers];
    switch (activeSort) {
      case SortType.PriceLowToHigh:
        return sorted.sort((a, b) => a.price - b.price);
      case SortType.PriceHighToLow:
        return sorted.sort((a, b) => b.price - a.price);
      case SortType.TopRated:
        return sorted.sort((a, b) => b.rating - a.rating);
      case SortType.Popular:
      default:
        return sorted;
    }
  }, [offers, activeSort]);

  const handleSortChange = useCallback((sort: SortType) => {
    setActiveSort(sort);
  }, []);

  return (
    <section className="cities__places places">
      <h2 className="visually-hidden">Places</h2>
      <b className="places__found">
        {offers.length} places to stay in {activeCity}
      </b>
      <SortOptions activeSort={activeSort} onSortChange={handleSortChange} />
      <div className="cities__places-list places__list tabs__content">
        {sortedOffers.map((offer) => (
          <MemoizedOfferCard
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


const MemoizedOffersList = memo(OffersList);
export default MemoizedOffersList;
