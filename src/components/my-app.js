import { LitElement, html } from '@polymer/lit-element';
import { installRouter } from 'pwa-helpers/router.js';

class MyApp extends LitElement {
  render() {
    // Anything that's related to rendering should be done in here.
    return html`
    <style>
      .app {
        -moz-osx-font-smoothing: grayscale;
        -webkit-font-smoothing: antialiased;
        font-family: 'Montserrat', sans-serif;
        font-size: 16px;
        position: relative;
      }

      .content {
        width: 100vw;
      }

      .content:after {
        background-color: rgba(0, 0, 0, 0.8);
        content: '';
        display: block;
        height: 0vh;
        position: absolute;
        top: 0;
        width: 100%;
        opacity: 0;
      }
    </style>
    <!-- Main content -->
    <main role="main">
      <div class="app">
        <div class="content">
          <main-view class="page" ?active="${this._page === "main"}"></main-view>
          <not-found-view class="page" ?active="${this._page === 'not-found'}"></not-found-view>
        </div>
      </div>
    </main>
    `;
  }

  static get properties() {
    return {
      _page: { type: String },
    }
  }

  constructor() {
    super();
  }

  firstUpdated() {
    installRouter((location) => this._locationChanged(location));
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
