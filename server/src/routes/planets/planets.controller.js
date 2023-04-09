const planets = require('../../Models/planets.models')
const getAllPlanets=(req,res)=>{
    return res.status(200).json(planets)
}

module.exports={getAllPlanets};