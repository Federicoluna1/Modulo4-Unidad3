const express = require('express');
const personaController = require('./controllers/personaController');
const persona = require('./models/persona');
const app = express();

app.use(express.json());

const PORT = process.env.PORT ? process.env.PORT : 3000;

//Crear Persona
app.post('/persona', async (req, res) =>{
    try {
        if(!req.body.nombre || !req.body.apellido || !req.body.nickname || !req.body.edad || !req.body.email) {
            res.status(400).send ('Faltan completar datos');
        }
        var persona = {
            nombre: req.body.nombre,
            apellido: req.body.apellido,
            nickname: req.body.nickname,
            edad: req.body.edad,
            email: req.body.email
        }

        var personaNueva = await personaController.guardarUnaPersona(persona);

        res.send('La persona fue creada y su id es') + personaNueva.id;
        }
        catch(e) {
            console.error(error);
                res.status(422).send({"Se produjo el siguiente error": error});
        }
});

//Buscar todas las personas
app.get('/persona', async (req, res) => {
        try{
        var listaDePersonas = await personaController.listarPersonas();

        res.send('Las personas de la lista son') + listaDePersonas;
        }
        catch (e) {
            console.log(e);
            res.sendStatus(422).send("Se produjo el siguiente error: ", e);
        }
    
    });
    
//Buscar Personas por ID
app.get('/persona/:id', async (req, res) => {
        try{
            if (!req.params.id) {
                res.status(400).send ('Falta el id');

        var personaEncontrada = await personaController.buscarUnaPersona();

        res.send('Se encontro la persona') + personaEncontrada.id;
        }
    }
        catch(e) {
            console.error(error);
                res.status(422).send({"Se produjo el siguiente error": error});
        }
    });
    
//Actualizar Persona
app.put('/persona/:id', async (req, res) => {  
        try {
            if(!req.body.nombre || !req.body.apellido || !req.body.email) {
                res.status(400).send ('Faltan datos');

        var personaModificada = await personaController.modificarPersona();

        res.send('Se actualizaron los datos de') + personaModificada(nickname, edad, email);
        }
    }
        catch(e) {
            console.error(error);
                res.status(422).send({"Se produjo el siguiente error": error});
        }
    });
    
    
//Eliminar Persona
app.delete('/persona/:id', async (req, res) => {
        try {
            if(!req.body.nombre || !req.body.apellido || !req.body.email) {
                res.status(400).send ('Faltan datos');
    
        var personaEliminada = await personaController.borrarPersona();
        
        res.send('Se elimino a') + personaEliminada;
        }
    }
        catch(e) {
            console.error(error);
                res.sendstatus(422).send({"Se produjo el siguiente error": error});
        }
    });
        
app.listen (PORT, ()=>{
        console.log ('Servidor escuchando en el puerto' + PORT)
});