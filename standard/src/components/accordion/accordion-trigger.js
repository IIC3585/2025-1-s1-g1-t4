const accordionTriggerTemplate = document.createElement("template");
accordionTriggerTemplate.innerHTML = `
<style>
    :host {
        display: block;
        cursor: pointer;
    }

    :host([disabled]) {
        cursor: not-allowed;
        opacity: 0.5;
    }

    .trigger {
        padding: 20px;
        background: white;
        transition: all 0.2s ease;
        display: flex;
        align-items: center;
        gap: 12px;
        width: 100%;
        border: none;
        font: inherit;
        text-align: left;
        position: relative;
    }

    .trigger:hover:not([disabled]) {
        background: #f8f9fa;
    }

    .trigger.active {
        border-left: 4px solid #2196f3;
    }

    .icon {
        margin-left: auto;
        transition: transform 0.3s ease;
        font-size: 16px;
        color: #666;
        flex-shrink: 0;
    }

    .icon.rotated {
        transform: rotate(180deg);
    }

    .content-wrapper {
        flex: 1;
        min-width: 0;
    }
</style>

<button class="trigger" part="trigger">
    <div class="content-wrapper">
        <slot></slot>
    </div>
    <span class="icon" aria-hidden="true">▼</span>
</button>
`

class AccordionTriggerElement extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: "open" });
    shadow.appendChild(accordionTriggerTemplate.content.cloneNode(true));

    this.setupEventListeners();
  }

  static get observedAttributes() {
    return ["disabled"];
  }

  get disabled() {
    return this.hasAttribute("disabled");
  }

  setupEventListeners() {
    const button = this.shadowRoot.querySelector(".trigger");
    button.addEventListener("click", (event) => {
      if (this.disabled) {
        event.stopPropagation();
        return;
      }
      this.dispatchEvent(
        new CustomEvent("accordion-trigger-click", {
          bubbles: true,
          composed: true,
          detail: {
            trigger: this,
          },
        })
      );
    });
    button.addEventListener("keydown", (event) => {
      if (this.disabled) return;

      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        button.click();
      }
    });
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === "disabled") {
      this.updateDisabledState();
    }
  }

  updateDisabledState() {
    const button = this.shadowRoot.querySelector(".trigger");
    button.disabled = this.disabled;
    button.setAttribute("aria-disabled", this.disabled.toString());
  }

  setActive(isActive) {
    const button = this.shadowRoot.querySelector(".trigger");
    const icon = this.shadowRoot.querySelector(".icon");

    if (isActive) {
      button.classList.add("active");
      icon.classList.add("rotated");
      button.setAttribute("aria-expanded", "true");
    } else {
      button.classList.remove("active");
      icon.classList.remove("rotated");
      button.setAttribute("aria-expanded", "false");
    }
  }
}

customElements.define("accordion-trigger", AccordionTriggerElement);
