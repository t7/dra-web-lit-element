// Import the LitElement base class and html helper function
import { LitElement, html } from 'lit-element';

import {
  cloudySvg,
  cloudyWindySvg,
  partlyCloudyWindySvg,
  sunSvg,
  rainSvg,
  rainHighCloudsSvg,
  rainLowCloudsSvg,
  sleetSvg,
  snowingSvg,
  snowflakeSvg,
  stormSvg,
  sunsetSvg,
  tornadoSvg
} from './svg-image'

const iconMap = {
  bkn: cloudySvg,
  blizzard: snowflakeSvg,
  cold: snowflakeSvg,
  dust: tornadoSvg,
  few: cloudySvg,
  fog: sunsetSvg,
  fzra: sleetSvg,
  haze: sunsetSvg,
  hot: sunSvg,
  hurricane: tornadoSvg,
  ovc: cloudySvg,
  rain: rainSvg,
  rain_fzra: snowflakeSvg,
  rain_showers: rainHighCloudsSvg,
  rain_showers_hi: rainLowCloudsSvg,
  rain_snow: sleetSvg,
  rain_sleet: sleetSvg,
  sct: cloudySvg,
  skc: sunSvg,
  sleet: sleetSvg,
  smoke: tornadoSvg,
  snow: snowingSvg,
  snow_fzra: sleetSvg,
  snow_sleet: sleetSvg,
  tornado: tornadoSvg,
  tropical_storm: stormSvg,
  tsra: stormSvg,
  tsra_sct: stormSvg,
  tsra_hi: stormSvg,
  wind_bkn: cloudyWindySvg,
  wind_ovc: cloudyWindySvg,
  wind_sct: partlyCloudyWindySvg,
  wind_skc: sunSvg,
  wind_few: partlyCloudyWindySvg,
};

// Extend the LitElement base class
class WeatherIcon extends LitElement {

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
        svg {
          display: block;
          margin-left: auto;
          margin-right: auto;
          height: 3.75rem;
          width: auto;
        }
      </style>
      <!-- template content -->
      ${iconMap[this.icon]}
    `;
  }

  static get properties() {
    return {
      icon: { type: String }
    }
  }
}
// Register the new element with the browser.
customElements.define('weather-icon', WeatherIcon);
