const express = require('express');
const app = express();


app.use(require('./src/routes/route'));

app.listen(3000,() =>{
    console.log('escuchando el puerto: ',3000);
});