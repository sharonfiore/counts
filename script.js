const SCRIPT_URL = "LA_URL_DE_TU_APPS_SCRIPT"; // Pega aquí la URL que guardaste

document.addEventListener('DOMContentLoaded', () => {
    // Selectores de elementos del Modal
    const btnNuevoGasto = document.getElementById('btnNuevoGasto');
    const modalGasto = document.getElementById('modalGasto');
    const closeButton = modalGasto.querySelector('.close-button');
    const formGasto = document.getElementById('formGasto');
    
    // Abrir Modal
    btnNuevoGasto.addEventListener('click', () => {
        modalGasto.style.display = 'block';
    });

    // Cerrar Modal
    const closeModal = () => {
        modalGasto.style.display = 'none';
    };
    closeButton.addEventListener('click', closeModal);
    window.addEventListener('click', (event) => {
        if (event.target == modalGasto) {
            closeModal();
        }
    });

    // Lógica de Tarjeta de Crédito en el formulario
    const gastoCuentaSelect = document.getElementById('gastoCuenta');
    const opcionTarjetaCredito = document.getElementById('opcionTarjetaCredito');
    
    // Esta función se debe llamar cuando cargues las cuentas dinámicamente
    // Por ahora, es un ejemplo.
    gastoCuentaSelect.addEventListener('change', () => {
        // Debes tener una forma de saber si la cuenta es de crédito.
        // Por ejemplo: if (cuentaSeleccionada.tipo === 'Tarjeta de Crédito')
        // Simulamos que la opción con valor "TC" es la tarjeta.
        if (gastoCuentaSelect.value === 'TC') {
            opcionTarjetaCredito.style.display = 'flex';
        } else {
            opcionTarjetaCredito.style.display = 'none';
        }
    });

    // Enviar formulario de Gasto
    formGasto.addEventListener('submit', (e) => {
        e.preventDefault();
        const gastoData = {
            action: 'registrarGasto',
            payload: {
                descripcion: document.getElementById('gastoDescripcion').value,
                monto: parseFloat(document.getElementById('gastoMonto').value),
                fecha: new Date().toISOString(),
                cuentaOrigen: gastoCuentaSelect.value, // ID de la cuenta
                categoria: document.getElementById('gastoCategoria').value,
                // Lógica de la tarjeta de crédito
                tipoCuenta: 'Tarjeta de Crédito', // Esto debería ser dinámico basado en la cuenta
                contarSiguienteMes: document.getElementById('contarSiguienteMes').checked
            }
        };

        // Mostrar un loader o deshabilitar el botón mientras se envía
        fetch(SCRIPT_URL, {
            method: 'POST',
            body: JSON.stringify(gastoData)
        })
        .then(response => response.json())
        .then(data => {
            alert(data.message);
            closeModal();
            formGasto.reset();
            // Aquí llamarías a una función para refrescar los datos del dashboard
        })
        .catch(error => console.error('Error:', error));
    });

    // Gráfico de ejemplo (igual que antes, pero se verá mejor con el nuevo CSS)
    const ctx = document.getElementById('gastosChart').getContext('2d');
    const gastosChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Comida', 'Transporte', 'Ocio', 'Hogar', 'Otros'],
            datasets: [{
                data: [300, 150, 100, 250, 75],
                backgroundColor: ['#E35050', '#4A90E2', '#F5A623', '#7ED321', '#BD10E0'],
                borderColor: 'rgba(0,0,0,0)',
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        color: 'white' // Color del texto de la leyenda
                    }
                }
            }
        }
    });
});