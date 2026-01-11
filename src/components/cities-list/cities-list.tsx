import { memo, useCallback } from 'react';
import { CityNames } from '../../const';

type CitiesListProps = {
  activeCity: CityNames;
  setActive: (name: CityNames) => void;
};

function CitiesList({ activeCity, setActive }: CitiesListProps): JSX.Element {
  const handleCityClick = useCallback(
    (name: CityNames) => () => {
      setActive(name);
    },
    [setActive]
  );

  return (
    <section className="locations container">
      <ul className="locations__list tabs__list">
        {Object.values(CityNames).map((name) => (
          <li key={name} className="locations__item">
            <a
              className={`locations__item-link tabs__item ${
                activeCity === name && 'tabs__item--active'
              }`}
              onClick={handleCityClick(name)}
            >
              <span>{name}</span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}


const MemoizedCitiesList = memo(CitiesList);
export default MemoizedCitiesList;
