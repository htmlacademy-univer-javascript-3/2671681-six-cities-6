import { Reviews } from '../types/reviews';

export const sortReviewsByDateDesc = (reviews: Reviews): Reviews =>
  [...reviews].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
