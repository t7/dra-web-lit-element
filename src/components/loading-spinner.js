import { html, LitElement } from '@polymer/lit-element';

class LoadingSpinner extends LitElement {
  render() {
    return html`
      <style>
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
            
        .loading {
          align-items: center;
          background: rgba(0, 0, 0, 0.8);
          color: #fff;
          display: flex;
          font-size: 21px;
          height: 0;
          justify-content: center;
          opacity: 0;
          overflow: hidden;
          position: fixed;
          top: 0;
          width: 100vw;
        }
        
        .loading--visible {
          height: 100vh;
          opacity: 1;
          transition: opacity 0.5s ease;
        }
        
        .loading svg {
          animation: spin 2s infinite linear;
          width: 100px;
        }
      </style>

      <div class="${`loading ${this.active ? 'loading--visible' : ''}`}">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 294.843 294.843" width="512" height="512">
          <g fill="#FFF">
            <path d="M147.421 0a6 6 0 0 0 0 12c74.671 0 135.421 60.75 135.421 135.421s-60.75 135.421-135.421 135.421S12 222.093 12 147.421c0-50.804 28.042-96.902 73.183-120.305a6 6 0 1 0-5.523-10.653C30.524 41.937 0 92.118 0 147.421c0 81.289 66.133 147.421 147.421 147.421s147.421-66.133 147.421-147.421S228.71 0 147.421 0z"></path>
            <path d="M205.213 71.476c-16.726-12.747-36.71-19.484-57.792-19.484-52.62 0-95.43 42.81-95.43 95.43s42.81 95.43 95.43 95.43c25.49 0 49.455-9.926 67.479-27.951a6 6 0 0 0-8.485-8.485c-15.758 15.758-36.709 24.436-58.994 24.436-46.003 0-83.43-37.426-83.43-83.43s37.426-83.43 83.43-83.43c36.894 0 69.843 24.715 80.126 60.104a6 6 0 1 0 11.523-3.349c-5.648-19.439-17.672-36.938-33.857-49.271z"></path>
            <path d="M217.773 129.262a6 6 0 0 0-8.485 8.485l22.57 22.571a6 6 0 0 0 8.486 0l22.57-22.571a6 6 0 0 0-8.485-8.485l-18.328 18.328-18.328-18.328z"></path>
          </g>
        </svg>
      </div>
    `
  }

  static get properties() {
    return {
      active: { type: Boolean }
    }
  }
}

window.customElements.define('loading-spinner', LoadingSpinner);
