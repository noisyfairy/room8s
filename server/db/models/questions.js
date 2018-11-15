const Sequelize = require('sequelize')
const db = require('../db')

const Questions = db.define('questions', {
  budgetMin: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  budgetMax: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  location1: {
    type: Sequelize.STRING
  },
  location2: {
    type: Sequelize.STRING
  },
  // can change this to integer/string or whatever
  moveInTime: {
    type: Sequelize.DATE
  },
  duration: {
    type: Sequelize.STRING
  },
  pet: {
    type: Sequelize.BOOLEAN
  },
  smoke: {
    type: Sequelize.BOOLEAN
  },
  introvert: {
    type: Sequelize.STRING
  },
  sex: {
    type: Sequelize.ENUM('M', 'F')
  },
  ageMin: {
    type: Sequelize.INTEGER
  },
  ageMax: {
    type: Sequelize.INTEGER
  },
  clean: {
    type: Sequelize.INTEGER
  },
  // how often you have guests
  guest: {
    type: Sequelize.STRING
  },
  tod: {
    type: Sequelize.STRING
  }
})

module.exports = Questions
