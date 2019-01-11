import { LitElement, html } from '@polymer/lit-element';
import {installRouter} from "pwa-helpers/router";

class AppRouter extends LitElement {
  render(){
    return html`
     <style>      
      .page {
       display: none;
      }

      .page[active] {
        display: block;
      }
    </style>
    
    <div className="app-router"
      @route-changed=${this._onRouteChange}  
    >   

      ${Object.keys(this.route).map( (key) => {
        const route = this.route[key];
        return html`<div ?active="${route.indexOf(this._page) !== -1}" class="page"><slot name="${key}" /></div>`
      })}
    </div>
  `;
  }

  static get properties() {
    return {
      _page: { type: String },
      route: { type: Array }
    }
  }

  firstUpdated() {
    installRouter((location) => this._locationChanged(location));
  }

  _onRouteChange(e) {
    const route = e.detail ? e.detail.route : null;
    this._updateLocation(route);
  }

  _updateLocation(newLocation) {
    window.history.replaceState({}, '', newLocation);
    this._locationChanged();
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
        page = 'default';
        import('../components/not-found-view.js');
    }

    this._page = page;
  }
}

// Register the new element with the browser.
customElements.define('app-router', AppRouter);