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
