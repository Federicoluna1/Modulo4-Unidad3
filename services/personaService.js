const personaModel = require('../models/persona');

module.exports = {
    guardarUnaPersona: async function(persona) {

        var id = await personaModel.guardarUnaPersona(persona);
        persona.id = id;
        console.log("id que traigo del model", id);
        console.log("id que traigo de la persona", persona.id);

        return persona;
    },
    listarPersonas: async function() {
        var listaDePersonas = await personaModel.buscarTodasLasPersonas();
        return listaDePersonas;
    },
    buscarUnaPersona: async function(id) {
        var persona = personaModel.buscarUnaPersona(id);
        return persona;
    },
    modificarPersona: async function(edad, email) {
        var resultado = await personaModel.modificarPersona(edad, email);

        if (resultado == 1) {
            return true;
        } else {
            return false;
        }
    },
    borrarPersona: async function(id) {
        var resultado = await personaModel.borrarPersona(id);

        if (resultado == 1) {
            return true;
        } else {
            return false;
        }
    },
}