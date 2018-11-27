const router = require('express').Router()
const {Favorite} = require('../db/models')
module.exports = router

router.get('/:id', async (req, res, next) => {
  try {
    const answer = await Favorite.findAll({
      where: {
        userId: req.params.id
      }
    })
    res.json(answer)
  } catch (err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const existingUser = await Favorite.findOne({
      where: {
        ...req.body
      }
    })

    if (!existingUser) {
      const answer = await Favorite.create(req.body)
      res.json(answer)
    } else res.json()
  } catch (err) {
    next(err)
  }
})

router.delete('/:id', async (req, res, next) => {
  try {
    const answer = await Favorite.destroy({
      where: {
        userId: req.params.id,
        favoriteId: req.body.favoriteId
      }
    })
    res.json(answer)
  } catch (err) {
    next(err)
  }
})
