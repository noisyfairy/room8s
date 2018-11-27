const Sequelize = require('sequelize')
const db = require('../db')

const Favorite = db.define('favorite', {
  favoriteId: {
    type: Sequelize.INTEGER
  }
})

module.exports = Favorite
