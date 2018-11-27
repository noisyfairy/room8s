import axios from 'axios'
// import history from '../history'

// Actions
const GET_FAVORITE_USERS = 'GET_FAVORITE_USERS'
const ADD_FAV_USER = 'ADD_FAV_USER'
const DELETE_FAV_USER = 'DELETE_FAV_USER'

// Initial State
const defaultFavoriteUsersList = {
  favoriteUsers: []
}

// Action creator
const getFavoriteUsers = favoriteUsers => ({
  type: GET_FAVORITE_USERS,
  favoriteUsers
})

const addFavoriteUser = favUser => ({
  type: ADD_FAV_USER,
  favUser
})

const deleteFavoriteUser = deleteId => ({
  type: DELETE_FAV_USER,
  deleteId
})

//Thunk creator
export const fetchFavoriteUsers = userId => {
  return async dispatch => {
    try {
      let favUserData = []
      const response = await axios.get(`/api/favorite/${userId}`)
      const favoriteUsers = response.data
      console.log(favoriteUsers)
      favoriteUsers.map(user => {
        const data = axios.get(`/api/users/${user.favoriteId}`)
        favUserData.push(data)
      })
      let favUserList = await Promise.all(favUserData)
      let finalData = []
      favUserList.map(user => {
        finalData.push(user.data)
      })
      console.log(finalData)
      dispatch(getFavoriteUsers(finalData))
    } catch (err) {
      console.log(err)
    }
  }
}

export const createFavoriteUser = (userId, favId) => {
  return async dispatch => {
    try {
      const {data} = await axios.post(`/api/favorite`, {
        favoriteId: favId,
        userId: userId
      })
      const favoriteUser = data
      console.log(favoriteUser)
      let favUser = await axios.get(`/api/users/${favoriteUser.favoriteId}`)
      favUser = favUser.data
      dispatch(addFavoriteUser(favUser))
    } catch (err) {
      console.log(err)
    }
  }
}

export const removeFavoriteUser = (userId, favId) => {
  return async dispatch => {
    try {
      const data = await axios.delete(`/api/favorite/${userId}`, {
        data: {favoriteId: favId}
      })
      console.log(data)
      dispatch(deleteFavoriteUser(favId))
    } catch (err) {
      console.log(err)
    }
  }
}

// Reducer
const favoriteUsersReducer = (state = defaultFavoriteUsersList, action) => {
  switch (action.type) {
    case GET_FAVORITE_USERS:
      return {...state, favoriteUsers: action.favoriteUsers}

    case ADD_FAV_USER:
      return {...state, favoriteUsers: [...state.favoriteUsers, action.favUser]}

    case DELETE_FAV_USER:
      const newFavUsers = state.favoriteUsers.filter(
        user => user.id !== action.deleteId
      )
      console.log(newFavUsers)
      return {...state, favoriteUsers: newFavUsers}

    default:
      return state
  }
}

export default favoriteUsersReducer
