const Sequelize = require('sequelize')
const db = require('../db')

const Questions = db.define('questions', {
  budgetMin: {
    type: Sequelize.INTEGER,
    defaultValue: 1501
  },
  budgetMax: {
    type: Sequelize.INTEGER,
    defaultValue: 2000
  },
  budgetPrior: {
    type: Sequelize.INTEGER,
    defaultValue: 3
  },
  locationPrior: {
    type: Sequelize.INTEGER,
    defaultValue: 3
  },
  // can change this to integer/string or whatever

  moveInPrior: {
    type: Sequelize.INTEGER,
    defaultValue: 3
  },
  duraPrior: {
    type: Sequelize.INTEGER,
    defaultValue: 3
  },
  pet: {
    type: Sequelize.BOOLEAN,
    defaultValue: true
  },
  petPrior: {
    type: Sequelize.INTEGER,
    defaultValue: 3
  },
  smoke: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },
  smokePrior: {
    type: Sequelize.INTEGER,
    defaultValue: 3
  },
  introvert: {
    type: Sequelize.ENUM('introvert', 'extrovert'),
    defaultValue: 'extrovert'
  },
  introPrior: {
    type: Sequelize.INTEGER,
    defaultValue: 3
  },
  sex: {
    type: Sequelize.ENUM('M', 'F'),
    defaultValue: 'M'
  },
  sexPrior: {
    type: Sequelize.INTEGER,
    defaultValue: 3
  },
  ageMin: {
    type: Sequelize.INTEGER,
    defaultValue: 21
  },
  ageMax: {
    type: Sequelize.INTEGER,
    defaultValue: 25
  },
  agePrior: {
    type: Sequelize.INTEGER,
    defaultValue: 3
  },
  clean: {
    type: Sequelize.INTEGER,
    defaultValue: 3
  },
  cleanPrior: {
    type: Sequelize.INTEGER,
    defaultValue: 3
  },
  // how often you have guests
  guest: {
    type: Sequelize.INTEGER,
    defaultValue: 3
  },
  guestPrior: {
    type: Sequelize.INTEGER,
    defaultValue: 3
  },
  tod: {
    type: Sequelize.ENUM('Morning', 'Night'),
    defaultValue: 'Morning'
  },
  todPrior: {
    type: Sequelize.INTEGER,
    defaultValue: 3
  }
})

module.exports = Questions
