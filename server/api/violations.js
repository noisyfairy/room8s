const router = require('express').Router()
module.exports = router
const violations = require('../db/models/violations')

router.get('/', (req, res, next) => {
  res.json(violations)
})
