const http = require('http')
const express = require('express');
const app = require('./app')
const planetsmodel = require('./Models/planets.models')

const PORT = process.env.PORT || 8080;
const server = http.createServer(app)
async function startServer(){
    await planetsmodel.loadPlanetsData;
    app.listen(PORT,()=>{
        console.log(`listening on port number ${PORT}`)
    })
}
startServer();