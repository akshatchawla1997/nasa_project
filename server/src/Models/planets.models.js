const {parse} = require("csv-parse");
const path = require('path');
const fs = require("fs");
const results = []
const habitablePlanets = [];
function isHabitablePlanet(planet) {
    console.log(planet);
    (planet['koi_disposition'] === 'CONFIRMED')?console.log("true"):console.log("false")
    (planet['koi_insol'] === 'CONFIRMED')?console.log("true"):console.log("false")
    (planet['koi_prad'] === 'CONFIRMED')?console.log("true"):console.log("false")
    return planet['koi_disposition'] === 'CONFIRMED'
      && planet['koi_insol'] > 0.36 || planet['koi_insol'] < 1.11
      || planet['koi_prad'] < 1.6;
  }

function loadPlanetsData() {
    
const Promise = new Promise((resolve,reject)=>{
    fs.createReadStream(path.join(__dirname,'..','..','data', 'kepler_data.csv'))
  .pipe(parse({
    comment: '#',
    columns: true,
  }))
  .on('data', (data) => {
    console.log(data);
    if (isHabitablePlanet(data)) {
      habitablePlanets.push(data);
    }
  })
  .on('error', (err) => {
    console.log(err);
    reject(err)
  })
  .on('end', () => {
    console.log(`${habitablePlanets.length} habitable planets found!`);
    resolve()
  });
})
}
module.exports = {
    planets : habitablePlanets,
    loadPlanetsData:loadPlanetsData
}