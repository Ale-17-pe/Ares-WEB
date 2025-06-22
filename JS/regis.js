document.addEventListener("DOMContentLoaded", function () {
    // Recuperar valores de localStorage
    const plan = localStorage.getItem("plan") || "plan-trimestral";
    const coach = localStorage.getItem("coach") || "No";

    document.getElementById("planSeleccionado").value = plan;
    document.getElementById("coachIncluido").value = coach;

    // Mostrar/ocultar contraseña
    document.querySelectorAll(".toggle-password").forEach(icon => {
        icon.addEventListener("click", function () {
            const input = this.previousElementSibling;
            if (input.type === "password") {
                input.type = "text";
                this.classList.remove("fa-eye");
                this.classList.add("fa-eye-slash");
            } else {
                input.type = "password";
                this.classList.remove("fa-eye-slash");
                this.classList.add("fa-eye");
            }
        });
    });

    // Validación antes del envío
    const form = document.getElementById("registroForm");
    form.addEventListener("submit", function (e) {
        const contrasena = document.getElementById("contrasena").value;
        const confirmar = document.getElementById("confirmarContrasena").value;
        const dni = document.getElementById("dni").value;

        if (contrasena !== confirmar) {
            e.preventDefault();
            alert("Las contraseñas no coinciden.");
            return;
        }

        if (!/^\d{8}$/.test(dni)) {
            e.preventDefault();
            alert("El DNI debe tener exactamente 8 dígitos numéricos.");
            return;
        }

        const fechaNacimiento = new Date(document.getElementById("fecha_nacimiento").value);
        const hoy = new Date();
        const edad = hoy.getFullYear() - fechaNacimiento.getFullYear();
        if (edad < 14) {
            e.preventDefault();
            alert("Debes tener al menos 14 años para registrarte.");
            return;
        }
    });
});
