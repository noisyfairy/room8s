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
    d3.json(
      ' http://data.beta.nyc//dataset/0ff93d2d-90ba-457c-9f7e-39e47bf2ac5f/resource/35dd04fb-81b3-479b-a074-a27a37888ce7/download/d085e2f8d0b54d4590b1e7d1f35594c1pediacitiesnycneighborhoods.geojson',
      mapData => dispatch(getMap(mapData))
    )
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
