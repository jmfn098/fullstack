const express = require('express')

const usersRouter = require('express').Router()
const User = require('../models/user')
usersRouter.get('/',async(req,res)=>{
    const users = await User
    .find({})
    res.json(users)
})
usersRouter.post('/',async(req,res)=>{
    const body = req.body

    const user = new User({
        nombre: body.nombre,
        apellido: body.apellido,
        cedula: body.cedula,
        fechaNac: body.fechaNac,
        sexo: body.sexo,
        dir: {
            calle1: body.calle1,
            calle2: body.calle2,
            nroCasa: body.nroCasa,
            ciudad: body.ciudad,
            pais: body.pais,
            ref: body.ref,
        },
        correo: body.correo,
        tel: body.tel,
        cargo: body.cargo,
        dpto: body.cargo,
        fechaIng: body.fechaIng,
        fechaIngIPS: body.fechaIngIPS,
        fechaSal: body.fechaSal,
        cantHijos: body.cantHijos,
        montoPorHij: body.montoPorHij,
        diasTrab: body.diasTrab,
        vacaciones: body.vacaciones,
        reposo: body.reposo,
        adelSal: body.adelSal,
        cuenta: {
            banco: body.banco,
            cuenta: body.cuenta,
            cuentaDest: body.cuentaDest 
        },
        salarioBruto: body.salarioBruto,
        comisiones: body.comisiones,
        descuentos: body.descuentos,
        salarioACobrar: body.salarioACobrar,
        totalABanco: body.totalABanco
    })
    const savedUser = await user.save()
    res.json(savedUser)
})

module.exports = usersRouter
