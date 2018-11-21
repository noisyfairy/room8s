import Axios from 'axios'
import React from 'react'
import {getMatchUsers} from '../store'
import {connect} from 'react-redux'

class Algo extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      bestMatch: 0,
      top3: []
    }
  }

  componentDidMount() {
    this.bestmatches(this.props.id)
  }

  compBudget = (user, roomie) => {
    let matchScore = 0
    let maxScore = 10
    console.log(user)
    console.log(roomie)
    const budget1 = user.question.budgetMin
    const budget2 = roomie.question.budgetMin
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

  compLocation = (user, roomie) => {
    let matchScore = 0
    let maxScore = 10
    const roomieLoc1 = roomie.question.location1
    const roomieLoc2 = roomie.question.location2
    const userLoc1 = user.question.location1
    const userLoc2 = user.question.location2
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

  // compMonth = (user, roomie) => {
  //   let matchScore = 0
  //   let maxScore = 10
  //   const userDate = user.question.moveInTime.getDate()
  //   const userMonth = user.question.moveInTime.getMonth()
  //   const roomieDate = roomie.question.moveInTime.getDate()
  //   const roomieMonth = roomie.question.moveInTime.getMonth()

  //   if (userMonth === roomieMonth) {
  //     const dateDiff = Math.abs(userDate - roomieDate)
  //     if (dateDiff <= 7) {
  //       matchScore = 10
  //     } else if (dateDiff <= 14) {
  //       matchScore = 9
  //     } else if (dateDiff <= 21) {
  //       matchScore = 8
  //     } else if (dateDiff <= 28) {
  //       matchScore = 7
  //     }
  //   } else {
  //     const monthDiff = Math.abs(userMonth - roomieMonth)
  //     if (monthDiff === 1) {
  //       matchScore = 6
  //     } else if (monthDiff === 2) {
  //       matchScore = 4
  //     } else if (monthDiff === 3) {
  //       matchScore = 3
  //     }
  //   }

  //   return {
  //     matchScore: matchScore,
  //     maxScore: maxScore
  //   }
  // }

  compDuration = (user, roomie) => {
    let matchScore = 0
    let maxScore = 10
    const userDura = user.question.duration
    const roomieDura = roomie.question.duration
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

  compPet = (user, roomie) => {
    let matchScore = 0
    let maxScore = Number(user.question.petPrior)
    if (user.question.pet === roomie.question.pet) {
      matchScore = maxScore
    }

    return {
      matchScore: matchScore,
      maxScore: maxScore
    }
  }

  compSmoke = (user, roomie) => {
    let matchScore = 0
    let maxScore = user.question.smokePrior
    if (user.question.smoke === roomie.question.smoke) {
      matchScore = maxScore
    }

    return {
      matchScore: matchScore,
      maxScore: maxScore
    }
  }

  compInOut = (user, roomie) => {
    let matchScore = 0
    let maxScore = user.question.introPrior
    if (user.question.introvert === roomie.introvert) {
      matchScore = maxScore
    }

    return {
      matchScore: matchScore,
      maxScore: maxScore
    }
  }

  compSex = (user, roomie) => {
    let matchScore = 0
    let maxScore = user.question.sexPrior
    if (user.question.sex === roomie.sex) {
      matchScore = maxScore
    }

    return {
      matchScore: matchScore,
      maxScore: maxScore
    }
  }

  compAge = (user, roomie) => {
    let matchScore = 0
    let maxScore = user.question.agePrior
    const userAgeMin = user.question.ageMin
    const userAgeMax = user.question.ageMax
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

  compClean = (user, roomie) => {
    let matchScore = 0
    let maxScore = user.question.cleanPrior
    const cleanDiff = Math.abs(user.question.clean - roomie.question.clean)
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

  compGuests = (user, roomie) => {
    let matchScore = 0
    let maxScore = user.question.guestPrior
    const guestDiff = Math.abs(user.question.guests - roomie.question.guests)
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

  compMOrN = (user, roomie) => {
    let matchScore = 0
    let maxScore = user.question.todPrior
    if (user.question.tod === roomie.tod) {
      matchScore = maxScore
    }

    return {
      matchScore: matchScore,
      maxScore: maxScore
    }
  }

  allCompFx = () => {
    let arrOfFx = []
    arrOfFx.push(this.compBudget)
    arrOfFx.push(this.compLocation)
    // arrOfFx.push(this.compMonth())
    arrOfFx.push(this.compDuration)
    arrOfFx.push(this.compPet)
    arrOfFx.push(this.compSmoke)
    arrOfFx.push(this.compInOut)
    arrOfFx.push(this.compSex)
    arrOfFx.push(this.compAge)
    arrOfFx.push(this.compClean)
    arrOfFx.push(this.compGuests)
    arrOfFx.push(this.compMOrN)
    return arrOfFx
  }

  matchingalgo = (user, roomie, fxArr) => {
    let matchScore = 0
    let maxScore = 0
    fxArr.map(func => {
      const results = func(user, roomie)
      matchScore += results.matchScore
      maxScore += results.maxScore
    })

    return Number(matchScore / maxScore)
  }

  matchRoommate = (userlist, userId) => {
    let results = {}
    userlist.map(user => {
      if (user.id !== userId) {
        console.log('running algo')
        results[user.id] = this.matchingalgo(
          userlist[userId - 1],
          user,
          this.allCompFx()
        )
      }
    })
    return results
  }

  bestmatches = async userId => {
    let top3results = {}
    let bestResultId = 0
    let bestResuiltScore = 0

    const userListData = await Axios.get('./api/users')
    const userList = userListData.data
    const userInfoData = await Axios.get(`./api/users/${userId}`)
    const userInfo = userInfoData.data

    const userMatchScores = this.matchRoommate(userList, userId)

    const sortedMatchScores = Object.values(userMatchScores)
    sortedMatchScores.sort((a, b) => {
      if (a > b) return -1
      if (a < b) return 1
      return 0
    })

    const matchScoreKeys = Object.keys(userMatchScores)
    matchScoreKeys.map(roomieId => {
      if (userMatchScores[roomieId] === sortedMatchScores[0]) {
        top3results[roomieId] = sortedMatchScores[0]
      } else if (userMatchScores[roomieId] === sortedMatchScores[1]) {
        top3results[roomieId] = sortedMatchScores[1]
      } else if (userMatchScores[roomieId] === sortedMatchScores[2]) {
        top3results[roomieId] = sortedMatchScores[2]
      }
    })

    const top3roomieId = Object.keys(top3results)

    const counterMatch1 = this.matchingalgo(
      userList[top3roomieId[0] - 1],
      userInfo,
      this.allCompFx()
    )

    top3results[top3roomieId[0]] =
      (top3results[top3roomieId[0]] + counterMatch1) / 2

    const counterMatch2 = this.matchingalgo(
      userList[top3roomieId[1] - 1],
      userInfo,
      this.allCompFx()
    )

    top3results[top3roomieId[1]] =
      (top3results[top3roomieId[1]] + counterMatch2) / 2

    const counterMatch3 = this.matchingalgo(
      userList[top3roomieId[2] - 1],
      userInfo,
      this.allCompFx()
    )

    top3results[top3roomieId[2]] =
      (top3results[top3roomieId[2]] + counterMatch3) / 2

    top3roomieId.map(roomieId => {
      if (top3results[roomieId] > bestResuiltScore) {
        bestResultId = roomieId
      }
    })

    this.setState({
      bestMatch: bestResultId,
      top3: top3roomieId
    })
    this.props.getMatchUsers(top3roomieId)
  }

  render() {
    return (
      <div>
        <h1>bestMatch Id: {this.state.bestMatch}</h1>
        <h1>1st Id: {this.state.top3[0]}</h1>
        <h1>2nd Id: {this.state.top3[1]}</h1>
        <h1>3rd Id: {this.state.top3[2]}</h1>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    userPref: state.singleUser.user.question
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getMatchUsers: matchedUser => dispatch(getMatchUsers(matchedUser))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Algo)
