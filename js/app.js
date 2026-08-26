/**
 * LA JOVITA — Catálogo Digital
 * Página estática compatible con GitHub Pages.
 */

/* =========================================================
   CONFIGURACIÓN — Edita estos valores con tus datos reales
   ========================================================= */

/**
 * Número de WhatsApp en formato internacional, sin + ni espacios.
 * Ejemplo Perú: "51987654321"
 * CÁMBIALO AQUÍ ↓
 */
const WHATSAPP_NUMBER = "519XXXXXXXX";

/**
 * Enlaces de redes sociales.
 * Deja vacío ("") hasta que tengas la URL definitiva.
 * CÁMBIALOS AQUÍ ↓
 */
const SOCIAL_LINKS = {
  whatsapp: "",
  instagram: "",
  facebook: "",
  tiktok: ""
};

/* =========================================================
   ESTADO
   ========================================================= */

let productos = [];
let productosFiltrados = [];
let categoriaActiva = "TODOS";
let terminoBusqueda = "";
let indiceModal = 0;

/* =========================================================
   INICIO
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  configurarEventos();
  configurarRedesSociales();
  cargarProductos();
});

/**
 * Asocia listeners de búsqueda, modal y teclado.
 */
function configurarEventos() {
  const buscador = document.getElementById("buscar-producto");
  if (buscador) {
    buscador.addEventListener("input", (event) => {
      terminoBusqueda = event.target.value.trim();
      filtrarProductos();
    });
  }

  const modal = document.getElementById("modal-producto");
  if (modal) {
    modal.querySelectorAll("[data-close-modal]").forEach((el) => {
      el.addEventListener("click", cerrarModal);
    });
  }

  const btnPrev = document.getElementById("modal-prev");
  const btnNext = document.getElementById("modal-next");
  const btnWhatsappModal = document.getElementById("modal-whatsapp");

  if (btnPrev) {
    btnPrev.addEventListener("click", () => navegarModal(-1));
  }
  if (btnNext) {
    btnNext.addEventListener("click", () => navegarModal(1));
  }
  if (btnWhatsappModal) {
    btnWhatsappModal.addEventListener("click", () => {
      const producto = productosFiltrados[indiceModal];
      if (producto) {
        consultarWhatsApp(producto);
      }
    });
  }

  document.addEventListener("keydown", (event) => {
    const modalEl = document.getElementById("modal-producto");
    if (!modalEl || modalEl.hidden) {
      return;
    }

    if (event.key === "Escape") {
      cerrarModal();
    } else if (event.key === "ArrowLeft") {
      navegarModal(-1);
    } else if (event.key === "ArrowRight") {
      navegarModal(1);
    }
  });
}

/**
 * Aplica los enlaces de SOCIAL_LINKS a los botones de contacto.
 */
function configurarRedesSociales() {
  const contenedor = document.getElementById("social-links");
  if (!contenedor) {
    return;
  }

  contenedor.querySelectorAll("[data-social]").forEach((enlace) => {
    const red = enlace.getAttribute("data-social");
    let url = SOCIAL_LINKS[red] || "";

    if (red === "whatsapp" && !url && WHATSAPP_NUMBER && !WHATSAPP_NUMBER.includes("X")) {
      url = `https://wa.me/${WHATSAPP_NUMBER}`;
    }

    if (url) {
      enlace.href = url;
      enlace.classList.remove("is-disabled");
      enlace.removeAttribute("aria-disabled");
    } else {
      enlace.href = "#";
      enlace.classList.add("is-disabled");
      enlace.setAttribute("aria-disabled", "true");
      enlace.addEventListener("click", (event) => {
        event.preventDefault();
      });
    }
  });
}

/**
 * Carga productos.json vía fetch (HTTP/HTTPS / GitHub Pages).
 * En file:// el navegador bloquea fetch; se usa espejo data/productos.js.
 */
function cargarProductosDesdeScript() {
  return new Promise((resolve, reject) => {
    if (Array.isArray(window.PRODUCTOS_DATA)) {
      resolve(window.PRODUCTOS_DATA);
      return;
    }

    const script = document.createElement("script");
    script.src = "data/productos.js";
    script.async = true;
    script.onload = () => {
      if (Array.isArray(window.PRODUCTOS_DATA)) {
        resolve(window.PRODUCTOS_DATA);
      } else {
        reject(new Error("PRODUCTOS_DATA no disponible en productos.js"));
      }
    };
    script.onerror = () => {
      reject(new Error("No se pudo cargar data/productos.js"));
    };
    document.head.appendChild(script);
  });
}

/**
 * Carga el catálogo desde data/productos.json
 */
async function cargarProductos() {
  const mensajeCarga = document.getElementById("mensaje-carga");
  const mensajeError = document.getElementById("mensaje-error");
  const jsonUrl = "data/productos.json";

  // #region agent log
  fetch('http://127.0.0.1:7269/ingest/343f09b6-95ef-4dda-aec9-88e0e7c52511',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'b8e5ef'},body:JSON.stringify({sessionId:'b8e5ef',runId:'post-fix',hypothesisId:'A',location:'app.js:cargarProductos:entry',message:'Inicio carga catalogo',data:{protocol:window.location.protocol,origin:window.location.origin,href:window.location.href,jsonUrl},timestamp:Date.now()})}).catch(()=>{});
  // #endregion

  try {
    let data = null;
    let loadSource = null;

    // #region agent log
    let resolvedUrl = jsonUrl;
    try { resolvedUrl = new URL(jsonUrl, window.location.href).href; } catch (_) {}
    fetch('http://127.0.0.1:7269/ingest/343f09b6-95ef-4dda-aec9-88e0e7c52511',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'b8e5ef'},body:JSON.stringify({sessionId:'b8e5ef',runId:'post-fix',hypothesisId:'B',location:'app.js:cargarProductos:beforeFetch',message:'Antes de fetch productos.json',data:{jsonUrl,resolvedUrl},timestamp:Date.now()})}).catch(()=>{});
    // #endregion

    try {
      const response = await fetch(jsonUrl);

      // #region agent log
      fetch('http://127.0.0.1:7269/ingest/343f09b6-95ef-4dda-aec9-88e0e7c52511',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'b8e5ef'},body:JSON.stringify({sessionId:'b8e5ef',runId:'post-fix',hypothesisId:'C',location:'app.js:cargarProductos:afterFetch',message:'Respuesta fetch recibida',data:{ok:response.ok,status:response.status,statusText:response.statusText,contentType:response.headers.get('content-type')},timestamp:Date.now()})}).catch(()=>{});
      // #endregion

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      data = await response.json();
      loadSource = "json-fetch";
    } catch (fetchError) {
      // #region agent log
      fetch('http://127.0.0.1:7269/ingest/343f09b6-95ef-4dda-aec9-88e0e7c52511',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'b8e5ef'},body:JSON.stringify({sessionId:'b8e5ef',runId:'post-fix',hypothesisId:'A',location:'app.js:cargarProductos:fetchFailed',message:'Fetch falló; intentando fallback file',data:{name:fetchError&&fetchError.name,message:fetchError&&fetchError.message,protocol:window.location.protocol,willUseFallback:window.location.protocol==='file:'},timestamp:Date.now()})}).catch(()=>{});
      // #endregion

      if (window.location.protocol !== "file:") {
        throw fetchError;
      }

      data = await cargarProductosDesdeScript();
      loadSource = "file-fallback-js";
    }

    // #region agent log
    fetch('http://127.0.0.1:7269/ingest/343f09b6-95ef-4dda-aec9-88e0e7c52511',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'b8e5ef'},body:JSON.stringify({sessionId:'b8e5ef',runId:'post-fix',hypothesisId:'D',location:'app.js:cargarProductos:jsonParsed',message:'Catalogo listo',data:{isArray:Array.isArray(data),count:Array.isArray(data)?data.length:null,loadSource},timestamp:Date.now()})}).catch(()=>{});
    // #endregion

    if (!Array.isArray(data)) {
      throw new Error("El JSON no es un arreglo válido.");
    }

    productos = data;
    productosFiltrados = [...productos];

    if (mensajeCarga) {
      mensajeCarga.hidden = true;
    }
    if (mensajeError) {
      mensajeError.hidden = true;
    }

    generarFiltros();
    mostrarProductos(productosFiltrados);
  } catch (error) {
    // #region agent log
    fetch('http://127.0.0.1:7269/ingest/343f09b6-95ef-4dda-aec9-88e0e7c52511',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'b8e5ef'},body:JSON.stringify({sessionId:'b8e5ef',runId:'post-fix',hypothesisId:'A',location:'app.js:cargarProductos:catch',message:'Error al cargar catalogo',data:{name:error&&error.name,message:error&&error.message,protocol:window.location.protocol,isFileProtocol:window.location.protocol==='file:'},timestamp:Date.now()})}).catch(()=>{});
    // #endregion

    console.error("Error al cargar el catálogo:", error);

    if (mensajeCarga) {
      mensajeCarga.hidden = true;
    }

    if (mensajeError) {
      if (window.location.protocol === "file:") {
        mensajeError.innerHTML =
          "No se pudo cargar el catálogo. Verifica productos.json y productos.js.<br>" +
          "<small>Con <code>file://</code> el navegador bloquea fetch; se usa el espejo " +
          "<code>data/productos.js</code>. Preferible: Live Server o <code>npx serve</code>.</small>";
      } else {
        mensajeError.textContent =
          "No se pudo cargar el catálogo. Verifica el archivo productos.json.";
      }
      mensajeError.hidden = false;
    }
  }
}

/**
 * Genera botones de filtro a partir de las categorías del JSON.
 */
function generarFiltros() {
  const contenedor = document.getElementById("filtros-categorias");
  if (!contenedor) {
    return;
  }

  const categorias = [
    "TODOS",
    ...Array.from(
      new Set(
        productos
          .map((p) => (p.categoria || "").trim())
          .filter(Boolean)
      )
    ).sort((a, b) => a.localeCompare(b, "es"))
  ];

  contenedor.innerHTML = "";

  categorias.forEach((categoria) => {
    const boton = document.createElement("button");
    boton.type = "button";
    boton.className = "filter-btn" + (categoria === categoriaActiva ? " is-active" : "");
    boton.textContent = categoria;
    boton.setAttribute("aria-pressed", categoria === categoriaActiva ? "true" : "false");
    boton.addEventListener("click", () => {
      categoriaActiva = categoria;
      contenedor.querySelectorAll(".filter-btn").forEach((btn) => {
        const activo = btn.textContent === categoriaActiva;
        btn.classList.toggle("is-active", activo);
        btn.setAttribute("aria-pressed", activo ? "true" : "false");
      });
      filtrarProductos();
    });
    contenedor.appendChild(boton);
  });
}

/**
 * Aplica filtro de categoría + búsqueda en tiempo real.
 */
function filtrarProductos() {
  const texto = terminoBusqueda.toLowerCase();

  productosFiltrados = productos.filter((producto) => {
    const coincideCategoria =
      categoriaActiva === "TODOS" ||
      (producto.categoria || "").toLowerCase() === categoriaActiva.toLowerCase();

    if (!coincideCategoria) {
      return false;
    }

    if (!texto) {
      return true;
    }

    const nombre = (producto.nombre || "").toLowerCase();
    const categoria = (producto.categoria || "").toLowerCase();
    const descripcion = (producto.descripcion || "").toLowerCase();

    return (
      nombre.includes(texto) ||
      categoria.includes(texto) ||
      descripcion.includes(texto)
    );
  });

  mostrarProductos(productosFiltrados);
}

/** Alias semántico solicitado en la especificación */
function buscarProductos() {
  filtrarProductos();
}

/**
 * Renderiza las tarjetas del catálogo.
 * @param {Array} lista
 */
function mostrarProductos(lista) {
  const contenedor = document.getElementById("productos-container");
  const mensajeVacio = document.getElementById("mensaje-vacio");

  if (!contenedor) {
    return;
  }

  contenedor.innerHTML = "";

  if (!lista.length) {
    if (mensajeVacio) {
      mensajeVacio.hidden = false;
    }
    return;
  }

  if (mensajeVacio) {
    mensajeVacio.hidden = true;
  }

  lista.forEach((producto, index) => {
    const tarjeta = crearTarjetaProducto(producto, index);
    contenedor.appendChild(tarjeta);
  });
}

/**
 * Crea el elemento HTML de una tarjeta de producto.
 * @param {Object} producto
 * @param {number} index
 * @returns {HTMLElement}
 */
function crearTarjetaProducto(producto, index) {
  const article = document.createElement("article");
  article.className = "product-card";
  article.style.animationDelay = `${Math.min(index * 40, 400)}ms`;

  const nombre = producto.nombre || "Producto";
  const categoria = producto.categoria || "Sin categoría";
  const precio = formatearPrecio(producto.precio);
  const imagen = producto.imagen || "";

  article.innerHTML = `
    <button
      type="button"
      class="product-card__image-btn"
      aria-label="Ver imagen ampliada de ${escaparHTML(nombre)}"
    >
      <img
        class="product-card__image"
        src="${escaparAttr(imagen)}"
        alt="${escaparAttr(nombre)}"
        loading="lazy"
      >
    </button>
    <div class="product-card__body">
      <p class="product-card__categoria">${escaparHTML(categoria)}</p>
      <h3 class="product-card__nombre">${escaparHTML(nombre)}</h3>
      <p class="product-card__precio">${escaparHTML(precio)}</p>
      <button type="button" class="btn btn--whatsapp">
        CONSULTAR POR WHATSAPP
      </button>
    </div>
  `;

  const img = article.querySelector(".product-card__image");
  if (img) {
    img.addEventListener("error", () => {
      const placeholder = document.createElement("div");
      placeholder.className = "product-card__placeholder";
      placeholder.textContent = "Imagen no disponible";
      placeholder.setAttribute("role", "img");
      placeholder.setAttribute("aria-label", "Imagen no disponible");
      img.replaceWith(placeholder);
    });
  }

  const btnImagen = article.querySelector(".product-card__image-btn");
  if (btnImagen) {
    btnImagen.addEventListener("click", () => mostrarModal(index));
  }

  const btnWhatsapp = article.querySelector(".btn--whatsapp");
  if (btnWhatsapp) {
    btnWhatsapp.addEventListener("click", () => consultarWhatsApp(producto));
  }

  return article;
}

/**
 * Abre el lightbox con el producto en el índice indicado.
 * @param {number} index
 */
function mostrarModal(index) {
  if (!productosFiltrados.length) {
    return;
  }

  indiceModal = index;
  actualizarModal();

  const modal = document.getElementById("modal-producto");
  if (!modal) {
    return;
  }

  modal.hidden = false;
  document.body.style.overflow = "hidden";

  const cerrar = modal.querySelector(".modal__close");
  if (cerrar) {
    cerrar.focus();
  }
}

/**
 * Actualiza el contenido del modal según indiceModal.
 */
function actualizarModal() {
  const producto = productosFiltrados[indiceModal];
  if (!producto) {
    return;
  }

  const imagen = document.getElementById("modal-imagen");
  const titulo = document.getElementById("modal-titulo");
  const categoria = document.getElementById("modal-categoria");
  const descripcion = document.getElementById("modal-descripcion");
  const precio = document.getElementById("modal-precio");

  if (titulo) {
    titulo.textContent = producto.nombre || "Producto";
  }
  if (categoria) {
    categoria.textContent = producto.categoria || "";
  }
  if (descripcion) {
    descripcion.textContent = producto.descripcion || "";
  }
  if (precio) {
    precio.textContent = formatearPrecio(producto.precio);
  }
  if (imagen) {
    imagen.src = producto.imagen || "";
    imagen.alt = producto.nombre || "Producto";
    imagen.onerror = () => {
      imagen.removeAttribute("src");
      imagen.alt = "Imagen no disponible";
    };
  }
}

/**
 * Navega entre productos dentro del modal.
 * @param {number} direccion -1 | 1
 */
function navegarModal(direccion) {
  if (!productosFiltrados.length) {
    return;
  }

  indiceModal =
    (indiceModal + direccion + productosFiltrados.length) %
    productosFiltrados.length;
  actualizarModal();
}

/**
 * Cierra el lightbox.
 */
function cerrarModal() {
  const modal = document.getElementById("modal-producto");
  if (!modal) {
    return;
  }

  modal.hidden = true;
  document.body.style.overflow = "";
}

/**
 * Abre WhatsApp con un mensaje prellenado del producto.
 * @param {Object} producto
 */
function consultarWhatsApp(producto) {
  if (!WHATSAPP_NUMBER || WHATSAPP_NUMBER.includes("X")) {
    alert(
      "Configura tu número de WhatsApp en js/app.js (constante WHATSAPP_NUMBER)."
    );
    return;
  }

  const nombre = producto.nombre || "este producto";
  const precio = formatearPrecio(producto.precio);
  const mensaje =
    `Hola, estoy interesada en el producto ${nombre} de ${precio}. ` +
    `¿Podrían brindarme información sobre disponibilidad?`;

  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(mensaje)}`;
  window.open(url, "_blank", "noopener,noreferrer");
}

/**
 * Formatea el precio en soles peruanos.
 * @param {number} precio
 * @returns {string}
 */
function formatearPrecio(precio) {
  const valor = Number(precio);
  if (Number.isNaN(valor)) {
    return "S/ 0.00";
  }
  return `S/ ${valor.toFixed(2)}`;
}

/**
 * Escapa texto para insertarlo como HTML.
 * @param {string} texto
 * @returns {string}
 */
function escaparHTML(texto) {
  return String(texto)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/**
 * Escapa atributos HTML.
 * @param {string} texto
 * @returns {string}
 */
function escaparAttr(texto) {
  return escaparHTML(texto);
}
