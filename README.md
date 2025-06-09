#### IIC3585-1 SECCIÓN 1 - GRUPO 1
# 🤖 Trabajo 4: Web Components


| Integrantes | Mail UC |
|-|-|
| Tarek Hirmas Aboid | tarek.hirmas@uc.cl |
| Sebastián Lobo Cáceres | salobo@uc.cl|
| Anita Martí Campos | asmarti@uc.cl |

> [!NOTE]
> Fecha de entrega 09-06-2025


### :book: Demo
En el siguiente link podrán ver la demo de la tarea: https://web-components.static.domains/



## Índice

* [Descripción](#descripción)
* [Tecnologías](#tecnologías)
* [Estructura del Proyecto](#estructura-del-proyecto)
* [Instalación](#instalación)
* [Uso](#uso)

  * [Aplicación Standard](#aplicación-standard)
  * [Aplicación con LitElement](#aplicación-con-litelement)
* [Personalización y Estilos](#personalización-y-estilos)

---

## Descripción

Web Components Hub es una aplicación demostrativa que muestra dos enfoques para crear componentes web reutilizables:

1. **Standard Web Components** (custom elements, Shadow DOM y Templates nativos).
2. **LitElement** (framework ligero para templates reactivos).

Incluye dos componentes principales:

* **Accordion**: un componente plegable con cuatro sub-elementos.
* **Subscription Form**: card de suscripción a boletines.

Cada enfoque está implementado en una aplicación independiente, lo que permite comparar la flexibilidad y simplicidad de ambos métodos.

---

## 🤖 Tecnologías

* **JavaScript**
* **HTML5 / CSS3**
* **Tailwind CSS** para estilos rápidos y reactivos
* **Lucide Icons** para iconografía
* **Web Components API** (Custom Elements, Shadow DOM, HTML Templates)
* **LitElement**

---

## 📦 Estructura del Proyecto

```
/lit           # App con LitElement
  ├─ src/
  │  ├─ components/
  │  │   ├─ accordion/
  │  │   │   └─ script.js
  │  │   ├─ badge/
  │  │   │   └─ index.js
  │  │   ├─ button/
  │  │   │   └─ index.js
  │  │   ├─ suscription/
  │  │   │   └─ card-plan.js
  ├─ index.html
  └─ style.css
/standard      # App con Web Components estándar 
  ├─ assets/
  ├─ src/
  │  ├─ components/
  │  │   ├─ accordion/
  │  │   │   ├─ accordion-content.js
  │  │   │   ├─ accordion-item.js
  │  │   │   ├─ accordion-trigger.js
  │  │   │   ├─ accordion.js
  │  │   │   ├─ index.html
  │  │   │   └─ index.js
  │  │   ├─ suscription/
  │  │   │   ├─ assets/
  │  │   │   ├─ index.js
  │  │   │   ├─ index.js
  │  │   │   └─ style.css
  ├─ index.html
  ├─ index.js
  └─ style.css
index.html
README.md
```

---

## 🚀 Instalación

1. Clonar este repositorio:

   ```bash
   https://github.com/IIC3585/2025-1-s1-g1-t4.git
   cd 2025-1-s1-g1-t4.git
   ```
2. Servir cada app con un servidor local (por ejemplo, `live-server`, `http-server` o la extensión "Live Preview" de VSCode).

---

## 🛠️ Uso

### Aplicación Standard

1. Navega a la carpeta `standard`:

   ```bash
   cd standard
   ```
2. Inicia tu servidor local y abre `index.html` en el navegador.
3. Explora el accordion y el formulario de suscripción.

### Aplicación con LitElement

1. Navega a la carpeta `lit`:

   ```bash
   cd lit
   ```
2. Inicia tu servidor local y abre `index.html` en el navegador.
3. Observa la reactividad y templates de LitElement.

---

## Personalización y Estilos

* Se utilizan clases de **Tailwind CSS** para diseños rápidos.
* El HTML base incluye un fondo animado de burbujas y tarjetas con efecto glass morphism.
* Los componentes exponen CSS variables para colores, tamaños y espaciados.

---
