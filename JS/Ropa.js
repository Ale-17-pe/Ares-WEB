     let carrito = [];
        const modal = document.getElementById('confirmacionModal');
        const modalNombreProducto = document.getElementById('modalNombreProducto');
        const modalProductoImagen = document.getElementById('modalProductoImagen');
        const modalDescripcionProducto = document.getElementById('modalDescripcionProducto');
        const modalTallasDisponibles = document.getElementById('modalTallasDisponibles');
        const modalPrecioProducto = document.getElementById('modalPrecioProducto');
        let currentConfirmarCompraBtn = document.getElementById('confirmarCompraBtn');
        const cartCountSpan = document.querySelector('.cart-count');

        function updateCartCount() {
            cartCountSpan.innerText = carrito.length;
        }

        function cerrarModal() {
            modal.classList.remove('is-open');
        }

        function parseSizesFromText(description, productName) {
            let extractedSizes = [];
            const regex = /(?:en tallas|Tallas disponibles:|Tallas:)\s*([A-Z0-9,\sXLMEDSGYUÍCAy]+)/i;
            const match = description.match(regex);

            if (match && match[1]) {
                let sizeString = match[1];
                sizeString = sizeString.split('.')[0];
                sizeString = sizeString.replace(/\s*y\s+/gi, ',').replace(/,\s*$/g, '');
                extractedSizes = sizeString.split(/[\s,]+/)
                                        .map(s => s.trim().toUpperCase())
                                        .filter(s => /^[SMLXG0-9]+$/.test(s) && s !== '');
            }
            return [...new Set(extractedSizes)];
        }

        function openProductModal(boton, imageUrl) {
            const productoDiv = boton.parentElement;
            const nombre = productoDiv.querySelector('h4').innerText;
            const descripcion = productoDiv.querySelector('p.descripcion')?.innerText || 'Descripción no disponible';
            const precio = productoDiv.querySelector('p:not(.descripcion)').innerText;

            modalNombreProducto.innerText = nombre;
            modalDescripcionProducto.innerText = descripcion;
            modalPrecioProducto.innerText = `Precio: ${precio}`;
            modalProductoImagen.src = imageUrl;
            modalProductoImagen.alt = nombre;

            modalTallasDisponibles.innerHTML = '<p><strong>Talla:</strong></p>';
            let sizes = parseSizesFromText(descripcion, nombre);
            const tallasContainer = document.createElement('div');
            tallasContainer.className = 'tallas-radio-group';

            const apparelKeywords = ["camiseta", "top", "leggins", "shorts", "polo", "guantes", "cinturón"];
            const isApparelOrSizedAccessory = apparelKeywords.some(keyword => nombre.toLowerCase().includes(keyword));

            if (sizes.length === 0 && isApparelOrSizedAccessory) {
                const lowerProductName = nombre.toLowerCase();
                if (lowerProductName.includes("cinturón")) {
                     sizes = ['M', 'L', 'XL'];
                } else if (lowerProductName.includes("guantes")) {
                     sizes = ['S', 'M', 'L'];
                } else if (lowerProductName.includes("camiseta") || lowerProductName.includes("top") || lowerProductName.includes("leggins") || lowerProductName.includes("polo") || lowerProductName.includes("shorts") ) {
                     sizes = ['S', 'M', 'L', 'XL'];
                }
            }

            if (sizes.length > 0) {
                sizes.forEach((talla, index) => {
                    const radioId = `talla-${nombre.replace(/\s+/g, '-')}-${talla.replace(/\s+/g, '-')}-${index}`;
                    const radioInput = document.createElement('input');
                    radioInput.type = 'radio';
                    radioInput.name = 'tallaSeleccionada';
                    radioInput.value = talla;
                    radioInput.id = radioId;
                    if (index === 0) radioInput.checked = true;

                    const radioLabel = document.createElement('label');
                    radioLabel.htmlFor = radioId;
                    radioLabel.textContent = talla;

                    tallasContainer.appendChild(radioInput);
                    tallasContainer.appendChild(radioLabel);
                });
                modalTallasDisponibles.appendChild(tallasContainer);
            } else {
                const nonSizedItems = ["toalla", "mochila", "tapete", "cuerda", "bandas"];
                const isNonSized = nonSizedItems.some(item => nombre.toLowerCase().includes(item));
                if (isNonSized) {
                    modalTallasDisponibles.innerHTML = '<p><strong>Talla:</strong> No aplica</p>';
                } else {
                     modalTallasDisponibles.innerHTML = '<p><strong>Talla:</strong> Única / Consultar</p>';
                }
            }

            const newButton = currentConfirmarCompraBtn.cloneNode(true);
            currentConfirmarCompraBtn.parentNode.replaceChild(newButton, currentConfirmarCompraBtn);
            currentConfirmarCompraBtn = newButton;

            currentConfirmarCompraBtn.onclick = function() {
                const tallaSeleccionadaRadio = document.querySelector('#confirmacionModal input[name="tallaSeleccionada"]:checked');
                let tallaFinal = 'No especificada';

                if (tallaSeleccionadaRadio) {
                    tallaFinal = tallaSeleccionadaRadio.value;
                } else {
                    const tallaInfoP = modalTallasDisponibles.querySelector('p:last-child');
                    if (tallaInfoP) {
                        if (tallaInfoP.innerText.includes("No aplica")) {
                           tallaFinal = "No aplica";
                        } else if (tallaInfoP.innerText.includes("Única")) {
                           tallaFinal = "Única";
                        }
                    }
                }

                carrito.push({ nombre: modalNombreProducto.innerText, precio: precio, talla: tallaFinal });
                updateCartCount();
                alert(`Agregado al carrito: ${modalNombreProducto.innerText} - Talla: ${tallaFinal} - ${precio}\n\nCarrito actual:\n${carrito.map(p => `${p.nombre} (Talla: ${p.talla}) - ${p.precio}`).join('\n')}`);
                console.log(carrito);
                cerrarModal();
            };

            modal.classList.add('is-open');
        }

        window.onclick = function(event) {
            if (event.target == modal) {
                cerrarModal();
            }
        }

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