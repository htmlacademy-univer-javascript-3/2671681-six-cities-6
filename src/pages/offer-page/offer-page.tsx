import ReviewsList from '../../components/reviews-list/reviews-list';
import { Navigate, useParams } from 'react-router-dom';
import { AppRoute, MAX_IMAGES, MAX_NEARBY_OFFERS_COUNT, MAX_RATING } from '../../const';
import NearbyOffersList from '../../components/nearby-offers-list/nearby-offers-list';
import MemoizedMap from '../../components/map/map';
import { useAppDispatch, useAppSelector } from '../../hooks';
import MemoizedHeader from '../../components/header/header';
import { OfferId } from '../../types/offers';
import { useEffect, useMemo } from 'react';
import {
  fetchNearbyOffersAction,
  fetchOfferAction,
} from '../../store/api-actions';
import Spinner from '../../components/spinner/spinner';
import {
  getOffer,
  getNearbyOffers,
  getIsOfferDataLoading,
  getIsNearbyOffersDataLoading,
} from '../../store/offer-data/selectors';
import { useFavoriteOfferUpdate } from '../../hooks/use-favorite-offer-update';
import BookmarkButton from '../../components/bookmark-button/bookmark-button';

function OfferPage(): JSX.Element | null {
  const { id } = useParams<{ id: OfferId }>();
  const dispatch = useAppDispatch();

  const offer = useAppSelector(getOffer);
  const nearbyOffers = useAppSelector(getNearbyOffers).slice(0, MAX_NEARBY_OFFERS_COUNT);

  const isOfferDataLoading = useAppSelector(getIsOfferDataLoading);
  const isNearbyOffersDataLoading = useAppSelector(getIsNearbyOffersDataLoading);

  const onFavoriteClick = useFavoriteOfferUpdate();

  const mapOffers = useMemo(
    () => (offer ? nearbyOffers.concat(offer) : nearbyOffers),
    [nearbyOffers, offer]
  );

  const imagesWithIds = useMemo(
    () => offer?.images.slice(0, MAX_IMAGES).map((image, idx) => ({
      id: `${offer.id}-${idx}`,
      url: image,
    })) ?? [],
    [offer?.images, offer?.id]
  );

  useEffect(() => {
    let isMounted = true;

    if (id && offer?.id !== id && isMounted) {
      dispatch(fetchOfferAction(id));
      dispatch(fetchNearbyOffersAction(id));
    }

    return () => {
      isMounted = false;
    };
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

  const widthRating = `${(Math.round(offer.rating) / MAX_RATING) * 100}%`;

  const capitalizeWords = (str: string) => str
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  const formatBedrooms = (count: number): string =>
    `${count} Bedroom${count === 1 ? '' : 's'}`;

  const formatAdults = (count: number): string =>
    `Max ${count} adult${count === 1 ? '' : 's'}`;


  return (
    <div className="page">
      <MemoizedHeader />
      <main className="page__main page__main--offer">
        <section className="offer">
          <div className="offer__gallery-container container">
            <div className="offer__gallery">
              {imagesWithIds.map((image) => (
                <div className="offer__image-wrapper" key={image.id}>
                  <img
                    className="offer__image"
                    src={image.url}
                    alt="Photo studio"
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="offer__container container">
            <div className="offer__wrapper">
              {offer.isPremium &&
              <div className="offer__mark">
                <span>Premium</span>
              </div>}
              <div className="offer__name-wrapper">
                <h1 className="offer__name">{offer.title}</h1>
                <BookmarkButton
                  variant='offer'
                  isActive={offer.isFavorite}
                  width={31}
                  height={33}
                  onClick={() => onFavoriteClick(offer.id, !offer.isFavorite)}
                />
              </div>
              <div className="offer__rating rating">
                <div className="offer__stars rating__stars">
                  <span style={{ width: widthRating }} />
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="offer__rating-value rating__value">
                  {offer.rating}
                </span>
              </div>
              <ul className="offer__features">
                <li className="offer__feature offer__feature--entire">
                  {capitalizeWords(offer.type)}
                </li>
                <li className="offer__feature offer__feature--bedrooms">
                  {formatBedrooms(offer.bedrooms)}
                </li>
                <li className="offer__feature offer__feature--adults">
                  {formatAdults(offer.maxAdults)}
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
