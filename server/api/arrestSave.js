const router = require('express').Router()
const savedData = require('../db/models/arrestSaved')
module.exports = router

router.get('/', (req, res, next) => {
  res.json(savedData)
})
