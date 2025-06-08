const accordionTemplate = document.createElement("template");
accordionTemplate.innerHTML = `
<style>
    :host {
        display: block;
        border: 1px solid #e1e5e9;
        border-radius: 12px;
        overflow: hidden;
        box-shadow: 0 4px 12px rgba(0,0,0,0.05);
        background: white;
    }
</style>
<slot></slot>
`;

class AccordionElement extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: "open" });
    shadow.appendChild(accordionTemplate.content.cloneNode(true));

    this._initialized = false;
    this.boundHandleTriggerClick = this.handleTriggerClick.bind(this);
  }

  static get observedAttributes() {
    return ["type", "default-value", "collapsible"];
  }

  // ============================
  // Properties
  // ============================
  get type() {
    return this.getAttribute("type") || "single";
  }

  get defaultValue() {
    return this.getAttribute("default-value");
  }

  get collapsible() {
    return this.hasAttribute("collapsible");
  }

  get openItems() {
    return Array.from(this.querySelectorAll("accordion-item[open]"));
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (!this._initialized) return;

    if (name === "type") {
      this.handleTypeChange();
    }
  }

  connectedCallback() {
    this.addEventListener(
      "accordion-trigger-click",
      this.boundHandleTriggerClick
    );
    this.updateComplete = this.whenChildrenReady().then(() => {
      this.initializeDefaultState();
      this._initialized = true;
    });
  }

  disconnectedCallback() {
    this.removeEventListener(
      "accordion-trigger-click",
      this.boundHandleTriggerClick
    );
  }

  async whenChildrenReady() {
    const items = this.querySelectorAll("accordion-item");
    const promises = Array.from(items).map((item) =>
      customElements.whenDefined("accordion-item")
    );
    await Promise.all(promises);
    this.validateUniqueValues();
  }

  validateUniqueValues() {
    const items = this.querySelectorAll("accordion-item[value]");
    const values = Array.from(items).map((item) => item.getAttribute("value"));
    const duplicates = values.filter(
      (value, index) => values.indexOf(value) !== index
    );

    if (duplicates.length > 0) {
      const uniqueDuplicates = [...new Set(duplicates)];
      console.warn(
        `Accordion items with duplicate values found: ${uniqueDuplicates.join(
          ", "
        )}`
      );
    }

    const itemsWithNoValue = this.querySelectorAll(
      "accordion-item:not([value])"
    );
    if (itemsWithNoValue.length > 0) {
      console.warn(
        `Accordion items without a value attribute found: ${itemsWithNoValue.length} item(s)`
      );
    }
  }

  initializeDefaultState() {
    if (!this.defaultValue) return;

    const defaultItems = this.querySelectorAll(
      `accordion-item[value="${this.defaultValue}"]`
    );

    if (defaultItems.length > 1) {
      console.warn(`
        Multiple accordion items found with value "${this.defaultValue}". 
        Only the first one will be opened by default.`);
    }

    if (defaultItems.length === 0) {
      console.warn(`
        No accordion items found with value "${this.defaultValue}". 
        No item will be opened by default.`);
      return;
    }

    const firstItem = defaultItems[0];
    firstItem.open();
  }

  handleTypeChange() {
    if (this.type === "single") {
      const openItems = this.openItems;
      if (openItems.length > 1) {
        openItems.slice(1).forEach((item) => item.close());
      }
    }
  }

  handleTriggerClick(event) {
    const item = event.target.closest("accordion-item");
    if (!item) return;

    const wasOpen = item.isOpen;

    if (this.type === "single") {
      if (!wasOpen) {
        this.closeAllItems();
        item.open();
      } else {
        if (this.collapsible) {
          item.close();
        } else {
          console.log(
            "Cannot close item in single mode without collapsible attribute."
          );
        }
      }
    } else {
      item.toggle();
    }
  }

  openItem(value) {
    const items = this.querySelectorAll(`accordion-item[value="${value}"]`);
    if (items.length === 0) {
      console.warn(`No accordion item found with value "${value}".`);
      return;
    }

    if (items.length > 1) {
      console.warn(
        `Multiple accordion items found with value "${value}". Only the first one will be opened.`
      );
    }

    const item = items[0];
    if (this.type === "single") {
      this.closeAllItemsExcept(item);
    }
    item.open();
  }

  closeAllItemsExcept(exceptItem) {
    const items = this.querySelectorAll("accordion-item");
    items.forEach((item) => {
      if (item !== exceptItem) {
        item.close();
      }
    });
  }

  closeItem(value) {
    const items = this.querySelectorAll(`accordion-item[value="${value}"]`);
    if (items.length === 0) {
      console.warn(`No accordion item found with value "${value}".`);
      return;
    }

    items.forEach((item) => {
      if (!item.isOpen) return;

      if (this.type === "multiple") {
        item.close();
      } else if (this.type === "single") {
        if (this.collapsible) {
          item.close();
        } else {
          const openItems = this.openItems;
          if (openItems.length > 1) {
            item.close();
          } else {
            console.log(
              "Cannot close the last open item in single mode without collapsible attribute."
            );
          }
        }
      }
    });
  }

  toggleItem(value) {
    const items = this.querySelectorAll(`accordion-item[value="${value}"]`);
    if (items.length === 0) {
      console.warn(`No accordion item found with value "${value}".`);
      return;
    }

    if (items.length > 1) {
      console.warn(
        `Multiple accordion items found with value "${value}". Only the first one will be toggled.`
      );
    }

    const item = items[0];
    if (item.isOpen) {
      this.closeItem(value);
    } else {
      this.openItem(value);
    }
  }

  closeAllItems() {
    if (this.type === "single" && !this.collapsible) {
      console.warn(
        "Cannot close all items in single mode without collapsible attribute."
      );
      return;
    }
    const items = this.querySelectorAll("accordion-item");
    items.forEach((item) => item.close());
  }

  openAllItems() {
    if (this.type === "multiple") {
      const items = this.querySelectorAll("accordion-item");
      items.forEach((item) => item.open());
    }
  }
}

customElements.define("custom-accordion", AccordionElement);
