import { html, LitElement } from '@polymer/lit-element';
import {closeButton} from './svg-image';

class LocationForm extends LitElement {
  render() {
    return html`
      <style>
        :host {
          background-color: rgb(0, 0, 0);
          box-sizing: border-box;
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
        <button class="sidebar__close" @click="${this._clickHandler}">${closeButton}</button>
        <form class="sidebar__form">
          <input class="input sidebar__form__input" placeholder="Enter Zip Code">
          <button  type="submit" class="sidebar__form__change button button--primary">
            Search
          </button>
          <button type="button" class="sidebar__form__current button button--tertiary">
            Current Location
          </button>
        </form>
      </aside>
      `
  }

  _clickHandler() {
    this.dispatchEvent(new CustomEvent('menu-closed', { bubbles: true, composed: true }));
  }
}

window.customElements.define('location-form', LocationForm);
