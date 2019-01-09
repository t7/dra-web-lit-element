// Import the LitElement base class and html helper function
import { LitElement, html } from '@polymer/lit-element';
import './weather-icon';

// Extend the LitElement base class
class CurrentWeather extends LitElement {

  /**
   * Implement `render` to define a template for your element.
   *
   * You must provide an implementation of `render` for any element
   * that uses LitElement as a base class.
   */
  render(){
    const {
      city,
      region
    } = this.location;
    const {
      icon,
      shortForecast,
      temperature,
      temperatureUnit
    } = this.weather;

    /**
     * `render` must return a lit-html `TemplateResult`.
     *
     * To create a `TemplateResult`, tag a JavaScript template literal
     * with the `html` helper function:
     */
    return html`
      <style>
        .current-weather {
          box-sizing: border-box;
          color: white;
          font-size: 1.5rem;
          min-height: 50vh;
          padding-bottom: 10vw;
        }
        
        .current-weather__container {
          display: grid;
          grid-gap: 30px;
          grid-template-columns: 1fr;
          height: 100%;
          position: relative;
          box-sizing: border-box;
          color: white;
        }
        
        .current-weather__grid {
          align-items: center;
          display: grid;
          grid-gap: 10px;
          grid-template-areas:
            'date'
            'location'
            'forecast';
          text-align: center;
        }
        @media screen and (min-width: 768px) {
          .current-weather__grid {
            grid-template-areas:
              'location date'
              'forecast -';
            text-align: left;
          }
        }
        
        .current-weather__location {
          grid-area: location;
          font-size: 2em;
          line-height: 1em;
        }
        
        .current-weather__date {
          grid-area: date;
        }
        @media screen and (min-width: 768px) {
          .current-weather__date {
            text-align: right;
          }
        }
        
        .current-weather__forecast {
          grid-area: forecast;
        }
        
        .current-weather__temperature {
          align-items: flex-start;
          display: inline-flex;
          justify-content: center;
          font-size: 5em;
          line-height: 1em;
        }

        @media screen and (min-width: 768px) {
          .current-weather__temperature {
            justify-content: flex-start;
          }
        }
        
        .current-weather__temperature {
          display: flex;
        }
        
        .current-weather__temperature__icon {
          width: 0.5em;
        }
        
        .current-weather__temperature__symbol {
          font-size: 0.3em;
          line-height: 1em;
          margin-top: 0.75em;
        }
      </style>
      <!-- template content -->
      <section class="current-weather">
        <div class="current-weather__container">
          <div class="current-weather__grid">
            <span class="current-weather__location">${city}, <strong>${region}</strong></span>
            <span class="current-weather__date">${this.dateTime}</span>
            <span class="current-weather__forecast">${shortForecast}</span>
          </div>
          <span class="current-weather__temperature">
            <weather-icon class="current-weather__temperature__icon" .icon="${icon}">*</weather-icon>
            <span class="current-weather__temperature__value">
              ${temperature}<sup class="current-weather__temperature__symbol">&deg;${temperatureUnit}</sup>
            </span>
          </span>
        </div>
      </section>
    `;
  }

  static get properties() {
    return {
      dateTime: { type: String },
      weather: { type: Object },
      location: { type: Object }
    }
  }
}
// Register the new element with the browser.
customElements.define('current-weather', CurrentWeather);
