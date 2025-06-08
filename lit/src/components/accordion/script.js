import { LitElement, html, css } from 'https://cdn.jsdelivr.net/gh/lit/dist@3/core/lit-core.min.js';

// Componente principal del acordeón
class MyAccordion extends LitElement {
  static styles = css`
    :host {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    ac-item {
      background: white;
      border-radius: 0.75rem;
      border: 1px solid #ffedd5;
      overflow: hidden;
      transition: box-shadow 0.3s ease;
    }

    ac-item:hover {
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
    }

    ac-item:not(:last-child) {
      margin-bottom: 1rem;
    }

  `;

  constructor() {
    super();
    this.addEventListener('toggle', this._handleToggle.bind(this));
  }

  render() {
    return html`<slot></slot>`;
  }

  _handleToggle(e) {
    if (e.detail.open) {
      this.querySelectorAll('ac-item').forEach(item => {
        if (item !== e.target) {
          item.open = false;
        }
      });
    }
  }
}

// Componente de item del acordeón
class AcItem extends LitElement {
  static properties = {
    open: { type: Boolean, reflect: true }
  };

  static styles = css`
    :host {
      display: block;
      border-radius: 0.75rem;
      overflow: hidden;
      transition: box-shadow 0.3s ease;
      background: white;
    }

    ac-header {
      padding: 1.5rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: none;
      border: none;
      cursor: pointer;
      color: #1a202c;
      text-align: left;
    }

    ac-header:hover {
      outline: 2px solid #f97316;
      outline-offset: 2px;
    }

    .icon {
      transition: transform 0.3s ease;
      color: #f97316;
    }

    :host([open]) .icon {
      transform: rotate(180deg);
    }

    ac-details {
      max-height: 0;
      overflow: hidden;
      transition: max-height 0.3s ease, padding 0.3s ease;
      padding: 0 1.5rem;
      color: #4a5568;
    }

    :host([open]) ac-details {
      max-height: 500px;
      padding: 0 1.5rem 1.5rem;
    }
  `;

  constructor() {
    super();
    this.open = false;
  }

  render() {
    return html`
      <ac-header @click=${this._toggle}>
        <slot name="header"></slot>
        <svg class="icon" width="20" height="20" viewBox="0 0 24 24">
          <path d="m6 9 6 6 6-6"/>
        </svg>
      </ac-header>
      <ac-details>
        <slot name="details"></slot>
      </ac-details>
    `;
  }

  _toggle() {
    this.open = !this.open;
    this.dispatchEvent(new CustomEvent('toggle', {
      bubbles: true,
      composed: true,
      detail: { open: this.open }
    }));
  }
}

// Componente de header
class AcHeader extends LitElement {
  static styles = css`
    :host {
      display: block;
    }
  `;

  render() {
    return html`<slot></slot>`;
  }
}

// Componente de detalles
class AcDetails extends LitElement {
  static styles = css`
    :host {
      display: block;
    }
  `;

  render() {
    return html`<slot></slot>`;
  }
}

// Registrar todos los componentes
customElements.define('my-accordion', MyAccordion);
customElements.define('ac-item', AcItem);
customElements.define('ac-header', AcHeader);
customElements.define('ac-details', AcDetails);