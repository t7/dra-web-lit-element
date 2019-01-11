import get from 'lodash-es/get';
import {
  IP_API_HOST,
  ZIP_CODE_HOST,
  IMAGE_API_HOST
} from './api';

export const getCurrentLocation = async () => {
  const { fetch } = window;
  const locationResponse = await fetch(IP_API_HOST);
  const { city, region, lat, lon } = await locationResponse.json();

  return { city, region, latitude: lat, longitude: lon };
};

export const getLocationByZipCode = async zipCode => {
  const { fetch } = window;
  const locationResponse = await fetch(
    `${ZIP_CODE_HOST}/${zipCode}`,
  );

  if (!locationResponse.ok) {
    return new Error('Location Error');
  }

  const json = await locationResponse.json();
  const {
    places: [place],
  } = json;

  return {
    city: place['place name'],
    region: place['state abbreviation'],
    latitude: place['latitude'],
    longitude: place['longitude'],
  };
};

export const getImageForLocation = async ({ latitude, longitude }) => {
  const { fetch } = window;
  const imageResponse = await fetch(
    `${
      IMAGE_API_HOST
    }/locations/${latitude},${longitude}/?embed=location:nearest-urban-areas/location:nearest-urban-area/ua:images`,
  );
  const json = await imageResponse.json();
  return get(json, '_embedded.location:nearest-urban-areas[0]._embedded.location:nearest-urban-area._embedded.ua:images.photos[0].image.web');
};
