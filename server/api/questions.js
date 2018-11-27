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
      where: {userId: req.params.id}
    })
    res.json(answer)
  } catch (err) {
    next(err)
  }
})

router.put('/:id', async (req, res, next) => {
  try {
    const answer = await Questions.findOrCreate({
      where: {userId: req.params.id},
      defaults: {
        ...req.body
      }
    })

    if (!answer[1]) {
      const updatedAnswers = await Questions.update(
        {...req.body},
        {
          where: {
            userId: req.params.id
          }
        }
      )
    }

    res.json(answer)
  } catch (err) {
    next(err)
  }
})
