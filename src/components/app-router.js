import { LitElement, html } from 'lit-element';
import {installRouter} from "pwa-helpers/router";

class AppRouter extends LitElement {
  render(){
    return html`
      <style>      
        .view {
         display: none;
        }
  
        .view[active] {
          display: block;
        }
       </style>
    
      <div className="app-router"
        @route-changed=${this._onRouteChange}  
      >   
        ${Object.keys(this.route).map( (key) => {
          return html`<div ?active="${key === this._view}" class="view"><slot name="${key}" /></div>`
        })}
      </div>
  `;
  }

  static get properties() {
    return {
      _view: { type: String },
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
    switch(view) {
      case 'main-view':
        import('./views/main-view.js');
        break;
      case 'not-found-view':
        import('./views/not-found-view.js');
        break;
    }
    this._view = view;
  }
}

// Register the new element with the browser.
customElements.define('app-router', AppRouter);
