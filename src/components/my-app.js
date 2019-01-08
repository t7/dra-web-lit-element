import { LitElement, html } from '@polymer/lit-element';
import { installRouter } from 'pwa-helpers/router.js';

import '@polymer/app-layout/app-drawer/app-drawer.js';

class MyApp extends LitElement {
  render() {
    // Anything that's related to rendering should be done in here.
    return html`
    <style>      
      .page {
       display: none;
      }

      .page[active] {
        display: block;
      }
    </style>
    
    <div class="main-view">      
      <!-- Main content -->
      <main role="main">
        <main-view class="page" ?active="${this._page === "main" || this._page === "settings"}"
          ._drawerOpened="${this._page === "settings"}"
          @menu-opened=${this._onMenuOpen}  
          @menu-closed=${this._onMenuClose}
        >
        </main-view>
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

  _onMenuOpen() {
    this._updateLocation('/settings');
  }

  _onMenuClose() {
    this._updateLocation('/');
  }

  firstUpdated() {
    installRouter((location) => this._locationChanged(location));
  }

  _updateLocation(newLocation) {
    window.history.replaceState({}, '', newLocation);
    this._locationChanged(newLocation);
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
