
const parrafo = document.getElementById("parrafo");
const boton = document.getElementById("btn");

let escuchando = false;

function mostrarOrientacion(event) {
  parrafo.innerHTML = `
    Orientación:<br>
    Alpha: ${event.alpha !== null ? event.alpha.toFixed(1) : 'N/A'}°<br>
    Beta: ${event.beta !== null ? event.beta.toFixed(1) : 'N/A'}°<br>
    Gamma: ${event.gamma !== null ? event.gamma.toFixed(1) : 'N/A'}°
  `;
}

function requestPermission() {
  if (escuchando) return;

  if (
    typeof DeviceOrientationEvent !== 'undefined' &&
    typeof DeviceOrientationEvent.requestPermission === 'function'
  ) {
    DeviceOrientationEvent.requestPermission()
      .then(state => {
        if (state === 'granted') {
          iniciarSensor();
        } else {
          parrafo.textContent = "Permiso denegado";
        }
      })
      .catch(error => {
        console.error(error);
        parrafo.textContent = "Error al pedir permiso";
      });
  } else {
    iniciarSensor();
  }
}

function iniciarSensor() {
  window.addEventListener(
    'deviceorientation',
    mostrarOrientacion
  );

  escuchando = true;
  parrafo.textContent = "Esperando datos del sensor...";
}

boton.addEventListener('click', requestPermission);
