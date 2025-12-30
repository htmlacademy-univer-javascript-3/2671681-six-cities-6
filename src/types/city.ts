import { CityNames } from '../const';

export type Location = {
  latitude: number;
  longitude: number;
  zoom: number;
};

export type City = {
  name: CityNames;
  location: Location;
};

export type Cities = City[];
