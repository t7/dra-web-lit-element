import { LitElement, html } from '@polymer/lit-element';
import {installRouter} from "pwa-helpers/router";

class AppRouter extends LitElement {
  render(){
    const appRoute = { ...this.route };
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
      ${Object.keys(appRoute).map( (key) => {
        return html`<div ?active="${key === this._page}" class="page"><slot name="${key}" /></div>`
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

  constructor() {
    super();
    this.route = {};
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
    let view;
    let defaultView;
    Object.keys(this.route).forEach((key) => {
      if (this.route[key].indexOf(path) !== -1) {
        view = key;
      }

      if (this.route[key] === 'default') {
        defaultView =  key;
      }
    });

    if (!view && defaultView) {
      view = defaultView;
    }

    if (view) {
      this._loadPage(view);
    }
  }

  _loadPage(view) {
    import(`./${view}.js`).then((module) => {
      // Put code in here that you want to run every time when navigating to main view
    });
    this._page = view;
  }
}

// Register the new element with the browser.
customElements.define('app-router', AppRouter);