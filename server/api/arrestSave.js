const router = require('express').Router()
module.exports = router

router.post('/', (req, res, next) => {
  res.json(req.body)
})

// router.get('/',(req,res,next)=>{
//   res.json()
// })
