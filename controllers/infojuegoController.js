const Juego = require('../models/juego');

//Función para seleccionar aleatoriamente los juegos en un array
function seleccionarJuegoAleatorio(array, cantidad) {
    return [...array].sort(() => 0.5 - Math.random()).slice(0, cantidad);
}

//Solicitar los atributos del juego mediante la id del juego seleccionado
exports.juegoEscogido = async (req, res) => {
    try {
        const idJuego = req.params.id;
        //Trae todos los juegos de la base de datos
        const JuegosDB = await Juego.findAll();
        //Seleccionar el juego que queremos mostrar mediante su id en la variable (const idJuego)
        const JuegoPrincipal= await Juego.findByPk(idJuego);

        //Renderizar infojuego mediante el juego principal y las recomendaciones utilizando la funcion de seleccionarJuegoAleatorio
        res.render('infojuego/infojuego', {
            juego: JuegoPrincipal,
            juegosRecomendaciones1: seleccionarJuegoAleatorio(JuegosDB, 4),
        });

    }catch(error){
        console.error('Fallo al cargar la informacion del juego', error);
        res.status(500).send('Erro ao cargar la informacion del juego');
    }
}

