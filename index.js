const parrafo = document.getElementById("parrafo");
const boton = document.getElementById("btn");

function mostrarMotion(event) {
  const acc = event.accelerationIncludingGravity; // más fiable
  const rot = event.rotationRate;

  parrafo.innerHTML = `
    Rotación:<br>
    Alpha: ${rot.alpha}
    Beta: ${rot.beta}
  `;
}

function requestPermission() {
  console.log("Has pulsado el botón");

  if (typeof DeviceMotionEvent !== 'undefined' &&
      typeof DeviceMotionEvent.requestPermission === 'function') {
    DeviceMotionEvent.requestPermission()
      .then(state => {
        if (state === 'granted') {
          window.addEventListener('devicemotion', mostrarMotion);
          console.log('Permiso concedido');
        } else {
          console.error('Permiso denegado');
          parrafo.textContent = "Permiso denegado";
        }
      })
      .catch(err => {
        console.error(err);
        parrafo.textContent = "Error al pedir permiso";
      });

  } else {
    window.addEventListener('devicemotion', mostrarMotion);
    console.log('Listener añadido (no iOS)');
  }
}

boton.addEventListener('click', requestPermission);