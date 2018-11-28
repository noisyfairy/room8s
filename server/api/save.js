const router = require('express').Router()
module.exports = router
// const violations = require('../db/models/violations')

let data
router.post('/', (req, res, next) => {
  // console.log('req.body', req.body)
  data = req.body
  console.log('WORKING')
  res.json(req.body)
})

router.get('/', (req, res, next) => {
  // console.log(data)
  res.json(data)
  // res.json(violations)
})
