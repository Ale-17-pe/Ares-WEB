// Activar/desactivar campos al hacer clic en el ícono de editar
document.querySelectorAll('.edit-btn').forEach(button => {
    button.addEventListener('click', function () {
        const input = this.previousElementSibling;
        input.disabled = !input.disabled;
        this.innerHTML = input.disabled ? '<i class="fas fa-edit"></i>' : '<i class="fas fa-check"></i>';
        if (!input.disabled) input.focus();
    });
});

// Manejar el envío del formulario
document.getElementById('profileForm').addEventListener('submit', function (e) {
    e.preventDefault();
    alert('Cambios guardados exitosamente.');
});

// Simular cambio de foto de perfil (aún no implementado)
document.querySelectorAll('.avatar-edit-btn').forEach(button => {
    button.addEventListener('click', function () {
        alert('Funcionalidad de cambio de foto de perfil aún no implementada.');
    });
});
