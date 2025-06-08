import { LitElement, html, css } from 'https://cdn.jsdelivr.net/gh/lit/dist@3/core/lit-core.min.js';

class BadgePlan extends LitElement {
  static properties = {
    text: { type: String },
    bgColor: { type: String, attribute: 'bg-color' },
    textColor: { type: String, attribute: 'text-color' }
  };

  static styles = css`
    .badge {
      position: absolute;
      top: calc(-1 * var(--space-md));
      left: 50%;
      transform: translateX(-50%);
      background: var(--badge-bg, var(--color-bg));
      color: var(--badge-text, var(--color-primary));
      padding: var(--space-xs) var(--space-lg);
      border-radius: var(--border-radius-full);
      font-weight: 700;
      font-size: var(--font-size-small);
      box-shadow: var(--shadow-sm);
    }
  `;

  render() {
    this.style.setProperty('--badge-bg', this.bgColor);
    this.style.setProperty('--badge-text', this.textColor);
    
    return html`
      <div class="badge">${this.text}</div>
    `;
  }
}

customElements.define('badge-plan', BadgePlan);