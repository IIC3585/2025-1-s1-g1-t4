// Vamos a crear un componente de suscripción que permita configurar un mensaje de suscripción y un 
// botón para activar la suscripción. Este componente utilizará un template para definir su
//  estructura y estilos, y tendrá una lógica simple para manejar el evento de clic en el botón.

const template = document.createElement('template');
template.innerHTML = `
<style>
    :host { display: block; max-width: 300px; font-family: inherit; }
    
    .card { background: #fff; 
            border: 1px solid #ccc; 
            border-radius: 8px; 
            padding: 1rem;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
            transition: border-color 0.3s ease; 
            }

    :host([selected]) .card { border-color: rgb(0, 0, 0); }

    :host([best]) .header h3 {
        position: relative;
        padding-right: 3rem; /* espacio para el badge */
        }

        :host([best]) .header h3::after {
        content: 'Best';
        position: absolute;
        top: 0;
        right: 0;
        background-color: rgb(82, 39, 167);
        color: #fff;
        font-size: 0.8rem;
        padding: 0.2rem 0.5rem;
        border-radius: 4px;
        }


    .header { text-align: center; margin-bottom: 1rem; }
    .header h3 { margin: 0; font-size: 1.2rem; }
    .header .visits { font-size: 0.9rem; color: #666; }

    .description { font-size: 0.9rem; color: #444; margin: 0.5rem 0; }

    .price { font-size: 2rem; margin: 0.5rem 0; }

    .features-label { font-weight: bold; margin-top: 1rem; }
    .features-label::after { content: ':'; }

    .features {
        list-style: none;
        padding: 0;
        margin: 0 0 1rem 0;
    }

    .features li {
        align-items: center;
        margin: 0.25rem 0;
    }

    ::slotted(li) {
        align-items: center;
        margin: 0.25rem 0;
    }
    ::slotted(li) img {
        margin-right: 0.5em;
        vertical-align: middle;
    }
    

    button { width: 100%;
             padding: 0.5rem;
             border: 1px solid #000; 
             background: #fff;
             color: #000;
             border-radius: 4px;
             cursor: pointer;
             transition: background-color 0.3s, color 0.3s; 
       }

    :host([selected]) button { 
        background-color: rgb(0, 0, 0);
        color: #fff; }
    
    ul[slot="features"] {
        list-style: none;
        padding: 0;
        margin: 0;
    }

    ul[slot="features"] li {
        align-items: center;
        margin: 0.25rem 0;
    }
    
    ul[slot="features"] li img {
        margin-right: 0.5em;
    }

</style>
<div class="card">
    <div class="header">
        <h3><slot name="plan">Plan</slot></h3>
        <div class="visits"><slot name="visits">0</slot> monthly visits</div>
    </div>
    <p class="description"><slot name="message"></slot></p>
    <div class="price">
        <slot name="currency">$</slot><slot name="price">0</slot>/mo
    </div>
    <div class="features-label"><slot name="features-label"></slot></div>
    <ul class="features"><slot name="features"></slot></ul>
    <button part="button">Get started</button>
</div>
`;

class SubscriptionCard extends HTMLElement {
    constructor() {
        super();
        const shadow = this.attachShadow({ mode: 'open' });
        shadow.appendChild(template.content.cloneNode(true));
    }
    
        

    connectedCallback() {
        // Llamamos al método de renderizado inicial
        this._renderFeatures();
        this.shadowRoot.querySelector('button').addEventListener('click', this._onClick.bind(this));
    
    }

    disconnectedCallback() {
        this.shadowRoot.querySelector('button').removeEventListener('click', this._onClick.bind(this));
        
    };

     _renderFeatures() {
        // 1) Tomamos el <ul slot="features"> del light DOM
        const userList = this.querySelector('ul[slot="features"]');
        const features = userList
        ? Array.from(userList.querySelectorAll('li'))
            .map(li => li.textContent.trim())
        : [];

        // 2) Renderizamos internamente con icono
        const ul = this.shadowRoot.querySelector('.features');
        ul.innerHTML = features.map(text => `
        <li>
            <img src="./assets/badge-check.png" alt="✓" style="width:1em;vertical-align:middle;margin-right:0.5em;">
            ${text}
        </li>
        `).join('');
    }




    _onClick() {

        // Quitamos el atributo selected si es que ya está en otra tarjeta
        const selectedCard = document.querySelector('suscripcion-card[selected]');
        if (selectedCard && selectedCard !== this) {
            selectedCard.removeAttribute('selected');
        }


        this.toggleAttribute('selected');

        const planName = this.querySelector('[slot="plan"]').textContent.trim();

        this.dispatchEvent(new CustomEvent('suscripcion-selected', {
            bubbles: true,
            composed: true,
            detail: {
                plan: planName,
            }
        }));
    
    }

}

// Definimos el nombre del componente personalizado
customElements.define('suscripcion-card', SubscriptionCard);
// Este componente se puede usar en el HTML de la siguiente manera:
// <subscription-card></subscription-card>

