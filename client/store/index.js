import {createStore, combineReducers, applyMiddleware} from 'redux'
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import user from './user'
import map from './map'
import addedMap from './addedMapData'

import users from './users'
import matchUsers from './matchUsers'
import favoriteUsers from './favoriteUsers'
import singleUser from './singleUser'

const reducer = combineReducers({
  user,
  users,
  matchUsers,
  favoriteUsers,
  singleUser,
  map,
  addedMap
})

const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)
const store = createStore(reducer, middleware)

export default store
export * from './user'
export * from './users'
export * from './matchUsers'
export * from './favoriteUsers'
export * from './singleUser'
export * from './map'
export * from './addedMapData'
