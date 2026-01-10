import { User } from './user';

export type Review = {
  id: string;
  date: string;
  user: User;
  comment: string;
  rating: number;
};

export type Reviews = Review[];

export type ReviewData = {
  comment: string;
  rating: number;
};
