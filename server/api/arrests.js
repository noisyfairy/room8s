const router = require('express').Router()
const arrestData = require('../db/models/arrestdata')
// const d3 = require('d3')
// const nycmap = require('../nycmap.json')
// const axios = require('axios')
// const inside = require('point-in-polygon')
module.exports = router

router.get('/', (req, res, next) => {
  const coords = arrestData.map(obj => {
    return [obj.longitude, obj.latitude]
  })
  // coords.map(coord => {
  //   d3.json(nycmap, mapData => {
  //     console.log(mapData)
  //     for (let loc of mapData.features) {
  //       if (inside(coord, loc.geometry.coordinates[0])) {
  //         loc.properties.score++
  //         // break
  //       }
  //     }
  //     res.send(mapData)
  //   })
  // })
  res.send(coords)
})

// router.post('/', (req, res, next) => {
//   res.send(req.body)
// })
