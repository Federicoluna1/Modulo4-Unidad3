const express = require('express');
const qy = require('./database');
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
        let query = 'SELECT id FROM persona WHERE nombre= ?, apellido= ?, nickname = ?, edad = ?, email = ?';

        let respuesta = await  qy(query, [req.body.nombre.toUpperCase()]);

        if (respuesta.length > 0 ) {
            throw new Error ('¡Esa persona ya existe!');
        };

        query = 'INSERT INTO persona nombre= ?, apellido= ?, nickname = ?, edad = ?, email = ?';

        respuesta = await qy(query, [req.body.genero, req.body.apellido, req.body.nickname, req.body.edad, req.body.email]);

        let response = await qy(`SELECT * FROM persona WHERE ID='${respuesta.insertId}'`)

        res.status(200).send(response);
        
        }
        catch(e){
            console.error(e.message);
            res.status(413).send({'Error': e.message});
        }
});

//Buscar todas las personas
app.get('/persona', async (req, res) => {
        try{
        const query = 'SELECT * FROM persona';

        const respuesta =  await qy(query);
        
        if (respuesta.length == null){
                throw new Error('[]')
            }
            
        res.send({"Respuesta": respuesta});
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

        let query = 'SELECT * FROM persona WHERE id = ?';
        
        let respuesta = await qy(query, [req.params.id]);

        if (respuesta.length == 0 ) {
            throw new Error ('Esa persona no existe');
        };
        
        res.send({"Respuesta": respuesta}); 
        }
    }
        catch(e){
            console.error(e.message);
            res.status(413).send({'Error': e.message});
    }
});
    
//Actualizar Persona
app.put('/persona/:id', async (req, res) => {  
        try {
            if(!req.body.edad || !req.body.email) {
                res.status(400).send ('Faltan datos');

        var personaModificada = await personaController.modificarPersona();

        let query = "UPDATE persona SET edad = ?, email = ? WHERE id = ?"
        
        let respuesta = await qy(query, [req.params.id]);
        
        res.send({"Respuesta": respuesta}); 
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
            if(!req.body.nombre || !req.body.apellido || !req.body.email) {
                res.status(400).send ('Faltan datos');
    
        var personaEliminada = await personaController.borrarPersona();
        
        res.send('Se elimino a') + personaEliminada;
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