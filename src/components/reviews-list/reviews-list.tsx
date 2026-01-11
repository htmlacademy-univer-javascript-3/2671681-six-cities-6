import { useEffect } from 'react';
import ReviewForm from '../../components/review-form/review-form';
import { useAppDispatch, useAppSelector } from '../../hooks';
import MemoizedReviewItem from '../review-item/review-item';
import { fetchOfferReviewsAction } from '../../store/api-actions';
import PrivateComponent from '../private-component/private-component';
import { getOffer, getReviews } from '../../store/offer-data/selectors';
import { sortReviewsByDateDesc } from '../../utils/sort-reviews';
import { MAX_REVIEWS_COUNT_PER_PAGE } from '../../const';

function ReviewsList(): JSX.Element {
  const dispatch = useAppDispatch();
  const offer = useAppSelector(getOffer);
  const reviews = useAppSelector(getReviews);
  const sortedReviews = sortReviewsByDateDesc(reviews);

  useEffect(() => {
    let isMounted = true;

    if (offer?.id && isMounted) {
      dispatch(fetchOfferReviewsAction(offer.id));
    }

    return () => {
      isMounted = false;
    };
  }, [dispatch, offer?.id]);

  return (
    <section className="offer__reviews reviews">
      <h2 className="reviews__title">
        Reviews · <span className="reviews__amount">{reviews.length}</span>
      </h2>
      <ul className="reviews__list">
        {sortedReviews.slice(0, MAX_REVIEWS_COUNT_PER_PAGE).map((review) => (
          <MemoizedReviewItem review={review} key={review.id} />
        ))}
      </ul>
      <PrivateComponent>
        <ReviewForm />
      </PrivateComponent>
    </section>
  );
}

export default ReviewsList;
