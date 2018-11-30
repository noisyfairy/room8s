'use strict'

const db = require('../server/db')
const {User} = require('../server/db/models')
const {Questions} = require('../server/db/models')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const users = await Promise.all([
    User.create({
      email: 'Tom.Hanks@gmail.com',
      password: '123',
      firstName: 'Tom',
      lastName: 'Hanks',
      introvert: 'extrovert',
      sex: 'M',
      age: 40,
      guest: 5,
      tod: 'Night',
      location: 'Midtown',
      moveInTime: '2018-12-02',
      duration: 11,
      imgUrl:
        'https://m.media-amazon.com/images/M/MV5BMTQ2MjMwNDA3Nl5BMl5BanBnXkFtZTcwMTA2NDY3NQ@@._V1_.jpg'
    }),

    User.create({
      email: 'Washing.Den@gmail.com',
      password: '123',
      firstName: 'Denzel ',
      lastName: 'Washington',
      introvert: 'introvert',
      sex: 'M',
      age: 33,
      guest: 3,
      tod: 'Morning',
      location: 'Long Island City',
      moveInTime: '2018-11-02',
      duration: 12,
      imgUrl:
        'https://www.biography.com/.image/t_share/MTE1ODA0OTcxODE3OTI4MjA1/denzel-washington-9524687-2-402.jpg'
    }),

    User.create({
      email: 'Emma.Stone@gmail.com',
      password: '123',
      firstName: 'Emma',
      lastName: 'Stone',
      introvert: 'extrovert',
      sex: 'F',
      age: 26,
      guest: 3,
      tod: 'Night',
      location: 'Financial District',
      moveInTime: '2018-12-15',
      duration: 10,
      imgUrl:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fd/Emma_Stone_2014.jpg/220px-Emma_Stone_2014.jpg'
    }),
    User.create({
      email: 'The.Will.Smith@gmail.com',
      password: '123',
      firstName: 'Will',
      lastName: 'Smith',
      introvert: 'extrovert',
      sex: 'M',
      age: 35,
      guest: 4,
      tod: 'Morning',
      location: 'Upper East Side',
      moveInTime: '2018-12-02',
      duration: 11,
      imgUrl:
        'https://m.media-amazon.com/images/M/MV5BNTczMzk1MjU1MV5BMl5BanBnXkFtZTcwNDk2MzAyMg@@._V1_UY317_CR2,0,214,317_AL_.jpg'
    }),
    User.create({
      email: 'Jenn.Law@gmail.com',
      password: '123',
      firstName: 'Jennifer ',
      lastName: 'Lawrence',
      introvert: 'introvert',
      sex: 'F',
      age: 25,
      guest: 1,
      tod: 'Morning',
      location: 'Flushing',
      moveInTime: '2018-12-02',
      duration: 11,
      imgUrl:
        'https://www.biography.com/.image/ar_1:1%2Cc_fill%2Ccs_srgb%2Cg_face%2Cq_auto:good%2Cw_300/MTQzMjgyNDgwNjIxODIzNTU5/jennifer-lawrence_gettyimages-626382596jpg.jpg'
    }),
    User.create({
      email: 'Black.Widow@gmail.com',
      password: '123',
      firstName: 'Scarlett',
      lastName: 'Johansson',
      introvert: 'extrovert',
      sex: 'F',
      age: 31,
      guest: 4,
      tod: 'Morning',
      location: 'Soho',
      moveInTime: '2018-11-06',
      duration: 9,
      imgUrl:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Goldene_Kamera_2012_-_Scarlett_Johansson_3_%28cropped%29.JPG/170px-Goldene_Kamera_2012_-_Scarlett_Johansson_3_%28cropped%29.JPG'
    }),
    User.create({
      email: 'Natalie.Portman@gmail.com',
      password: '123',
      firstName: 'Natalie',
      lastName: 'Portman',
      introvert: 'introvert',
      sex: 'F',
      age: 23,
      guest: 3,
      tod: 'Morning',
      location: 'Noho',
      moveInTime: '2019-01-02',
      duration: 10,
      imgUrl:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Natalie_Portman_Cannes_2015_5_%28cropped%29.jpg/220px-Natalie_Portman_Cannes_2015_5_%28cropped%29.jpg'
    }),
    User.create({
      email: 'TCruise@gmail.com',
      password: '123',
      firstName: 'Tom',
      lastName: 'Cruise',
      introvert: 'introvert',
      sex: 'M',
      age: 28,
      guest: 2,
      tod: 'Morning',
      location: 'Harlem',
      moveInTime: '2018-11-29',
      duration: 12,
      imgUrl:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Tom_Cruise_by_Gage_Skidmore.jpg/220px-Tom_Cruise_by_Gage_Skidmore.jpg'
    }),
    User.create({
      email: 'The.Marian@gmail.com',
      password: '123',
      firstName: 'Matt',
      lastName: 'Damon',
      introvert: 'extrovert',
      sex: 'M',
      age: 23,
      guest: 5,
      tod: 'Morning',
      location: 'Chelsea',
      moveInTime: '2018-12-05',
      duration: 10,
      imgUrl:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Matt_Damon_TIFF_2015.jpg/220px-Matt_Damon_TIFF_2015.jpg'
    }),
    User.create({
      email: 'Dominick.Cobb@gmail.com',
      password: '123',
      firstName: 'Leonardo',
      lastName: 'DiCaprio',
      introvert: 'extrovert',
      sex: 'M',
      age: 29,
      guest: 5,
      tod: 'Night',
      location: 'Gramercy Park',
      moveInTime: '2018-12-07',
      duration: 12,
      imgUrl:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Leonardo_DiCaprio_January_2014.jpg/212px-Leonardo_DiCaprio_January_2014.jpg'
    })
  ])

  const questions = await Promise.all([
    Questions.create({
      userId: 1,
      budgetMin: 501,
      budgetMax: 1000,
      budgetPrior: 3,
      locationPrior: 4,
      moveInPrior: 4,
      duraPrior: 2,
      pet: false,
      petPrior: 3,
      smoke: true,
      smokePrior: 3,
      introvert: 'extrovert',
      introPrior: 4,
      sex: 'M',
      sexPrior: 3,
      ageMin: 21,
      ageMax: 25,
      agePrior: 4,
      clean: 3,
      cleanPrior: 5,
      guest: 5,
      guestPrior: 2,
      tod: 'Night',
      todPrior: 3
    }),
    Questions.create({
      userId: 2,
      budgetMin: 1001,
      budgetMax: 1500,
      budgetPrior: 4,
      locationPrior: 2,
      moveInPrior: 4,
      duraPrior: 5,
      pet: false,
      petPrior: 4,
      smoke: false,
      smokePrior: 3,
      introvert: 'introvert',
      introPrior: 3,
      sex: 'M',
      sexPrior: 5,
      ageMin: 21,
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
      budgetMin: 1501,
      budgetMax: 2000,
      budgetPrior: 5,
      locationPrior: 5,
      moveInPrior: 2,
      duraPrior: 2,
      pet: true,
      petPrior: 4,
      smoke: false,
      smokePrior: 3,
      introvert: 'introvert',
      introPrior: 3,
      sex: 'F',
      sexPrior: 5,
      ageMin: 31,
      ageMax: 35,
      agePrior: 3,
      clean: 5,
      cleanPrior: 3,
      guest: 4,
      guestPrior: 3,
      tod: 'Morning',
      todPrior: 4
    }),
    Questions.create({
      userId: 4,
      budgetMin: 2001,
      budgetMax: 2500,
      budgetPrior: 1,
      locationPrior: 5,
      moveInPrior: 1,
      duraPrior: 1,
      pet: true,
      petPrior: 5,
      smoke: false,
      smokePrior: 3,
      introvert: 'extrovert',
      introPrior: 1,
      sex: 'M',
      sexPrior: 1,
      ageMin: 26,
      ageMax: 30,
      agePrior: 1,
      clean: 4,
      cleanPrior: 4,
      guest: 3,
      guestPrior: 3,
      tod: 'Morning',
      todPrior: 3
    }),
    Questions.create({
      userId: 5,
      budgetMin: 2001,
      budgetMax: 2500,
      budgetPrior: 2,
      locationPrior: 3,
      moveInPrior: 3,
      duraPrior: 1,
      pet: true,
      petPrior: 5,
      smoke: false,
      smokePrior: 5,
      introvert: 'introvert',
      introPrior: 1,
      sex: 'F',
      sexPrior: 1,
      ageMin: 21,
      ageMax: 25,
      agePrior: 1,
      clean: 4,
      cleanPrior: 4,
      guest: 3,
      guestPrior: 3,
      tod: 'Morning',
      todPrior: 3
    }),
    Questions.create({
      userId: 6,
      budgetMin: 1001,
      budgetMax: 1500,
      budgetPrior: 2,
      locationPrior: 3,
      moveInPrior: 3,
      duraPrior: 1,
      pet: true,
      petPrior: 5,
      smoke: false,
      smokePrior: 5,
      introvert: 'introvert',
      introPrior: 1,
      sex: 'F',
      sexPrior: 1,
      ageMin: 21,
      ageMax: 25,
      agePrior: 1,
      clean: 4,
      cleanPrior: 4,
      guest: 3,
      guestPrior: 3,
      tod: 'Morning',
      todPrior: 3
    }),
    Questions.create({
      userId: 7,
      budgetMin: 501,
      budgetMax: 1000,
      budgetPrior: 5,
      locationPrior: 2,
      moveInPrior: 3,
      duraPrior: 5,
      pet: false,
      petPrior: 2,
      smoke: true,
      smokePrior: 4,
      introvert: 'introvert',
      introPrior: 1,
      sex: 'F',
      sexPrior: 5,
      ageMin: 31,
      ageMax: 35,
      agePrior: 1,
      clean: 3,
      cleanPrior: 4,
      guest: 2,
      guestPrior: 3,
      tod: 'Morning',
      todPrior: 3
    }),
    Questions.create({
      userId: 8,
      budgetMin: 1001,
      budgetMax: 1500,
      budgetPrior: 3,
      locationPrior: 4,
      moveInPrior: 2,
      duraPrior: 2,
      pet: false,
      petPrior: 4,
      smoke: false,
      smokePrior: 5,
      introvert: 'introvert',
      introPrior: 1,
      sex: 'F',
      sexPrior: 1,
      ageMin: 36,
      ageMax: 40,
      agePrior: 2,
      clean: 2,
      cleanPrior: 3,
      guest: 2,
      guestPrior: 5,
      tod: 'Morning',
      todPrior: 3
    }),
    Questions.create({
      userId: 9,
      budgetMin: 2501,
      budgetMax: 3000,
      budgetPrior: 1,
      locationPrior: 5,
      moveInPrior: 1,
      duraPrior: 5,
      pet: true,
      petPrior: 2,
      smoke: false,
      smokePrior: 3,
      introvert: 'extrovert',
      introPrior: 5,
      sex: 'M',
      sexPrior: 3,
      ageMin: 26,
      ageMax: 30,
      agePrior: 3,
      clean: 2,
      cleanPrior: 5,
      guest: 3,
      guestPrior: 3,
      tod: 'Morning',
      todPrior: 2
    }),
    Questions.create({
      userId: 10,
      budgetMin: 1501,
      budgetMax: 2000,
      budgetPrior: 2,
      locationPrior: 4,
      moveInPrior: 4,
      duraPrior: 3,
      pet: true,
      petPrior: 1,
      smoke: false,
      smokePrior: 5,
      introvert: 'introvert',
      introPrior: 1,
      sex: 'F',
      sexPrior: 4,
      ageMin: 21,
      ageMax: 25,
      agePrior: 1,
      clean: 5,
      cleanPrior: 5,
      guest: 2,
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
