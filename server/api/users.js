const router = require('express').Router()
const {User, Questions} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: [
        'id',
        'email',
        'firstName',
        'lastName',
        'sex',
        'age',
        'introvert',
        'guest',
        'tod',
        'googleId'
      ],
      include: [{all: true}]
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id, {
      include: [{model: Questions, where: {userId: req.params.id}}]
    })
    res.json(user)
  } catch (err) {
    next(err)
  }
})

router.put('/:id', async (req, res, next) => {
  try {
    const userInfo = await User.update(
      {
        ...req.body
      },
      {
        where: {
          id: req.params.id
        }
      }
    )
    res.json(userInfo)
  } catch (err) {
    next(err)
  }
})
