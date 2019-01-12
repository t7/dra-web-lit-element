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
        <div slot="main-view">
          <main-view />    
        </div>
        <div slot="not-found-view" >
          <not-found-view />
        </div>
      </app-router>
    </main>
    `;
  }
}

window.customElements.define('my-app', MyApp);
