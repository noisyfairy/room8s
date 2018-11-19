import axios from 'axios'
// import history from '../history'

// Actions
const GET_FAVORITE_USERS = 'GET_FAVORITE_USERS'

// Initial State
const defaultFavoriteUsersList = {
  favoriteUsers : []
}

// Action creator
export const getFavoriteUsers = favoriteUsers => (
  {
    type: GET_FAVORITE_USERS,
    favoriteUsers
  }
)

//Thunk creator
export const fetchFavoriteUsers = (userId) => {
  return async (dispatch) => {
      try {
          const response = await axios.get(`/api/users/${userId}/favoriteUsers`)
          const favoriteUsers = response.data
          dispatch(getFavoriteUsers(favoriteUsers))
      }
      catch (err) { console.log(err) }
  }
}

// Reducer
 const favoriteUsersReducer = (state = defaultFavoriteUsersList, action) => {
   switch(action.type) {
     case GET_FAVORITE_USERS:
        return { ...state, favoriteUsers: action.favoriteUsers}

     default:
        return state
   }
 }

 export default favoriteUsersReducer



