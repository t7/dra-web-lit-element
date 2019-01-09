// Import the LitElement base class and html helper function
import { LitElement, html } from '@polymer/lit-element';

// Extend the LitElement base class
class ForecastWeather extends LitElement {

  /**
   * Implement `render` to define a template for your element.
   *
   * You must provide an implementation of `render` for any element
   * that uses LitElement as a base class.
   */
  render(){
    /**
     * `render` must return a lit-html `TemplateResult`.
     *
     * To create a `TemplateResult`, tag a JavaScript template literal
     * with the `html` helper function:
     */
    return html`
      <style>
        .forecast-weather{
          box-sizing: border-box;
          min-height: 50vh;
          padding: 20px;
        }
        
        .forecast-weather__container {
          margin: 0 auto;
          max-width: 65rem;
          text-align: center;
          overflow-x: scroll;
        }
        
        .forecast-weather {
          margin: 0;
        }
        
        .forecast-weather ul {
          display: flex;
          flex-wrap: wrap;
          justify-content: space-around;
          list-style: none;
          margin: 0;
          padding: 0;
        }
        
        .forecast-weather ul li {
          box-sizing: border-box;
          display: grid;
          grid-template-columns: 1fr;
          grid-gap: 20px;
          text-align: center;
        }
        
        .forecast-weather__period {
          padding: 20px 30px;
          text-align: center;
        }
        
        .forecast-weather__period__name {
          font-size: 1.5rem;
        }
        
        .forecast-weather__period:first-of-type .forecast-weather__period__name {
          font-weight: 700;
        }
        
        .forecast-weather__period__icon {
          margin: 0 auto;
          height: 3.75rem;
          width: auto;
        }
        
        .forecast-weather__period__temperature {
          font-size: 1rem;
        }
        
        .forecast-weather__period__temperature + .forecast-weather__period__temperature {
          margin-left: 5px;
        }
      </style>
      <!-- template content -->
      <section class="forecast-weather">
        <div class="forecast-weather__container">
          <ul>
            <li class="forecast-weather__period">
              <p class="forecast-weather__period__name">day.name</p>
              <WeatherIcon class="forecast-weather__period__icon">icon</WeatherIcon>
              <p>
                <span class="forecast-weather__period__temperature forecast-weather__period__temperature--high"><strong>high}&deg;C</strong></span>
                <span class="forecast-weather__period__temperature forecast-weather__period__temperature--low">low&deg;C</span>
              </p>
            </li>
          </ul>
        </div>
      </section>
    `;
  }
}
// Register the new element with the browser.
customElements.define('forecast-weather', ForecastWeather);
