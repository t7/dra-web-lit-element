// Import the LitElement base class and html helper function
import {LitElement, html} from '@polymer/lit-element';
import {waveSvg} from './my-svg'

// Extend the LitElement base class
class MyApp extends LitElement {

  /**
   * Implement `render` to define a template for your element.
   *
   * You must provide an implementation of `render` for any element
   * that uses LitElement as a base class.
   */
  render() {
    /**
     * `render` must return a lit-html `TemplateResult`.
     *
     * To create a `TemplateResult`, tag a JavaScript template literal
     * with the `html` helper function:
     */
    return html`
      <style>
        .current-weather {
          background-color: black;
          background-position: center;
          background-repeat: no-repeat;
          background-size: cover;
          box-sizing: border-box;
          color: white;
          font-size: 1.5rem;
          min-height: 50vh;
          padding-bottom: 10vw;
          position: relative;
        }
        
        .current-weather:before {
          background-color: rgba(0, 0, 0, 0.5);
          content: '';
          display: block;
          height: 100%;
          left: 0;
          position: absolute;
          top: 0;
          width: 100vw;
        }
      
        .current-weather__wave svg {
          bottom: 0;
          position: absolute;
          width: 100%;
          fill: #fff;
        }
  
        .current-weather__wave svg path:first-child {
          fill: #00adcf;
        }
      </style>

      <!-- template content -->
      <section class="current-weather" style="background-image: url(&quot;https://d13k13wj6adfdf.cloudfront.net/urban_areas/boston_web-550bb970ba.jpg&quot;);">
        <div class="current-weather__wave">${waveSvg}</div>
      </section>
    `;
  }
}

// Register the new element with the browser.
customElements.define('my-app', MyApp);
