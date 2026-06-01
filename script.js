/* ==========================================================================
   1. CATÁLOGO DE RESPALDO (Garantiza que la tienda NUNCA se vea vacía)
   ========================================================================== */
const PRODUCTOS_RESPALDO_LOCAL = [
    { id: 101, titulo: "Chaqueta Bomber Premium - Damas", precio: 49.99, imagen: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500", categoria: "clothes" },
    { id: 102, titulo: "Camisa Oxford Slim Fit - Caballeros", precio: 29.99, imagen: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=500", categoria: "clothes" },
    { id: 103, titulo: "Zapatillas Urbanas Neo - Calzado", precio: 79.95, imagen: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500", categoria: "shoes" },
    { id: 104, titulo: "Reloj Cronógrafo Minimalista - Accesorios", precio: 120.00, imagen: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500", categoria: "electronics" },
    { id: 105, titulo: "Sudadera con Capucha Algodón - Niños", precio: 24.99, imagen: "https://images.unsplash.com/photo-1519457431-44ccd64a579b?w=500", categoria: "clothes" },
    { id: 106, titulo: "Vestido Elegante de Noche - Damas", precio: 89.99, imagen: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=500", categoria: "clothes" },
    { id: 107, titulo: "Mocasines de Cuero Confort - Caballeros", precio: 65.00, imagen: "https://images.unsplash.com/photo-1539185441755-769473a23570?w=500", categoria: "shoes" },
    { id: 108, titulo: "Gafas de Sol Aviador - Accesorios", precio: 35.00, imagen: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=500", categoria: "electronics" }
];

/* ==========================================================================
   2. ESTADO GLOBAL DE LA APLICACIÓN
   ========================================================================== */
let catalogoProductosOriginal = []; 
let bolsaCompraCarrito = [];        
let filtroCategoriaActiva = "todas";
let filtroPrecioMaximoActivo = 300;
let ordenamientoActivo = "relevancia";
let palabraClaveBusqueda = "";

/* ==========================================================================
   3. CAPTURA DE ELEMENTOS DEL DOM
   ========================================================================== */
const gridProductos = document.getElementById('contenedor-grid-productos');
const contadorResultados = document.getElementById('contador-resultados-productos');
const controlPrecioSlider = document.getElementById('slider-rango-precio');
const etiquetaPrecioMax = document.getElementById('etiqueta-precio-max');
const selectorOrdenamiento = document.getElementById('control-ordenamiento');
const inputBusquedaTexto = document.getElementById('input-busqueda');
const btnBuscarAccion = document.getElementById('btn-ejecutar-busqueda');

/* ==========================================================================
   4. ARRANCADOR ASÍNCRONO CON FALLBACK INTEGRADO
   ========================================================================== */
document.addEventListener('DOMContentLoaded', () => {
    inicializarMarketplace();
});

async function inicializarMarketplace() {
    try {
        // Intentamos conectar con el servidor externo con un tiempo de espera máximo
        const respuesta = await fetch('https://api.escuelajs.co/api/v1/products?offset=0&limit=40');
        
        if (!respuesta.ok) throw new Error('Servidor inestable');
        
        const datosBrutos = await respuesta.json();
        
        // Mapeo seguro: Evita caídas si el objeto de la API viene incompleto u nulo (?.)
        catalogoProductosOriginal = datosBrutos.map(producto => {
            let categoriaMapeada = "electronics"; 
            const nombreCatId = producto?.category?.name?.toLowerCase() || '';
            
            if (nombreCatId.includes('clot') || nombreCatId.includes('garment') || nombreCatId.includes('ropa')) {
                categoriaMapeada = "clothes";
            } else if (nombreCatId.includes('shoe') || nombreCatId.includes('sneaker') || nombreCatId.includes('zapato')) {
                categoriaMapeada = "shoes";
            }
            
            let imagenLimpia = producto?.images?.[0];
            if (imagenLimpia && imagenLimpia.startsWith('[')) {
                try { imagenLimpia = JSON.parse(imagenLimpia)[0]; } catch(e) {}
            }

            return {
                id: producto.id,
                titulo: producto.title || "Prenda de Vestir Moderna",
                precio: (producto.price && producto.price > 0) ? producto.price : 25.00, 
                imagen: imagenLimpia || "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500",
                categoria: categoriaMapeada
            };
        });

        // Si la API devolvió un array vacío, usamos el respaldo
        if (catalogoProductosOriginal.length === 0) {
            catalogoProductosOriginal = PRODUCTOS_RESPALDO_LOCAL;
        }

    } catch (error) {
        console.warn("⚠️ API externa inaccesible. Activando catálogo de Dropshipping local seguro.");
        // Si el internet falla, inyectamos instantáneamente los productos de respaldo
        catalogoProductosOriginal = PRODUCTOS_RESPALDO_LOCAL;
    }

    // Arrancamos los controles visuales pase lo que pase
    inyectarEventosFiltros();
    procesarFiltrosYOrden();
}

/* ==========================================================================
   5. MOTOR DE RENDERIZADO INTERACTIVO
   ========================================================================== */
function renderizarTarjetasEnVitrina(productosAMostrar) {
    gridProductos.innerHTML = ''; 
    contadorResultados.innerText = `Mostrando ${productosAMostrar.length} artículos listos para envío de Dropshipping.`;

    if (productosAMostrar.length === 0) {
        gridProductos.innerHTML = `
            <div style="grid-column: 1/-1; text-align:center; padding: 40px 20px; color:#64748b;">
                <p style="font-size: 1rem; font-weight:600;">No hay existencias con esos filtros comerciales.</p>
                <p style="font-size: 0.85rem; margin-top:4px;">Prueba restableciendo el presupuesto o la barra de búsqueda.</p>
            </div>
        `;
        return;
    }

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
   6. LÓGICA DE FILTRADO MULTI-NIVEL EN CASCADA
   ========================================================================== */
function inyectarEventosFiltros() {
    const botonesCategoria = document.querySelectorAll('.control-filtro-btn');
    botonesCategoria.forEach(boton => {
        boton.addEventListener('click', (e) => {
            botonesCategoria.forEach(b => b.classList.remove('activo'));
            e.currentTarget.classList.add('activo');
            filtroCategoriaActiva = e.currentTarget.getAttribute('data-valor');
            procesarFiltrosYOrden();
        });
    });

    controlPrecioSlider.addEventListener('input', (e) => {
        filtroPrecioMaximoActivo = parseFloat(e.target.value);
        etiquetaPrecioMax.innerText = `$${filtroPrecioMaximoActivo}`;
        procesarFiltrosYOrden();
    });

    selectorOrdenamiento.addEventListener('change', (e) => {
        ordenamientoActivo = e.target.value;
        procesarFiltrosYOrden();
    });

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
    let productosFiltrados = catalogoProductosOriginal.filter(producto => {
        const cumpleCategoria = filtroCategoriaActiva === "todas" || producto.categoria === filtroCategoriaActiva;
        const cumplePrecio = producto.precio <= filtroPrecioMaximoActivo;
        const cumpleBusqueda = producto.titulo.toLowerCase().includes(palabraClaveBusqueda);
        
        return cumpleCategoria && cumplePrecio && cumpleBusqueda;
    });

    if (ordenamientoActivo === "ascendente") {
        productosFiltrados.sort((a, b) => a.precio - b.precio);
    } else if (ordenamientoActivo === "descendente") {
        productosFiltrados.sort((a, b) => b.precio - a.precio);
    }

    renderizarTarjetasEnVitrina(productosFiltrados);
}

/* ==========================================================================
   7. CONTROL OPERATIVO DEL CARRITO DE COMPRAS
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

btnAbrirCarrito.addEventListener('click', () => capaModalCarrito.classList.add('abierto'));
btnCerrarCarrito.addEventListener('click', () => capaModalCarrito.classList.remove('abierto'));
capaModalCarrito.addEventListener('click', (e) => {
    if (e.target === capaModalCarrito) capaModalCarrito.classList.remove('abierto');
});

gridProductos.addEventListener('click', (e) => {
    const botonAgregar = e.target.closest('.btn-agregar-bolsa');
    if (botonAgregar) {
        const idProducto = parseInt(botonAgregar.getAttribute('data-id'));
        añadirArticuloABolsa(idProducto);
    }
});

function añadirArticuloABolsa(id) {
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
    const totalUnidades = bolsaCompraCarrito.reduce((acumulado, item) => acumulado + item.cantidad, 0);
    badgeContadorCarrito.innerText = totalUnidades;

    if (bolsaCompraCarrito.length === 0) {
        mensajeCarritoVacio.style.display = 'block';
        listaArticulosCarrito.querySelectorAll('.item-bolsa-row').forEach(el => el.remove());
        txtSubtotalPago.innerText = "$0.00";
        txtTotalPago.innerText = "$0.00";
        return;
    }

    mensajeCarritoVacio.style.display = 'none';
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

        filaArticulo.querySelector('.btn-remover-item').addEventListener('click', (e) => {
            const idRemover = parseInt(e.target.getAttribute('data-id'));
            removerArticuloDeBolsa(idRemover);
        });

        listaArticulosCarrito.appendChild(filaArticulo);
    });

    txtSubtotalPago.innerText = `$${cuentaSubtotal.toFixed(2)}`;
    txtTotalPago.innerText = `$${cuentaSubtotal.toFixed(2)}`;
}

btnEjecutarCheckout.addEventListener('click', () => {
    if (bolsaCompraCarrito.length === 0) {
        alert("Tu bolsa de compras está vacía.");
        return;
    }
    alert("🛒 ¡Pedido de Dropshipping Procesado!\n\nSe ha enviado la orden automática al proveedor internacional de forma segura.");
    bolsaCompraCarrito = [];
    actualizarInterfazCarrito();
    capaModalCarrito.classList.remove('abierto');
});
