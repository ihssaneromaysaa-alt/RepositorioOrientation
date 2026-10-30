const parrafo = document.getElementById("parrafo");
const boton = document.getElementById("btn");

function mostrarOrientacion(event) {

  parrafo.innerHTML = `
    Orientación:<br>
    Alpha: ${event.alpha?.toFixed(1) ?? 'N/A'}°<br>
    Beta: ${event.beta?.toFixed(1)}°
  `;
}

function requestPermission() {
  console.log("última versión");

  if (typeof DeviceOrientationEvent !== 'undefined' &&
      typeof DeviceOrientationEvent.requestPermission === 'function') {
    
    // iOS 13+
    DeviceOrientationEvent.requestPermission()
      .then(state => {
        if (state === 'granted') {
          window.addEventListener('deviceorientation', mostrarOrientacion);
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
    // Android y navegadores que no necesitan permiso
    window.addEventListener('deviceorientation', mostrarOrientacion);
    console.log('Listener añadido (no iOS)');
  }
}

boton.addEventListener('click', requestPermission);