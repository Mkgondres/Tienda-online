// ==========================================================================
// VÉREUX ATELIER - BOUTIQUE SCRIPT (PARTE 1 DE 2)
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {

    // 1. DINÁMICA DE LA BARRA DE NAVEGACIÓN (SCROLL EFFECT)
    const header = document.getElementById('mainHeader');

    const handleNavbarScroll = () => {
        // Añade un fondo translúcido con desenfoque si el usuario baja más de 50px
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    };

    window.addEventListener('scroll', handleNavbarScroll);


    // 2. CONTROL EXPERIENCIAL DEL AUDIO (TALLER ASMR)
    const video = document.getElementById('heroVideo');
    const audioBtn = document.getElementById('audioBtn');
    const audioIcon = audioBtn?.querySelector('.audio-icon');
    const audioText = audioBtn?.querySelector('.audio-text');

    if (audioBtn && video) {
        audioBtn.addEventListener('click', () => {
            if (video.muted) {
                // Activar el sonido real del taller
                video.muted = false;
                if (audioIcon) audioIcon.textContent = '🔊';
                if (audioText) audioText.textContent = 'Audio del taller activo';
            } else {
                // Volver al silencio elegante por defecto
                video.muted = true;
                if (audioIcon) audioIcon.textContent = '🔇';
                if (audioText) audioText.textContent = 'Escuchar el taller (ASMR)';
            }
        });
    }


    // 3. VISUALIZADOR DETALLADO DE PRODUCTOS (SISTEMA LIGHTBOX / MODAL)
    const modal = document.getElementById('product-detail-modal');
    const modalCloseBtn = modal?.querySelector('.modal-close-btn');
    const productImageContainers = document.querySelectorAll('.product-image-container');

    // Elementos internos del modal que cambiaremos dinámicamente
    const modalImg = document.getElementById('modalTargetImg');
    const modalTitle = document.getElementById('modalProductTitle');
    const modalPrice = document.getElementById('modalProductPrice');
    const modalDescription = document.getElementById('modalProductDescription');

    // Función para extraer los datos de la tarjeta y rellenar el modal gigante
    const openProductModal = (productCard) => {
        const productImg = productCard.querySelector('img');
        const productTitle = productCard.querySelector('.product-details h4');
        const productPrice = productCard.querySelector('.product-price');
        const productDesc = productCard.querySelector('.product-description');

        if (modal && productImg && productTitle && productPrice && productDesc) {
            // Mapeo e inyección de datos dinámicos en alta definición
            modalImg.src = productImg.src;
            modalImg.alt = productImg.alt;
            modalTitle.textContent = productTitle.textContent;
            modalPrice.textContent = productPrice.textContent;
            modalDescription.textContent = productDesc.textContent;

            // Mostrar la ventana con el desenfoque CSS y bloquear el scroll de fondo
            modal.style.display = 'flex';
            document.body.style.overflow = 'hidden'; 
        }
    };

    // Asignar el evento de clic a cada contenedor de imagen del catálogo
    productImageContainers.forEach(container => {
        container.addEventListener('click', () => {
            const parentCard = container.closest('.product-card');
            if (parentCard) {
                openProductModal(parentCard);
            }
        });
    });

    // Función para cerrar el visualizador de forma limpia
    const closeModal = () => {
        if (modal) {
            modal.style.display = 'none';
            document.body.style.overflow = ''; // Devolver el scroll a la página
        }
    };

    // Cerrar al presionar la 'X' superior
    if (modalCloseBtn) {
        modalCloseBtn.addEventListener('click', closeModal);
    }

    // Cerrar si el cliente hace clic en el fondo oscuro difuminado (fuera de la caja de la oferta)
    if (modal) {
        modal.addEventListener('click', (event) => {
            if (event.target === modal) {
                closeModal();
            }
        });
    }

});
    // ==========================================================================
    // 4. LÓGICA DEL CARRITO DE COMPRAS (CONTADOR INTERACTIVO)
    // ==========================================================================
    const cartCounter = document.querySelector('.cart-counter');
    const addToCartButtons = document.querySelectorAll('.btn-add-cart');
    let totalItemsInCart = 0;

    // Función para actualizar el número del carrito con una animación Premium
    const updateCartUI = () => {
        if (cartCounter) {
            totalItemsInCart++;
            cartCounter.textContent = totalItemsInCart;

            // Efecto visual de escala al añadir un producto (feedback de lujo)
            cartCounter.style.transform = 'scale(1.4)';
            cartCounter.style.transition = 'transform 0.2s ease';

            setTimeout(() => {
                cartCounter.style.transform = 'scale(1)';
            }, 200);
        }
    };

    // Asignar el evento a todos los botones "Añadir al carrito" del catálogo
    addToCartButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            event.stopPropagation(); // Evita que se abra el modal al presionar el botón
            updateCartUI();
            
            // Notificación sutil en consola o feedback discreto
            const productTitle = button.closest('.product-card')?.querySelector('h4')?.textContent;
            console.log(`Boutique VÉREUX: "${productTitle}" añadido al carrito.`);
        });
    });


    // ==========================================================================
    // 5. SIMULACIÓN DE CHECKOUT SEGURO (CONEXIÓN PAYPAL)
    // ==========================================================================
    const modalCheckoutBtn = document.querySelector('.modal-info-extended .btn-primary');

    if (modalCheckoutBtn) {
        modalCheckoutBtn.addEventListener('click', () => {
            const currentProduct = document.getElementById('modalProductTitle')?.textContent;
            const currentPrice = document.getElementById('modalProductPrice')?.textContent;

            // Cambiar temporalmente el texto del botón para simular una carga segura
            modalCheckoutBtn.textContent = "Conectando con PayPal de forma segura...";
            modalCheckoutBtn.style.opacity = "0.7";
            modalCheckoutBtn.style.pointerEvents = "none";

            // Simulación de retraso de red de pasarela de pago (2 segundos)
            setTimeout(() => {
                alert(`🔒 Redirección Simulada:\n\nConectando con la API segura de PayPal para procesar la compra de: \n"${currentProduct}" por un valor de ${currentPrice}.\n\n¡Gracias por elegir la exclusividad de VÉREUX Atelier!`);
                
                // Restablecer el estado original del botón del Atelier
                modalCheckoutBtn.textContent = "Proceder a la Compra";
                modalCheckoutBtn.style.opacity = "1";
                modalCheckoutBtn.style.pointerEvents = "auto";
                
                // Cerrar el modal automáticamente tras la acción
                closeModal();
            }, 2000);
        });
    }

    // ==========================================================================
    // 6. CONTROL DE ENLACES PARA PEDIDOS A MEDIDA (ATELIER)
    // ==========================================================================
    const customOrderBtn = document.querySelector('.custom-order-info .btn-secondary');
    
    if (customOrderBtn) {
        customOrderBtn.addEventListener('click', (e) => {
            e.preventDefault();
            alert("Boutique VÉREUX:\n\nAbriendo el canal de comunicación encriptado para su diseño personalizado. Un asesor de alta gama se pondrá en contacto con usted para definir los materiales (maderas, objetos y colores de resina).");
        });
    }

// Cierre definitivo del DOMContentLoaded (Asegúrate de que solo haya uno al final de tu archivo)
});
