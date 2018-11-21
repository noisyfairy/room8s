import axios from 'axios'
// import history from '../history'

// Actions
const GET_SINGLEUSER = 'GET_SINGLEUSER'
const ADD_TO_FAVORITE = 'ADD_TO_FAVORITE'
// Initial State
const defaultSingleUser = {
  user: {}
}

// Action creator
export const getSingleUser = user => ({
  type: GET_SINGLEUSER,
  user
})

//Thunk creator
export const fetchSingleUser = async userId => {
  return async dispatch => {
    try {
      const response = await axios.get(`/api/users/${userId}`)
      const user = response.data
      console.log('user,', user)
      await dispatch(getSingleUser(user))
    } catch (err) {
      console.log(err)
    }
  }
}

// Reducer
const singleUserReducer = (state = defaultSingleUser, action) => {
  switch (action.type) {
    case GET_SINGLEUSER:
      return {...state, user: action.user}

    default:
      return state
  }
}

export default singleUserReducer
