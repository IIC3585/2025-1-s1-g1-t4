import { LitElement, html, css } from 'https://cdn.jsdelivr.net/gh/lit/dist@3/core/lit-core.min.js';

class CustomButton extends LitElement {
  static properties = {
    variant: { type: String, reflect: true },
    size: { type: String, reflect: true },
    disabled: { type: Boolean, reflect: true },
    loading: { type: Boolean, reflect: true }
  };

  static styles = css`
    :host {
      display: inline-block;
      --btn-bg: var(--button-bg, var(--color-primary));
      --btn-text: var(--button-text, var(--color-text-inverted));
      --btn-border: var(--button-border, none);
      --btn-hover: var(--button-hover, brightness(0.9));
      --btn-active: var(--button-active, translateY(1px));
      --btn-disabled-opacity: var(--button-disabled-opacity, 0.6);
      --btn-padding: var(--button-padding, var(--space-sm) var(--space-md));
      --btn-font-size: var(--button-font-size, var(--font-size-base));
      --btn-radius: var(--button-radius, var(--border-radius-sm));
      --btn-transition: var(--button-transition, var(--transition-fast));
    }

    .btn {
      display: inline-flex;
      width: 100%;
      align-items: center;
      justify-content: center;
      border: var(--btn-border);
      border-radius: var(--btn-radius);
      padding: var(--btn-padding);
      font-family: inherit;
      font-size: var(--btn-font-size);
      cursor: pointer;
      transition: var(--btn-transition);
      position: relative;
      overflow: hidden;
      background-color: var(--btn-bg);
      color: var(--btn-text);
    }

    /* Variantes */
    :host([variant="secondary"]) {
      --btn-bg: var(--color-secondary);
      --btn-text: var( --color-secondary-foreground);
    }

    :host([variant="outline"]) {
      --btn-bg: transparent;
      --btn-border: 1px solid var(--color-primary);
      --btn-text: var(--color-primary);
    }

    /* Tamaños */
    :host([size="small"]) {
      --btn-padding: var(--space-xs) var(--space-sm);
      --btn-font-size: var(--font-size-small);
    }

    :host([size="large"]) {
      --btn-padding: var(--space-md) var(--space-lg);
      --btn-font-size: var(--font-size-medium);
    }

    /* Estados */
    :host([disabled]) .btn {
      opacity: var(--btn-disabled-opacity);
      cursor: not-allowed;
    }

    .btn:hover:not([disabled]) {
      filter: var(--btn-hover);
    }

    .btn:active:not([disabled]) {
      transform: var(--btn-active);
    }

    .content {
      display: flex;
      align-items: center;
    }
  `;

  constructor () {
    super();
    this.variant = 'primary';
    this.size = 'medium';
    this.disabled = false;
    this.loading = false;
  }

  render() {
    return html`
      <button class="btn" ?disabled=${this.disabled || this.loading}>
        <span class="content">
          <slot></slot>
        </span>
      </button>
    `;
  }
}

customElements.define('custom-button', CustomButton);