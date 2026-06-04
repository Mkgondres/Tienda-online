/* ============================
   RESINA LUXA – SCRIPT (PT-BR)
   ============================ */

'use strict';

// ---------- BASE DE DADOS DE PRODUTOS (Descrições Profundas) ----------
const productsData = {
    1: {
        desc: "A Mesa Rio Claro é a encarnação do design biofílico. Cada veio da madeira de nogueira americana é selecionado meticulosamente à mão para complementar o rio central de resina epóxi cristalina. Seu processo de polimento de 12 etapas garante uma superfície impecável que convida ao toque, tornando-se o centro das atenções de qualquer sala contemporânea.",
        materiales: "<li><strong>Madeira:</strong> Nogueira americana maciça curada por 3 anos.</li><li><strong>Resina:</strong> Epóxi grau óptico de ultra transparência.</li><li><strong>Acabamento:</strong> Óleo de tungue natural e cera de abelhas.</li><li><strong>Medidas:</strong> 180 cm x 90 cm x 4 cm.</li>"
    },
    2: {
        desc: "Inspirada no fluxo constante e pacífico da água, a Mesa Onda Suave destaca-se pela integração quase imperceptível entre a cálida madeira de freixo e um sinuoso caminho de resina azul translúcida. Ideal para criar espaços de serenidade, esta peça interage maravilhosamente com a luz natural do dia.",
        materiales: "<li><strong>Madeira:</strong> Freixo europeu com tratamento antifúngico.</li><li><strong>Resina:</strong> Epóxi premium pigmentada em azul celeste translúcido.</li><li><strong>Acabamento:</strong> Verniz poliuretano fosco de alta resistência.</li><li><strong>Medidas:</strong> 160 cm x 80 cm x 4 cm.</li>"
    },
    3: {
        desc: "Capturando a essência efêmera dos fins de tarde brasileiros, a Mesa Entardecer utiliza uma complexa técnica de derramamento multicamadas. A transição perfeita do laranja ardente ao rosa profundo assenta-se sobre a robustez inegável do carvalho, criando uma obra de arte funcional que irradia calor.",
        materiales: "<li><strong>Madeira:</strong> Carvalho maciço selecionado por seus veios expressivos.</li><li><strong>Resina:</strong> Mistura tricamada com pigmentos metálicos laranja, rosa e ouro.</li><li><strong>Base:</strong> Aço carbono com pintura eletrostática preta.</li><li><strong>Medidas:</strong> 200 cm x 100 cm x 5 cm.</li>"
    },
    4: {
        desc: "Uma verdadeira obra-prima artesanal. Para criar a Mesa Geodo, nossos artesãos esculpem as bordas internas da nogueira preta e realizam incrustações manuais de cristais de quartzo autênticos antes de derramar a resina ametista. O resultado é a simulação perfeita de um geodo cortado, trazendo uma energia inigualável ao seu espaço.",
        materiales: "<li><strong>Madeira:</strong> Nogueira preta silvestre.</li><li><strong>Incrustações:</strong> Fragmentos de quartzo real e laca branca.</li><li><strong>Resina:</strong> Epóxi violeta ametista de alto brilho.</li><li><strong>Medidas:</strong> 100 cm x 100 cm x 6 cm.</li>"
    },
    5: {
        desc: "Traga a majestade do universo para a sua sala de jantar. Através de um processo patenteado de incrustação de fibra óptica e micro LEDs reguláveis encapsulados em resina preta, a Mesa Constelação ganha vida ao anoitecer. Com seu controle remoto oculto, você pode ajustar o brilho e a cintilação das suas próprias estrelas particulares.",
        materiales: "<li><strong>Madeira:</strong> Mogno brasileiro de origem sustentável.</li><li><strong>Tecnologia:</strong> Sistema de iluminação LED de baixo consumo (bateria recarregável).</li><li><strong>Resina:</strong> Preto azeviche profundo com lascas de prata 925.</li><li><strong>Medidas:</strong> 220 cm x 100 cm x 5 cm.</li>"
    },
    6: {
        desc: "O luxo clássico do Renascimento reinventado para o século XXI. Através de uma técnica secreta de manipulação térmica da resina durante a sua cura, conseguimos veios idênticos aos do mármore Carrara, mas fundidos de forma orgânica com uma impecável base de teca cálida. A elegância da pedra sem o seu peso esmagador.",
        materiales: "<li><strong>Madeira:</strong> Teca brasileira torneada com precisão geométrica.</li><li><strong>Resina:</strong> Epóxi branca opaca com injeção de pigmentos cinzas perolados.</li><li><strong>Acabamento:</strong> Revestimento cerâmico anti-riscos.</li><li><strong>Medidas:</strong> Diâmetro 120 cm, altura 76 cm.</li>"
    },
    7: {
        desc: "Sinta a textura visual das costas paradisíacas. Para a Mesa Oceano utilizamos areia natural esterilizada e múltiplos derramamentos de resinas de grau óptico. O efeito de espuma tridimensional, criado mediante sopro de ar quente sobre pigmentos brancos, oferece um hiper-realismo que o transportará diretamente para a praia cada vez que se sentar à mesa.",
        materiales: "<li><strong>Madeira:</strong> Carvalho rústico com bordas vivas (Live Edge).</li><li><strong>Incrustações:</strong> Areia real de praias brasileiras selecionadas.</li><li><strong>Resina:</strong> Multicamada (Turquesa, Azul Profundo e Espuma Branca).</li><li><strong>Medidas:</strong> 190 cm x 85 cm x 5 cm.</li>"
    },
    8: {
        desc: "Desafiando a gravidade e o convencional, esta mesa não é apenas um móvel, mas uma escultura tridimensional. Dois blocos imponentes de ébano emolduram uma lâmina vertical de resina extra clara. A cura é realizada em câmaras de pressão a vácuo para eliminar até a bolha mais microscópica, criando a ilusão perfeita de água caindo e congelada no tempo.",
        materiales: "<li><strong>Madeira:</strong> Ébano maciço de altíssima densidade e peso.</li><li><strong>Resina:</strong> Bloco sólido de epóxi grau museu extra clara.</li><li><strong>Suporte:</strong> Estrutura interna de titânio oculta.</li><li><strong>Medidas:</strong> 130 cm x 70 cm x 40 cm.</li>"
    },
    9: {
        desc: "Uma audaciosa exploração da alquimia moderna. O pó de cobre autêntico suspenso na resina gera um espetáculo luminoso em constante mudança conforme o ângulo em que se olha. Os veios avermelhados da exótica madeira de Padouk abraçam este rio metálico, formando uma mesa robusta, industrial, porém sofisticadamente luxuosa.",
        materiales: "<li><strong>Madeira:</strong> Padouk africano de intensa cor vermelho-alaranjada natural.</li><li><strong>Resina:</strong> Epóxi escura saturada com pó de cobre de pureza 99%.</li><li><strong>Acabamento:</strong> Polimento espelhado de alto brilho.</li><li><strong>Medidas:</strong> 240 cm x 100 cm x 6 cm.</li>"
    },
    10: {
        desc: "A obra-prima absoluta e a joia da coroa da Resina Luxa. A Mesa Aurum funde o incrivelmente raro e denso ébano africano com autênticas folhas de ouro puro de 24 quilates suspensas em um abismo de resina preta. Uma mesa monumental projetada para as salas mais exclusivas, ditando autoridade, poder e um gosto irrefutável.",
        materiales: "<li><strong>Madeira:</strong> Ébano africano maciço, uma das madeiras mais raras do mundo.</li><li><strong>Metais:</strong> Folhas certificadas de ouro de 24K e pó de ouro fino.</li><li><strong>Resina:</strong> Resina epóxi preta de grau aeroespacial.</li><li><strong>Medidas:</strong> 280 cm x 120 cm x 7 cm (Peça numerada).</li>"
    }
};

// ---------- ELEMENTOS DO DOM ----------
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

// Elementos do Novo Modal de Produto
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
const detailWhatsappBtn = document.getElementById('detail-whatsapp-btn'); // Botão WA do Modal

// ---------- ESTADO DO CARRINHO ----------
let cart = [];

// ---------- FUNÇÕES DO CARRINHO ----------
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
        cartItemsContainer.innerHTML = '<p class="cart-empty">Não há produtos no carrinho.</p>';
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


// ---------- FUNÇÕES DO MODAL DE DETALHES DO PRODUTO ----------
function openProductModal(id, imgUrl, title, priceNum, priceStr, installmentsStr) {
    const data = productsData[id];
    if(!data) return;

    detailImg.src = imgUrl;
    detailTitle.textContent = title;
    detailPrice.textContent = priceStr;
    detailInstallments.textContent = installmentsStr;
    detailDesc.innerHTML = data.desc;
    detailMaterials.innerHTML = data.materiales;
    
    // Configurar o botão do Carrinho
    detailAddToCartBtn.dataset.id = id;
    detailAddToCartBtn.dataset.nombre = title;
    detailAddToCartBtn.dataset.precio = priceNum;
    detailAddToCartBtn.textContent = 'Adicionar ao Carrinho';
    detailAddToCartBtn.style.background = '';
    detailAddToCartBtn.style.color = '';

    // Configurar o botão Dinâmico de WhatsApp
    const whatsappText = `Olá! Estou interessada na ${title}. Gostaria de mais informações.`;
    const waUrl = `https://wa.me/5511999990000?text=${encodeURIComponent(whatsappText)}`;
    detailWhatsappBtn.href = waUrl;

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

closeProductModalBtn.addEventListener('click', closeProductModal);
productOverlay.addEventListener('click', closeProductModal);

detailAddToCartBtn.addEventListener('click', function() {
    const id = parseInt(this.dataset.id);
    const nombre = this.dataset.nombre;
    const precio = parseFloat(this.dataset.precio);

    this.textContent = '✓ Adicionado...';
    this.style.background = 'var(--color-dorado)';
    this.style.color = '#0b0a0a';
    
    setTimeout(() => {
        addToCart(id, nombre, precio);
    }, 400);
});

// ---------- EVENT LISTENERS (DELEGAÇÃO) ----------
document.querySelector('.catalogo-grid').addEventListener('click', function(e) {
    const article = e.target.closest('.producto-card');
    if (!article) return;

    // Se clicar no botão de adicionar direto
    const btnCart = e.target.closest('.agregar-carrito');
    if (btnCart) {
        const id = parseInt(btnCart.dataset.id);
        const nombre = btnCart.dataset.nombre;
        const precio = parseFloat(btnCart.dataset.precio);

        btnCart.textContent = '✓ Adicionado';
        btnCart.style.background = 'var(--color-dorado)';
        btnCart.style.color = '#0b0a0a';
        setTimeout(() => {
            btnCart.textContent = 'Adicionar ao Carrinho';
            btnCart.style.background = '';
            btnCart.style.color = '';
        }, 1200);

        addToCart(id, nombre, precio);
        return; 
    }

    // Se clicar na imagem ou título (abre o modal)
    // Excluimos o botão de WhatsApp para que não abra o modal se clicarem nele
    const modalTrigger = e.target.closest('.open-modal-trigger');
    const isWhatsappBtn = e.target.closest('.btn-whatsapp-overlay');
    
    if (modalTrigger && !isWhatsappBtn) {
        const id = article.dataset.id;
        const imgUrl = article.querySelector('img').src;
        const title = article.querySelector('.producto-nombre').textContent;
        const priceStr = article.querySelector('.precio').textContent;
        const installmentsStr = article.querySelector('.precio-cuotas').textContent;
        const priceNum = article.querySelector('.agregar-carrito').dataset.precio;
        
        openProductModal(id, imgUrl, title, priceNum, priceStr, installmentsStr);
    }
});


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

// ---------- CHECKOUT E PAGAMENTOS ----------
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
        alert('Seu carrinho está vazio. Adicione mesas antes de prosseguir para o pagamento.');
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

// Validações do formulário
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

// Formatações ao vivo do cartão
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

// Processamento simulado do pagamento
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

    if (!isNotEmpty(nome)) { showFieldError(nomeInput, 'O nome é obrigatório.'); isValid = false; }
    if (!isValidEmail(email)) { showFieldError(emailInput, 'Insira um e-mail válido.'); isValid = false; }
    if (!isNotEmpty(direccion)) { showFieldError(direccionInput, 'O endereço é obrigatório.'); isValid = false; }
    if (pais === '') { showFieldError(paisSelect, 'Selecione um país de entrega.'); isValid = false; }
    if (!isValidCardNumber(cardNumber)) { showFieldError(cardNumberInput, 'Número do cartão inválido (16 dígitos).'); isValid = false; }
    if (!isValidExpiry(expiry)) { showFieldError(expiryInput, 'Data de vencimento inválida (MM/AA).'); isValid = false; }
    if (!isValidCVV(cvv)) { showFieldError(cvvInput, 'CVV inválido (3-4 dígitos).'); isValid = false; }

    if (!isValid) return;

    payBtn.disabled = true;
    payBtn.textContent = 'Processando...';
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
        payBtn.textContent = 'Realizar Pagamento';
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

// ---------- MELHORIAS DE UX ----------
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

// ---------- INICIALIZAÇÃO ----------
document.addEventListener('DOMContentLoaded', function() {
    loadCart();
    renderCart();
});

