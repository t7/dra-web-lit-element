import { LitElement } from 'lit-element';
import {getCurrentLocation, getImageForLocation, getLocationByZipCode} from "../utils/location";
import {getCurrentWeatherForLocation, getForecastForLocation} from "../utils/weather";

export class WeatherContainer extends LitElement {
  static get properties() {
    return {
      weather: { type: Object },
      forecast: { type: Array },
      location: { type: Object },
      locationImage: { type: String}
    }
  }

  async getLocation() {
    const location = await getCurrentLocation();
    return this.location = location;
  }

  async getLocationImage() {
    const locationImage = await getImageForLocation(this.location);
    return this.locationImage = locationImage;
  }

  async getCurrentWeather() {
    const weather =  await getCurrentWeatherForLocation(this.location);
    return this.weather = weather;
  }

  async getForecast() {
    const forecast =  await getForecastForLocation(this.location);
    return this.forecast = forecast;
  }

  async updateLocation(e) {
    const zipCode = e.detail ? e.detail.zipCode : null;
    const locationPromise = zipCode ? getLocationByZipCode(zipCode) : getCurrentLocation();
    const location = await locationPromise;

    if (!(location instanceof Error)) {
      return this.location = location;
    } else {
      alert(location);
    }
  }
}
