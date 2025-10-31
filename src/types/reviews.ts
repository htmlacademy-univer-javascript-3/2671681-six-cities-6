export type Review = {
  id: number;
  offerId: number;
  name: string;
  photo: string;
  rating: number;
  text: string;
  datetime: string;
};

export type Reviews = Review[];
