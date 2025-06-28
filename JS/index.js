    // Efecto de pausa al hacer hover en la barra de promoción
    document.addEventListener('DOMContentLoaded', function() {
        const promoContainer = document.querySelector('.promo-scroll-container');
        
        promoContainer.addEventListener('mouseenter', function() {
            this.style.animationPlayState = 'paused';
        });
        
        promoContainer.addEventListener('mouseleave', function() {
            this.style.animationPlayState = 'running';
        });
        
        // Click en banners laterales
        document.querySelectorAll('.promo-item').forEach(item => {
            item.addEventListener('click', function() {
                // Aquí puedes agregar la acción al hacer click
                alert('Producto seleccionado: ' + this.querySelector('img').alt);
            });
            
        });
        // Agrega esto al final de tu archivo JS
window.addEventListener('scroll', function() {
    const parallaxSection = document.querySelector('.parallax-section');
    const scrollPosition = window.pageYOffset;
    
    parallaxSection.style.backgroundPositionY = scrollPosition * 0.5 + 'px';
});
    });