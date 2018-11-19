import produce from 'immer'

/**
 * ACTION TYPES
 */
const GET_MAP = 'GET_MAP'
const UPDATE_MAP = 'UPDATE_MAP'

/**
 * INITIAL STATE
 */
const defaultState = {}

/**
 * ACTION CREATORS
 */
const getMap = mapData => ({type: GET_MAP, mapData})
const updateMap = idx => ({type: UPDATE_MAP, idx})

/**
 * THUNK CREATORS
 */

export const getMapData = () => dispatch => {
  try {
    d3.json(
      ' http://data.beta.nyc//dataset/0ff93d2d-90ba-457c-9f7e-39e47bf2ac5f/resource/35dd04fb-81b3-479b-a074-a27a37888ce7/download/d085e2f8d0b54d4590b1e7d1f35594c1pediacitiesnycneighborhoods.geojson',
      mapData => {
        for (let location of mapData.features) {
          location.properties.score = 0
        }
        dispatch(getMap(mapData))
      }
    )
  } catch (error) {
    console.error(error)
  }
}

export const updateMapScore = idx => dispatch => {
  try {
    dispatch(updateMap(idx))
  } catch (error) {
    console.log(error)
  }
}

/**
 * REDUCER
 */
export default function(state = defaultState, action) {
  return produce(state, draft => {
    switch (action.type) {
      case GET_MAP:
        return action.mapData
      case UPDATE_MAP:
        draft.features[action.idx].properties.score++
    }
  })
}
