import { LitElement, html } from '@polymer/lit-element';

import '@polymer/app-layout/app-drawer/app-drawer.js';
import './app-router'

class MyApp extends LitElement {
  render() {
    // Anything that's related to rendering should be done in here.
    return html`   
    <main role="main">
      <app-router .route="${{ main: ["main", "settings"] }}">
        <div slot="main">
          <main-view />    
        </div>
        <div slot="default" >
          <not-found-view />
        </div>
      </app-router>
    </main>
    `;
  }
}

window.customElements.define('my-app', MyApp);
