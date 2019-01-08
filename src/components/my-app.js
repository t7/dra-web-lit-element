import { LitElement, html } from '@polymer/lit-element';
import '@polymer/app-layout/app-drawer/app-drawer.js';
import { installRouter } from 'pwa-helpers/router.js';

import { menuSvg } from './my-svg.js';

class MyApp extends LitElement {
  render() {
    // Anything that's related to rendering should be done in here.
    return html`
    <style>
      app-drawer {
        z-index: 2;
      }  
        
      .main-view {
        width: 100vw;
      }

      .main-view:after {
        background-color: rgba(0, 0, 0, 0.8);
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
        box-sizing: border-box;
        width: 100%;
        height: 100%;
        padding: 24px;
        background: var(--app-drawer-background-color);
        position: relative;
      }

      .drawer-list > a {
        display: block;
        text-decoration: none;
        color: var(--app-drawer-text-color);
        line-height: 40px;
        padding: 0 24px;
      }

      .drawer-list > a[selected] {
        color: var(--app-drawer-selected-color);
      }
    </style>
    
    <div class="main-view">
      <header class="main-view__header">
        <button class="main-view__header__button" @click="${this._openDrawer}">${menuSvg}</button>
      </header>
      
      <app-drawer .opened="${this._drawerOpened}"
        align="end"
        @opened-changed="${this._drawerOpenedChanged}">
        <nav class="drawer-list"> </nav> 
      </app-drawer>
      <!-- Main content -->
      <main role="main">
        <main-view class="page" ?active="${this._page === "main"}"></main-view>
        <not-found-view class="page" ?active="${this._page === 'not-found'}"></not-found-view>
      </main>
    </div>
    `;
  }

  static get properties() {
    return {
      _page: { type: String },
      _drawerOpened: { type: Boolean },
    }
  }

  constructor() {
    super();
    this._drawerOpened = false;
  }

  firstUpdated() {
    installRouter((location) => this._locationChanged(location));
  }

  _toggleDrawer(opened) {
    if (opened !== this._drawerOpened) {
      this._drawerOpened = opened;
    }
  }

  _openDrawer() {
    this._toggleDrawer(true);
  }

  _drawerOpenedChanged(e) {
    this._toggleDrawer(e.target.opened);
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
      default:
        page = 'not-found';
        import('../components/not-found-view.js');
    }

    this._page = page;
  }
}

window.customElements.define('my-app', MyApp);
