const User = require('../models/user');
const bcrypt = require("bcrypt");

exports.mostrarLogin = async (req, res) => {
    res.render('login/login');
}

exports.AutenticarLogin = async (req, res) => {
    try {
        const {email, password} = req.body;
        const UsuarioDB = await User.findOne(
            {
                where: {email: email}
            });
        if (!UsuarioDB) {
            return res.status(401).send('Acceso Denegado');
        }

        const passwordCorrecta = await bcrypt.compare(password, UsuarioDB.password);

        if (!passwordCorrecta) {
            return res.status(401).send('Contraseña incorrecta, intente nuevamente');
        }
        res.redirect('/');
    }catch(error) {
        console.log('Error crítico en el sistema');
        return res.status(500).send('Error crítico');
    }

}