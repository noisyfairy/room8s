import axios from 'axios'
// import history from '../history'

// Actions
const GET_SINGLE_USER = 'GET_SINGLE_USER'
// const ADD_TO_FAVORITE = 'ADD_TO_FAVORITE'

// Initial State
const defaultSingleUser = {
  user: {}
}

// Action creator
export const getSingleUser = user => ({
  type: GET_SINGLE_USER,
  user
})

//Thunk creator
export const fetchSingleUser = userId => {
  return async dispatch => {
    try {
      const response = await axios.get(`/api/users/${userId}`)
      const user = response.data
      await dispatch(getSingleUser(user))
    } catch (err) {
      console.log(err)
    }
  }
}

// Reducer
const singleUserReducer = (state = defaultSingleUser, action) => {
  switch (action.type) {
    case GET_SINGLE_USER:
      return {...state, user: action.user}

    default:
      return state
  }
}

export default singleUserReducer
