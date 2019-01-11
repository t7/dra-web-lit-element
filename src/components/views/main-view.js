// Import the LitElement base class and html helper function
import {html} from '@polymer/lit-element';
import {menuSvg, waveSvg} from '../svg-image';

import { WeatherContainer } from '../weather-container'

import '../current-weather';
import '../forecast-weather';
import '../location-form';
import '../loading-spinner';


// Extend the LitElement base class
class MainView extends WeatherContainer {
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
      <section class="main-view"
        @location-changed="${this.updateLocation}"
        @menu-opened=${this._openMenu}  
        @menu-closed=${this._closeMenu}
      >
        <div class="main-view__container" style="background-image: url(${this.locationImage});">
          <header class="main-view__header">
            <button class="main-view__header__button" @click="${this._openMenu}">${menuSvg}</button>
          </header>
          <current-weather
            .weather="${this.weather}"
            .location="${this.location}"
            .dateTime="${this.dateTime}">
          </current-weather>
          <div class="main-view__wave">${waveSvg}</div>
        </div>
        <forecast-weather .forecast="${this.forecast}" .currentWeather="${this.weather}"></forecast-weather>
        <app-drawer .opened="${this._drawerOpened}"
          @opened-changed="${this._drawerOpenedChanged}"
          align="end"
        >
          <location-form />
        </app-drawer>
        <loading-spinner .active="${this.isLoading}"/>
      </section>
    `;
  }

  static get properties() {
    return {
      dateTime: { type: String },
      isLoading: {type: Boolean },
      _drawerOpened: { type: Boolean },
    }
  }

  constructor() {
    super();
    this.weather = {};
    this.location = {};
    this.forecast = [];
    this.isLoading = false;

    const path = window.decodeURIComponent(window.location.pathname);
    if (path === '/settings') {
      this._drawerOpened = true;
    }
  }

  firstUpdated(changedProperties) {
    this.getLocation();
  }

  updated(changedProperties) {
    if(changedProperties.get("location")) {
      (async () => {
        this.isLoading = true;
        await this._updateWeatherData();
        this.isLoading = false;
      })()
    }
  }

  async _updateWeatherData() {
    const weather = this.getCurrentWeather();
    const forecast = this.getForecast();
    const locationImage = this.getLocationImage();
    this.dateTime = this._getCurrentDateTime();

    return {
      weather: await weather,
      forecast: await forecast,
      locationImage: await locationImage
    }
  }

  _getCurrentDateTime() {
    return new Date().toLocaleString('en-us', {
      weekday: 'long',
      hour: 'numeric',
      minute: '2-digit',
    });
  }

  _openMenu() {
    this._drawerOpened = true;
    this.dispatchEvent(new CustomEvent('route-changed', {
      bubbles: true, composed: true, detail: { route: '/settings' }
    }));
  }

  _closeMenu() {
    this._drawerOpened = false;
    this.dispatchEvent(new CustomEvent('route-changed', {
      bubbles: true, composed: true, detail: { route: '/' }
    }));
  }

  _drawerOpenedChanged(e) {
    if (this._drawerOpened && !e.target.opened) {
      this._closeMenu();
    }
  }
}

// Register the new element with the browser.
customElements.define('main-view', MainView);
