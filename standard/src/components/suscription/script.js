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



    .header { text-align: center; margin-bottom: 1rem; }
    .header h3 { margin: 0; font-size: 1.2rem; }
    .header .visits { font-size: 0.9rem; color: #666; }

    .description { font-size: 0.9rem; color: #444; margin: 0.5rem 0; }

    .price { font-size: 2rem; margin: 0.5rem 0; }

    .features-label { font-weight: bold; margin-top: 1rem; }
    .features-label::after { content: ':'; }

    .features { list-style: none; padding: 0; margin-bottom: 1rem; }
    .features li { margin: 0.25rem 0; }

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
        

    static get observedAttributes() {
        return ['plan', 'visits', 'price', 'currency', 'features', 'message', 'best', 'features-label'];

    }

    attributeChangedCallback() {
        this._render();
    }

    _render() {
        // Aquí podrías manejar los cambios de atributos si es necesario
        // Por ejemplo, actualizar el contenido del slot correspondiente
        const plan = this.getAttribute('plan') || 'Plan';
        const visits = this.getAttribute('visits') || '0';
        const price = this.getAttribute('price') || '0';
        const currency = this.getAttribute('currency') || '$';
        const message = this.getAttribute('message') || 'Subscribe now!';
        const features = this.getAttribute('features') ? this.getAttribute('features').split(',').map(s => s.trim()) : [];
        const featuresLabel = this.getAttribute('features-label') || 'Features:';

        // Actualizar los slots con los nuevos valores
        const shadow = this.shadowRoot;
        shadow.querySelector('slot[name="plan"]').textContent = plan;
        shadow.querySelector('slot[name="visits"]').textContent = visits;
        shadow.querySelector('slot[name="price"]').textContent = price;
        shadow.querySelector('slot[name="currency"]').textContent = currency;
        shadow.querySelector('slot[name="message"]').textContent = message;
        shadow.querySelector('slot[name="features-label"]').textContent = featuresLabel;


        
        const ul = shadow.querySelector('ul.features');
        ul.innerHTML = features.map(feature => `<li> <img src="../../assets/badge-check.png" alt="check" style="width:1em;vertical-align:middle;margin-right:0.5em;" >${feature}</li>`).join('');


        shadow.querySelector('.card').classList.toggle('best', this.hasAttribute('best'));
        
        // Si el componente tiene el atributo best, se le añade un texto especial al lado del nombre 
        // del plan que sea de fondo
        // morado rgb(82, 39, 167) y con letras blancas de fondo pero mas pequeñas
        if (this.hasAttribute('best')) {

            const exisingBadge = shadow.querySelector('.header h3 span');
            if (exisingBadge) {
                exisingBadge.remove();
            }

            const bestBadge = document.createElement('span');
            bestBadge.textContent = 'Best';
            bestBadge.style.backgroundColor = 'rgb(82, 39, 167)';
            bestBadge.style.color = '#fff';
            bestBadge.style.fontSize = '0.8rem';
            bestBadge.style.padding = '0.2rem 0.5rem';
            bestBadge.style.borderRadius = '4px';
            bestBadge.style.marginLeft = '0.5rem';
            const header = shadow.querySelector('.header h3');
            if (header) {
                header.appendChild(bestBadge);
            }
        } else {
            const badge = shadow.querySelector('.header h3 span');
            if (badge) badge.remove();
        }
    }

        

    connectedCallback() {
        // Llamamos al método de renderizado inicial
        this._render();
        this.shadowRoot.querySelector('button').addEventListener('click', () => {
            this._onClick();
        });
    
    }

    disconnectedCallback() {
        // Aquí podrías limpiar los eventos o referencias si es necesario
        this.shadowRoot.querySelector('button').removeEventListener('click', this.handleSubscribe);
    }


    _onClick() {

        // Quitamos el atributo selected si es que ya está en otra tarjeta
        const selectedCard = document.querySelector('suscripcion-card[selected]');
        if (selectedCard && selectedCard !== this) {
            selectedCard.removeAttribute('selected');
        }


        this.toggleAttribute('selected');
        this.dispatchEvent(new CustomEvent('suscripcion-selected', {
            bubbles: true,
            composed: true,
            detail: {
                plan: this.getAttribute('plan'),
            }
        }));
    
    }

}

// Definimos el nombre del componente personalizado
customElements.define('suscripcion-card', SubscriptionCard);
// Este componente se puede usar en el HTML de la siguiente manera:
// <subscription-component></subscription-component>
// Esto creará un componente que muestra un mensaje de suscripción y un botón para activar la suscripción.
// Al hacer clic en el botón, el mensaje se actualizará para indicar que la suscripción fue exitosa.
// Este enfoque modular y reutilizable permite crear componentes personalizados que encapsulan su propia lógica y presentación,
// lo que facilita su mantenimiento y reutilización en diferentes partes de la aplicación.
// Además, al usar un template, se puede definir la estructura y los estilos del componente de manera clara y reutilizable,