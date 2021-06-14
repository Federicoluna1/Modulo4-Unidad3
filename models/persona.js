const qy = require('../database');

module.exports = {
    guardarUnaPersona: async function(persona) {
        var result = await qy(
            "INSERT INTO persona (nombre, apellido, nickname, edad, email) VALUES (?,?,?,?,?)", [persona.nombre, persona.apellido, persona.nickname, persona.edad, persona.email]);
        return result.insertId;
    },
    buscarUnaPersona: async function(id) {
        var unaPersona = await qy(
            "SELECT * FROM persona WHERE id = ?", [id]);
        return unaPersona[0];
    },
    buscarTodasLasPersonas: async function() {
        var listadoPersonas = await qy("SELECT * FROM persona");
        return listadoPersonas;
    },
    modificarPersona: async function(id, edad, email) {
        var result = await qy(
            "UPDATE persona SET edad = ?, email = ? WHERE id = ?", [edad, email, id]);
        return result.changedRows;
    },
    borrarPersona: async function(id) {
        var result = await qy("DELETE FROM persona WHERE id=?", [id]);
        return result.affectedRows;
    }
}