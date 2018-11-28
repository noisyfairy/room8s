import Axios from 'axios'
import React from 'react'
import {connect} from 'react-redux'
import {MatchUsers} from '../components'
import {fetchMatchUsers, getMatchScores} from '../store/matchUsers'

class Algo extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      top3: []
    }
  }

  async componentDidMount() {
    this.bestmatches(this.props.userId)
  }

  compBudget = (user, roomie) => {
    let matchScore = 0

    const maxScore = Math.pow(2, Number(user.question.budgetPrior) + 1)

    const budget1 = user.question.budgetMin
    const budget2 = roomie.question.budgetMin
    if (budget1 === budget2) {
      matchScore = maxScore
    } else if (Math.abs(budget1 - budget2) <= 500) {
      matchScore = maxScore / 2
    }

    return {
      matchScore: matchScore,
      maxScore: maxScore
    }
  }

  compLocation = (user, roomie) => {
    let matchScore = 0
    const maxScore = Math.pow(2, Number(user.question.locationPrior) + 1)
    if (user.location === roomie.location) {
      matchScore = maxScore
    }

    return {
      matchScore: matchScore,
      maxScore: maxScore
    }
  }

  compMonth = (user, roomie) => {
    let matchScore = 0
    const maxScore = Math.pow(2, Number(user.question.moveInPrior) + 1)
    const userDate = user.moveInTime.split('-')
    const roomieDate = roomie.moveInTime.split('-')

    if (userDate[1] === roomieDate[1]) {
      const dateDiff = Math.abs(userDate[2] - roomieDate[2])
      if (dateDiff <= 14) {
        matchScore = maxScore
      } else if (dateDiff <= 21) {
        matchScore = maxScore * 0.9
      } else if (dateDiff <= 28) {
        matchScore = maxScore * 0.75
      }
    } else {
      const monthDiff = Math.abs(userDate[1] - roomieDate[1])
      if (monthDiff === 1) {
        matchScore = maxScore * 0.6
      } else if (monthDiff === 2) {
        matchScore = maxScore * 0.3
      }
    }

    return {
      matchScore: matchScore,
      maxScore: maxScore
    }
  }

  compDuration = (user, roomie) => {
    let matchScore = 0
    const maxScore = Math.pow(2, Number(user.question.duraPrior) + 1)
    const duraDiff = Math.abs(user.duration - roomie.duration)

    if (duraDiff === 0) {
      matchScore = maxScore
    } else if (duraDiff === 1) {
      matchScore = maxScore * 0.8
    } else if (duraDiff === 2) {
      matchScore = maxScore * 0.5
    } else if (duraDiff === 3) {
      matchScore = maxScore * 0.3
    }

    return {
      matchScore: matchScore,
      maxScore: maxScore
    }
  }

  compPet = (user, roomie) => {
    let matchScore = 0
    const maxScore = Math.pow(2, Number(user.question.petPrior))
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
    const maxScore = Math.pow(2, Number(user.question.smokePrior))
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
    const maxScore = Math.pow(2, Number(user.question.introPrior))
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
    const maxScore = Math.pow(2, Number(user.question.sexPrior))
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
    let maxScore = Math.pow(2, Number(user.question.agePrior))
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
    let maxScore = Math.pow(2, Number(user.question.cleanPrior))
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
    let maxScore = Math.pow(2, Number(user.question.guestPrior))
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
    let maxScore = Math.pow(2, Number(user.question.todPrior))
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
    arrOfFx.push(this.compMonth)
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

    return Math.round(Number(matchScore / maxScore) * 100)
  }

  matchRoommate = (userlist, userId) => {
    let results = []
    let user = {}
    for (let i = 0; i < userlist.length; i++) {
      if (userlist[i].id === userId) {
        user = userlist[i]
      }
    }

    userlist.map(roomie => {
      let instance = {}
      if (roomie.id !== userId) {
        instance[roomie.id] = this.matchingalgo(user, roomie, this.allCompFx())
        results.push(instance)
      }
    })

    return results
  }

  bestmatches = async userId => {
    const userListData = await Axios.get('./api/users')
    const userList = userListData.data
    const userInfoData = await Axios.get(`./api/users/${userId}`)
    const userInfo = userInfoData.data
    const userMatchScores = this.matchRoommate(userList, userId)

    userMatchScores.sort((a, b) => {
      if (Object.values(a)[0] > Object.values(b)[0]) return -1
      if (Object.values(a)[0] < Object.values(b)[0]) return 1
      return 0
    })

    let top3results = userMatchScores.slice(0, 3)

    let top3Counter = []
    top3results.map(roomie => {
      let counterMatch = 0
      for (let i = 0; i < userList.length; i++) {
        if (userList[i].id == Object.keys(roomie)[0]) {
          const roomieInfo = userList[i]
          counterMatch = this.matchingalgo(
            roomieInfo,
            userInfo,
            this.allCompFx()
          )
        }
      }
      const twoWay = {
        [Object.keys(roomie)[0]]: (Object.values(roomie)[0] + counterMatch) / 2
      }

      top3Counter.push(twoWay)
    })

    top3Counter.sort((a, b) => {
      if (Object.values(a)[0] > Object.values(b)[0]) return -1
      if (Object.values(a)[0] < Object.values(b)[0]) return 1
      return 0
    })

    this.setState({
      top3: top3Counter
    })

    this.props.fetchMatchUsers(this.state.top3)
    this.props.getMatchScores(this.state.top3)
  }

  render() {
    return <MatchUsers />
  }
}

const mapStateToProps = state => {
  return {
    userPref: state.singleUser.user.question,
    userId: state.user.id
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchMatchUsers: matchUserList => dispatch(fetchMatchUsers(matchUserList)),
    getMatchScores: matchScores => {
      dispatch(getMatchScores(matchScores))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Algo)
