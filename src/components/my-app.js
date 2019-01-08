import { LitElement, html } from '@polymer/lit-element';
import { installRouter } from 'pwa-helpers/router.js';

import '@polymer/app-layout/app-drawer/app-drawer.js';
import { menuSvg } from './my-svg.js';

class MyApp extends LitElement {
  render() {
    // Anything that's related to rendering should be done in here.
    return html`
    <style> 
      app-drawer {
        z-index: 2;
        
        --app-drawer-scrim-background: rgba(0, 0, 0, 0);
      }
        
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
      
      .drawer-list {
        background-color: var(--transparent-black);
        box-sizing: border-box;
        width: 100%;
        height: 100%;
        padding: 24px;
        position: relative;
      }
      
      .page {
       display: none;
      }

      .page[active] {
        display: block;
      }
    </style>
    
    <div class="main-view">
      <header class="main-view__header">
        <button class="main-view__header__button" @click="${this._onMenuClick}">${menuSvg}</button>
      </header>
      
      <app-drawer .opened="${this._page === "settings"}"
        @opened-changed="${this._drawerOpenedChanged}"
        align="end"
       >
        <nav class="drawer-list"> </nav> e
      </app-drawer>
      <!-- Main content -->
      <main role="main">
        <main-view class="page" ?active="${this._page === "main" || this._page === "settings"}"></main-view>
        <not-found-view class="page" ?active="${this._page === 'not-found'}"></not-found-view>
      </main>
    </div>
    `;
  }

  static get properties() {
    return {
      _page: { type: String }
    }
  }

  constructor() {
    super();
  }

  firstUpdated() {
    installRouter((location) => this._locationChanged(location));
  }

  _drawerOpenedChanged(e) {
    if (!e.target.opened && this._page) {
      this._updateLocation('/');
    }
  }

  _updateLocation(newLocation) {
    window.history.replaceState({}, '', newLocation);
    this._locationChanged(newLocation);
  }

  _onMenuClick() {
    this._updateLocation('/settings');
  }

  _locationChanged() {
    const path = window.decodeURIComponent(window.location.pathname);
    const page = path === '/' ? 'main' : path.slice(1);
    this._loadPage(page);
  }

  _loadPage(page) {
    switch(page) {
      case 'main':
        import('../components/main-view.js').then((module) => {
          // Put code in here that you want to run every time when navigating to main view
        });
        break;
      case 'settings':
        import('../components/main-view.js');
        break;
      default:
        page = 'not-found';
        import('../components/not-found-view.js');
    }

    this._page = page;
  }
}

window.customElements.define('my-app', MyApp);
