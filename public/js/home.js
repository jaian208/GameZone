const imagenPrincipal = document.getElementById("imagenPrincipal");
const nombreJuego = document.getElementById("nombreJuego");
const precioJuego = document.getElementById("precioJuego");
const btnComprar = document.getElementById("btnComprar");
const thumbs = document.querySelectorAll(".thumb");

let indiceActual = 0;

function cambiarImagen(element) {
    imagenPrincipal.src = element.src;
    imagenPrincipal.dataset.nombre = element.dataset.nombre;
    imagenPrincipal.dataset.precio = element.dataset.precio;
    imagenPrincipal.dataset.id = element.dataset.id;

    nombreJuego.textContent = element.dataset.nombre;
    precioJuego.textContent = element.dataset.precio + " COP";
    btnComprar.href = "/comprar/" + element.dataset.id;

    thumbs.forEach(img => img.classList.remove("active"));
    element.classList.add("active");

    indiceActual = Array.from(thumbs).indexOf(element);
}

function cambioAutomatico() {
    indiceActual++;
    if (indiceActual >= thumbs.length) indiceActual = 0;
    cambiarImagen(thumbs[indiceActual]);
}

setInterval(cambioAutomatico, 5000);
