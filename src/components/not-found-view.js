import { html, LitElement } from '@polymer/lit-element';

class NotFoundView extends LitElement {
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

  shouldUpdate() {
    return this.active;
  }

  static get properties() {
    return {
      active: { type: Boolean }
    }
  }
}

window.customElements.define('not-found-view', NotFoundView);
