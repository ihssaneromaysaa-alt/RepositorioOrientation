
// buscamos los elementos HTML por su ID
const circle = document.getElementById("circle");
const boton = document.getElementById("btn");

// guardamos la posición inicial del círculo
// lo colocamos aproximadamente en el centro de la pantalla
let x = window.innerWidth / 2 - 30;
let y = window.innerHeight / 2 - 30;


// esta función se ejecuta cuando el móvil cambia de orientación
function moverCirculo(event) {

    // comprobamos que el sensor esté enviando datos
    if (event.gamma === null || event.beta === null) return;

    // calculamos el espacio disponible para mover el círculo
    // restamos 60 porque el círculo mide 60 píxeles
    const ancho = window.innerWidth - 60;
    const alto = window.innerHeight - 60;

    // modificamos la posición horizontal
    // gamma detecta la inclinación lateral del móvil
    x = Math.max(0, Math.min(ancho,
        x + event.gamma * 0.8
    ));

    // modificamos la posición vertical
    // beta detecta la inclinación hacia delante y atrás
    y = Math.max(0, Math.min(alto,
        y + event.beta * 0.8
    ));

    // aplicamos la nueva posición al círculo
    circle.style.transform =
        `translate(${x}px, ${y}px)`;
}


// esta función se ejecuta al pulsar el botón
async function activar() {

    // comprobamos si el navegador necesita permiso
    // esto ocurre especialmente en Safari de iOS
    if (
        typeof DeviceOrientationEvent !== "undefined" &&
        typeof DeviceOrientationEvent.requestPermission === "function"
    ) {
        try {

            // solicitamos permiso para acceder al sensor
            const permiso =
                await DeviceOrientationEvent.requestPermission();

            // si el usuario no acepta, no continuamos
            if (permiso !== "granted") return;

        } catch (error) {

            // mostramos cualquier error en la consola
            console.error(error);
            return;
        }
    }

    // escuchamos los cambios de orientación del móvil
    // cada vez que cambia la inclinación, ejecutamos moverCirculo
    window.addEventListener(
        "deviceorientation",
        moverCirculo
    );

    // ocultamos el botón porque ya hemos activado el sensor
    boton.style.display = "none";
}


// cuando pulsamos el botón, ejecutamos la función activar
boton.addEventListener("click", activar);
