const router = require('express').Router()
module.exports = router

router.use('/users', require('./users'))
router.use('/questions', require('./questions'))
router.use('/subway', require('./subwayStations'))
router.use('/favorite', require('./favorite'))
router.use('/arrestSave', require('./arrestSave'))
router.use('/housingViolations', require('./violations'))
router.use('/save', require('./save'))

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})
