const express = require('express')
const usersRouter = require('./controllers/users')
const mongoose = require('mongoose')

const url = 'mongodb+srv://jmfn098:Paraguay.1@cluster0.2p271.mongodb.net/5dias?retryWrites=true&w=majority'
const app = express()

mongoose.connect(url,{useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true})
    .then(result =>{
        console.log('succesfully connected to mongoDB');
    }).catch(error=>{
        console.log('error connecting to MongoDB: ',error.message)
    })



app.use(express.json())
app.use('/users',usersRouter)

module.exports =  app