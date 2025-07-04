// === CONFIGURACIÓN PARA PÁGINA DE ROPA ===

// Función para cambiar entre secciones de género
function showGender(gender) {
    document.querySelectorAll('.gender-section').forEach(section => {
        section.classList.remove('active');
    });
    
    document.querySelectorAll('.gender-tab').forEach(tab => {
        tab.classList.remove('active');
    });
    
    document.getElementById(`${gender}-section`).classList.add('active');
    event.currentTarget.classList.add('active');
}

// Función para procesar compra inmediata
function buyNow(productCard) {
    // Agregar al carrito primero
    addToCart(productCard);
    
    // Redirigir al carrito
    window.location.href = 'carrito.html';
}

// Configurar listeners para botones "Comprar Ahora"
function setBuyNowListeners() {
    document.querySelectorAll('.buy-now').forEach(btn => {
        btn.onclick = function() {
            const card = btn.closest('.product-card');
            if (card) {
                buyNow(card);
            }
        };
    });
}

// Alternar tema
const themeToggle = document.getElementById("theme-toggle");
if (themeToggle) {
    const themeIcon = document.getElementById("theme-icon");
    const body = document.body;

    // Verificar preferencia guardada
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
        body.classList.add("dark-theme");
        if (themeIcon) {
            themeIcon.setAttribute("d", "M12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6zm0-7a9.5 9.5 0 0 1 9.5 9.5c0 5.25-4.25 9.5-9.5 9.5-5.25 0-9.5-4.25-9.5-9.5A9.5 9.5 0 0 1 12 2z");
        }
    }

    // Alternar al hacer clic
    themeToggle.addEventListener("click", () => {
        body.classList.toggle("dark-theme");
        const isDark = body.classList.contains("dark-theme");
        
        // Cambiar ícono y guardar preferencia
        if (isDark && themeIcon) {
            themeIcon.setAttribute("d", "M12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6zm0-7a9.5 9.5 0 0 1 9.5 9.5c0 5.25-4.25 9.5-9.5 9.5-5.25 0-9.5-4.25-9.5-9.5A9.5 9.5 0 0 1 12 2z");
            localStorage.setItem("theme", "dark");
        } else if (themeIcon) {
            themeIcon.setAttribute("d", "M12 3c.132 0 .263 0 .393 0a7.5 7.5 0 0 0 7.92 12.446a9 9 0 1 1-8.313-12.454z");
            localStorage.setItem("theme", "light");
        }
    });
}

// === INICIALIZACIÓN ===
document.addEventListener('DOMContentLoaded', function() {
    console.log('🛍️ Inicializando página de ropa...');
    
    // Configurar listeners para botones "Comprar Ahora"
    setBuyNowListeners();
    
    console.log('✅ Página de ropa inicializada correctamente');
});