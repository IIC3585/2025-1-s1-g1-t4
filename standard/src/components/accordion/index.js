import "./accordion.js";
import "./accordion-item.js";
import "./accordion-trigger.js";
import "./accordion-content.js";

lucide.createIcons();

const typeRadios = document.querySelectorAll('input[name="type"]');
const defaultValueSelect = document.getElementById("defaultValue");
const collapsibleCheckbox = document.getElementById("collapsible");
const accordionContainer = document.getElementById("accordionContainer");
const generatedCodeElement = document.getElementById("generatedCode");

function updateAccordion() {
  const selectedType = document.querySelector(
    'input[name="type"]:checked'
  ).value;
  const selectedDefaultValue = defaultValueSelect.value;
  const isCollapsible = collapsibleCheckbox.checked;

  const accordion = document.createElement("custom-accordion");
  accordion.setAttribute("type", selectedType);

  if (selectedDefaultValue) {
    accordion.setAttribute("default-value", selectedDefaultValue);
  }

  if (isCollapsible) {
    accordion.setAttribute("collapsible", "");
  }

  const existingContent =
    accordionContainer.querySelector("custom-accordion").innerHTML;
  accordion.innerHTML = existingContent;

  accordionContainer.innerHTML = "";
  accordionContainer.appendChild(accordion);

  updateGeneratedCode(selectedType, selectedDefaultValue, isCollapsible);

  lucide.createIcons();
}

function updateGeneratedCode(type, defaultValue, collapsible) {
  let code = `<custom-accordion type="${type}"`;

  if (defaultValue) {
    code += `\n  default-value="${defaultValue}"`;
  }

  if (collapsible) {
    code += `\n  collapsible`;
  }

  code += `>\n  <!-- accordion items -->\n</custom-accordion>`;

  generatedCodeElement.textContent = code;
}

typeRadios.forEach((radio) => {
  radio.addEventListener("change", updateAccordion);
});

defaultValueSelect.addEventListener("change", updateAccordion);
collapsibleCheckbox.addEventListener("change", updateAccordion);

updateGeneratedCode("single", "item-1", true);
