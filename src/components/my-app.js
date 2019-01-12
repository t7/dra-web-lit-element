import { LitElement, html } from 'lit-element';
import './app-router'

class MyApp extends LitElement {
  render() {
    // Anything that's related to rendering should be done in here.
    return html`   
    <main role="main">
      <app-router .route="${{
          "main-view": ["/", "/settings"],
          "not-found-view": 'default'
        }}"
      >
        <main-view slot="main-view"></main-view>  
        <not-found-view slot="not-found-view"></not-found-view>
    </main>
    `;
  }
}

window.customElements.define('my-app', MyApp);
