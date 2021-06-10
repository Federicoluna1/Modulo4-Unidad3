const qy = require('../database');

module.exports = {
    guardarUnaPersona: async function(persona) {
        var result = await conexion.query(
            "INSERT INTO persona (nombre, apellido, nickname, edad, email) VALUES (?,?,?,?,?)", [persona.nombre, persona.apellido, persona.nickname, persona.edad, persona.email]);
        return result.insertId;
    },
    buscarUnaPersona: async function(id) {
        var unaPersona = await conexion.query(
            "SELECT * FROM persona WHERE id = ?", [id]);
        return unaPersona[0];
    },
    buscarTodasLasPersonas: async function() {
        var listadoPersonas = await conexion.query("SELECT * FROM persona");
        return listadoPersonas;
    },
    modificarPersona: async function(id, edad, mail) {
        var result = await conexion.query(
            "UPDATE persona SET edad = ?, email = ? WHERE id = ?", [edad, email, id]);
        return result.changedRows;
    },
    borrarPersona: async function(id) {
        var fecha = new Date();
        var result = await conexion.query("UPDATE persona SET deleted = ?, date_deleted = ?", [true, fecha]);
        return result.affectedRows;
    },
}