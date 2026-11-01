
const circle = document.getElementById("circle");
const boton = document.getElementById("btn");

let x = window.innerWidth / 2 - 30;
let y = window.innerHeight / 2 - 30;

function moverCirculo(event) {

    if (event.gamma === null || event.beta === null) return;

    const ancho = window.innerWidth - 60;
    const alto = window.innerHeight - 60;

    x = Math.max(0, Math.min(ancho,
        x + event.gamma * 0.8
    ));

    y = Math.max(0, Math.min(alto,
        y + event.beta * 0.8
    ));

    circle.style.transform =
        `translate(${x}px, ${y}px)`;
}

async function activar() {

    if (
        typeof DeviceOrientationEvent !== "undefined" &&
        typeof DeviceOrientationEvent.requestPermission === "function"
    ) {
        try {
            const permiso =
                await DeviceOrientationEvent.requestPermission();

            if (permiso !== "granted") return;

        } catch (error) {
            console.error(error);
            return;
        }
    }

    window.addEventListener(
        "deviceorientation",
        moverCirculo
    );

    boton.style.display = "none";
}

boton.addEventListener("click", activar);
