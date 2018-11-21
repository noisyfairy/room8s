import produce from 'immer'
import inside from 'point-in-polygon'
import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_MAP = 'GET_MAP'
const UPDATE_MAP = 'UPDATE_MAP'
const UPDATE_RENDER = 'UPDATE_RENDER'

/**
 * INITIAL STATE
 */
const defaultState = {
  mapData: null,
  shouldRender: false,
  subwayMapData: null
}

/**
 * ACTION CREATORS
 */
const getMap = mapData => ({type: GET_MAP, mapData})
const updateMap = idx => ({type: UPDATE_MAP, idx})
const updateRender = () => ({type: UPDATE_RENDER})

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

export const updateMapRender = () => dispatch => {
  try {
    dispatch(updateRender())
  } catch (error) {
    console.log(error)
  }
}

export const getSubwayData = (state = defaultState) => async dispatch => {
  try {
    const subwayInfo = await axios.get('/api/subway')
    const subwayData = subwayInfo.data

    state.features.forEach((nbhd, idx) => {
      subwayData.map(coord => {
        if (inside(coord, nbhd.geometry.coordinates[0])) {
          dispatch(updateMapScore(idx))
        }
      })
    })
  } catch (err) {
    console.log(err)
  }
}

/**
 * REDUCER
 */
export default function(state = defaultState, action) {
  return produce(state, draft => {
    switch (action.type) {
      case GET_MAP:
        return {...state, mapData: action.mapData}
      case UPDATE_MAP:
        draft.mapData.features[action.idx].properties.score++
        break
      case UPDATE_RENDER:
        return {...state, shouldRender: !state.shouldRender}
    }
  })
}
