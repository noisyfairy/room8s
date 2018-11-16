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
  budgetPrior: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  location1: {
    type: Sequelize.STRING
  },
  location2: {
    type: Sequelize.STRING
  },
  locationPrior: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  // can change this to integer/string or whatever
  moveInTime: {
    type: Sequelize.DATE
  },
  moveInPrior: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  duration: {
    type: Sequelize.INTEGER
  },
  duraPrior: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  pet: {
    type: Sequelize.BOOLEAN
  },
  petPrior: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  smoke: {
    type: Sequelize.BOOLEAN
  },
  smokePrior: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  introvert: {
    type: Sequelize.STRING
  },
  introPrior: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  sex: {
    type: Sequelize.ENUM('M', 'F')
  },
  sexPrior: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  ageMin: {
    type: Sequelize.INTEGER
  },
  ageMax: {
    type: Sequelize.INTEGER
  },
  agePrior: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  clean: {
    type: Sequelize.INTEGER
  },
  cleanPrior: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  // how often you have guests
  guest: {
    type: Sequelize.STRING
  },
  guestPrior: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  tod: {
    type: Sequelize.STRING
  },
  todPrior: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
})

module.exports = Questions
