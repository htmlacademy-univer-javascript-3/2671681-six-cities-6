import { useEffect } from 'react';
import ReviewForm from '../../components/ReviewForm/ReviewForm';
import { useAppDispatch, useAppSelector } from '../../hooks';
import ReviewItem from '../ReviewItem/ReviewItem';
import { fetchOfferReviewsAction } from '../../store/api-actions';
import PrivateComponent from '../PrivateComponent/PrivateComponent';

function ReviewsList(): JSX.Element {
  const dispatch = useAppDispatch();
  const offer = useAppSelector((state) => state.offer);
  const reviews = useAppSelector((state) => state.reviews);

  useEffect(() => {
    if (offer?.id) {
      dispatch(fetchOfferReviewsAction(offer.id));
    }
  }, [dispatch, offer?.id]);

  return (
    <section className="offer__reviews reviews">
      <h2 className="reviews__title">
        Reviews · <span className="reviews__amount">{reviews.length}</span>
      </h2>
      <ul className="reviews__list">
        {reviews.map((review) => (
          <ReviewItem review={review} key={review.id} />
        ))}
      </ul>
      <PrivateComponent>
        <ReviewForm />
      </PrivateComponent>
    </section>
  );
}

export default ReviewsList;
