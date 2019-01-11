import { WEATHER_API_HOST } from './api';

const iconRegex = /^https:\/\/api.weather.gov\/icons\/land\/(day|night)\/(.*?)(,|\/|\?)/;
const day = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export const getCurrentWeatherForLocation = async ({ latitude, longitude }) => {
  const pointsResponse = await fetch(
    `${
      WEATHER_API_HOST
    }/points/${latitude},${longitude}/forecast/hourly`,
  );
  const json = await pointsResponse.json();

  const {
    properties: {
      periods: [period],
    },
  } = json;

  return {
    icon: iconRegex.exec(period.icon)[2],
    name: period.name,
    shortForecast: period.shortForecast,
    temperature: period.temperature,
    temperatureUnit: period.temperatureUnit,
  };
};

export const getForecastForLocation = async ({ latitude, longitude }) => {
  const pointsResponse = await fetch(
    `${
      WEATHER_API_HOST
    }/points/${latitude},${longitude}/forecast`,
  );
  const json = await pointsResponse.json();

  const {
    properties: { periods = [] },
  } = json;

  let temp = {};
  const forecast = [];

  periods.map(period => {
    const { isDaytime } = period;

    if (isDaytime) {
      temp = {
        high: period,
        icon: iconRegex.exec(period.icon)[2],
        name: day[new Date(period.startTime).getDay()]
      };
    } else {
      temp = {
        ...temp,
        low: period,
        icon: iconRegex.exec(period.icon)[2],
        name: day[new Date(period.startTime).getDay()]
      };

      forecast.push(temp);
    }
  });

  return forecast;
};
