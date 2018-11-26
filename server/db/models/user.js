const crypto = require('crypto')
const Sequelize = require('sequelize')
const db = require('../db')

const User = db.define('user', {
  email: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  },
  password: {
    type: Sequelize.STRING,
    // Making `.password` act like a func hides it when serializing to JSON.
    // This is a hack to get around Sequelize's lack of a "private" option.
    get() {
      return () => this.getDataValue('password')
    }
  },
  firstName: {
    type: Sequelize.STRING
  },
  lastName: {
    type: Sequelize.STRING
  },
  duration: {
    type: Sequelize.INTEGER
  },
  sex: {
    type: Sequelize.ENUM('M', 'F')
  },
  age: {
    type: Sequelize.INTEGER
  },
  introvert: {
    type: Sequelize.ENUM('introvert', 'extrovert')
  },
  moveInTime: {
    type: Sequelize.STRING
  },
  // how often do you have guests?
  guest: {
    type: Sequelize.INTEGER
  },
  // time of day
  tod: {
    type: Sequelize.ENUM('Morning', 'Night')
  },
  location: {
    type: Sequelize.STRING,
    defaultValue: ''
  },
  imgUrl: {
    type: Sequelize.STRING,
    defaultValue:
      'https://www.qualiscare.com/wp-content/uploads/2017/08/default-user.png'
  },
  salt: {
    type: Sequelize.STRING,
    // Making `.salt` act like a function hides it when serializing to JSON.
    // This is a hack to get around Sequelize's lack of a "private" option.
    get() {
      return () => this.getDataValue('salt')
    }
  },
  googleId: {
    type: Sequelize.STRING
  }
})

module.exports = User

/**
 * instanceMethods
 */
User.prototype.correctPassword = function(candidatePwd) {
  return User.encryptPassword(candidatePwd, this.salt()) === this.password()
}

/**
 * classMethods
 */
User.generateSalt = function() {
  return crypto.randomBytes(16).toString('base64')
}

User.encryptPassword = function(plainText, salt) {
  return crypto
    .createHash('RSA-SHA256')
    .update(plainText)
    .update(salt)
    .digest('hex')
}

/**
 * hooks
 */
const setSaltAndPassword = user => {
  if (user.changed('password')) {
    user.salt = User.generateSalt()
    user.password = User.encryptPassword(user.password(), user.salt())
  }
}

User.beforeCreate(setSaltAndPassword)
User.beforeUpdate(setSaltAndPassword)
