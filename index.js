const express = require('express');
const app = express();
const fs = require('fs');
app.use(express.json());
const port = 3000;

const {canciones_function, write_function, find_function} = require('./canciones.js');

app.listen(port, () => {
    console.log("Servidor funcionando");
    console.log(port);
});

app.get('/', (req, res) => {
    res.sendFile(__dirname + "/index.html");
})

app.get('/canciones', (req, res) => {
    const canciones = canciones_function();
    res.json(canciones);
})

app.post('/canciones', (req, res) => {
    //console.log(req.body);
    const cancion = req.body;
    const canciones = canciones_function();
    canciones.push(cancion);
    write_function(canciones);
    res.send('Canción agregada con éxito');
})

app.delete('/canciones/:id', (req, res) => {
    const {id} = req.params;
    const canciones = canciones_function();
    const index = find_function(canciones, id);
    canciones.splice(index, 1)
    write_function(canciones);
    res.send("Canción eliminada con éxito")
})

app.put('/canciones/:id', (req, res) => {
    const {id} = req.params;
    const cancion = req.body;
    const canciones = canciones_function();
    const index = find_function(canciones, id);
    canciones[index] = cancion;
    write_function(canciones);
    res.send("Canción modificada con éxito");
})