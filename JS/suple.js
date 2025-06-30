// --- Banner principal (slider) ---
let currentSlide = 0;
let slides, bannerSlides, totalSlides;

function showSlide(index) {
    currentSlide = (index + totalSlides) % totalSlides;
    bannerSlides.style.transform = `translateX(-${currentSlide * 100}%)`;
}

function nextSlide() {
    showSlide(currentSlide + 1);
}

function prevSlide() {
    showSlide(currentSlide - 1);
}

// --- Filtrado de suplementos por categoría o sabor ---
function filtrarSuplementos(cat) {
    const cards = document.querySelectorAll('#suplementos-slider .product-card');
    if (cat === 'todos') {
        cards.forEach(card => card.style.display = 'flex');
    } else {
        cards.forEach(card => {
            if (card.classList.contains(cat)) {
                card.style.display = 'flex';
            } else {
                card.style.display = 'none';
            }
        });
    }
}

function filtrarExtras(cat) {
    const cards = document.querySelectorAll('#extras-slider .product-card');
    if (cat === 'todos') {
        cards.forEach(card => card.style.display = 'flex');
    } else {
        cards.forEach(card => {
            if (card.classList.contains(cat)) {
                card.style.display = 'flex';
            } else {
                card.style.display = 'none';
            }
        });
    }
}

// --- Slider de suplementos ---
const totalProducts = 18;
const rows = 2;
let currentSlideSup = 0;

function getCols() {
    if(window.innerWidth <= 600) return 1;
    if(window.innerWidth <= 900) return 2;
    if(window.innerWidth <= 1200) return 4;
    return 6;
}

function moverSuplementos(dir) {
    const slider = document.getElementById('suplementos-slider');
    const colsNow = getCols();
    const productsPerPage = colsNow * rows;
    const maxSlide = Math.ceil(totalProducts / productsPerPage) - 1;
    currentSlideSup += dir;
    if(currentSlideSup < 0) currentSlideSup = 0;
    if(currentSlideSup > maxSlide) currentSlideSup = maxSlide;
    const move = currentSlideSup * 100;
    slider.style.transform = `translateX(-${move}%)`;
}

// --- Slider de membresías ---
function moverMembresias(dir) {
    const slider = document.getElementById('membresias-slider');
    const currentTransform = new WebKitCSSMatrix(window.getComputedStyle(slider).transform);
    const currentX = currentTransform.m41;
    const containerWidth = slider.parentElement.offsetWidth;
    const sliderWidth = slider.offsetWidth;
    
    let newX = currentX + (dir * containerWidth);
    
    // Prevent scrolling beyond boundaries
    if (newX > 0) newX = 0;
    if (newX < -(sliderWidth - containerWidth)) newX = -(sliderWidth - containerWidth);
    
    slider.style.transform = `translateX(${newX}px)`;
}

// --- Slider de extras ---
function moverExtras(dir) {
    const slider = document.getElementById('extras-slider');
    const currentTransform = new WebKitCSSMatrix(window.getComputedStyle(slider).transform);
    const currentX = currentTransform.m41;
    const containerWidth = slider.parentElement.offsetWidth;
    const sliderWidth = slider.offsetWidth;
    
    let newX = currentX + (dir * containerWidth);
    
    // Prevent scrolling beyond boundaries
    if (newX > 0) newX = 0;
    if (newX < -(sliderWidth - containerWidth)) newX = -(sliderWidth - containerWidth);
    
    slider.style.transform = `translateX(${newX}px)`;
}

// --- Carrito de compras ---
let cart = [];

// Función para actualizar los listeners de los botones "Agregar al Carro"
function setAddToCartListeners() {
    document.querySelectorAll('.add-to-cart').forEach(btn => {
        btn.onclick = function() {
            const card = btn.closest('.product-card');
            const name = card.querySelector('h4').innerText;
            const price = card.querySelector('p strong').innerText;
            const img = card.querySelector('img').src;

            // Buscar si ya está en el carrito
            const found = cart.find(item => item.name === name);
            if (found) {
                found.qty += 1;
            } else {
                cart.push({ name, price, img, qty: 1 });
            }
            updateCartCount();
        };
    });
}

function updateCartCount() {
    document.getElementById('cart-count').innerText = cart.reduce((sum, item) => sum + item.qty, 0);
}

// Mostrar el carrito solo al hacer click en el botón
function showCartModal() {
    const modal = document.getElementById('cart-modal');
    const itemsDiv = document.getElementById('cart-items');
    const totalDiv = document.getElementById('cart-total');
    const recommendationsDiv = document.getElementById('recommendations');
    
    modal.style.display = 'flex';
    itemsDiv.innerHTML = '';
    recommendationsDiv.innerHTML = '';
    let total = 0;
    
    if (cart.length === 0) {
        itemsDiv.innerHTML = '<p style="color:#FFD600;">El carrito está vacío.</p>';
        totalDiv.innerHTML = '';
    } else {
        // Mostrar items del carrito
        cart.forEach(item => {
            const priceNum = parseFloat(item.price.replace(/[^\d.]/g, '')) || 0;
            total += priceNum * item.qty;
            
            itemsDiv.innerHTML += `
                <div class="cart-item">
                    <img src="${item.img}" alt="${item.name}">
                    <div>
                        <strong>${item.name}</strong><br>
                        ${item.price} x ${item.qty}
                    </div>
                    <button class="remove-cart-item" data-name="${item.name}">&times;</button>
                </div>
            `;
        });
        
        totalDiv.innerHTML = `<strong>Total: S/ ${total.toFixed(2)}</strong>`;

        // Generar y mostrar recomendaciones
        if (cart.length >= 1) {
            const recommendations = getRecommendations(cart);
            recommendations.forEach(rec => {
                recommendationsDiv.innerHTML += `
                    <div class="cart-item recommendation">
                        <img src="${rec.img}" alt="${rec.name}">
                        <div>
                            <strong>${rec.name}</strong><br>
                            ${rec.price}
                        </div>
                        <button class="add-recommended" onclick="addRecommendedToCart('${rec.name}')">+</button>
                    </div>
                `;
            });
        }
    }

    // Actualizar event listeners
    setupCartEventListeners();
}

function setupCartEventListeners() {
    // Event listeners para remover items
    document.querySelectorAll('.remove-cart-item').forEach(btn => {
        btn.onclick = function() {
            const name = this.getAttribute('data-name');
            removeFromCart(name);
        };
    });

    // Event listener para cerrar modal
    document.getElementById('close-cart').onclick = () => {
        document.getElementById('cart-modal').style.display = 'none';
    };

    // Event listener para checkout
    document.getElementById('checkout-btn').onclick = () => {
        if (cart.length > 0) {
            alert('¡Gracias por tu compra!');
            cart = [];
            updateCartCount();
            document.getElementById('cart-modal').style.display = 'none';
        }
    };
}

function addToCart(productCard) {
    const name = productCard.querySelector('h4').innerText;
    const price = productCard.querySelector('p strong').innerText;
    const img = productCard.querySelector('img').src;
    const categories = Array.from(productCard.querySelectorAll('.category-btn'))
        .map(btn => btn.innerText);

    const existingItem = cart.find(item => item.name === name);
    
    if (existingItem) {
        existingItem.qty += 1;
    } else {
        cart.push({
            name,
            price,
            img,
            qty: 1,
            categories
        });
    }
    
    updateCartCount();
    showNotification(`${name} agregado al carrito`);
}

function removeFromCart(name) {
    cart = cart.filter(item => item.name !== name);
    updateCartCount();
    showCartModal();
}

function addRecommendedToCart(name) {
    const productCard = Array.from(document.querySelectorAll('.product-card'))
        .find(card => card.querySelector('h4').innerText === name);
    
    if (productCard) {
        addToCart(productCard);
        showCartModal();
    }
}

function showNotification(message) {
    // Crear o actualizar la notificación
    let notification = document.getElementById('cart-notification');
    if (!notification) {
        notification = document.createElement('div');
        notification.id = 'cart-notification';
        document.body.appendChild(notification);
    }
    
    notification.textContent = message;
    notification.className = 'notification show';
    
    setTimeout(() => {
        notification.className = 'notification';
    }, 2000);
}

function getRecommendations(cartItems) {
    // Solo recomendar si hay 2 o más items
    if (cartItems.length < 2) {
        return [];
    }
    
    // Obtener categorías de los items en el carrito
    const cartCategories = cartItems.map(item => {
        const card = Array.from(document.querySelectorAll('.product-card')).find(
            card => card.querySelector('h4').innerText === item.name
        );
        if (card) {
            const cats = Array.from(card.querySelectorAll('.category-btn')).map(btn => btn.innerText);
            return cats;
        }
        return [];
    }).flat();

    // Encontrar productos similares
    const recommendations = [];
    const allProducts = document.querySelectorAll('.product-card');
    
    allProducts.forEach(card => {
        const productName = card.querySelector('h4').innerText;
        
        // No recomendar productos que ya están en el carrito
        if (cartItems.some(item => item.name === productName)) {
            return;
        }
        
        // Obtener categorías del producto
        const productCategories = Array.from(card.querySelectorAll('.category-btn')).map(btn => btn.innerText);
        
        // Calcular puntuación de similitud
        let score = 0;
        productCategories.forEach(cat => {
            if (cartCategories.includes(cat)) {
                score++;
            }
        });
        
        if (score > 0) {
            recommendations.push({
                name: productName,
                score: score,
                img: card.querySelector('img').src,
                price: card.querySelector('p strong').innerText,
                categories: productCategories
            });
        }
    });
    
    // Ordenar por puntuación y tomar los 3 mejores
    return recommendations
        .sort((a, b) => b.score - a.score)
        .slice(0, 3);
}

function buscarProductos(query, sliderId) {
    query = query.toLowerCase();
    const productos = document.querySelectorAll(`#${sliderId} .product-card`);
    
    productos.forEach(producto => {
        const nombre = producto.querySelector('h4').textContent.toLowerCase();
        const categorias = Array.from(producto.querySelectorAll('.category-btn'))
            .map(btn => btn.textContent.toLowerCase());
        const descripcion = producto.querySelector('p:not(:first-of-type)')
            .textContent.toLowerCase();
        
        if (nombre.includes(query) || 
            categorias.some(cat => cat.includes(query)) || 
            descripcion.includes(query)) {
            producto.style.display = 'flex';
        } else {
            producto.style.display = 'none';
        }
    });
}

// --- Banner toggle ---
let bannerVisible = true;
let toggleBannerBtn, bannerContainer;

document.addEventListener('DOMContentLoaded', function() {
    // Banner slider setup
    slides = document.querySelectorAll('.banner-slide');
    bannerSlides = document.querySelector('.banner-slides');
    totalSlides = slides.length;

    setInterval(nextSlide, 4000);

    // Slider responsive
    window.addEventListener('resize', () => {
        currentSlideSup = 0;
        moverSuplementos(0);
    });

    // Banner toggle
    toggleBannerBtn = document.getElementById('toggle-banner-btn');
    bannerContainer = document.getElementById('banner-container');
    if (toggleBannerBtn) {
        toggleBannerBtn.addEventListener('click', function() {
            bannerVisible = !bannerVisible;
            if (bannerVisible) {
                bannerContainer.style.display = '';
                toggleBannerBtn.innerHTML = 'Ocultar &#9650;';
            } else {
                bannerContainer.style.display = 'none';
                toggleBannerBtn.innerHTML = 'Mostrar &#9660;';
            }
        });
    }

    // Carrito
    setAddToCartListeners();
    updateCartCount();

    // Mostrar el carrito solo al hacer click en el botón
    const cartBtn = document.getElementById('cart-btn');
    if (cartBtn) {
        cartBtn.onclick = function() {
            showCartModal();
        };
    }

    // Cerrar el modal al hacer click fuera de la ventana
    window.onclick = function(event) {
        const modal = document.getElementById('cart-modal');
        if (event.target === modal) modal.style.display = 'none';
    };
});