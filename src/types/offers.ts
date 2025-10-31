export type Features = {
  type: string;
  bedrooms: number;
  maxAdults: number;
};

export type WhoMeet = {
  photo: string;
  name: string;
  pro: boolean;
  description: string[];
};

export type Offer = {
  id: number;
  premium: boolean;
  bookmark: boolean;
  title: string;
  city: string;
  rating: number;
  photo: string[];
  features: Features;
  price: number;
  inside: string[];
  whoMeet: WhoMeet;
  otherOfferIds: number[];
};

export type Offers = Offer[];

export type OffersByCityItem = {
  city: string;
  offers: Offer[];
};

export type OffersByCityItems = OffersByCityItem[];
