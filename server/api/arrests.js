const router = require('express').Router()
const arrestData = require('../db/models/arrestdata')
module.exports = router

router.get('/', (req, res, next) => {
  const data = arrestData.map(obj => {
    return [obj.longitude, obj.latitude]
  })
  res.send(data)
})
