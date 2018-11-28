import axios from 'axios'
// import history from '../history'

// Actions
const GET_FAVORITE_USERS = 'GET_FAVORITE_USERS'
const ADD_FAV_USER = 'ADD_FAV_USER'
const DELETE_FAV_USER = 'DELETE_FAV_USER'
const GET_MUTUAL_USERS = 'GET_MUTUAL_USERS'
const DELETE_MUTUAL_USER = 'DELETE_MUTUAL_USER'

// Initial State
const defaultFavoriteUsersList = {
  favoriteUsers: [],
  mutualUsers: []
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

export const deleteFavoriteUser = deleteId => ({
  type: DELETE_FAV_USER,
  deleteId
})

const getMutualUsers = mutualUsers => ({
  type: GET_MUTUAL_USERS,
  mutualUsers
})

export const deleteMutualUser = deleteId => ({
  type: DELETE_MUTUAL_USER,
  deleteId
})

//Thunk creator
export const fetchFavoriteUsers = userId => {
  return async dispatch => {
    try {
      let favUserData = []
      const response = await axios.get(`/api/favorite/${userId}`)
      const favoriteUsers = response.data
      favoriteUsers.map(user => {
        const data = axios.get(`/api/users/${user.favoriteId}`)
        favUserData.push(data)
      })
      let favUserList = await Promise.all(favUserData)
      let finalData = []
      favUserList.map(user => {
        finalData.push(user.data)
      })
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
      dispatch(deleteFavoriteUser(favId))
    } catch (err) {
      console.log(err)
    }
  }
}

export const getTWoWayUser = userId => {
  return async dispatch => {
    try {
      const response = await axios.get(`/api/favorite/${userId}`)
      const favoriteUsers = response.data

      let favUserProms = []
      favoriteUsers.map(user => {
        const res = axios.put(`/api/favorite`, {
          favoriteId: user.userId,
          userId: user.favoriteId
        })
        favUserProms.push(res)
      })
      let favUserList = await Promise.all(favUserProms)

      let favUserData = []
      favUserList.map(user => {
        favUserData.push(user.data)
      })

      let twoWayList = []
      favUserData.map(user => {
        if (user) {
          twoWayList.push(user)
        }
      })

      let mutualProms = []
      twoWayList.map(user => {
        const data = axios.get(`/api/users/${user.userId}`)
        mutualProms.push(data)
      })

      let mutualList = await Promise.all(mutualProms)

      let mutualData = []
      mutualList.map(user => {
        mutualData.push(user.data)
      })

      console.log(mutualData)

      dispatch(getMutualUsers(mutualData))
    } catch (err) {
      console.log(err)
    }
  }
}

export const removeMutualUser = (userId, favId) => {
  return async dispatch => {
    try {
      const data = await axios.delete(`/api/favorite/${userId}`, {
        data: {favoriteId: favId}
      })
      dispatch(deleteMutualUser(favId))
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
      return {...state, favoriteUsers: newFavUsers}

    case GET_MUTUAL_USERS:
      return {...state, mutualUsers: action.mutualUsers}

    case DELETE_MUTUAL_USER:
      const newMutualUsers = state.mutualUsers.filter(
        user => user.id !== action.deleteId
      )
      return {...state, mutualUsers: newMutualUsers}

    default:
      return state
  }
}

export default favoriteUsersReducer
