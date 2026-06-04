/* ============================
   RESINA LUXA – SCRIPT
   ============================ */

'use strict';

// ---------- BASE DE DATOS DE PRODUCTOS (Descripciones Profundas) ----------
const productsData = {
    1: {
        desc: "La Mesa Rio Claro es la encarnación del diseño biofílico. Cada veta de la madera de nogal americano es seleccionada meticulosamente a mano para complementar el río central de resina epoxi cristalina. Su proceso de pulido de 12 etapas garantiza una superficie impecable que invita al tacto, convirtiéndose en el centro de gravedad de cualquier salón contemporáneo.",
        materiales: "<li><strong>Madera:</strong> Nogal americano macizo curado durante 3 años.</li><li><strong>Resina:</strong> Epoxi grado óptico de ultra transparencia.</li><li><strong>Acabado:</strong> Aceite de tung natural y cera de abejas.</li><li><strong>Medidas:</strong> 180 cm x 90 cm x 4 cm.</li>"
    },
    2: {
        desc: "Inspirada en el flujo constante y pacífico del agua, la Mesa Onda Suave destaca por la integración casi imperceptible entre la cálida madera de fresno y un sinuoso camino de resina azul translúcida. Ideal para crear espacios de serenidad, esta pieza interactúa maravillosamente con la luz natural del día.",
        materiales: "<li><strong>Madera:</strong> Fresno europeo con tratamiento antifúngico.</li><li><strong>Resina:</strong> Epoxi premium pigmentada en azul cielo translúcido.</li><li><strong>Acabado:</strong> Barniz poliuretánico mate de alta resistencia.</li><li><strong>Medidas:</strong> 160 cm x 80 cm x 4 cm.</li>"
    },
    3: {
        desc: "Capturando la esencia efímera de los cielos crepusculares brasileños, la Mesa Atardecer utiliza una compleja técnica de vertido multicapa. La transición perfecta del naranja ardiente al rosa profundo se asienta sobre la robustez innegable del roble, creando una obra de arte funcional que irradia calidez.",
        materiales: "<li><strong>Madera:</strong> Roble macizo seleccionado por su grano expresivo.</li><li><strong>Resina:</strong> Mezcla tricapa con pigmentos metálicos naranja, rosa y oro.</li><li><strong>Base:</strong> Acero al carbono con pintura electrostática negra.</li><li><strong>Medidas:</strong> 200 cm x 100 cm x 5 cm.</li>"
    },
    4: {
        desc: "Una verdadera obra maestra artesanal. Para crear la Mesa Geoda, nuestros artesanos tallan los bordes internos del nogal negro y realizan incrustaciones manuales de cristales de cuarzo auténticos antes de verter la resina amatista. El resultado es la simulación perfecta de una geoda cortada, aportando una energía inigualable a tu espacio.",
        materiales: "<li><strong>Madera:</strong> Nogal negro silvestre.</li><li><strong>Incrustaciones:</strong> Fragmentos de cuarzo real y laca blanca.</li><li><strong>Resina:</strong> Epoxi violeta amatista de alto brillo.</li><li><strong>Medidas:</strong> 100 cm x 100 cm x 6 cm.</li>"
    },
    5: {
        desc: "Lleva la majestuosidad del universo a tu comedor. Mediante un proceso patentado de incrustación de fibra óptica y micro LEDs regulables encapsulados en resina color negro vacío, la Mesa Constelación cobra vida al anochecer. Con su control remoto oculto, puedes ajustar el brillo y el parpadeo de tus propias estrellas privadas.",
        materiales: "<li><strong>Madera:</strong> Caoba brasileña de origen sostenible.</li><li><strong>Tecnología:</strong> Sistema de iluminación LED de bajo consumo (batería recargable).</li><li><strong>Resina:</strong> Negro azabache profundo con láminas de plata 925.</li><li><strong>Medidas:</strong> 220 cm x 100 cm x 5 cm.</li>"
    },
    6: {
        desc: "El lujo clásico del Renacimiento reinventado para el siglo XXI. A través de una técnica secreta de manipulación térmica de la resina durante su curado, logramos vetas idénticas a las del mármol Carrara, pero fusionadas de manera orgánica con una impecable base de teca cálida. La elegancia de la piedra sin su peso aplastante.",
        materiales: "<li><strong>Madera:</strong> Teca brasileña torneada con precisión geométrica.</li><li><strong>Resina:</strong> Epoxi blanca opaca con inyección de pigmentos grises perlados.</li><li><strong>Acabado:</strong> Revestimiento cerámico antirayaduras.</li><li><strong>Medidas:</strong> Diámetro 120 cm, altura 76 cm.</li>"
    },
    7: {
        desc: "Siente la textura visual de las costas paradisíacas. Para la Mesa Océano utilizamos arena natural esterilizada y múltiples vertidos de resinas de grado óptico. El efecto de espuma tridimensional, creado mediante soplado de aire caliente sobre pigmentos blancos, ofrece un hiperrealismo que te transportará directamente a la playa cada vez que te sientes a la mesa.",
        materiales: "<li><strong>Madera:</strong> Roble rústico con bordes vivos (Live Edge).</li><li><strong>Incrustaciones:</strong> Arena real de playas brasileñas seleccionadas.</li><li><strong>Resina:</strong> Multicapa (Turquesa, Azul Profundo y Espuma Blanca).</li><li><strong>Medidas:</strong> 190 cm x 85 cm x 5 cm.</li>"
    },
    8: {
        desc: "Desafiando la gravedad y lo convencional, esta mesa no es solo un mueble, sino una escultura tridimensional. Dos bloques imponentes de ébano encuadran una lámina vertical de resina extra clara. El curado se realiza en cámaras de presión al vacío para eliminar hasta la burbuja más microscópica, creando la ilusión perfecta de agua cayendo y congelada en el tiempo.",
        materiales: "<li><strong>Madera:</strong> Ébano macizo de altísima densidad y peso.</li><li><strong>Resina:</strong> Bloque sólido de epoxi grado museo extra claro.</li><li><strong>Soporte:</strong> Estructura interna de titanio oculta.</li><li><strong>Medidas:</strong> 130 cm x 70 cm x 40 cm.</li>"
    },
    9: {
        desc: "Una audaz exploración de la alquimia moderna. El polvo de cobre auténtico suspendido en la resina genera un espectáculo lumínico en constante cambio según el ángulo en que se mire. Las vetas rojizas de la exótica madera de Padouk abrazan este río metálico, conformando una mesa robusta, industrial pero sofisticadamente lujosa.",
        materiales: "<li><strong>Madera:</strong> Padouk africano de intenso color rojo-anaranjado natural.</li><li><strong>Resina:</strong> Epoxi oscura saturada con polvo de cobre de pureza 99%.</li><li><strong>Acabado:</strong> Pulido espejo de alto brillo.</li><li><strong>Medidas:</strong> 240 cm x 100 cm x 6 cm.</li>"
    },
    10: {
        desc: "La obra maestra absoluta y la joya de la corona de Resina Luxa. La Mesa Aurum fusiona el increíblemente raro y denso ébano africano con auténticas láminas de oro puro de 24 quilates suspendidas en un abismo de resina negra. Una mesa monumental diseñada para los salones más exclusivos, dictando autoridad, poder y un gusto irrefutable.",
        materiales: "<li><strong>Madera:</strong> Ébano africano macizo, una de las maderas más raras del mundo.</li><li><strong>Metales:</strong> Láminas certificadas de oro de 24K y polvo de oro fino.</li><li><strong>Resina:</strong> Resina epoxi negra de grado aeroespacial.</li><li><strong>Medidas:</strong> 280 cm x 120 cm x 7 cm (Pieza numerada).</li>"
    }
};


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

// Elementos del Nuevo Modal de Producto
const productModal = document.getElementById('product-detail-modal');
const productOverlay = document.getElementById('product-detail-overlay');
const closeProductModalBtn = document.getElementById('close-product-modal');
const detailImg = document.getElementById('detail-img');
const detailTitle = document.getElementById('detail-title');
const detailPrice = document.getElementById('detail-price');
const detailInstallments = document.getElementById('detail-installments');
const detailDesc = document.getElementById('detail-desc');
const detailMaterials = document.getElementById('detail-materials');
const detailAddToCartBtn = document.getElementById('detail-add-to-cart');

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
    
    // Si el modal de detalles está abierto, lo cerramos sutilmente
    if (productModal.classList.contains('active')) {
        closeProductModal();
    }

    if (!cartSidebar.classList.contains('open')) {
        openCart();
        setTimeout(() => {
            if (cartSidebar.classList.contains('open') && !checkoutModal.classList.contains('active')) {
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


// ---------- FUNCIONES DEL MODAL DE DETALLES DEL PRODUCTO ----------
function openProductModal(id, imgUrl, title, priceNum, priceStr, installmentsStr) {
    const data = productsData[id];
    if(!data) return;

    detailImg.src = imgUrl;
    detailTitle.textContent = title;
    detailPrice.textContent = priceStr;
    detailInstallments.textContent = installmentsStr;
    detailDesc.innerHTML = data.desc;
    detailMaterials.innerHTML = data.materiales;
    
    // Configurar botón de compra
    detailAddToCartBtn.dataset.id = id;
    detailAddToCartBtn.dataset.nombre = title;
    detailAddToCartBtn.dataset.precio = priceNum;
    
    // Resetear texto del botón por si fue presionado antes
    detailAddToCartBtn.textContent = 'Agregar al Carrito';
    detailAddToCartBtn.style.background = '';
    detailAddToCartBtn.style.color = '';

    productModal.classList.add('active');
    productOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeProductModal() {
    productModal.classList.remove('active');
    productOverlay.classList.remove('active');
    if (!cartSidebar.classList.contains('open') && !checkoutModal.classList.contains('active')) {
        document.body.style.overflow = '';
    }
}

// Botón de cerrar el Modal de Producto
closeProductModalBtn.addEventListener('click', closeProductModal);
productOverlay.addEventListener('click', closeProductModal);

// Botón "Agregar al Carrito" DENTRO del Modal de Producto
detailAddToCartBtn.addEventListener('click', function() {
    const id = parseInt(this.dataset.id);
    const nombre = this.dataset.nombre;
    const precio = parseFloat(this.dataset.precio);

    // Feedback visual en el botón
    this.textContent = '✓ Agregando...';
    this.style.background = 'var(--color-dorado)';
    this.style.color = '#0b0a0a';
    
    setTimeout(() => {
        addToCart(id, nombre, precio);
    }, 400);
});


// ---------- EVENT LISTENERS INICIALES Y DELEGACIÓN ----------

// Delegación de eventos para el catálogo (Maneja el click en "Agregar" y en "Abrir Modal")
document.querySelector('.catalogo-grid').addEventListener('click', function(e) {
    const article = e.target.closest('.producto-card');
    if (!article) return;

    // Si se hizo click en el botón de agregar directo al carrito
    const btnCart = e.target.closest('.agregar-carrito');
    if (btnCart) {
        const id = parseInt(btnCart.dataset.id);
        const nombre = btnCart.dataset.nombre;
        const precio = parseFloat(btnCart.dataset.precio);

        btnCart.textContent = '✓ Agregado';
        btnCart.style.background = 'var(--color-dorado)';
        btnCart.style.color = '#0b0a0a';
        setTimeout(() => {
            btnCart.textContent = 'Agregar al Carrito';
            btnCart.style.background = '';
            btnCart.style.color = '';
        }, 1200);

        addToCart(id, nombre, precio);
        return; 
    }

    // Si se hizo click en la imagen o el titulo (disparadores del modal)
    const modalTrigger = e.target.closest('.open-modal-trigger');
    if (modalTrigger) {
        const id = article.dataset.id;
        const imgUrl = article.querySelector('img').src;
        const title = article.querySelector('.producto-nombre').textContent;
        const priceStr = article.querySelector('.precio').textContent;
        const installmentsStr = article.querySelector('.precio-cuotas').textContent;
        const priceNum = article.querySelector('.agregar-carrito').dataset.precio;
        
        openProductModal(id, imgUrl, title, priceNum, priceStr, installmentsStr);
    }
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

// Validaciones del formulario
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

// Formateos en vivo de tarjeta
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

// Procesamiento simulado del pago
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


// ---------- MEJORAS DE UX ADICIONALES ----------
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        if (checkoutModal.classList.contains('active')) {
            closeCheckoutModal();
        } else if (productModal.classList.contains('active')) {
            closeProductModal();
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
console.log('Resina Luxa – Tienda online lista con Modales de Producto.');

