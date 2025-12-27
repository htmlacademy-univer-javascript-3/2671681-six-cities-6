import ReviewForm from '../../components/ReviewForm/ReviewForm';
import { Reviews } from '../../types/reviews';
import ReviewItem from '../ReviewItem/ReviewItem';

type ReviewsListProps = {
  reviews: Reviews;
};

function ReviewsList({ reviews }: ReviewsListProps): JSX.Element {
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
      <ReviewForm />
    </section>
  );
}

export default ReviewsList;
