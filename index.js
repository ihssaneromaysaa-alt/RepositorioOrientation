const div = document.getElementById("circle");
const parrafo = document.getElementById("parrafo");
function mostrarOrientacion(event) {
  parrafo.innerHTML = (event.acceleration, event.rotationRate);
}

function requestPermission() {
  // iOS 13+
  if (typeof DeviceMotionEvent !== 'undefined' && 
      typeof DeviceMotionEvent.requestPermission === 'function') {
    
    DeviceMotionEvent.requestPermission()
      .then(state => {
        if (state === 'granted') {
          window.addEventListener('devicemotion', handleMotion);
          console.log('Permiso concedido');
        } else {
          console.error('Permiso denegado');
        }
      })
      .catch(console.error);

  } else {
    // Android y navegadores que no necesitan permiso
    window.addEventListener('devicemotion', mostrarOrientacion);
  }
}

// Obligatorio: se tiene que llamar desde un gesto del usuario
let boton = document.getElementById("btn");
boton.addEventListener('click', requestPermission);
// o también con touch:
// div.addEventListener('touchend', requestPermission);