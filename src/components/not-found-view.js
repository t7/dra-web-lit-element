import { html, LitElement } from '@polymer/lit-element';

class NotFoundView extends LitElement {
  shouldUpdate() {
    return this.active;
  }

  static get properties() {
    return {
      active: { type: Boolean }
    }
  }

  render() {
    return html`
      <section>
        <h2>Oops! You hit a 404</h2>
        <p>The page you're looking for doesn't seem to exist. Head back
           <a href="/">home</a> and try again?
        </p>
      </section>
    `
  }
}

window.customElements.define('not-found-view', NotFoundView);
