// card-plan.js
import { LitElement, html, css } from 'https://cdn.jsdelivr.net/gh/lit/dist@3/core/lit-core.min.js';
import '../badge/index.js';

class CardPlan extends LitElement {
  static properties = {
    highlighted: { type: Boolean, reflect: true },
    badgeText: { type: String, attribute: 'badge-text' },
    _hovered: { type: Boolean, state: true }
  };

  static styles = css`
    :host {
      display: flex;
      --card-bg: var(--color-bg, #ffffff);
      --card-border: var(--color-border, #e2e8f0);
      --card-text: var(--color-text, #1a202c);
      --card-text-light: var(--color-text-light, #4a5568);
      --primary-color: var(--color-primary, #f97316);
      --primary-light: var(--color-primary-light, #ffedd5);
      --highlight-bg: var(--color-bg-highlighted, #fff7ed);
      --highlight-text: var(--color-text-inverted, #1a202c);
      --badge-bg: var(--color-badge-bg, #f97316);
      --badge-text: var(--color-badge-text, #ffffff);
    }

    .card {
      position: relative;
      border-radius: 0.75rem;
      padding: 1.5rem;
      transition: all 0.3s ease;
      width: 100%;
      display: flex;
      flex-direction: column;
      background: var(--card-bg);
      border: 1px solid var(--card-border);
      color: var(--card-text);
      box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
    }

    :host([highlighted]) .card {
      border: 2px solid var(--primary-color);
      box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
    }

    .card:hover {
      border-color: var(--primary-color);
      box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
      transform: translateY(-0.25rem);
    }

    .badge-container {
      position: absolute;
      top: -0.75rem;
      left: 50%;
      transform: translateX(-50%);
    }
  `;

  render() {
    return html`
      <div class="card">
        ${this.highlighted && this.badgeText ? html`
          <div class="badge-container">
            <badge-plan 
              text=${this.badgeText}
              bg-color="var(--badge-bg)"
              text-color="var(--badge-text)">
            </badge-plan>
          </div>
        ` : ''}
        
        <slot></slot>
      </div>
    `;
  }
}

class CardHeader extends LitElement {
  static styles = css`
    :host {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-bottom: 1rem;
    }
  `;

  render() {
    return html`<slot></slot>`;
  }
}

class CardTitle extends LitElement {
  static styles = css`
    :host {
      display: block;
      font-size: 1.25rem;
      font-weight: 700;
      margin: 0 0 0.5rem;
      color: var(--card-text);
    }
  `;

  render() {
    return html`<slot></slot>`;
  }
}

class CardDescription extends LitElement {
  static styles = css`
    :host {
      display: block;
      font-size: 1rem;
      margin-bottom: 1rem;
      color: var(--card-text-light);
      text-align: center;
    }
  `;

  render() {
    return html`<slot></slot>`;
  }
}

class CardPrice extends LitElement {
  static properties = {
    period: { type: String }
  };

  static styles = css`
    :host {
      display: block;
      text-align: center;
      margin: 1rem 0;
    }

    .price {
      font-size: 2.25rem;
      font-weight: 800;
      color: var(--card-text);
    }

    .period {
      font-size: 1rem;
      color: var(--card-text-light);
      margin-left: 0.25rem;
    }
  `;

  render() {
    return html`
      <div>
        <span class="price"><slot></slot></span>
        ${this.period ? html`<span class="period">${this.period}</span>` : ''}
      </div>
    `;
  }
}

class CardContent extends LitElement {
  static styles = css`
    :host {
      display: block;
      flex-grow: 1;
      margin: 1.5rem 0;
    }
  `;

  render() {
    return html`<slot></slot>`;
  }
}

class CardFooter extends LitElement {
  static styles = css`
    :host {
      display: block;
      margin-top: auto;
    }
  `;

  render() {
    return html`<slot></slot>`;
  }
}

customElements.define('card-footer', CardFooter);
customElements.define('card-content', CardContent);
customElements.define('card-price', CardPrice);
customElements.define('card-description', CardDescription);
customElements.define('card-title', CardTitle);
customElements.define('card-plan', CardPlan);
customElements.define('card-header', CardHeader);
