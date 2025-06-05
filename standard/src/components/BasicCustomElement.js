// Este es un ejemplo de un componente personalizado básico
//
// =========================================================
// Importante: Asegúrate de que este archivo se cargue después de que el DOM esté listo
// o que se utilice en un entorno que soporte Web Components.

// Respecto al estilo, debemos tener en cuenta que los estilos dentro del Shadow DOM
// no afectarán al documento principal, y viceversa. Esto permite encapsular los estilos
// y evitar conflictos con otros estilos de la página.

// Si se hace <style></style> directamente como this.innerHTML, los estilos se aplicarán
// sin embargo, también se modificarán todos los estilos del documento HTML, lo cual no es recomendable.
// Por lo tanto, es mejor usar el Shadow DOM para encapsular los estilos y el contenido del componente.

// Adicionalmente, el uso de un template permite definir la estructura del componente
// de manera más clara y reutilizable, separando la lógica de la presentación.
// 
// ==========================================================

const template = document.createElement('template');
template.innerHTML = `
<style>
    :host {
        display: block;
        padding: 10px;
        background-color: #f0f0f0;
        border: 1px solid #ccc;
    }
    h2 {
        color: #333;
    }
    p {
        color: #666;
    }
</style>
<div>
    <h2>Componente Personalizado Básico</h2>
    <p>Este es un ejemplo de un componente personalizado.</p>
    <p id="message">Mensaje por defecto</p>
    <slot></slot>
</div>
`;

class BasicCustomElement extends HTMLElement {
    // El constructor se llama cuando se crea una instancia del componente
    // Aquí se puede inicializar el componente, crear el Shadow DOM y agregar el contenido del template.
    // En este caso, se crea un Shadow DOM y se clona el contenido del template dentro de él.
    // También se puede inicializar variables o referencias a elementos del DOM.
    constructor() {
        super();
        // Creamos un Shadow DOM para encapsular el contenido y los estilos del componente
        // Esto permite que los estilos y el contenido del componente no afecten al documento principal.
        // Además, permite que los estilos del documento principal no afecten al componente.
        // Esto es útil para evitar conflictos de estilos y mantener el componente aislado.
        // El modo 'open' permite que el Shadow DOM sea accesible desde el script del documento principal.
        const shadow = this.attachShadow({ mode: 'open' });

        // Clonamos el contenido del template y lo añadimos al Shadow DOM
        // Esto permite que el componente tenga su propia estructura y estilos encapsulados.
        // Al usar un template, podemos definir la estructura del componente de manera clara y reutilizable.
        // Además, el uso de un template permite separar la lógica del componente de su presentación.
        // Esto es especialmente útil en aplicaciones más grandes donde se requiere una mayor modularidad.
        shadow.appendChild(template.content.cloneNode(true));

        // Guardamos una referencia al elemento del mensaje dentro del Shadow DOM
        // Esto nos permite actualizar el contenido del mensaje dinámicamente.
        this.messageElement = shadow.getElementById('message');
    }

    // Al incorporar este método estático, el componente puede observar cambios en los atributos
    // y reaccionar a ellos. En este caso, se observa el atributo 'message'.
    static get observedAttributes() {
        return ['message'];
    }

    // Si queremos reaccionar a los cambios de atributos, implementamos este método
    // Aquí se puede actualizar el contenido del componente cuando el atributo cambia.
    // En este caso, actualizamos el contenido del párrafo con id 'message'.
    attributeChangedCallback(name, oldValue, newValue) {
        if (name === 'message') this.updateMessage(newValue);
    }

    connectedCallback() {
        // Este método se llama cuando el componente se añade al DOM
        // Aquí podemos realizar acciones adicionales, como inicializar datos o eventos.
        // Por ejemplo, podríamos agregar un evento de clic para interactuar con el componente.
        console.log('Componente personalizado conectado al DOM');
    }

    disconnectedCallback() {
        // Este método se llama cuando el componente se elimina del DOM
        // Aquí podemos limpiar recursos, como remover event listeners o timers.
        console.log('Componente personalizado desconectado del DOM');
    }

    // Método para actualizar el mensaje del componente
    updateMessage(newMessage) {
        this.messageElement.textContent = newMessage;
    }
}

// Definimos el nuevo elemento personalizado
// Esto registra el componente en el navegador, permitiendo que se use como un elemento HTML.
// El nombre del componente debe contener un guion para evitar conflictos con los elementos HTML nativos.
// Desde el HTML podemos usarlo como <basic-custom-element></basic-custom-element>
// También es importante que el nombre del componente sea único para evitar conflictos con otros componentes.
customElements.define('basic-custom-element', BasicCustomElement);


// ==========================================================
// Ahora que hemos definido nuestro componente personalizado, podemos usarlo en el HTML.
// Por ejemplo, podemos agregarlo al documento HTML de la siguiente manera:
// <basic-custom-element message="¡Hola, este es un mensaje inicial!"></basic-custom-element>
// ==========================================================

// Podemos probar que el mensaje se actualice dinámicamente
// para ellos, mediante un intervalo de tiempo, actualizaremos el mensaje
// del componente cada 2 segundos.
const item = document.querySelector('basic-custom-element');
if (item) {
    // Actualizamos el mensaje del componente
    setInterval(() => {
        item.setAttribute('message', `¡Hola, este es un mensaje actualizado! ${new Date().toLocaleTimeString()}`);
    }, 2000);
}