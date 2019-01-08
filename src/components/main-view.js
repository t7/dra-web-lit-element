// Import the LitElement base class and html helper function
import {LitElement, html} from '@polymer/lit-element';
import {waveSvg, menuSvg} from './my-svg'

// Extend the LitElement base class
class MainView extends LitElement {
  shouldUpdate(changedProperties) {
    return this.active;
  }

  static get properties() {
    return {
      active: { type: Boolean },
      _drawerOpened: { type: Boolean },
    }
  }

  _onMenuClick() {
    this._drawerOpened = true;
    this.dispatchEvent(new CustomEvent('menu-opened'));
  }

  _drawerOpenedChanged(e) {
    if (this._drawerOpened && !e.target.opened) {
      this._drawerOpened = false;
      this.dispatchEvent(new CustomEvent('menu-closed'));
    }
  }

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
        
        .main-view__header {
          position: absolute;
          left: 0;
          width: 100vw;
          text-align: right;
          top: 0;
          z-index: 1;
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
        
        app-drawer {
           z-index: 2;
          --app-drawer-scrim-background: rgba(0, 0, 0, 0);
        }
        
        .drawer-list {
          background-color: var(--transparent-black);
          box-sizing: border-box;
          width: 100%;
          height: 100%;
          padding: 24px;
          position: relative;
        }
      
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
      <div class="main-view">
        <section class="current-weather" style="background-image: url(&quot;https://d13k13wj6adfdf.cloudfront.net/urban_areas/boston_web-550bb970ba.jpg&quot;);">
          <header class="main-view__header">
            <button class="main-view__header__button" @click="${this._onMenuClick}">${menuSvg}</button>
          </header>
          <div class="current-weather__wave">${waveSvg}</div>
        </section>
        <app-drawer .opened="${this._drawerOpened}"
          @opened-changed="${this._drawerOpenedChanged}"
          align="end"
         >
          <nav class="drawer-list"> </nav>
        </app-drawer>
      </div>
    `;
  }
}

// Register the new element with the browser.
customElements.define('main-view', MainView);
