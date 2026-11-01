
const parrafo = document.getElementById("parrafo");
const boton = document.getElementById("btn");
const circle = document.getElementById("circle");

let escuchando = false;
let betaInicial = null;
let gammaInicial = null;

function limitar(valor, minimo, maximo) {
    return Math.max(minimo, Math.min(maximo, valor));
}

function mostrarOrientacion(event) {

    // Comprobar que el móvil está enviando datos
    if (event.beta === null || event.gamma === null) {
        parrafo.innerHTML = "El sensor no está enviando datos.";
        return;
    }

    // Guardamos la orientación inicial
    if (betaInicial === null) {
        betaInicial = event.beta;
        gammaInicial = event.gamma;
    }

    // Calculamos la inclinación respecto a la posición inicial
    const beta = event.beta - betaInicial;
    const gamma = event.gamma - gammaInicial;

    // Limitamos el movimiento del círculo
    const movimientoX = limitar(gamma * 2, -90, 90);
    const movimientoY = limitar(beta * 2, -90, 90);

    // Movemos el círculo
    circle.style.transform =
        `translate(${movimientoX}px, ${movimientoY}px)`;

    // Mostramos los datos
    parrafo.innerHTML = `
        <strong>Sensor conectado</strong><br>
        Alpha: ${event.alpha?.toFixed(1) ?? "N/A"}°<br>
        Beta: ${event.beta.toFixed(1)}°<br>
        Gamma: ${event.gamma.toFixed(1)}°
    `;
}

function iniciarSensor() {

    if (escuchando) return;

    if (typeof DeviceOrientationEvent === "undefined") {
        parrafo.textContent = "Tu navegador no admite este sensor.";
        return;
    }

    window.addEventListener(
        "deviceorientation",
        mostrarOrientacion
    );

    escuchando = true;

    boton.textContent = "Sensor activado";
    boton.disabled = true;

    parrafo.textContent = "Esperando datos del móvil...";
}

function requestPermission() {

    if (escuchando) return;

    // Comprobar si el navegador necesita permiso
    if (
        typeof DeviceOrientationEvent !== "undefined" &&
        typeof DeviceOrientationEvent.requestPermission === "function"
    ) {

        DeviceOrientationEvent.requestPermission()
            .then(permission => {

                if (permission === "granted") {
                    iniciarSensor();
                } else {
                    parrafo.textContent = "Permiso denegado.";
                }

            })
            .catch(error => {
                console.error(error);
                parrafo.textContent = "No se pudo activar el sensor.";
            });

    } else {
        iniciarSensor();
    }
}

boton.addEventListener("click", requestPermission);
