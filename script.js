/* ============================
   RESINA LUXA – SCRIPT
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

const payBtn = document.getElementById('pay-btn');
const nomeInput = document.getElementById('nome');
const emailInput = document.getElementById('email');
const direccionInput = document.getElementById('direccion');
const paisSelect = document.getElementById('pais');
const cardNumberInput = document.getElementById('card-number');
const expiryInput = document.getElementById('expiry');
const cvvInput = document.getElementById('cvv');

// ---------- ESTADO DEL CARRITO ----------
let cart = [];

// ---------- FUNCIONES DEL CARRITO ----------
function saveCart() {
    localStorage.setItem('resinaLuxaCart', JSON.stringify(cart));
}

function loadCart() {
    const stored = localStorage.getItem('resinaLuxaCart');
    if (stored) {
        cart = JSON.parse(stored);
    }
}

function getCartTotal() {
    return cart.reduce((total, item) => total + item.precio * item.cantidad, 0);
}

function getCartCount() {
    return cart.reduce((count, item) => count + item.cantidad, 0);
}

function formatPrice(price) {
    return price.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL',
        minimumFractionDigits: 2
    });
}

// Renderizado optimizado sin agregar eventos dentro del loop (previniendo fugas de memoria)
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
    }

    cartCountElement.textContent = getCartCount();
    cartTotalPrice.textContent = formatPrice(getCartTotal());
    saveCart();
}

function addToCart(id, nombre, precio) {
    const existingItem = cart.find(item => item.id === id);
    if (existingItem) {
        existingItem.cantidad += 1;
    } else {
        cart.push({ id: id, nombre: nombre, precio: precio, cantidad: 1 });
    }
    renderCart();
    
    if (!cartSidebar.classList.contains('open')) {
        openCart();
        setTimeout(() => {
            if (cartSidebar.classList.contains('open')) {
                closeCart();
            }
        }, 1500);
    }
}

function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    renderCart();
}

function increaseQuantity(id) {
    const item = cart.find(item => item.id === id);
    if (item) {
        item.cantidad += 1;
        renderCart();
    }
}

function decreaseQuantity(id) {
    const item = cart.find(item => item.id === id);
    if (item && item.cantidad > 1) {
        item.cantidad -= 1;
        renderCart();
    } else if (item && item.cantidad === 1) {
        removeFromCart(id);
    }
}

function openCart() {
    cartSidebar.classList.add('open');
    cartOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeCart() {
    cartSidebar.classList.remove('open');
    cartOverlay.classList.remove('active');
    document.body.style.overflow = '';
}

// ---------- EVENT LISTENERS INICIALES Y DELEGACIÓN ----------

// Delegación de eventos para el catálogo
document.querySelector('.catalogo-grid').addEventListener('click', function(e) {
    const btn = e.target.closest('.agregar-carrito');
    if (!btn) return;

    const id = parseInt(btn.dataset.id);
    const nombre = btn.dataset.nombre;
    const precio = parseFloat(btn.dataset.precio);

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

// Delegación de eventos para las interacciones dentro del carrito
cartItemsContainer.addEventListener('click', function(e) {
    if (e.target.classList.contains('cart-item-increase')) {
        increaseQuantity(parseInt(e.target.dataset.id));
    } else if (e.target.classList.contains('cart-item-decrease')) {
        decreaseQuantity(parseInt(e.target.dataset.id));
    } else if (e.target.classList.contains('cart-item-remove')) {
        removeFromCart(parseInt(e.target.dataset.id));
    }
});

cartToggle.addEventListener('click', function(e) {
    e.preventDefault();
    if (cartSidebar.classList.contains('open')) {
        closeCart();
    } else {
        openCart();
    }
});

cartClose.addEventListener('click', closeCart);
cartOverlay.addEventListener('click', closeCart);

// ---------- CHECKOUT Y PAGOS ----------
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

function openCheckout() {
    if (cart.length === 0) {
        alert('Tu carrito está vacío. Agrega mesas antes de proceder al pago.');
        return;
    }
    renderCheckoutResumen();
    checkoutModal.classList.add('active');
    checkoutOverlay.classList.add('active');
    closeCart(); 
    document.body.style.overflow = 'hidden';
}

function closeCheckoutModal() {
    checkoutModal.classList.remove('active');
    checkoutOverlay.classList.remove('active');
    document.body.style.overflow = '';
    paymentForm.style.display = 'block';
    paymentSuccess.style.display = 'none';
}

checkoutBtn.addEventListener('click', openCheckout);
closeCheckout.addEventListener('click', closeCheckoutModal);
checkoutOverlay.addEventListener('click', closeCheckoutModal);

// Validaciones
function isNotEmpty(value) { return value.trim() !== ''; }
function isValidEmail(email) { const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; return regex.test(email); }
function isValidCardNumber(number) { const digitsOnly = number.replace(/\s/g, ''); return /^\d{16}$/.test(digitsOnly); }
function isValidCVV(cvv) { return /^\d{3,4}$/.test(cvv); }

function isValidExpiry(expiry) {
    if (!/^\d{2}\/\d{2}$/.test(expiry)) return false;
    const [month, year] = expiry.split('/').map(Number);
    if (month < 1 || month > 12) return false;
    const currentYear = new Date().getFullYear() % 100;
    const currentMonth = new Date().getMonth() + 1;
    if (year < currentYear || (year === currentYear && month < currentMonth)) return false;
    return true;
}

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

function clearAllErrors() {
    document.querySelectorAll('.field-error').forEach(el => el.remove());
    [nomeInput, emailInput, direccionInput, paisSelect, cardNumberInput, expiryInput, cvvInput].forEach(input => {
        input.style.borderColor = '#333';
    });
}

// Formateos en vivo
cardNumberInput.addEventListener('input', function(e) {
    let value = e.target.value.replace(/\s/g, '').replace(/[^\d]/g, '');
    if (value.length > 16) value = value.slice(0, 16);
    const formatted = value.replace(/(\d{4})(?=\d)/g, '$1 ');
    e.target.value = formatted;
});

expiryInput.addEventListener('input', function(e) {
    let value = e.target.value.replace(/[^\d]/g, '');
    if (value.length > 4) value = value.slice(0, 4);
    if (value.length >= 2) {
        value = value.slice(0, 2) + '/' + value.slice(2);
    }
    e.target.value = value;
});

cvvInput.addEventListener('input', function(e) {
    e.target.value = e.target.value.replace(/[^\d]/g, '').slice(0, 4);
});

// Envío del pago
function processPayment(e) {
    e.preventDefault();
    clearAllErrors();

    const nome = nomeInput.value.trim();
    const email = emailInput.value.trim();
    const direccion = direccionInput.value.trim();
    const pais = paisSelect.value;
    const cardNumber = cardNumberInput.value.trim();
    const expiry = expiryInput.value.trim();
    const cvv = cvvInput.value.trim();

    let isValid = true;

    if (!isNotEmpty(nome)) { showFieldError(nomeInput, 'El nombre es obligatorio.'); isValid = false; }
    if (!isValidEmail(email)) { showFieldError(emailInput, 'Ingresa un correo válido.'); isValid = false; }
    if (!isNotEmpty(direccion)) { showFieldError(direccionInput, 'La dirección es obligatoria.'); isValid = false; }
    if (pais === '') { showFieldError(paisSelect, 'Selecciona un país de entrega.'); isValid = false; }
    if (!isValidCardNumber(cardNumber)) { showFieldError(cardNumberInput, 'Número de tarjeta inválido (16 dígitos).'); isValid = false; }
    if (!isValidExpiry(expiry)) { showFieldError(expiryInput, 'Fecha de vencimiento inválida (MM/AA).'); isValid = false; }
    if (!isValidCVV(cvv)) { showFieldError(cvvInput, 'CVV inválido (3-4 dígitos).'); isValid = false; }

    if (!isValid) return;

    payBtn.disabled = true;
    payBtn.textContent = 'Procesando...';
    payBtn.style.opacity = '0.7';

    const delay = 1500 + Math.random() * 1000;
    setTimeout(() => {
        paymentForm.style.display = 'none';
        paymentSuccess.style.display = 'block';
        paymentSuccess.scrollIntoView({ behavior: 'smooth', block: 'center' });

        cart = [];
        saveCart();
        renderCart();

        paymentForm.reset();
        payBtn.disabled = false;
        payBtn.textContent = 'Realizar Pago';
        payBtn.style.opacity = '1';

        setTimeout(() => {
            if (checkoutModal.classList.contains('active')) {
                closeCheckoutModal();
                paymentForm.style.display = 'block';
                paymentSuccess.style.display = 'none';
            }
        }, 5000);
    }, delay);
}

paymentForm.addEventListener('submit', processPayment);
payBtn.addEventListener('click', function(e) {});

// ---------- MEJORAS DE UX ADICIONALES ----------
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        if (checkoutModal.classList.contains('active')) {
            closeCheckoutModal();
        } else if (cartSidebar.classList.contains('open')) {
            closeCart();
        }
    }
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        const target = document.querySelector(targetId);
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// Optimización del efecto parallax con requestAnimationFrame
const hero = document.querySelector('.hero');
if (hero && window.innerWidth > 768) {
    let ticking = false;
    hero.addEventListener('mousemove', function(e) {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                const moveX = (e.clientX - window.innerWidth / 2) * 0.005;
                const moveY = (e.clientY - window.innerHeight / 2) * 0.005;
                hero.style.transform = `translate(${moveX}px, ${moveY}px)`;
                ticking = false;
            });
            ticking = true;
        }
    });
    hero.addEventListener('mouseleave', function() {
        window.requestAnimationFrame(() => {
            hero.style.transform = 'translate(0, 0)';
            hero.style.transition = 'transform 0.6s ease-out';
        });
    });
}

const yearSpan = document.querySelector('.footer-bottom p');
if (yearSpan) {
    const currentYear = new Date().getFullYear();
    yearSpan.innerHTML = yearSpan.innerHTML.replace('2026', currentYear);
}

// ---------- CIERRE E INICIALIZACIÓN FINAL ----------
document.addEventListener('DOMContentLoaded', function() {
    loadCart();
    renderCart();
});
console.log('Resina Luxa – Tienda online lista.');
