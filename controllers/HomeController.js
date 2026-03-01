const fs = require('fs');
const path = require('path');

let juegos = [
    { nombre:"Dead Space", precio:120000, imagenBase:"Dead_Space", categoria:"Terror" },
    { nombre:"Phasmophobia", precio:45000, imagenBase:"Phasmofobia", categoria:"Terror" },
    { nombre:"Dead Space 3", precio:90000, imagenBase:"Dead_Space_3", categoria:"Terror" },
    { nombre:"DOOM", precio:150000, imagenBase:"header", categoria:"Acción" },
    { nombre:"Dead Space 2", precio:200000, imagenBase:"Dead_Space_2", categoria:"Terror" },
    { nombre:"Minecraft", precio:180000, imagenBase:"minecraft", categoria:"Aventura" },
    {nombre: "Halo", precio: 120000, imagenBase:"Halo", categoria:"cooperativo" },
    {nombre: "assassin's creed shadows", precio: 200000, imagenBase: "assassin's_creed_shadows",categoria: "accion"}
];
juegos.forEach((juego, index) => {
    juego.id = index + 1;
});

const categorias = [
    { id:1, nombre:"Acción", imagenBase:"accion" },
    { id:2, nombre:"Aventura", imagenBase:"aventura" },
    { id:3, nombre:"Terror", imagenBase:"terror" },
    { id:4, nombre:"cooperativo", imagenBase:"cooperativo" },
];

const carpetaCategorias = path.join(__dirname,'../public/images/categorias/');

categorias.forEach(cat => {
    const archivos = fs.readdirSync(carpetaCategorias);
    const archivoEncontrado = archivos.find(f => f.startsWith(cat.imagenBase));
    cat.imagen = archivoEncontrado ? `/images/categorias/${archivoEncontrado}` : '/images/categorias/default.png';
});

const folder = path.join(__dirname,'../public/images/home/');
juegos.forEach(juego => {
    const files = fs.readdirSync(folder);
    const fileFound = files.find(f => f.startsWith(juego.imagenBase));
    juego.imagen = fileFound ? `/images/home/${fileFound}` : '/images/home/default.png';
});

function seleccionarAleatorios(array, cantidad){
    const copia = [...array];
    const seleccion = [];
    for(let i=0;i<cantidad && copia.length>0;i++){
        const idx = Math.floor(Math.random()*copia.length);
        seleccion.push(copia[idx]);
        copia.splice(idx,1);
    }
    return seleccion;
}

exports.home = (req,res) => {
    res.render('home/home', {
        juegosCarrusel: seleccionarAleatorios(juegos, 4),
        juegosRecomendaciones: seleccionarAleatorios(juegos, 4),
        categorias: categorias
    });
}

exports.categoria = (req,res) => {
    const categoriaId = parseInt(req.params.id);
    const juegosFiltrados =
        juegos.filter(j => j.categoriaId === categoriaId || j.categoria ===
            categorias.find(c =>c.id===categoriaId)?.nombre);

    res.render('categoria/categoria', {
        juegos: juegosFiltrados,
        categorias: categorias,
        categoriaId: categoriaId
    });
}