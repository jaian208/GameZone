const User = require('../models/user');
const Juego = require('../models/juego');


exports.agregaralCarro = async function (req, res) {
    try {
        if(!req.session.user){
            return res.redirect('/login');
        }
        const idUsuario = req.session.user.id;
        const idjuego = req.params.id;

        //buscar user y juego
        const UserDB = await User.findByPk(idUsuario);
        const juegoAgregar= await Juego.findByPk(idjuego);

        //Insertar registro a la tabla (usamos los metodos que Sequelize genera automáticamente para agregar un juego a User)
        //Nuestro metodo add de User y su parametro sera el juego que deseemos agregar (cualquier metodo con sequelize necesita ser await)
        await UserDB.addJuego(juegoAgregar);

        res.redirect('/carrito');

    }catch(error){
        console.log('Error al agregar el juego',error);
        res.status(500).send('Error al agregar el juego');
    }
}


exports.MostrarCarro = async (req, res) => {
    //Verificamos que exista una sesion
    try {
        if(!req.session.user){
            return res.redirect('/login');
        }

    //Buscamos la id del user en la sesion (recordando que le dimos los mismos atributos que tiene en la base de datos)
        const idusuario = req.session.user.id;

    //Buscamos el usuario mediante su id en la base de datos y los juegos que tiene asociados (en la tabla intermediaria). Luego, trae los atributos de esos juegos.
        const Usuario= await User.findByPk(idusuario, {
            include: Juego
        });


        //Esto permite que cualquier cosa que Sequelize traiga de Usuario denominado como Juego, lo meta en un array
        const juegosEnCarrito = Usuario.Juegos || [];

        //Inicializamos el acumulador total de precios
        let total=0;
        juegosEnCarrito.forEach(juego => {
            total+= parseFloat(juego.precio);
        });

        //Renderizamos el carrito con el array de juegos y el total
        res.render('carrito/carrito', {juegos: juegosEnCarrito, total: total});



    }catch(error){
        console.log('Error al mostrar el carro el juego',error);
        res.status(500).send('Error al mostrar el carro');
    }

}