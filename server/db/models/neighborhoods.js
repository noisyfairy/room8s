const Sequelize = require('sequelize')
const db = require('../db')
// abbreviated neighborhood
const Nbhd = db.define('nbhd', {
  name: {
    type: Sequelize.STRING
  },
  borough: {
    type: Sequelize.ENUM('Queens', 'Manhattan', 'SI', 'Brooklyn', 'Bronx')
  },
  coordinates: {
    type: Sequelize.FLOAT
  }
})

module.exports = Nbhd
