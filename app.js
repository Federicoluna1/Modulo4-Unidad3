const express = require('express');
const personaController = require('./controllers/personaController');
const personaModel = require('./models/persona');
const qy = require('./database');
const app = express();

app.use(express.json());

app.use(express.urlencoded());

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
        const personaNueva = await personaController.guardarUnaPersona(persona);

        res.send(
            'La persona se creo satisfactoriamente, el id asignado es ' +
            personaNueva.id
        );
    } catch (error) {
        console.log('Se produjo el siguiente error ', error);
        res.sendStatus(422).send('Se produjo el siguiente error: ', error);
    }
});

//Buscar todas las personas
app.get('/persona', async (req, res) => {
        try{
        
        const listado = await personaController.listarPersonas();
        
        if (listado.length == 0){
            res.status(400).send ('No hay personas en la lista');
            }

        res.send({listado});
        }
        catch(e){
            console.error(e.message);
            res.status(413).send({'Error': e.message});
        }
});
    
//Buscar Personas por ID
app.get('/persona/:id', async (req, res) => {
        try{
            if (!req.params.id) {
        res.status(400).send ('Falta el id');

        const persona = await personaController.buscarUnaPersona(id);
        
        if (respuesta.length == 0 ) {
            throw new Error ('Esa persona no existe');
        };
        
        res.send({persona});
        }
    }
        catch(e){
            console.error(e.message);
            console.log(error);
            res.status(413).send({'Error': e.message});
    }
});
    
//Actualizar Persona
app.put('/persona/:id', async (req, res) => {  
        try {
            if(!req.body.edad || !req.body.email) {
                res.status(400).send ('Faltan datos');
        
        const resultado = await personaController.modificarPersona(id, edad, mail);
        
        res.send({resultado}); 
        }
    }
        catch(e){
            console.error(e.message);
            res.status(413).send({'Error': e.message});
    }
});
    
//Eliminar Persona
app.delete('/persona/:id', async (req, res) => {
        try {
            if (!req.params.id) {
                res.status(400).send ('Falta el id');

        resultado = await personaController.borrarPersona(id);
        
        res.send({resultado});
        }
    }
        catch(e){
            console.error(e.message);
            res.status(413).send({'Error': e.message});
    }
});
        
app.listen (PORT, ()=>{
        console.log ('Servidor escuchando en el puerto' + PORT)
});