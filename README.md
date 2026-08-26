# LA JOVITA — Catálogo Digital

Catálogo estático de productos para la tienda **LA JOVITA**.  
Funciona sin backend, sin base de datos y es compatible con **GitHub Pages**.

## Estructura del proyecto

```text
/
├── index.html
├── README.md
├── css/
│   └── styles.css
├── js/
│   └── app.js
├── data/
│   └── productos.json
├── assets/
│   ├── logo.png
│   ├── favicon.png
│   └── logo.jfif          (original)
└── imagenes/
    └── (fotos de productos)
```

## Cómo ejecutar localmente

El catálogo carga los productos solo desde `data/productos.json` con `fetch`.  
No abras `index.html` con doble clic (`file://`): el navegador bloquea esa carga.

Usa un servidor local:

### Opción A — Live Server (VS Code / Cursor)

1. Instala la extensión **Live Server**.
2. Abre `index.html`.
3. Clic derecho → **Open with Live Server**.

### Opción B — Servidor estático con Node

```bash
npx --yes serve .
```

Luego abre la URL que muestre la terminal (por ejemplo `http://localhost:3000`).

### Opción C — Python

```bash
python -m http.server 8080
```

Abre `http://localhost:8080`.

## Cómo agregar productos

1. Copia la foto del producto en la carpeta `imagenes/`.
2. Abre `data/productos.json` y agrega el producto.
3. Ejemplo de objeto:

```json
{
  "id": 18,
  "codigo": "ABC123",
  "nombre": "Cartera Elegante",
  "categoria": "Carteras",
  "precio": 79.90,
  "imagen": "imagenes/ABC123.jpg",
  "descripcion": "Cartera moderna y elegante"
}
```

4. Usa una ruta **relativa** a la imagen (`imagenes/nombre-archivo.jpg`).
5. Guarda y recarga la página.

Los filtros de categoría se generan automáticamente a partir de las categorías del JSON.

## Cómo configurar WhatsApp

Abre `js/app.js` y busca:

```javascript
const WHATSAPP_NUMBER = "519XXXXXXXX";
```

Reemplázalo por tu número en formato internacional **sin + ni espacios**.

Ejemplo Perú:

```javascript
const WHATSAPP_NUMBER = "51987654321";
```

Cada botón **CONSULTAR POR WHATSAPP** abrirá un chat con un mensaje listo del producto.

## Cómo configurar redes sociales

En el mismo archivo `js/app.js` busca:

```javascript
const SOCIAL_LINKS = {
  whatsapp: "",
  instagram: "",
  facebook: "",
  tiktok: ""
};
```

Coloca tus URLs reales, por ejemplo:

```javascript
const SOCIAL_LINKS = {
  whatsapp: "https://wa.me/51987654321",
  instagram: "https://instagram.com/tu_cuenta",
  facebook: "https://facebook.com/tu_pagina",
  tiktok: "https://tiktok.com/@tu_cuenta"
};
```

Si un enlace queda vacío, el botón se muestra deshabilitado hasta que lo configures.

## Logo

El logo oficial debe estar en:

```text
assets/logo.png
```

También se usa:

```text
assets/favicon.png
```

No reemplaces el logo por otro diseño. Usa siempre el archivo oficial de la marca.

## Cómo publicar en GitHub Pages

1. Crea un repositorio en GitHub (o usa uno existente).
2. Sube el proyecto:

```bash
git add .
git commit -m "Actualizar catalogo"
git push
```

3. En GitHub ve a **Settings → Pages**.
4. En **Source** elige la rama `main` (o `master`) y la carpeta `/ (root)`.
5. Guarda y espera unos minutos.
6. Tu catálogo quedará en una URL similar a:

```text
https://usuario.github.io/nombre-repositorio/
```

Importante: todas las rutas del proyecto son **relativas**, para que funcionen correctamente en un subdirectorio de GitHub Pages.

## Notas

- No se necesita Docker.
- No se necesita React, Vue, Angular ni backend.
- Si una imagen no existe, la tarjeta muestra “Imagen no disponible” y el resto del catálogo sigue funcionando.
- Para consultar un producto: filtra o busca → abre la imagen → pulsa WhatsApp.
