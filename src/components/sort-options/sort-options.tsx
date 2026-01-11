import { useState } from 'react';
import { SortType } from './sort-constants';

type SortOptionsProps = {
  activeSort: SortType;
  onSortChange: (sort: SortType) => void;
};

function SortOptions({
  activeSort,
  onSortChange,
}: SortOptionsProps): JSX.Element {
  const [isSortOpen, setIsSortOpen] = useState(false);

  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by</span>
      <span
        className="places__sorting-type"
        tabIndex={0}
        onClick={() => {
          setIsSortOpen(!isSortOpen);
        }}
      >
        {activeSort}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use href="#icon-arrow-select"></use>
        </svg>
      </span>
      <ul
        className={`places__options places__options--custom ${
          isSortOpen && 'places__options--opened'
        }`}
      >
        {Object.values(SortType).map((sort) => (
          <li
            key={sort}
            className={`places__option ${
              activeSort === sort ? 'places__option--active' : ''
            }`}
            tabIndex={0}
            onClick={() => {
              onSortChange(sort);
              setIsSortOpen(false);
            }}
          >
            {sort}
          </li>
        ))}
      </ul>
    </form>
  );
}

export default SortOptions;
