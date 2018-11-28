import produce from 'immer'
import inside from 'point-in-polygon'
import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_MAP = 'GET_MAP'
const UPDATE_MAP = 'UPDATE_MAP'
const UPDATE_RENDER = 'UPDATE_RENDER'
const GET_IDX = 'GET_IDX'
const PREFERRED_NEIGHBORHOOD = 'PREFERRED_NEIGHBORHOOD'

/**
 * INITIAL STATE
 */
const defaultState = {
  mapData: null,
  shouldRender: false,
  subwayMapData: null,
  neighborhoodIdxObj: null,
  preferredNeighborhood: null
}

/**
 * ACTION CREATORS
 */
const getMap = mapData => ({type: GET_MAP, mapData})
const updateMap = idx => ({type: UPDATE_MAP, idx})
const updateRender = () => ({type: UPDATE_RENDER})
const getNeighborhoodIdx = obj => ({type: GET_IDX, obj})
const setPreferredNeighborhood = neighborhood => ({
  type: PREFERRED_NEIGHBORHOOD,
  neighborhood
})

/**
 * THUNK CREATORS
 */

export const getMapData = () => async dispatch => {
  try {
    console.log(`STORE new map`)
    const neighborhoodIdxObj = {}
    await d3.json('nycmap.geojson', mapData => {
      for (let location of mapData.features) {
        location.properties.score = 0
      }
      for (let location of mapData.features) {
        neighborhoodIdxObj[
          location.properties.neighborhood
        ] = mapData.features.indexOf(location).toString()
      }
      dispatch(getMap(mapData))
      dispatch(updateMapRender())
      dispatch(getNeighborhoodIdx(neighborhoodIdxObj))
    })
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
    console.log(`STORE MAP RE-RENDER`)
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

export const selectPreferredNeighborhood = neighborhood => dispatch => {
  try {
    dispatch(setPreferredNeighborhood(neighborhood))
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
        console.log(action.mapData)
        return {...state, mapData: action.mapData}
      case UPDATE_MAP:
        draft.mapData.features[action.idx].properties.score++
        break
      case GET_IDX:
        return {...state, neighborhoodIdxObj: action.obj}
      case UPDATE_RENDER:
        return {...state, shouldRender: !state.shouldRender}
      case PREFERRED_NEIGHBORHOOD:
        console.log(action)
        return {...state, preferredNeighborhood: action.neighborhood}
    }
  })
}
