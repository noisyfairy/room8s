const router = require('express').Router()
const axios = require('axios')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const {data} = await axios.get(
      'https://api.yelp.com/v3/businesses/search?limit=50&location=NYC',
      {
        headers: {
          Authorization: `Bearer ${process.env.YELP_TOKEN}`
        }
      }
    )
    console.log(data.businesses.length)
    res.json(
      data.businesses.map(each => {
        return each.coordinates
        // return each
      })
    )
  } catch (err) {
    console.log(err)
  }
})
