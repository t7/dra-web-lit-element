import { html, LitElement } from '@polymer/lit-element';
import {closeButton} from './svg-image';

class LocationForm extends LitElement {
  render() {
    return html`
      <style>
        :host {
          background-color: rgb(0, 0, 0);
          box-sizing: border-box;
          color: #ffff;
          display: block;
          width: 100%;
          height: 100%;
          padding: 24px;
          position: relative;
          text-align: left;
        }
        
        .sidebar__close {
          border: none;
          background: none;
          cursor: pointer;
          margin-bottom: 20px;
          padding: 5px;
        }
        .sidebar__close:focus {
          outline: none;
        }
        
        .sidebar__icon {
          height: 20px;
          fill: #fff;
        }
        
        .sidebar__form {
          display: grid;
          grid-gap: 20px;
          grid-template-columns: 1fr 1fr;
          grid-template-areas:
            'input input'
            'change current'
            'error error';
        }
        .sidebar__form__input {
          grid-area: input;
        }
        .sidebar__form__input--error {
          color: #c90000;
        }
        .sidebar__form__error {
          color: #c90000;
          grid-area: error;
          margin: 0;
          text-align: center;
        }
        .sidebar__form__change {
          grid-area: change;
        }
        .sidebar__form__current {
          grid-area: current;
        }
        
        .recent-searches {
          border-top: 1px solid rgba(255, 255, 255, 0.3);
          margin-top: 20px;
          padding-top: 20px;
          text-align: center;
        }
        .recent-searches h2 {
          margin: 0 0 20px;
        }
        .recent-searches ul {
          list-style: none;
          margin: 0 0 20px;
          padding: 0 0 0 20px;
        }
        .recent-searches a {
          color: #fff;
          text-decoration: none;
        }
        .input {
          box-sizing: border-box;
          border: none;
          border-radius: 30px;
          font-family: 'Montserrat', sans-serif;
          font-size: 16px;
          height: 46px;
          outline: none;
          padding: 15px;
        }
        
        .button {
          box-sizing: border-box;
          border: none;
          border-radius: 30px;
          cursor: pointer;
          font-family: 'Montserrat', sans-serif;
          font-size: 16px;
          height: 46px;
          outline: none;
          width: 100%;
        }
      
        .button--primary,
        .button--secondary {
          color: #fff;
        }
        
        .button--primary {
          background-color: #ff545e;
        }
        
        .button--secondary {
          background-color: #00adcf;
        }
        
        .button--tertiary {
          background-color: transparent;
          border: 1px solid #00adcf;
          color: #00adcf;
        }
      </style>
      <aside class="sidebar sidebar--opened">
        <button class="sidebar__close" @click="${this._onCloseHandler}">${closeButton}</button>
        <form class="sidebar__form" @submit="${this._onSubmit}">
          <input class="input sidebar__form__input" placeholder="Enter Zip Code" name="zipCode">
          <p ?hidden="${!this.hasError}" class="sidebar__form__error">Invalid Zip Code</p>
          <button  type="submit" class="sidebar__form__change button button--primary">
            Search
          </button>
          <button type="button" class="sidebar__form__current button button--tertiary" @click="${this._onCurrentHandler}">
            Current Location
          </button>
        </form>
        <div ?hidden="${!this.zipCode}" class="recent-searches">
          <h2>Recent Zip Code Searches:</h2>
          <ul>
            <li>
              <a href="#">${this.zipCode}</a>
            </li>
          </ul>
          <button type="button" @click="${this._clearZip}" class="button button--secondary">Clear Recent Zip Codes</button>
        </div>
      </aside>
      `
  }

  static get properties() {
    return {
      hasError: { type: Boolean },
      zipCode: { type: String }
    }
  }

  _clearZip() {
    this.zipCode = undefined;
  }

  _onCloseHandler() {
    this.dispatchEvent(new CustomEvent('menu-closed', { bubbles: true, composed: true }));
  }

  _onCurrentHandler() {
    this.dispatchEvent(new CustomEvent('location-changed', { bubbles: true, composed: true }));
    this.dispatchEvent(new CustomEvent('menu-closed', { bubbles: true, composed: true }));
  }

  _onSubmit(e) {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const zipCode = formData.get('zipCode');

    const isValidZipCode = /(^\d{5}$)|(^\d{5}-\d{4}$)/.test(zipCode);
    if (isValidZipCode) {
      this.hasError = false;
      this.zipCode = zipCode;
      form.reset();
      this.dispatchEvent(new CustomEvent('location-changed', { bubbles: true, composed: true, detail: { zipCode } }));
      this.dispatchEvent(new CustomEvent('menu-closed', { bubbles: true, composed: true }));
    } else {
      this.hasError = true;
    }
  }
}

window.customElements.define('location-form', LocationForm);
