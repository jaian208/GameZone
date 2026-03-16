const express=require('express');

//Sequelize y DB
const sequelize= require('./database/configDatabase');
const Juego=require('./models/juego');
const User=require('./models/user');
//JS y puertos
const app=express();
const port= 300;


//Creación de tablas
Juego.belongsToMany(User, {through: 'biblioteca'});
User.belongsToMany(Juego, {through: 'biblioteca'});


//Sequelize
sequelize.authenticate().then(() => {

    console.log('Conexion con la DB establecida');
    return sequelize.sync();  //Se utiliza un return (lo que se denomina promesa en una funcion asincronica para asegurarse de que se haga)

}).then(() => {
    console.log('Tablas actualizadas correctamente');
    /*return Juego.bulkCreate(juegosSeed);*/

}).then(() => {

    console.log('Información Bulkeada correctamente');

}).catch((error)=>  {
    console.error('Conexion fallida', error.message);
});


//configuraciones


//Interpretes (middlewares)
app.use(express.urlencoded({extended:false}));
app.use(express.json());

app.set('view engine','ejs');


const homeRoutes = require("./router/homeRouter");

const juegoRoutes = require("./router/infojuegoRouter");

const userRoutes = require("./router/userRouter");

const authenticationRoutes= require("./router/authenticationRouter");

const path = require("node:path");

app.use("/", homeRoutes);

app.use("/", juegoRoutes);

app.use("/", authenticationRoutes);

app.use("/", userRoutes);



app.use(express.static(path.join(__dirname, 'public')));

app.listen(port, () => {
    console.log(`Server started on port ${port}`);})