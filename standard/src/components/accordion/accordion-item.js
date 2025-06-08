const accordionItemTemplate = document.createElement("template");
accordionItemTemplate.innerHTML = `
<style>
    :host {
        display: block;
        border-bottom: 1px solid #e1e5e9;
    }
    
    :host(:last-child) {
        border-bottom: none;
    }
    
    :host([open]) {
        background: #f8f9fa;
    }
</style>
<slot></slot>
`

class AccordionItemElement extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: "open" });
    shadow.appendChild(accordionItemTemplate.content.cloneNode(true));

    this._isOpen = false;
  }

  static get observedAttributes() {
    return ["value", "open"];
  }

  get value() {
    return this.getAttribute("value");
  }

  get isOpen() {
    return this._isOpen;
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === "open") {
      this.updateOpenState(newValue !== null);
    }
  }

  connectedCallback() {
    this.updateOpenState(this.hasAttribute("open"));
  }

  updateOpenState(isOpen) {
    if (this._isOpen === isOpen) return;

    this._isOpen = isOpen;

    const trigger = this.querySelector("accordion-trigger");
    const content = this.querySelector("accordion-content");

    if (isOpen) {
      this.setAttribute("open", "");
      if (trigger) trigger.setActive(true);
      if (content) content.open();
    } else {
      this.removeAttribute("open");
      if (trigger) trigger.setActive(false);
      if (content) content.close();
    }

    this.dispatchEvent(
      new CustomEvent("accordion-item-toggle", {
        bubbles: true,
        composed: true,
        detail: {
          value: this.value,
          isOpen: this._isOpen,
        },
      })
    );
  }

  open() {
    this.updateOpenState(true);
  }

  close() {
    this.updateOpenState(false);
  }

  toggle() {
    this.updateOpenState(!this._isOpen);
  }
}

customElements.define("accordion-item", AccordionItemElement);
