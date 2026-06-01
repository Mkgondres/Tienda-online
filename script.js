/* ============================
   RESINA LUXA – SCRIPT
   Primera parte: Carrito, Renderizado y Eventos
   ============================ */

'use strict';

// ---------- ELEMENTOS DEL DOM ----------
const cartToggle = document.getElementById('cart-toggle');
const cartSidebar = document.getElementById('cart-sidebar');
const cartOverlay = document.getElementById('cart-overlay');
const cartClose = document.getElementById('cart-close');
const cartItemsContainer = document.getElementById('cart-items');
const cartCountElement = document.getElementById('cart-count');
const cartTotalPrice = document.getElementById('cart-total-price');
const checkoutBtn = document.getElementById('checkout-btn');
const checkoutModal = document.getElementById('checkout-section');
const checkoutOverlay = document.getElementById('checkout-overlay');
const closeCheckout = document.getElementById('close-checkout');
const checkoutLista = document.getElementById('checkout-lista');
const checkoutTotalDisplay = document.getElementById('checkout-total-display');
const paymentForm = document.getElementById('payment-form');
const paymentSuccess = document.getElementById('payment-success');

// ---------- ESTADO DEL CARRITO ----------
let cart = [];

// ---------- FUNCIONES DEL CARRITO ----------

// Guardar carrito en localStorage
function saveCart() {
    localStorage.setItem('resinaLuxaCart', JSON.stringify(cart));
}

// Cargar carrito desde localStorage
function loadCart() {
    const stored = localStorage.getItem('resinaLuxaCart');
    if (stored) {
        cart = JSON.parse(stored);
    }
}

// Obtener total del carrito
function getCartTotal() {
    return cart.reduce((total, item) => total + item.precio * item.cantidad, 0);
}

// Obtener cantidad total de productos
function getCartCount() {
    return cart.reduce((count, item) => count + item.cantidad, 0);
}

// Formatear precio en Reales brasileños
function formatPrice(price) {
    return price.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL',
        minimumFractionDigits: 2
    });
}

// Renderizar items en el carrito lateral
function renderCart() {
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p class="cart-empty">No hay productos en el carrito.</p>';
        checkoutBtn.style.display = 'none';
    } else {
        checkoutBtn.style.display = 'block';
        cartItemsContainer.innerHTML = cart.map(item => `
            <div class="cart-item" data-id="${item.id}">
                <div class="cart-item-info">
                    <h4 class="cart-item-nombre">${item.nombre}</h4>
                    <p class="cart-item-precio">${formatPrice(item.precio)}</p>
                </div>
                <div class="cart-item-actions">
                    <button class="cart-item-decrease" data-id="${item.id}">−</button>
                    <span class="cart-item-cantidad">${item.cantidad}</span>
                    <button class="cart-item-increase" data-id="${item.id}">+</button>
                    <button class="cart-item-remove" data-id="${item.id}">🗑️</button>
                </div>
            </div>
        `).join('');

        // Asignar eventos a los botones de cantidad y eliminar
        document.querySelectorAll('.cart-item-increase').forEach(btn => {
            btn.addEventListener('click', () => increaseQuantity(parseInt(btn.dataset.id)));
        });
        document.querySelectorAll('.cart-item-decrease').forEach(btn => {
            btn.addEventListener('click', () => decreaseQuantity(parseInt(btn.dataset.id)));
        });
        document.querySelectorAll('.cart-item-remove').forEach(btn => {
            btn.addEventListener('click', () => removeFromCart(parseInt(btn.dataset.id)));
        });
    }

    // Actualizar contador y total
    cartCountElement.textContent = getCartCount();
    cartTotalPrice.textContent = formatPrice(getCartTotal());
    saveCart();
}

// Agregar producto al carrito
function addToCart(id, nombre, precio) {
    const existingItem = cart.find(item => item.id === id);
    if (existingItem) {
        existingItem.cantidad += 1;
    } else {
        cart.push({
            id: id,
            nombre: nombre,
            precio: precio,
            cantidad: 1
        });
    }
    renderCart();
    // Mostrar carrito brevemente al agregar
    if (!cartSidebar.classList.contains('open')) {
        openCart();
        // Cerrar automáticamente después de 1.5 segundos si el usuario no interactúa
        setTimeout(() => {
            if (cartSidebar.classList.contains('open')) {
                closeCart();
            }
        }, 1500);
    }
}

// Eliminar producto del carrito
function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    renderCart();
}

// Aumentar cantidad de un producto
function increaseQuantity(id) {
    const item = cart.find(item => item.id === id);
    if (item) {
        item.cantidad += 1;
        renderCart();
    }
}

// Disminuir cantidad de un producto
function decreaseQuantity(id) {
    const item = cart.find(item => item.id === id);
    if (item && item.cantidad > 1) {
        item.cantidad -= 1;
        renderCart();
    } else if (item && item.cantidad === 1) {
        removeFromCart(id);
    }
}

// Abrir carrito lateral
function openCart() {
    cartSidebar.classList.add('open');
    cartOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Cerrar carrito lateral
function closeCart() {
    cartSidebar.classList.remove('open');
    cartOverlay.classList.remove('active');
    document.body.style.overflow = '';
}

// ---------- EVENT LISTENERS INICIALES ----------

// Delegación de eventos para botones "Agregar al Carrito"
document.querySelector('.catalogo-grid').addEventListener('click', function(e) {
    const btn = e.target.closest('.agregar-carrito');
    if (!btn) return;

    const id = parseInt(btn.dataset.id);
    const nombre = btn.dataset.nombre;
    const precio = parseFloat(btn.dataset.precio);

    // Efecto visual en el botón
    btn.textContent = '✓ Agregado';
    btn.style.background = 'var(--color-dorado)';
    btn.style.color = '#0b0a0a';
    setTimeout(() => {
        btn.textContent = 'Agregar al Carrito';
        btn.style.background = '';
        btn.style.color = '';
    }, 1200);

    addToCart(id, nombre, precio);
});

// Toggle del carrito desde el icono
cartToggle.addEventListener('click', function(e) {
    e.preventDefault();
    if (cartSidebar.classList.contains('open')) {
        closeCart();
    } else {
        openCart();
    }
});

// Cerrar carrito con botón X
cartClose.addEventListener('click', closeCart);

// Cerrar carrito al hacer clic en el overlay
cartOverlay.addEventListener('click', closeCart);

// ---------- BASE PARA CHECKOUT ----------
// (Se detalla y completa en la segunda parte del JS)

// Renderizar resumen en el modal de checkout
function renderCheckoutResumen() {
    if (cart.length === 0) return;

    checkoutLista.innerHTML = cart.map(item => `
        <li>
            <span>${item.nombre} x${item.cantidad}</span>
            <span>${formatPrice(item.precio * item.cantidad)}</span>
        </li>
    `).join('');
    checkoutTotalDisplay.textContent = formatPrice(getCartTotal());
}

// Abrir modal de checkout
function openCheckout() {
    if (cart.length === 0) {
        alert('Tu carrito está vacío. Agrega mesas antes de proceder al pago.');
        return;
    }
    renderCheckoutResumen();
    checkoutModal.classList.add('active');
    checkoutOverlay.classList.add('active');
    closeCart(); // Cierra el carrito lateral si estaba abierto
    document.body.style.overflow = 'hidden';
}

// Cerrar modal de checkout
function closeCheckoutModal() {
    checkoutModal.classList.remove('active');
    checkoutOverlay.classList.remove('active');
    document.body.style.overflow = '';
    paymentForm.style.display = 'block';
    paymentSuccess.style.display = 'none';
}

// Eventos de apertura/cierre del checkout
checkoutBtn.addEventListener('click', openCheckout);
closeCheckout.addEventListener('click', closeCheckoutModal);
checkoutOverlay.addEventListener('click', closeCheckoutModal);

// ---------- INICIALIZACIÓN ----------
document.addEventListener('DOMContentLoaded', function() {
    loadCart();
    renderCart();
});

/* 
   ██████████████████████████████████████████████████
   PRIMERA MITAD DEL JS TERMINA AQUÍ
   (La segunda parte contendrá: procesamiento del formulario 
   de pago, validaciones, simulación de transacción, 
   limpieza del carrito post-compra y mejoras UX)
   ██████████████████████████████████████████████████
*/
/* ============================
   RESINA LUXA – SCRIPT
   Segunda parte: Procesamiento de pago, validación,
   simulación de transacción, UX avanzada y limpieza
   ============================ */

'use strict';

// ---------- REFERENCIAS ADICIONALES DEL DOM ----------
const payBtn = document.getElementById('pay-btn');
const nomeInput = document.getElementById('nome');
const emailInput = document.getElementById('email');
const direccionInput = document.getElementById('direccion');
const paisSelect = document.getElementById('pais');
const cardNumberInput = document.getElementById('card-number');
const expiryInput = document.getElementById('expiry');
const cvvInput = document.getElementById('cvv');

// ---------- VALIDACIONES DEL FORMULARIO ----------

// Validar campo no vacío
function isNotEmpty(value) {
    return value.trim() !== '';
}

// Validar formato de email básico
function isValidEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

// Validar que el número de tarjeta tenga formato "0000 0000 0000 0000"
function isValidCardNumber(number) {
    const digitsOnly = number.replace(/\s/g, '');
    return /^\d{16}$/.test(digitsOnly);
}

// Validar formato de vencimiento MM/AA
function isValidExpiry(expiry) {
    if (!/^\d{2}\/\d{2}$/.test(expiry)) return false;
    const [month, year] = expiry.split('/').map(Number);
    if (month < 1 || month > 12) return false;
    const currentYear = new Date().getFullYear() % 100;
    const currentMonth = new Date().getMonth() + 1;
    if (year < currentYear || (year === currentYear && month < currentMonth)) return false;
    return true;
}

// Validar CVV (3 o 4 dígitos)
function isValidCVV(cvv) {
    return /^\d{3,4}$/.test(cvv);
}

// Mostrar error en un campo
function showFieldError(input, message) {
    const existing = input.parentElement.querySelector('.field-error');
    if (existing) existing.remove();
    const error = document.createElement('span');
    error.className = 'field-error';
    error.textContent = message;
    error.style.cssText = 'color: #e74c3c; font-size: 0.75rem; display: block; margin-top: 0.3rem;';
    input.parentElement.appendChild(error);
    input.style.borderColor = '#e74c3c';
}

// Limpiar todos los errores visuales
function clearAllErrors() {
    document.querySelectorAll('.field-error').forEach(el => el.remove());
    [nomeInput, emailInput, direccionInput, paisSelect,
     cardNumberInput, expiryInput, cvvInput].forEach(input => {
        input.style.borderColor = '#333';
    });
}

// Formatear automáticamente el número de tarjeta con espacios
cardNumberInput.addEventListener('input', function(e) {
    let value = e.target.value.replace(/\s/g, '').replace(/[^\d]/g, '');
    if (value.length > 16) value = value.slice(0, 16);
    const formatted = value.replace(/(\d{4})(?=\d)/g, '$1 ');
    e.target.value = formatted;
});

// Formatear vencimiento automáticamente
expiryInput.addEventListener('input', function(e) {
    let value = e.target.value.replace(/[^\d]/g, '');
    if (value.length > 4) value = value.slice(0, 4);
    if (value.length >= 2) {
        value = value.slice(0, 2) + '/' + value.slice(2);
    }
    e.target.value = value;
});

// Limitar CVV a 4 dígitos
cvvInput.addEventListener('input', function(e) {
    e.target.value = e.target.value.replace(/[^\d]/g, '').slice(0, 4);
});

// ---------- FUNCIÓN PRINCIPAL DE PAGO ----------
function processPayment(e) {
    e.preventDefault();
    clearAllErrors();

    // Obtener valores
    const nome = nomeInput.value.trim();
    const email = emailInput.value.trim();
    const direccion = direccionInput.value.trim();
    const pais = paisSelect.value;
    const cardNumber = cardNumberInput.value.trim();
    const expiry = expiryInput.value.trim();
    const cvv = cvvInput.value.trim();

    let isValid = true;

    // Validar campos
    if (!isNotEmpty(nome)) {
        showFieldError(nomeInput, 'El nombre es obligatorio.');
        isValid = false;
    }
    if (!isValidEmail(email)) {
        showFieldError(emailInput, 'Ingresa un correo válido.');
        isValid = false;
    }
    if (!isNotEmpty(direccion)) {
        showFieldError(direccionInput, 'La dirección es obligatoria.');
        isValid = false;
    }
    if (pais === '') {
        showFieldError(paisSelect, 'Selecciona un país de entrega.');
        isValid = false;
    }
    if (!isValidCardNumber(cardNumber)) {
        showFieldError(cardNumberInput, 'Número de tarjeta inválido (16 dígitos).');
        isValid = false;
    }
    if (!isValidExpiry(expiry)) {
        showFieldError(expiryInput, 'Fecha de vencimiento inválida (MM/AA).');
        isValid = false;
    }
    if (!isValidCVV(cvv)) {
        showFieldError(cvvInput, 'CVV inválido (3-4 dígitos).');
        isValid = false;
    }

    if (!isValid) return;

    // Simular procesamiento de pago
    payBtn.disabled = true;
    payBtn.textContent = 'Procesando...';
    payBtn.style.opacity = '0.7';

    // Simular latencia de red (entre 1.5 y 2.5 segundos)
    const delay = 1500 + Math.random() * 1000;
    setTimeout(() => {
        // Pago exitoso simulado
        paymentForm.style.display = 'none';
        paymentSuccess.style.display = 'block';
        paymentSuccess.scrollIntoView({ behavior: 'smooth', block: 'center' });

        // Limpiar carrito después de compra exitosa
        cart = [];
        saveCart();
        renderCart();

        // Resetear formulario
        paymentForm.reset();
        payBtn.disabled = false;
        payBtn.textContent = 'Realizar Pago';
        payBtn.style.opacity = '1';

        // Cerrar modal automáticamente después de 5 segundos
        setTimeout(() => {
            if (checkoutModal.classList.contains('active')) {
                closeCheckoutModal();
                paymentForm.style.display = 'block';
                paymentSuccess.style.display = 'none';
            }
        }, 5000);
    }, delay);
}

// Asignar evento de submit al formulario
paymentForm.addEventListener('submit', processPayment);

// También prevenir envío al hacer clic en el botón (por si acaso)
payBtn.addEventListener('click', function(e) {
    // El evento submit se disparará igual, solo nos aseguramos
});

// ---------- MEJORAS DE UX ADICIONALES ----------

// Cerrar carrito con tecla Escape
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        if (checkoutModal.classList.contains('active')) {
            closeCheckoutModal();
        } else if (cartSidebar.classList.contains('open')) {
            closeCart();
        }
    }
});

// Animación suave al hacer scroll a secciones (por si hay anclas)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        const target = document.querySelector(targetId);
        if (target) {
            e.preventDefault();
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Efecto parallax sutil en el hero al mover el mouse (opcional)
const hero = document.querySelector('.hero');
if (hero && window.innerWidth > 768) {
    hero.addEventListener('mousemove', function(e) {
        const { clientX, clientY } = e;
        const moveX = (clientX - window.innerWidth / 2) * 0.005;
        const moveY = (clientY - window.innerHeight / 2) * 0.005;
        hero.style.transform = `translate(${moveX}px, ${moveY}px)`;
    });
    hero.addEventListener('mouseleave', function() {
        hero.style.transform = 'translate(0, 0)';
        hero.style.transition = 'transform 0.6s ease-out';
    });
}

// Actualizar año en el footer automáticamente
const yearSpan = document.querySelector('.footer-bottom p');
if (yearSpan) {
    const currentYear = new Date().getFullYear();
    yearSpan.innerHTML = yearSpan.innerHTML.replace('2026', currentYear);
}

// ---------- CIERRE E INICIALIZACIÓN FINAL ----------
console.log('Resina Luxa – Tienda online lista.');
console.log('Carrito inicial:', cart);
