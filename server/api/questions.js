const router = require('express').Router()
const {Questions} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const answer = await Questions.findAll()
    res.json(answer)
  } catch (err) {
    next(err)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const answer = await Questions.findOne({
      where: {
        userId: req.params.id
      }
    })
    res.json(answer)
  } catch (err) {
    next(err)
  }
})

router.post('/:id', async (req, res, next) => {
  try {
    const answer = await Questions.create(req.body)
    res.json(answer)
  } catch (err) {
    next(err)
  }
})
