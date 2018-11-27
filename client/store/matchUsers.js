import axios from 'axios'
// import history from '../history'

// Actions
const GET_MATCH_USERS = 'GET_MATCH_USERS'

// Initial State
const defaultMatchUsersList = {
  matchUsers: []
}

// Action creator
export const getMatchUsers = matchUsers => ({
  type: GET_MATCH_USERS,
  matchUsers
})

//Thunk creator
export const fetchMatchUsers = userList => {
  return async dispatch => {
    console.log(userList)
    try {
      const user1 = axios.get(`./api/users/${Object.keys(userList[0])[0]}`)
      const user2 = axios.get(`./api/users/${Object.keys(userList[1])[0]}`)
      const user3 = axios.get(`./api/users/${Object.keys(userList[2])[0]}`)
      const userInfo = await Promise.all([user1, user2, user3])
      const matchUsers = [userInfo[0].data, userInfo[1].data, userInfo[2].data]
      dispatch(getMatchUsers(matchUsers))
    } catch (err) {
      console.log(err)
    }
  }
}

// Reducer
const matchUsersReducer = (state = defaultMatchUsersList, action) => {
  switch (action.type) {
    case GET_MATCH_USERS:
      return {...state, matchUsers: action.matchUsers}

    default:
      return state
  }
}

export default matchUsersReducer
