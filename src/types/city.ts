import { CityNames } from '../const';

export type City = {
  name: CityNames;
  lat: number;
  lng: number;
  zoom: number;
};

export type Cities = City[];
