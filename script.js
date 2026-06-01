/* ==========================================================================
   1. ESTADO GLOBAL DE LA APLICACIÓN (Memoria RAM del Cliente)
   ========================================================================== */
// Usamos nombres descriptivos y claros para un entorno profesional
let catalogoProductosOriginal = []; 
let bolsaCompraCarrito = [];        
let filtroCategoriaActiva = "todas";
let filtroPrecioMaximoActivo = 300;
let ordenamientoActivo = "relevancia";
let palabraClaveBusqueda = "";

/* ==========================================================================
   2. CAPTURA DE ELEMENTOS DEL DOM (Hooks de Interfaz)
   ========================================================================== */
const gridProductos = document.getElementById('contenedor-grid-productos');
const contadorResultados = document.getElementById('contador-resultados-productos');
const tituloSeccion = document.getElementById('titulo-seccion-actual');
const controlPrecioSlider = document.getElementById('slider-rango-precio');
const etiquetaPrecioMax = document.getElementById('etiqueta-precio-max');
const selectorOrdenamiento = document.getElementById('control-ordenamiento');
const inputBusquedaTexto = document.getElementById('input-busqueda');
const btnBuscarAccion = document.getElementById('btn-ejecutar-busqueda');

/* ==========================================================================
   3. ARRANCADOR ASÍNCRONO Y CONEXIÓN CON LA API DE INTERNET
   ========================================================================== */
document.addEventListener('DOMContentLoaded', () => {
    inicializarMarketplace();
});

async function inicializarMarketplace() {
    try {
        // Consumimos una API de alta escala que provee ropa (Clothes), zapatos (Shoes) y accesorios
        const respuesta = await fetch('https://api.escuelajs.co/api/v1/products?offset=0&limit=50');
        
        if (!respuesta.ok) throw new Error('Respuesta de red insatisfactoria');
        
        const datosBrutos = await respuesta.json();
        
        // NORMALIZACIÓN DE DATOS: Limpiamos y adaptamos las categorías de internet a nuestro HTML
        catalogoProductosOriginal = datosBrutos.map(producto => {
            let categoriaMapeada = "electronics"; // Por defecto accesorios/complementos
            
            const nombreCatId = producto.category.name.toLowerCase();
            if (nombreCatId.includes('clot') || nombreCatId.includes('garment')) {
                categoriaMapeada = "clothes";
            } else if (nombreCatId.includes('shoe') || nombreCatId.includes('sneaker')) {
                categoriaMapeada = "shoes";
            }
            
            // Corregimos URLs de imágenes rotas comunes en APIs de prueba gratuitas
            let imagenLimpia = producto.images[0];
            if (imagenLimpia && imagenLimpia.startsWith('[')) {
                imagenLimpia = JSON.parse(imagenLimpia)[0];
            }

            return {
                id: producto.id,
                titulo: producto.title,
                precio: producto.price > 0 ? producto.price : 25.00, // Evita precios en cero
                imagen: imagenLimpia || "https://images.unsplash.com/photo-1542291026-7eec264c27ff",
                categoria: categoriaMapeada
            };
        });

        // Configuración inicial de los controles de la pantalla
        inyectarEventosFiltros();
        procesarFiltrosYOrden();

    } catch (error) {
        console.error('Error de Sincronización API:', error);
        gridProductos.innerHTML = `
            <div style="grid-column: 1/-1; text-align:center; padding:40px; color:#ef4444;">
                <p>Hubo un inconveniente al conectar con el servidor de Dropshipping.</p>
                <small>Por favor, comprueba tu conexión a internet o intenta recargar.</small>
            </div>
        `;
    }
}

/* ==========================================================================
   4. MOTOR DE RENDERIZADO (Dibujado técnico de tarjetas)
   ========================================================================== */
function renderizarTarjetasEnVitrina(productosAMostrar) {
    // Vaciamos la rejilla para evitar duplicados
    gridProductos.innerHTML = ''; 
    
    // Actualizamos el contador de resultados estilo Amazon
    contadorResultados.innerText = `${productosAMostrar.length} productos encontrados en tiempo real.`;

    if (productosAMostrar.length === 0) {
        gridProductos.innerHTML = `
            <div style="grid-column: 1/-1; text-align:center; padding: 60px 20px; color:#64748b;">
                <p style="font-size: 1.1rem; font-weight:600;">No encontramos coincidencias para tu búsqueda</p>
                <p style="font-size: 0.85rem; margin-top:4px;">Prueba ajustando los filtros del panel lateral.</p>
            </div>
        `;
        return;
    }

    // Inyección limpia de elementos mediante bucle optimizado
    productosAMostrar.forEach(producto => {
        const tarjetaHtml = document.createElement('article');
        tarjetaHtml.classList.add('tarjeta-producto');
        
        tarjetaHtml.innerHTML = `
            <div class="imagen-producto-contenedor">
                <img src="${producto.imagen}" alt="${producto.titulo}" loading="lazy">
            </div>
            <div class="info-producto-contenedor">
                <h3>${producto.titulo}</h3>
                <p class="precio-producto-tag">$${producto.precio.toFixed(2)}</p>
                <button class="btn-agregar-bolsa" data-id="${producto.id}">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path><line x1="3" y1="6" x2="21" y2="6"></line><path d="M16 10a4 4 0 0 1-8 0"></path></svg>
                    Añadir a la bolsa
                </button>
            </div>
        `;
        
        gridProductos.appendChild(tarjetaHtml);
    });
}
/* ==========================================================================
   5. MOTOR DE FILTROS Y ORDENAMIENTO COMBINADO (Cascada en Tiempo Real)
   ========================================================================== */
function inyectarEventosFiltros() {
    // Escucha de botones de categoría (Damas, Calzado, etc.)
    const botonesCategoria = document.querySelectorAll('.control-filtro-btn');
    botonesCategoria.forEach(boton => {
        boton.addEventListener('click', (e) => {
            botonesCategoria.forEach(b => b.classList.remove('activo'));
            e.currentTarget.classList.add('activo');
            
            filtroCategoriaActiva = e.currentTarget.getAttribute('data-valor');
            procesarFiltrosYOrden();
        });
    });

    // Escucha del control de rango de precio (Slider)
    controlPrecioSlider.addEventListener('input', (e) => {
        filtroPrecioMaximoActivo = parseFloat(e.target.value);
        etiquetaPrecioMax.innerText = `$${filtroPrecioMaximoActivo}`;
        procesarFiltrosYOrden();
    });

    // Escucha del selector de orden (Mayor/Menor precio)
    selectorOrdenamiento.addEventListener('change', (e) => {
        ordenamientoActivo = e.target.value;
        procesarFiltrosYOrden();
    });

    // Escucha del buscador global de texto (Al dar clic o presionar Enter)
    btnBuscarAccion.addEventListener('click', () => {
        palabraClaveBusqueda = inputBusquedaTexto.value.toLowerCase().trim();
        procesarFiltrosYOrden();
    });

    inputBusquedaTexto.addEventListener('keyup', (e) => {
        if (e.key === 'Enter') {
            palabraClaveBusqueda = inputBusquedaTexto.value.toLowerCase().trim();
            procesarFiltrosYOrden();
        }
    });
}

function procesarFiltrosYOrden() {
    // Aplicamos los filtros secuencialmente sobre la memoria RAM
    let productosFiltrados = catalogoProductosOriginal.filter(producto => {
        const cumpleCategoria = filtroCategoriaActiva === "todas" || producto.categoria === filtroCategoriaActiva;
        const cumplePrecio = producto.price <= filtroPrecioMaximoActivo || producto.precio <= filtroPrecioMaximoActivo;
        const cumpleBusqueda = producto.titulo.toLowerCase().includes(palabraClaveBusqueda);
        
        return cumpleCategoria && cumplePrecio && cumpleBusqueda;
    });

    // Aplicamos la jerarquía de ordenamiento seleccionada
    if (ordenamientoActivo === "ascendente") {
        productosFiltrados.sort((a, b) => a.precio - b.precio);
    } else if (ordenamientoActivo === "descendente") {
        productosFiltrados.sort((a, b) => b.precio - a.precio);
    }

    // Dibujamos el resultado final depurado en la pantalla
    renderizarTarjetasEnVitrina(productosFiltrados);
}

/* ==========================================================================
   6. SISTEMA INTERACTIVO DE LA BOLSA DE COMPRAS (Gestión del Carrito)
   ========================================================================== */
const capaModalCarrito = document.getElementById('capa-modal-carrito');
const btnAbrirCarrito = document.getElementById('boton-ver-carrito');
const btnCerrarCarrito = document.getElementById('btn-colapsar-carrito');
const listaArticulosCarrito = document.getElementById('lista-articulos-carrito');
const mensajeCarritoVacio = document.getElementById('mensaje-carrito-vacio');
const txtSubtotalPago = document.getElementById('txt-subtotal-pago');
const txtTotalPago = document.getElementById('txt-total-pago');
const badgeContadorCarrito = document.getElementById('badge-contador-carrito');
const btnEjecutarCheckout = document.getElementById('btn-ejecutar-checkout');

// Control de apertura y cierre visual del modal deslizable
btnAbrirCarrito.addEventListener('click', () => capaModalCarrito.classList.add('abierto'));
btnCerrarCarrito.addEventListener('click', () => capaModalCarrito.classList.remove('abierto'));
capaModalCarrito.addEventListener('click', (e) => {
    if (e.target === capaModalCarrito) capaModalCarrito.classList.remove('abierto');
});

// Captura del clic en "Añadir a la bolsa" usando delegación de eventos (Eficiencia Pro)
gridProductos.addEventListener('click', (e) => {
    const botonAgregar = e.target.closest('.btn-agregar-bolsa');
    if (botonAgregar) {
        const idProducto = parseInt(botonAgregar.getAttribute('data-id'));
        añadirArticuloABolsa(idProducto);
    }
});

function añadirArticuloABolsa(id) {
    // Buscamos si el artículo ya fue agregado previamente para incrementar su cantidad
    const articuloExistente = bolsaCompraCarrito.find(item => item.id === id);
    
    if (articuloExistente) {
        articuloExistente.cantidad += 1;
    } else {
        const productoOriginal = catalogoProductosOriginal.find(p => p.id === id);
        if (productoOriginal) {
            bolsaCompraCarrito.push({ ...productoOriginal, cantidad: 1 });
        }
    }
    
    actualizarInterfazCarrito();
}

function removerArticuloDeBolsa(id) {
    bolsaCompraCarrito = bolsaCompraCarrito.filter(item => item.id !== id);
    actualizarInterfazCarrito();
}

function actualizarInterfazCarrito() {
    // Calculamos el número total de unidades en la bolsa
    const totalUnidades = bolsaCompraCarrito.reduce((acumulado, item) => acumulado + item.cantidad, 0);
    badgeContadorCarrito.innerText = totalUnidades;

    // Controlamos el bloque de aviso "Carrito Vacío"
    if (bolsaCompraCarrito.length === 0) {
        mensajeCarritoVacio.style.display = 'block';
        listaArticulosCarrito.querySelectorAll('.item-bolsa-row').forEach(el => el.remove());
        txtSubtotalPago.innerText = "$0.00";
        txtTotalPago.innerText = "$0.00";
        return;
    }

    mensajeCarritoVacio.style.display = 'none';
    
    // Limpiamos los elementos anteriores para volver a renderizar la lista actualizada
    listaArticulosCarrito.querySelectorAll('.item-bolsa-row').forEach(el => el.remove());

    let cuentaSubtotal = 0;

    bolsaCompraCarrito.forEach(item => {
        const costoCombinado = item.precio * item.cantidad;
        cuentaSubtotal += costoCombinado;

        const filaArticulo = document.createElement('div');
        filaArticulo.classList.add('item-bolsa-row');
        filaArticulo.innerHTML = `
            <img src="${item.imagen}" alt="${item.titulo}">
            <div class="item-bolsa-detalles">
                <h4>${item.titulo}</h4>
                <p class="precio-multiplicador">${item.cantidad}x - $${item.precio.toFixed(2)}</p>
                <button class="btn-remover-item" data-id="${item.id}">Eliminar</button>
            </div>
        `;

        // Asignamos el evento de eliminación al botón correspondiente
        filaArticulo.querySelector('.btn-remover-item').addEventListener('click', (e) => {
            const idRemover = parseInt(e.target.getAttribute('data-id'));
            removerArticuloDeBolsa(idRemover);
        });

        listaArticulosCarrito.appendChild(filaArticulo);
    });

    // Actualizamos los bloques financieros
    txtSubtotalPago.innerText = `$${cuentaSubtotal.toFixed(2)}`;
    txtTotalPago.innerText = `$${cuentaSubtotal.toFixed(2)}`;
}

/* ==========================================================================
   7. SIMULACIÓN DE FLUJO DE CAJA COMERCIAL (Checkout Seguro)
   ========================================================================== */
btnEjecutarCheckout.addEventListener('click', () => {
    if (bolsaCompraCarrito.length === 0) {
        alert("Tu bolsa de compras está vacía. Añade prendas antes de proceder al pago.");
        return;
    }

    alert("🛒 ¡Conexión con el Servidor de Dropshipping Exitosa!\n\nSe ha generado la orden automática de compra. Tu pedido será despachado directo a tu domicilio con envío internacional gratis.");
    
    // Vaciamos la bolsa tras completar la compra
    bolsaCompraCarrito = [];
    actualizarInterfazCarrito();
    capaModalCarrito.classList.remove('abierto');
});
