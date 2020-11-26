const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    nombre: String,
    apellido: String,
    cedula: String,
    fechaNac: Date,
    sexo: String,
    dir: {
        calle1: String,
        calle2: String,
        nroCasa: String,
        ciudad: String,
        pais: String,
        ref: String
    },
    correo: String,
    tel: String,
    cargo: String,
    dpto: String,
    fechaIng: Date,
    fechaIngIPS: String,
    fechaSal: String,
    cantHijos: String,
    montoPorHij: String,
    diasTrab: Date,
    vacaciones: Date,
    reposo: Date,
    adelSal: String,
    cuenta: {
        banco: String,
        cuenta: String,
        cuentaDest: String
    },
    salarioBruto: String,
    comisiones: String,
    descuentos: String,
    salarioACobrar: String,
    totalABanco: String
})
const User = mongoose.model('User', userSchema)
module.exports = User