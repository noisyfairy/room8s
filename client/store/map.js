import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_MAP = 'GET_MAP'

/**
 * INITIAL STATE
 */
const defaultState = {}

/**
 * ACTION CREATORS
 */
const getMap = mapData => ({type: GET_MAP, mapData})

/**
 * THUNK CREATORS
 */

export const getMapData = () => dispatch => {
  try {
    let mapData = {neighborhood: 'East Village'}
    dispatch(getMap(mapData))
  } catch (error) {
    console.error(error)
  }
}

/**
 * REDUCER
 */
export default function(state = defaultState, action) {
  switch (action.type) {
    case GET_MAP:
      return action.mapData
    default:
      return state
  }
}
