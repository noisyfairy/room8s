const arrOfFx = []
const testUserList = {
  1: {
    userId: 1,
    firstName: 'chris',
    lastName: 'li',
    introvert: 'introvert',
    sex: 'M',
    age: 23,
    guests: 5,
    tod: 'Morning',
    pref: {
      budgetMin: 501,
      budgetMax: 1000,
      location1: 'Fidi',
      location2: 'Hells kitchen',
      moveInTime: new Date(2018, 11, 24),
      duration: 12,
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
      guests: 5,
      guestsPrior: 5,
      tod: 'Morning',
      todPrior: 1
    }
  },

  2: {
    userId: 2,
    firstName: 'chris',
    lastName: 'li',
    introvert: 'introvert',
    sex: 'M',
    age: 23,
    guests: 5,
    tod: 'Morning',
    pref: {
      budgetMin: 501,
      budgetMax: 1000,
      budgetPrior: 100,
      location1: 'Fidi',
      location2: 'Hells kitchen',
      locationPrior: 100,
      moveInTime: new Date(2018, 11, 24),
      moveInPrior: 100,
      duration: 12,
      duraPrior: 100,
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
      guests: 5,
      guestsPrior: 5,
      tod: 'Morning',
      todPrior: 1
    }
  }
}

const compBudget = (user, roomie) => {
  let matchScore = 0
  let maxScore = 10
  const budget1 = user.pref.budgetMin
  const budget2 = roomie.pref.budgetMin
  if (budget1 === budget2) {
    matchScore = 10
  } else if (Math.abs(budget1 - budget2) === 500) {
    matchScore = 5
  }

  return {
    matchScore: matchScore,
    maxScore: maxScore
  }
}
arrOfFx.push(compBudget)
console.log(compBudget(testUserList[1], testUserList[2]))

const compLocation = (user, roomie) => {
  let matchScore = 0
  let maxScore = 10
  const roomieLoc1 = roomie.pref.location1
  const roomieLoc2 = roomie.pref.location2
  const userLoc1 = user.pref.location1
  const userLoc2 = user.pref.location2
  if (userLoc1 === roomieLoc1) {
    matchScore = 10
  } else if (userLoc1 === roomieLoc2) {
    matchScore = 8
  } else if (userLoc2 === roomieLoc1) {
    matchScore = 7
  } else if (userLoc2 === roomieLoc2) {
    matchScore = 5
  }

  return {
    matchScore: matchScore,
    maxScore: maxScore
  }
}
arrOfFx.push(compLocation)
console.log(compLocation(testUserList[1], testUserList[2]))

const compMonth = (user, roomie) => {
  let matchScore = 0
  let maxScore = 10
  const userDate = user.pref.moveInTime.getDate()
  const userMonth = user.pref.moveInTime.getMonth()
  const roomieDate = roomie.pref.moveInTime.getDate()
  const roomieMonth = roomie.pref.moveInTime.getMonth()

  if (userMonth === roomieMonth) {
    const dateDiff = Math.abs(userDate - roomieDate)
    if (dateDiff <= 7) {
      matchScore = 10
    } else if (dateDiff <= 14) {
      matchScore = 9
    } else if (dateDiff <= 21) {
      matchScore = 8
    } else if (dateDiff <= 28) {
      matchScore = 7
    }
  } else {
    const monthDiff = Math.abs(userMonth - roomieMonth)
    if (monthDiff === 1) {
      matchScore = 6
    } else if (monthDiff === 2) {
      matchScore = 4
    } else if (monthDiff === 3) {
      matchScore = 3
    }
  }

  return {
    matchScore: matchScore,
    maxScore: maxScore
  }
}
arrOfFx.push(compMonth)
console.log(compMonth(testUserList[1], testUserList[2]))

const compDuration = (user, roomie) => {
  let matchScore = 0
  let maxScore = 10
  const userDura = user.pref.duration
  const roomieDura = roomie.pref.duration
  const duraDiff = Math.abs(userDura - roomieDura)

  if (duraDiff === 0) {
    matchScore = 10
  } else if (duraDiff === 1) {
    matchScore = 8
  } else if (duraDiff === 2) {
    matchScore = 6
  } else if (duraDiff === 3) {
    matchScore = 4
  }

  return {
    matchScore: matchScore,
    maxScore: maxScore
  }
}
arrOfFx.push(compDuration)
console.log(compDuration(testUserList[1], testUserList[2]))

const compPet = (user, roomie) => {
  let matchScore = 0
  let maxScore = user.pref.petPrior
  if (user.pref.pet === roomie.pref.pet) {
    matchScore = maxScore
  }

  return {
    matchScore: matchScore,
    maxScore: maxScore
  }
}
arrOfFx.push(compPet)
console.log(compPet(testUserList[1], testUserList[2]))

const compSmoke = (user, roomie) => {
  let matchScore = 0
  let maxScore = user.pref.smokePrior
  if (user.pref.smoke === roomie.pref.smoke) {
    matchScore = maxScore
  }

  return {
    matchScore: matchScore,
    maxScore: maxScore
  }
}
arrOfFx.push(compSmoke)
console.log(compSmoke(testUserList[1], testUserList[2]))

const compInOut = (user, roomie) => {
  let matchScore = 0
  let maxScore = user.pref.introPrior
  if (user.pref.introvert === roomie.introvert) {
    matchScore = maxScore
  }

  return {
    matchScore: matchScore,
    maxScore: maxScore
  }
}
arrOfFx.push(compInOut)
console.log(compInOut(testUserList[1], testUserList[2]))

const compSex = (user, roomie) => {
  let matchScore = 0
  let maxScore = user.pref.sexPrior
  if (user.pref.sex === roomie.sex) {
    matchScore = maxScore
  }

  return {
    matchScore: matchScore,
    maxScore: maxScore
  }
}
arrOfFx.push(compSex)
console.log(compSex(testUserList[1], testUserList[2]))

const compAge = (user, roomie) => {
  let matchScore = 0
  let maxScore = user.pref.agePrior
  const userAgeMin = user.pref.ageMin
  const userAgeMax = user.pref.ageMax
  const ageDiffmin = userAgeMin - roomie.age
  const ageDiffmax = roomie.age - userAgeMax

  if (userAgeMin <= roomie.age && userAgeMax >= roomie.age) {
    matchScore = maxScore
  } else if (ageDiffmin === -1 || ageDiffmax === 1) {
    matchScore = maxScore * 0.9
  } else if (ageDiffmin === -2 || ageDiffmax === 2) {
    matchScore = maxScore * 0.7
  } else if (ageDiffmin === -3 || ageDiffmax === 3) {
    matchScore = maxScore * 0.5
  } else if (ageDiffmin === -4 || ageDiffmax === 4) {
    matchScore = maxScore * 0.4
  } else if (ageDiffmin === -5 || ageDiffmax === 5) {
    matchScore = maxScore * 0.3
  }

  return {
    matchScore: matchScore,
    maxScore: maxScore
  }
}
arrOfFx.push(compAge)
console.log(compAge(testUserList[1], testUserList[2]))

const compClean = (user, roomie) => {
  let matchScore = 0
  let maxScore = user.pref.cleanPrior
  const cleanDiff = Math.abs(user.pref.clean - roomie.pref.clean)
  if (cleanDiff === 0) {
    matchScore = maxScore
  } else if (cleanDiff === 1) {
    matchScore = maxScore * 0.8
  } else if (cleanDiff === 2) {
    matchScore = maxScore * 0.6
  } else if (cleanDiff === 3) {
    matchScore = maxScore * 0.4
  } else if (cleanDiff === 4) {
    matchScore = maxScore * 0.2
  }

  return {
    matchScore: matchScore,
    maxScore: maxScore
  }
}
arrOfFx.push(compClean)
console.log(compClean(testUserList[1], testUserList[2]))

const compGuests = (user, roomie) => {
  let maxScore = user.pref.guestsPrior
  const guestDiff = Math.abs(user.pref.guests - roomie.pref.guests)
  if (guestDiff === 0) {
    matchScore = maxScore
  } else if (guestDiff === 1) {
    matchScore = maxScore * 0.8
  } else if (guestDiff === 2) {
    matchScore = maxScore * 0.6
  } else if (guestDiff === 3) {
    matchScore = maxScore * 0.4
  } else if (guestDiff === 4) {
    matchScore = maxScore * 0.2
  }

  return {
    matchScore: matchScore,
    maxScore: maxScore
  }
}
arrOfFx.push(compGuests)
console.log(compGuests(testUserList[1], testUserList[2]))

const compMOrN = (user, roomie) => {
  let matchScore = 0
  let maxScore = user.pref.todPrior
  if (user.pref.tod === roomie.tod) {
    matchScore = maxScore
  }

  return {
    matchScore: matchScore,
    maxScore: maxScore
  }
}
arrOfFx.push(compMOrN)
console.log(compMOrN(testUserList[1], testUserList[2]))

const matchingalgo = (user, roomie, fxArr) => {
  let matchScore = 0
  let maxScore = 0

  fxArr.map(func => {
    const results = func(user, roomie)
    matchScore += results.matchScore
    maxScore += results.maxScore
  })
  return matchScore / maxScore
}

const matchRoommate = (userlist, userId) => {
  let results = {}
  const userKeys = Object.keys(userlist)
  userKeys.splice(userKeys.indexOf(`${userId}`), 1)
  userKeys.map(userKey => {
    const roomie = userlist[userKey]
    results[roomie.userId] = matchingalgo(userlist[userId], roomie, arrOfFx)
  })
  return results
}

console.log(matchRoommate(testUserList, 1))
