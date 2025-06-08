const accordionContentTemplate = document.createElement("template");
accordionContentTemplate.innerHTML = `
<style>
    :host {
        display: block;
    }
    
    .content {
        max-height: 0;
        overflow: hidden;
        transition: max-height 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        background: white;
    }
    
    .content.open {
        max-height: 1000px;
    }
    
    .content-inner {
        padding: 10px 20px 20px 20px;
    }
</style>

<div class="content" part="content">
    <div class="content-inner">
        <slot></slot>
    </div>
</div>
`

class AccordionContentElement extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: "open" });
    shadow.appendChild(accordionContentTemplate.content.cloneNode(true));
  }

  open() {
    const content = this.shadowRoot.querySelector(".content");
    content.classList.add("open");
  }

  close() {
    const content = this.shadowRoot.querySelector(".content");
    content.classList.remove("open");
  }
}

customElements.define("accordion-content", AccordionContentElement);
