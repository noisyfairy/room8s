const User = require('./user')
const Nbhd = require('./neighborhoods')
const Questions = require('./questions')
const Favorite = require('./favorite')

/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */

Questions.belongsTo(User)
User.hasOne(Questions)
User.hasMany(Favorite)
Favorite.belongsTo(User)

// User.hasMany(User, {through: 'FavoriteUser'})
// User.hasMany(User, {as: 'FavoriteUser'})
// User.belongsToMany(User, {through: 'BestUser'})

/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */
module.exports = {
  User,
  Questions,
  Nbhd,
  Favorite
}
