const Juego= require('../models/Juego');

exports.MostrarFormularioEdicion= async (req, res) => {
    try{
        //Verificar si el usuario es admin y traemos el juego a editar
        const UserAdmin1 = req.session.user;

        //Si el usuario existe y es admin, cargamos el formulario de edicion en base al juego que deseamos editar
        if (UserAdmin1 && UserAdmin1.rol === 'admin') {
            const idJuego= req.params.id;
            const JuegoEditar= await Juego.findByPk(idJuego);

            res.render('formularioEdicion/formularioEdicion', {juego: JuegoEditar});

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



exports.EditarJuego= async (req, res) => {
    //Dejamos como parámetro la id y el request body lo que planeamos editar
    try{
        const idJuego= req.params.id;
        const { nombre, precio, descripcion, categoria, imagen_portada } = req.body;

        //Usamos el metodo update y usamos where para indicar la id del juego a editar
        await Juego.update({
            nombre: nombre,
            precio: precio,
            descripcion: descripcion,
            categoria: categoria,
            imagen_portada: imagen_portada,
        } , {where: {id: idJuego},
        });
        return res.redirect('/');

    }catch(error){
        console.log('Usuario no autorizado',error);
        res.status(400).send('Error al editar el juego');
    }
}