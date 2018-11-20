const subwayData = require('../db/models/SubwayStations')
const router = require('express').Router()
module.exports = router

router.get('/', (req, res, next) => {
  const newMap = subwayData.features.map(geo => {
    return geo.geometry.coordinates
  })
  res.send(newMap)
})
