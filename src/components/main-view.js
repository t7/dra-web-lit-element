// Import the LitElement base class and html helper function
import {LitElement, html} from '@polymer/lit-element';
import {menuSvg, waveSvg} from './svg-image';
import {
  getCurrentLocation,
  getImageForLocation,
  getLocationByZipCode
} from '../utils/location'
import  {
  getCurrentWeatherForLocation,
  getForecastForLocation,
} from "../utils/weather";
import './current-weather';
import './forecast-weather';
import  "./location-form"

// Extend the LitElement base class
class MainView extends LitElement {
  render() {
    return html`
      <style>      
        .main-view {
          width: 100vw;
        }

        .main-view:after {
          background-color: var(--transparent-black);
          content: '';
          display: block;
          height: 0vh;
          position: absolute;
          top: 0;
          width: 100%;
          opacity: 0;
        }
        
        .main-view__container {
          background-color: black;
          background-position: center;
          background-repeat: no-repeat;
          background-size: cover;
          padding: 4em 6em;
          position: relative;
        }
        
        .main-view__container:before {
          background-color: rgba(0, 0, 0, 0.5);
          content: '';
          display: block;
          height: 100%;
          left: 0;
          position: absolute;
          top: 0;
          width: 100vw;
        }
        
        .main-view__header {
          margin-bottom: 20px;
          position: relative;
          text-align: right;
        }
        
        .main-view__header__button {
          border: none;
          background: none;
          cursor: pointer;
          outline: none;
          padding: 5px;
        }
        
        .main-view__header__button svg {
          fill: white;
          height: 20px;
        }

        .main-view__wave svg {
          bottom: 0;
          left: 0;
          position: absolute;
          width: 100%;
          fill: #fff;
        }

        .main-view__wave svg path:first-child {
          fill: #00adcf;
        }
        
        app-drawer {
           z-index: 2;
          --app-drawer-scrim-background: rgba(0, 0, 0, 0);
          --app-drawer-width: 500px
        }
      </style>
      <!-- template content -->
      <div class="main-view"
        @location-changed="${this._onLocationChange}"
      >
        <div class="main-view__container" style="background-image: url(${this.locationImage});">
          <header class="main-view__header">
            <button class="main-view__header__button" @click="${this._onMenuClick}">${menuSvg}</button>
          </header>
          <current-weather
            .weather="${this.weather}"
            .location="${this.location}"
            .dateTime="${this.dateTime}">
          </current-weather>
          <div class="main-view__wave">${waveSvg}</div>
        </div>
        <forecast-weather .forecast="${this.forecast}"></forecast-weather>
        <app-drawer .opened="${this._drawerOpened}"
          @opened-changed="${this._drawerOpenedChanged}"
          align="end"
         >
          <location-form></location-form>
        </app-drawer>
      </div>
    `;
  }

  shouldUpdate(changedProperties) {
    return this.active;
  }

  firstUpdated(changedProperties) {
    this._getLocation();
  }

  updated(changedProperties) {
    if(changedProperties.get("location")) {
      this._updateWeatherData();
    }
  }

  static get properties() {
    return {
      active: { type: Boolean },
      weather: { type: Object },
      forecast: { type: Array },
      location: { type: Object },
      dateTime: { type: String },
      locationImage: { type: String},
      _drawerOpened: { type: Boolean },
    }
  }

  constructor() {
    super();
    this.weather = {};
    this.location = {};
    this.forecast = [];
  }

  async _updateWeatherData() {
    const weather = this._getCurrentWeather(this.location);
    const forecast = this._getForecast(this.location);
    const locationImage = this._getLocationImage();
    this.dateTime = this._getCurrentDateTime();

    return {
      weather: await weather,
      forecast: await forecast,
      locationImage: await locationImage
    }
  }

  async _getLocation() {
    const location = await getCurrentLocation();
    this.location = location;
    return location;
  }
  
  async _getLocationImage() {
    const locationImage = await getImageForLocation(this.location);
    this.locationImage = locationImage;
    return locationImage;
  }

  async _getCurrentWeather() {
    const weather =  await getCurrentWeatherForLocation(this.location);
    this.weather = weather;
    return weather;
  }

  async _getForecast() {
    const forecast =  await getForecastForLocation(this.location);
    this.forecast = forecast;
    return forecast;
  }

  _getCurrentDateTime() {
    return new Date().toLocaleString('en-us', {
      weekday: 'long',
      hour: 'numeric',
      minute: '2-digit',
    });
  }

  _onLocationChange(e) {
    const zipCode = e.detail ? e.detail.zipCode : null;
    const locationPromise = zipCode ? getLocationByZipCode(zipCode) : getCurrentLocation();
    locationPromise.then((response) => {
      this.location = response;
      return location;
    }).catch((err) => {
      // handle err
    })
  }

  _onMenuClick() {
    this.dispatchEvent(new CustomEvent('menu-opened'));
  }

  _drawerOpenedChanged(e) {
    if (this._drawerOpened && !e.target.opened) {
      this.dispatchEvent(new CustomEvent('menu-closed'));
    }
  }
}

// Register the new element with the browser.
customElements.define('main-view', MainView);
