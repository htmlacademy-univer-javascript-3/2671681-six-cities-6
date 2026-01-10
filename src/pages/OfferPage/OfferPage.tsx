import ReviewsList from '../../components/ReviewsList/ReviewsList';
import { Navigate, useParams } from 'react-router-dom';
import { AppRoute } from '../../const';
import NearbyOffersList from '../../components/NearbyOffersList/NearbyOffersList';
import MemoizedMap from '../../components/Map/Map';
import { useAppDispatch, useAppSelector } from '../../hooks';
import MemoizedHeader from '../../components/Header/Header';
import { OfferId } from '../../types/offers';
import { useEffect, useMemo } from 'react';
import {
  fetchNearbyOffersAction,
  fetchOfferAction,
} from '../../store/api-actions';
import Spinner from '../../components/Spinner/Spinner';
import {
  getOffer,
  getNearbyOffers,
  getIsOfferDataLoading,
  getIsNearbyOffersDataLoading,
} from '../../store/offer-data/selectors';

function OfferPage(): JSX.Element | null {
  const { id } = useParams<{ id: OfferId }>();
  const dispatch = useAppDispatch();

  const offer = useAppSelector(getOffer);
  const nearbyOffers = useAppSelector(getNearbyOffers);

  const isOfferDataLoading = useAppSelector(getIsOfferDataLoading);
  const isNearbyOffersDataLoading = useAppSelector(getIsNearbyOffersDataLoading);

  const mapOffers = useMemo(
    () => (offer ? nearbyOffers.concat(offer) : nearbyOffers),
    [nearbyOffers, offer]
  );

  useEffect(() => {
    if (id && offer?.id !== id) {
      dispatch(fetchOfferAction(id));
      dispatch(fetchNearbyOffersAction(id));
    }
  }, [dispatch, id, offer?.id]);

  if (isOfferDataLoading || isNearbyOffersDataLoading) {
    return <Spinner />;
  }

  if (offer === null) {
    return <Spinner />;
  }

  if (!offer) {
    return <Navigate to={AppRoute.NotFound} replace />;
  }

  return (
    <div className="page">
      <MemoizedHeader />
      <main className="page__main page__main--offer">
        <section className="offer">
          <div className="offer__gallery-container container">
            <div className="offer__gallery">
              {offer.images.map((image) => (
                <div className="offer__image-wrapper" key={image}>
                  <img
                    className="offer__image"
                    src={image}
                    alt="Photo studio"
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="offer__container container">
            <div className="offer__wrapper">
              <div className="offer__mark">
                <span>Premium</span>
              </div>
              <div className="offer__name-wrapper">
                <h1 className="offer__name">{offer.title}</h1>
                <button className="offer__bookmark-button button" type="button">
                  <svg className="offer__bookmark-icon" width={31} height={33}>
                    <use xlinkHref="#icon-bookmark" />
                  </svg>
                  <span className="visually-hidden">To bookmarks</span>
                </button>
              </div>
              <div className="offer__rating rating">
                <div className="offer__stars rating__stars">
                  <span style={{ width: '80%' }} />
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="offer__rating-value rating__value">
                  {offer.rating}
                </span>
              </div>
              <ul className="offer__features">
                <li className="offer__feature offer__feature--entire">
                  Apartment
                </li>
                <li className="offer__feature offer__feature--bedrooms">
                  {offer.bedrooms} Bedrooms
                </li>
                <li className="offer__feature offer__feature--adults">
                  Max {offer.maxAdults} adults
                </li>
              </ul>
              <div className="offer__price">
                <b className="offer__price-value">€{offer.price}</b>
                <span className="offer__price-text">&nbsp;night</span>
              </div>
              <div className="offer__inside">
                <h2 className="offer__inside-title">{'What inside'}</h2>
                <ul className="offer__inside-list">
                  {offer.goods.map((good) => (
                    <li key={good} className="offer__inside-item">
                      {good}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="offer__host">
                <h2 className="offer__host-title">Meet the host</h2>
                <div className="offer__host-user user">
                  <div className="offer__avatar-wrapper offer__avatar-wrapper--pro user__avatar-wrapper">
                    <img
                      className="offer__avatar user__avatar"
                      src={offer.host.avatarUrl}
                      width={74}
                      height={74}
                      alt="Host avatar"
                    />
                  </div>
                  <span className="offer__user-name">{offer.host.name}</span>
                  {offer.host.isPro && (
                    <span className="offer__user-status">Pro</span>
                  )}
                </div>
                <div className="offer__description">
                  <p className="offer__text">{offer.description}</p>
                </div>
              </div>
              <ReviewsList />
            </div>
          </div>
          <MemoizedMap
            city={offer.city}
            offers={mapOffers}
            selectedOffer={offer}
            variant="offer__map"
          />
        </section>
        <div className="container">
          <NearbyOffersList offers={nearbyOffers} />
        </div>
      </main>
    </div>
  );
}

export default OfferPage;
