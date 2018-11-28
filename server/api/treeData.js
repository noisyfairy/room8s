const router = require('express').Router()
module.exports = router
const treeData = require('../db/models/treeData')

router.get('/', (req, res, next) => {
  res.json(treeData)
})
