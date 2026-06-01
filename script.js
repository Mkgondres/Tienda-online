/* ==========================================================================
   1. VARIABLES DE ESTADO GLOBALES
   ========================================================================== */
let todosLosProductos = []; // Guardará los productos originales de la API
let carrito = [];           // Guardará los productos agregados por el usuario
let categoriaActiva = "todos";

/* ==========================================================================
   2. CAPTURA DE ELEMENTOS DEL DOM (HOOKS)
   ========================================================================== */
const contenedorProductos = document.getElementById('contenedor-productos');
const contenedorBotonesCat = document.getElementById('contenedor-botones-categoria');
const tituloCategoria = document.getElementById('titulo-categoria');
const ordenarPrecioSelect = document.getElementById('ordenar-precio');
const rangoPrecioInput = document.getElementById('rango-precio');
const valorPrecioMaxSpan = document.getElementById('valor-precio-max');

// Elementos del Carrito Modal
const carritoModal = document.getElementById('carrito-modal');
const btnAbrirCarrito = document.getElementById('abrir-carrito');
const btnCerrarCarrito = document.getElementById('cerrar-carrito');
const itemsCarritoContenedor = document.getElementById('items-carrito');
const totalPrecioSpan = document.getElementById('total-precio');
const contadorCarritoSpan = document.getElementById('contador-carrito');
const btnPagar = document.getElementById('btn-pagar');

/* ==========================================================================
   3. INICIALIZACIÓN Y COLA DE CONEXIÓN CON LA API
   ========================================================================== */
document.addEventListener('DOMContentLoaded', () => {
    cargarProductosDeAPI();
    configurarEventos();
});

// Función para traer la información de Internet
function cargarProductosDeAPI() {
    // Usamos Fake Store API (Trae ropa, electrónicos y joyería)
    fetch('https://fakestoreapi.com/products')
        .then(respuesta => respuesta.json())
        .then(datos => {
            todosLosProductos = datos;
            
            // Ajustamos el rango máximo del slider dinámicamente según el producto más caro
            const precioMasAlto = Math.ceil(Math.max(...todosLosProductos.map(p => p.price)));
            rangoPrecioInput.max = precioMasAlto;
            rangoPrecioInput.value = precioMasAlto;
            valorPrecioMaxSpan.innerText = precioMasAlto;

            // Renderizamos la tienda por primera vez
            generarBotonesCategoriaDinámicos();
            aplicarFiltrosYOrden();
        })
        .catch(error => {
            contenedorProductos.innerHTML = `<p style="text-align:center; color:red;">Error al conectar con la tienda. Inténtalo más tarde.</p>`;
            console.error('Error API:', error);
        });
}

/* ==========================================================================
   4. FUNCIONES DE RENDERIZACIÓN (DIBUJAR EN PANTALLA)
   ========================================================================== */

// Dibuja las tarjetas de productos en el HTML
function mostrarProductos(productosAMostrar) {
    contenedorProductos.innerHTML = ''; // Limpiamos la vitrina

    if (productosAMostrar.length === 0) {
        contenedorProductos.innerHTML = `<p style="grid-column: 1/-1; text-align:center; color:#9ca3af; padding: 40px 0;">No se encontraron productos con estos filtros.</p>`;
        return;
    }

    productosAMostrar.forEach(producto => {
        const tarjeta = document.createElement('div');
        tarjeta.classList.add('tarjeta-producto');
        
        tarjeta.innerHTML = `
            <div class="contenedor-imagen">
                <img src="${producto.image}" alt="${producto.title}">
            </div>
            <div class="info-producto">
                <h3>${producto.title}</h3>
                <p class="precio-producto">$${producto.price.toFixed(2)}</p>
                <button class="btn-agregar-carrito" data-id="${producto.id}">Añadir al Carrito</button>
            </div>
        `;
        contenedorProductos.appendChild(tarjeta);
    });
}

// Extrae las categorías únicas de la API y crea los botones en español
function generarBotonesCategoriaDinámicos() {
    // Set evita elementos duplicados de forma nativa
    const categoriasUnicas = ['todos', ...new Set(todosLosProductos.map(p => p.category))];
    
    // Diccionario rápido para traducir las categorías que vienen en inglés de la API
    const traducciones = {
        'todos': 'Todos los productos',
        'electronics': 'Electrodomésticos y Electrónica',
        'jewelry': 'Cosméticos y Joyería',
        "men's clothing": 'Ropa de Hombre',
        "women's clothing": 'Ropa de Mujer'
    };

    contenedorBotonesCat.innerHTML = ''; // Limpiamos

    categoriasUnicas.forEach(cat => {
        const boton = document.createElement('button');
        boton.classList.add('btn-categoria');
        if(cat === 'todos') boton.classList.add('activo');
        
        boton.innerText = traducciones[cat] || cat;
        boton.setAttribute('data-categoria', cat);
        
        // Evento click para cada botón creado
        boton.addEventListener('click', (e) => {
            document.querySelectorAll('.btn-categoria').forEach(b => b.classList.remove('activo'));
            e.target.classList.add('activo');
            categoriaActiva = cat;
            tituloCategoria.innerText = traducciones[cat] || cat;
            aplicarFiltrosYOrden();
        });

        contenedorBotonesCat.appendChild(boton);
    });
}

/* ==========================================================================
   5. MOTOR DE FILTRADO Y ORDENAMIENTO (EL NÚCLEO)
   ========================================================================== */
function aplicarFiltrosYOrden() {
    let productosFiltrados = [...todosLosProductos];

    // 1. Filtrar por Categoría
    if (categoriaActiva !== 'todos') {
        productosFiltrados = productosFiltrados.filter(p => p.category === categoriaActiva);
    }

    // 2. Filtrar por Rango de Precio Máximo
    const precioMaximo = parseFloat(rangoPrecioInput.value);
    productosFiltrados = productosFiltrados.filter(p => p.price <= precioMaximo);

    // 3. Ordenar (Más barato u Orden Mayor)
    const metodoOrden = ordenarPrecioSelect.value;
    if (metodoOrden === 'barato') {
        productosFiltrados.sort((a, b) => a.price - b.price);
    } else if (metodoOrden === 'caro') {
        productosFiltrados.sort((a, b) => b.price - a.price);
    }

    // Dibujar el resultado final
    mostrarProductos(productosFiltrados);
}

/* ==========================================================================
   6. LÓGICA INTERACTIVA DEL CARRITO DE COMPRAS
   ========================================================================== */

// Añadir un artículo al carrito al hacer clic en el botón
function agregarAlCarrito(idProducto) {
    const productoEncontrado = todosLosProductos.find(p => p.id === idProducto);
    
    if (productoEncontrado) {
        // Buscamos si ya existe en el carrito para aumentar la cantidad interna
        const existeEnCarrito = carrito.find(item => item.id === idProducto);
        
        if (existeEnCarrito) {
            existeEnCarrito.cantidad++;
        } else {
            carrito.push({ ...productoEncontrado, cantidad: 1 });
        }
        actualizarInterfazCarrito();
    }
}

// Eliminar artículo por completo del carrito
function eliminarDelCarrito(idProducto) {
    carrito = carrito.filter(item => item.id !== idProducto);
    actualizarInterfazCarrito();
}

// Recalcula totales, cantidades y vuelve a dibujar el menú lateral del carrito
function actualizarInterfazCarrito() {
    itemsCarritoContenedor.innerHTML = '';
    
    let totalPrecio = 0;
    let totalArticulos = 0;

    if (carrito.length === 0) {
        itemsCarritoContenedor.innerHTML = `<p class="carrito-vacio">Tu carrito está vacío.</p>`;
    } else {
        carrito.forEach(item => {
            totalPrecio += item.price * item.cantidad;
            totalArticulos += item.cantidad;

            const divItem = document.createElement('div');
            divItem.classList.add('item-en-carrito');
            divItem.innerHTML = `
                <img src="${item.image}" alt="${item.title}">
                <div class="item-info">
                    <h4>${item.title}</h4>
                    <p>${item.cantidad}x - $${(item.price * item.cantidad).toFixed(2)}</p>
                    <button class="btn-eliminar-item" data-id="${item.id}">Eliminar</button>
                </div>
            `;
            itemsCarritoContenedor.appendChild(divItem);
        });
    }

    totalPrecioSpan.innerText = `$${totalPrecio.toFixed(2)}`;
    contadorCarritoSpan.innerText = totalArticulos;
}

/* ==========================================================================
   7. CONFIGURACIÓN GENERAL DE EVENTOS Y PASARELA DE PAGO
   ========================================================================== */
function configurarEventos() {
    // Escuchar el movimiento de la barra deslizable de precios
    rangoPrecioInput.addEventListener('input', (e) => {
        valorPrecioMaxSpan.innerText = e.target.value;
        aplicarFiltrosYOrden();
    });

    // Escuchar el selector de orden de precios
    ordenarPrecioSelect.addEventListener('change', aplicarFiltrosYOrden);

    // Eventos de apertura y cierre del Modal del Carrito
    btnAbrirCarrito.addEventListener('click', () => carritoModal.classList.add('abierto'));
    btnCerrarCarrito.addEventListener('click', () => carritoModal.classList.remove('abierto'));

    // Delegación de eventos (Para elementos creados dinámicamente que no existían al cargar la página)
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('btn-agregar-carrito')) {
            const id = parseInt(e.target.getAttribute('data-id'));
            agregarAlCarrito(id);
        }
        if (e.target.classList.contains('btn-eliminar-item')) {
            const id = parseInt(e.target.getAttribute('data-id'));
            eliminarDelCarrito(id);
        }
    });

    // Simulación Funcional de Pasarela de Pago
    btnPagar.addEventListener('click', () => {
        if (carrito.length === 0) {
            alert('Agrega al menos un producto para procesar el pago.');
            return;
        }
        
        alert(`¡Simulación de Pago Exitosa!\n\nProcesando cobro por un total de: ${totalPrecioSpan.innerText}\nGracias por tu compra de prueba.`);
        carrito = []; // Vaciar el carrito
        actualizarInterfazCarrito();
        carritoModal.classList.remove('abierto'); // Cerrar modal
    });
}
