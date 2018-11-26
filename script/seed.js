'use strict'

const db = require('../server/db')
const {User} = require('../server/db/models')
const {Questions} = require('../server/db/models')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const users = await Promise.all([
    User.create({
      email: 'cody@email.com',
      password: '123',
      firstName: 'chris',
      lastName: 'li',
      introvert: 'introvert',
      sex: 'M',
      age: 23,
      guest: 5,
      tod: 'Morning',
      location: 'Chelsea',
      moveInTime: '2018-12-02',
      duration: 12
    }),

    User.create({
      email: 'cody1@email.com',
      password: '123',
      firstName: 'chris',
      lastName: 'li',
      introvert: 'introvert',
      sex: 'M',
      age: 23,
      guest: 5,
      tod: 'Morning',
      location: 'Chelsea',
      moveInTime: '2018-12-02',
      duration: 12
    }),

    User.create({
      email: 'cody2@email.com',
      password: '123',
      firstName: 'chris',
      lastName: 'li',
      introvert: 'introvert',
      sex: 'M',
      age: 23,
      guest: 5,
      tod: 'Morning',
      location: 'Chelsea',
      moveInTime: '2018-12-02',
      duration: 12
    }),
    User.create({
      email: 'cody3@email.com',
      password: '123',
      firstName: 'chris',
      lastName: 'li',
      introvert: 'introvert',
      sex: 'M',
      age: 23,
      guest: 5,
      tod: 'Morning',
      location: 'Chelsea',
      moveInTime: '2018-12-02',
      duration: 12
    })
  ])

  const questions = await Promise.all([
    Questions.create({
      userId: 1,
      budgetMin: 501,
      budgetMax: 1000,
      budgetPrior: 5,
      locationPrior: 5,
      moveInPrior: 5,
      duraPrior: 5,
      pet: false,
      petPrior: 4,
      smoke: false,
      smokePrior: 3,
      introvert: 'introvert',
      introPrior: 3,
      sex: 'M',
      sexPrior: 5,
      ageMin: 20,
      ageMax: 25,
      agePrior: 4,
      clean: 4,
      cleanPrior: 5,
      guest: 5,
      guestPrior: 5,
      tod: 'Morning',
      todPrior: 1
    }),
    Questions.create({
      userId: 2,
      budgetMin: 501,
      budgetMax: 1000,
      budgetPrior: 5,
      locationPrior: 5,
      moveInPrior: 5,
      duraPrior: 5,
      pet: false,
      petPrior: 4,
      smoke: false,
      smokePrior: 3,
      introvert: 'introvert',
      introPrior: 3,
      sex: 'M',
      sexPrior: 5,
      ageMin: 20,
      ageMax: 25,
      agePrior: 4,
      clean: 4,
      cleanPrior: 5,
      guest: 5,
      guestPrior: 5,
      tod: 'Morning',
      todPrior: 1
    }),
    Questions.create({
      userId: 3,
      budgetMin: 501,
      budgetMax: 1000,
      budgetPrior: 5,
      locationPrior: 5,
      moveInPrior: 5,
      duraPrior: 5,
      pet: false,
      petPrior: 4,
      smoke: false,
      smokePrior: 3,
      introvert: 'introvert',
      introPrior: 3,
      sex: 'M',
      sexPrior: 5,
      ageMin: 20,
      ageMax: 25,
      agePrior: 4,
      clean: 4,
      cleanPrior: 5,
      guest: 5,
      guestPrior: 5,
      tod: 'Morning',
      todPrior: 1
    }),
    Questions.create({
      userId: 4,
      budgetMin: 501,
      budgetMax: 1000,
      budgetPrior: 5,
      locationPrior: 5,
      moveInPrior: 5,
      duraPrior: 5,
      pet: false,
      petPrior: 4,
      smoke: false,
      smokePrior: 3,
      introvert: 'introvert',
      introPrior: 3,
      sex: 'M',
      sexPrior: 5,
      ageMin: 20,
      ageMax: 25,
      agePrior: 4,
      clean: 4,
      cleanPrior: 5,
      guest: 5,
      guestPrior: 5,
      tod: 'Morning',
      todPrior: 1
    })
  ])

  console.log(`seeded ${users.length} users`)
  console.log(`seeded ${questions.length} questions`)
  console.log(`seeded successfully`)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
