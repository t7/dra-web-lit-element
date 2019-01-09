// Import the LitElement base class and html helper function
import {LitElement, html} from '@polymer/lit-element';
import {menuSvg, waveSvg} from './svg-image';
import '../components/current-weather';

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
        }
        
        .main-view__header {
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
        }
        
        .drawer-content {
          background-color: var(--transparent-black);
          box-sizing: border-box;
          width: 100%;
          height: 100%;
          padding: 24px;
          position: relative;
        }
      </style>

      <!-- template content -->
      <div class="main-view">
        <div class="main-view__container" style="background-image: url(&quot;https://d13k13wj6adfdf.cloudfront.net/urban_areas/boston_web-550bb970ba.jpg&quot;);">
          <header class="main-view__header">
            <button class="main-view__header__button" @click="${this._onMenuClick}">${menuSvg}</button>
          </header>
          <current-weather></current-weather>
          <div class="main-view__wave">${waveSvg}</div>
        </div>
        <app-drawer .opened="${this._drawerOpened}"
          @opened-changed="${this._drawerOpenedChanged}"
          align="end"
         >
          <div class="drawer-content"></div>
        </app-drawer>
      </div>
    `;
  }

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
}

// Register the new element with the browser.
customElements.define('main-view', MainView);
