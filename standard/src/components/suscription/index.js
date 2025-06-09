// Vamos a crear un componente de suscripción que permita configurar un mensaje de suscripción y un
// botón para activar la suscripción. Este componente utilizará un template para definir su
//  estructura y estilos, y tendrá una lógica simple para manejar el evento de clic en el botón.

const template = document.createElement("template");
template.innerHTML = `
<style>
    :host {
        display: block;
        max-width: var(--card-max-width, 380px);
        min-width: 300px;
        width: 100%;
        height: 100%;
        font-family: var(--card-font-family, inherit);
        --card-radius: var(--card-border-radius, 8px);
        --card-shadow: var(--card-box-shadow, 0 2px 4px rgba(0,0,0,0.1));
        --card-transition: var(--card-transition-duration, 0.3s);
    }
    
    .card {
        background: var(--card-background, #fff);
        border: var(--card-border, 1px solid #ccc);
        border-radius: var(--card-radius);
        padding: var(--card-padding, 1.5rem);
        box-shadow: var(--card-shadow);
        transition: all var(--card-transition) ease;
        position: relative;
        overflow: visible;
        min-height: 480px;
        display: flex;
        flex-direction: column;
    }

    /* Tema Original - Tu estilo base */
    :host([theme="original"]) .card,
    :host(:not([theme])) .card {
        background: #fff;
        border: 1px solid #ccc;
        border-radius: 8px;
        padding: 1rem;
        box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        transition: border-color 0.3s ease;
    }

    :host([theme="original"][selected]) .card,
    :host(:not([theme])[selected]) .card {
        border-color: rgb(0, 0, 0);
    }

    :host([theme="original"]) .best-badge {
        background-color: rgb(82, 39, 167);
        color: #fff;
        font-size: 0.8rem;
        padding: 0.2rem 0.5rem;
        border-radius: 4px;
        top: -8px;
    }

    :host([theme="original"]) .header h3 {
        margin: 0;
        font-size: 1.2rem;
        color: inherit;
        background: none;
        -webkit-text-fill-color: initial;
    }

    :host([theme="original"]) .visits {
        font-size: 0.9rem;
        color: #666;
    }

    :host([theme="original"]) .description {
        font-size: 0.9rem;
        color: #444;
        margin: 0.5rem 0;
    }

    :host([theme="original"]) .price {
        font-size: 2rem;
        margin: 0.5rem 0;
        color: inherit;
        background: none;
        -webkit-text-fill-color: initial;
    }

    :host([theme="original"]) .features-label {
        font-weight: bold;
        margin-top: 1rem;
        color: inherit;
    }

    :host([theme="original"]) .features-label::after {
        content: ':';
    }

    :host([theme="original"]) .features li {
        align-items: center;
        margin: 0.25rem 0;
        font-size: inherit;
        color: inherit;
    }

    :host([theme="original"]) button {
        width: 100%;
        padding: 0.5rem;
        border: 1px solid #000;
        background: #fff;
        color: #000;
        border-radius: 4px;
        cursor: pointer;
        transition: background-color 0.3s, color 0.3s;
        font-size: 1rem;
        font-weight: normal;
    }

    :host([theme="original"]) button:hover {
        background: #f5f5f5;
        color: #000;
        transform: none;
    }

    :host([theme="original"][selected]) button {
        background-color: rgb(0, 0, 0);
        color: #fff;
    }

    /* Tema Classic (mejorado) */
    :host([theme="classic"]) .card,
    :host(:not([theme])) .card {
        background: #fff;
        border: 1px solid #e5e7eb;
        border-radius: 12px;
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
    }

    :host([theme="classic"][selected]) .card,
    :host(:not([theme])[selected]) .card {
        border-color: #3b82f6;
        box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
    }

    /* Tema Modern */
    :host([theme="modern"]) .card {
        background: linear-gradient(145deg, #ffffff 0%, #f8fafc 100%);
        border: none;
        border-radius: 20px;
        box-shadow: 0 20px 40px rgba(0,0,0,0.08);
        transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    }

    :host([theme="modern"]) .card:hover {
        transform: translateY(-8px) scale(1.02);
        box-shadow: 0 32px 64px rgba(0,0,0,0.12);
    }

    :host([theme="modern"][selected]) .card {
        background: linear-gradient(145deg, #fef7ff 0%, #f3e8ff 100%);
        box-shadow: 0 0 0 2px #a855f7, 0 32px 64px rgba(168, 85, 247, 0.15);
    }

    /* Tema Gradient */
    :host([theme="gradient"]) .card {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        border: none;
        border-radius: 24px;
        color: white;
        position: relative;
    }

    :host([theme="gradient"]) .card::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 100%);
        border-radius: 24px;
        pointer-events: none;
    }

    :host([theme="gradient"][selected]) .card {
        box-shadow: 0 0 0 3px #fbbf24, 0 20px 40px rgba(251, 191, 36, 0.3);
    }

    /* Tema Glass */
    :host([theme="glass"]) .card {
        background: rgba(255, 255, 255, 0.15);
        backdrop-filter: blur(20px);
        border: 1px solid rgba(255, 255, 255, 0.3);
        border-radius: 20px;
        box-shadow: 0 8px 32px rgba(0,0,0,0.12);
        color: white;
    }

    :host([theme="glass"][selected]) .card {
        background: rgba(255, 255, 255, 0.25);
        border-color: rgba(255, 255, 255, 0.5);
        box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.6), 0 8px 32px rgba(0,0,0,0.2);
    }

    /* Tema Minimal */
    :host([theme="minimal"]) .card {
        background: #ffffff;
        border: 1px solid #f1f5f9;
        border-radius: 8px;
        box-shadow: none;
        transition: border-color 0.2s ease;
    }

    :host([theme="minimal"]) .card:hover {
        border-color: #e2e8f0;
    }

    :host([theme="minimal"][selected]) .card {
        border-color: #64748b;
        background: #f8fafc;
    }

    /* Badge "Best" */
    .best-badge {
        position: absolute;
        top: -12px;
        left: 50%;
        transform: translateX(-50%);
        background: var(--badge-background, #3b82f6);
        color: var(--badge-color, white);
        font-size: 0.75rem;
        font-weight: bold;
        padding: 6px 16px;
        border-radius: 20px;
        white-space: nowrap;
        z-index: 20;
        display: none;
    }

    :host([best]) .best-badge {
        display: block;
        padding-top: 8px;
    }

    :host([theme="modern"]) .best-badge {
        background: linear-gradient(45deg, #a855f7, #ec4899);
        top: -10px;
    }

    :host([theme="gradient"]) .best-badge {
        background: rgba(255, 255, 255, 0.9);
        color: #667eea;
        backdrop-filter: blur(10px);
    }

    :host([theme="glass"]) .best-badge {
        background: rgba(255, 255, 255, 0.3);
        backdrop-filter: blur(10px);
        border: 1px solid rgba(255, 255, 255, 0.4);
    }

    :host([theme="minimal"]) .best-badge {
        background: #64748b;
        font-size: 0.7rem;
        padding: 4px 12px;
    }

    .header {
        text-align: center;
        margin-bottom: 1.5rem;
        flex-shrink: 0;
    }

    .header h3 {
        margin: 0;
        font-size: 1.25rem;
        font-weight: bold;
        color: var(--plan-title-color, inherit);
    }

    :host([theme="modern"]) .header h3 {
        font-size: 1.375rem;
        color: #1f2937;
        background: linear-gradient(45deg, #a855f7, #ec4899);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
    }

    :host([theme="minimal"]) .header h3 {
        color: #1e293b;
        font-weight: 600;
    }

    .visits {
        font-size: 0.9rem;
        color: #6b7280;
        margin-top: 0.25rem;
    }

    :host([theme="gradient"]) .visits,
    :host([theme="glass"]) .visits {
        color: rgba(255, 255, 255, 0.8);
    }

    .description {
        font-size: 0.875rem;
        color: #6b7280;
        margin: 0.5rem 0 1.5rem 0;
        text-align: center;
        flex-shrink: 0;
    }

    :host([theme="gradient"]) .description,
    :host([theme="glass"]) .description {
        color: rgba(255, 255, 255, 0.9);
    }

    .price {
        font-size: 2.5rem;
        font-weight: bold;
        margin: 0.5rem 0 1.5rem 0;
        text-align: center;
        color: inherit;
        flex-shrink: 0;
    }

    :host([theme="modern"]) .price {
        font-size: 3rem;
        background: linear-gradient(45deg, #1f2937, #4b5563);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
    }

    .features-label {
        font-weight: bold;
        margin-bottom: 0.75rem;
        color: inherit;
        flex-shrink: 0;
    }

    .features {
        list-style: none;
        padding: 0;
        margin: 0 0 1.5rem 0;
        flex-grow: 1;
    }

    .features li {
        margin: 0.5rem 0;
        display: flex;
        align-items: flex-start;
        gap: 0.5rem;
        color: inherit;
        font-size: 0.875rem;
    }

    :host([theme="modern"]) .features li {
        color: #374151;
    }

    .feature-icon {
        width: 1em;
        height: 1em;
        flex-shrink: 0;
        margin-top: 0.125rem;
    }

    button {
        width: 100%;
        padding: 0.875rem 1.5rem;
        border: 1px solid #d1d5db;
        background: #fff;
        color: #374151;
        border-radius: 8px;
        cursor: pointer;
        font-size: 0.875rem;
        font-weight: 600;
        transition: all 0.3s ease;
        flex-shrink: 0;
        margin-top: auto;
    }

    button:hover {
        background: #f9fafb;
        border-color: #9ca3af;
        transform: translateY(-1px);
    }

    :host([selected]) button {
        background: #3b82f6;
        color: white;
        border-color: #3b82f6;
    }

    /* Botones específicos por tema */
    :host([theme="modern"]) button {
        background: linear-gradient(45deg, #a855f7, #ec4899);
        border: none;
        color: white;
        font-weight: bold;
        border-radius: 12px;
    }

    :host([theme="modern"]) button:hover {
        background: linear-gradient(45deg, #9333ea, #db2777);
        transform: translateY(-2px);
        box-shadow: 0 8px 16px rgba(168, 85, 247, 0.3);
    }

    :host([theme="gradient"]) button {
        background: rgba(255, 255, 255, 0.2);
        border: 1px solid rgba(255, 255, 255, 0.3);
        color: white;
        backdrop-filter: blur(10px);
        border-radius: 12px;
    }

    :host([theme="gradient"]) button:hover {
        background: rgba(255, 255, 255, 0.3);
        transform: translateY(-2px);
    }

    :host([theme="glass"]) button {
        background: rgba(255, 255, 255, 0.2);
        border: 1px solid rgba(255, 255, 255, 0.3);
        color: white;
        backdrop-filter: blur(10px);
        border-radius: 12px;
    }

    :host([theme="glass"]) button:hover {
        background: rgba(255, 255, 255, 0.3);
        transform: translateY(-2px);
    }

    :host([theme="minimal"]) button {
        background: #1e293b;
        border: 1px solid #1e293b;
        color: white;
        border-radius: 6px;
    }

    :host([theme="minimal"]) button:hover {
        background: #334155;
        border-color: #334155;
    }
</style>
<div class="card">
    <div class="best-badge">Más Popular</div>
    <div class="header">
        <h3><slot name="plan">Plan</slot></h3>
        <div class="visits"><slot name="visits">0</slot> visitas mensuales</div>
    </div>
    <p class="description"><slot name="message"></slot></p>
    <div class="price">
        <slot name="currency">$</slot><slot name="price">0</slot>/mes
    </div>
    <div class="features-label"><slot name="features-label"></slot></div>
    <ul class="features"><slot name="features"></slot></ul>
    <button part="button">Comenzar</button>
</div>
`;

class SubscriptionCard extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: "open" });
    shadow.appendChild(template.content.cloneNode(true));
  }

  static get observedAttributes() {
    return ["theme", "selected", "best"];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === "theme" && oldValue !== newValue) {
      this._renderFeatures();
    }
  }

  connectedCallback() {
    // Llamamos al método de renderizado inicial
    this._renderFeatures();
    this.shadowRoot
      .querySelector("button")
      .addEventListener("click", this._onClick.bind(this));
  }

  disconnectedCallback() {
    this.shadowRoot
      .querySelector("button")
      .removeEventListener("click", this._onClick.bind(this));
  }

  _renderFeatures() {
    // 1) Tomamos el contenido del slot "features" y lo convertimos en una lista
    // 2) Usamos un SVG o imagen para el icono de cada característica
    const userList = this.querySelector('ul[slot="features"]');
    const features = userList
      ? Array.from(userList.querySelectorAll("li")).map((li) =>
          li.textContent.trim()
        )
      : [];

    const ul = this.shadowRoot.querySelector(".features");
    const theme = this.getAttribute("theme") || "original";

    let iconSvg;

    if (theme === "original") {
      iconSvg = `<img src="./assets/badge-check.png" alt="✓" class="feature-icon" style="width:1em;vertical-align:middle;margin-right:0.5em;" onerror="this.style.display='none'; this.nextElementSibling.style.display='inline';">
                               <span style="display:none; color:#10b981; font-weight:bold;">✓</span>`;
    } else if (theme === "neon") {
      iconSvg = `<svg class="feature-icon" fill="#00bfff" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                    </svg>`;
    } else if (theme === "modern") {
      iconSvg = `<svg class="feature-icon" fill="#10b981" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                    </svg>`;
    } else {
      iconSvg = `<svg class="feature-icon" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                    </svg>`;
    }

    ul.innerHTML = features
      .map(
        (text) => `
                    <li>
                        ${iconSvg}
                        ${text}
                    </li>
                `
      )
      .join("");
  }

  _onClick() {
    // Quitamos el atributo selected si es que ya está en otra tarjeta
    const selectedCard = document.querySelector("suscripcion-card[selected]");
    if (selectedCard && selectedCard !== this) {
      selectedCard.removeAttribute("selected");
    }

    this.toggleAttribute("selected");

    const planName = this.querySelector('[slot="plan"]').textContent.trim();

    this.dispatchEvent(
      new CustomEvent("suscripcion-selected", {
        bubbles: true,
        composed: true,
        detail: {
          plan: planName,
          theme: this.getAttribute("theme") || "original",
        },
      })
    );
  }
}

// Definimos el nombre del componente personalizado
customElements.define("suscripcion-card", SubscriptionCard);
// Este componente se puede usar en el HTML de la siguiente manera:
// <subscription-card></subscription-card>
