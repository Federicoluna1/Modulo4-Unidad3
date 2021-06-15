const personaService = require('../services/personaService');

module.exports = {
    guardarUnaPersona: async function(persona) {
        var personaNueva = personaService.guardarUnaPersona(persona);
        return personaNueva;
    },
    listarPersonas: async function() {
        var listado = await personaService.listarPersonas();
        return listado;
    },
    buscarUnaPersona: async function(id) {
        var persona = personaService.buscarUnaPersona(id);
        return persona;
    },
    modificarPersona: async function(id, edad, email) {
        var persona = null;

        var resultado = await personaService.modificarPersona(id, edad, email);

        if (resultado) {
            persona = await personaService.buscarUnaPersona(id);
        }
        return persona;
    },
    borrarPersona: async function(id) {
        var persona = null;

        var resultado = await personaService.borrarPersona(id);

        if (resultado) {
            persona = await personaService.buscarUnaPersona(id);
        }

        return persona;
    },
}
