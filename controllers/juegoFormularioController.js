const Juego= require('../models/juego');


exports.MostrarFormularioJuegos= async function (req, res) {
    try {
        //Verificar si el usuario es admin
        const UserAdmin1 = req.session.user;
        if (UserAdmin1 && UserAdmin1.rol === 'admin') {
            res.render('formularioJuego/formularioJuego');
        }else if(UserAdmin1 && UserAdmin1.rol === 'cliente') {
            res.redirect('/');
        }else{
            res.redirect('/register');
        }
    }catch(error){
     console.log('Usuario no autorizado',error);
     res.status(400).send('Usuario no autorizado');
    }
}

exports.AñadirelJuego= async function (req, res) {
    try{
        const {nombre, imagen_portada, descripcion, precio, categoria} = req.body;
        //Verificar si el juego ya existe

        const JuegoExistente= await Juego.findOne(
            {where: {nombre: nombre}});

        if(JuegoExistente){
           return res.status(400).send('Error, juego ya existente');
        }
        //Verificar si el usuario es admin

        const UserAdmin= req.session.user;
        if(UserAdmin && UserAdmin.rol === 'admin') {

            await Juego.create({
                nombre: nombre,
                imagen_portada: imagen_portada,
                descripcion: descripcion,
                precio: precio,
                categoria: categoria,
                createdAt: Date.now(),
                updatedAt: Date.now(),

            });
            return res.redirect('/');
        }

    }catch(error){
        console.log('Usuario no autorizado',error);
        res.status(400).send('Error Crítico');
    }
}

exports.EditarJuego = async function (req, res) {

}