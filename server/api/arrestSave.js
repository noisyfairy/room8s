const router = require('express').Router()
const savedData = require('../db/models/arrestSaved')
module.exports = router

router.post('/', (req, res, next) => {
  res.json(req.body)
})

router.get('/', (req, res, next) => {
  res.json(savedData)
})
