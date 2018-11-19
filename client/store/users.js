import axios from 'axios'
// import history from '../history'

// Actions
const GET_USERS = 'GET_USERS'

// Initial State
const defaultUsersList = {
  users: []
}

// Action creator
export const getUsers = users => ({
  type: GET_USERS,
  users
})

//Thunk creator
export const fetchUsers = () => {
  return async dispatch => {
    try {
      const response = await axios.get('/api/users')
      const users = response.data
      dispatch(getUsers(users))
    } catch (err) {
      console.log(err)
    }
  }
}

// Reducer
const usersReducer = (state = defaultUsersList, action) => {
  switch (action.type) {
    case GET_USERS:
      return {...state, users: action.users}

    default:
      return state
  }
}

export default usersReducer
