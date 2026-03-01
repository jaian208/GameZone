const express=require('express');
const app=express();
const port= 300;



//configuraciones

app.set('view engine','ejs');

const homeRoutes = require("./router/homeRouter");

app.use("/", homeRoutes);

app.use(express.static('public'));

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
})