import inside from 'point-in-polygon'
import axios from 'axios'
import produce from 'immer'
import * as d3 from 'd3'

//ACTION TYPES
const GET_SUBWAY = 'GET_SUBWAY'
const GET_MAP_SCORE = 'GET_MAP_SCORE'
const GET_ARREST = 'GET_ARREST'

//INITIAL STATE

const initialState = {
  allMapData: {},
  subwayMapData: {},
  mapScore: {},
  arrestMapData: {}
}

//ACTION CREATORS

const getSubway = subwayData => ({
  type: GET_SUBWAY,
  subwayData
})

const mapScore = mapScoreData => ({
  type: GET_MAP_SCORE,
  mapScoreData
})
const getArrest = arrestData => ({
  type: GET_ARREST,
  arrestData
})

//THUNK CREATORS

export const getSubwayMapData = () => async dispatch => {
  try {
    const {data} = await axios.get('/api/subway')
    const subwayData = data
    d3.json('nycmap.geojson', mapData => {
      let scoreObj = {1: [], 2: [], 3: []}
      for (let loc of mapData.features) {
        loc.properties.score = 0
        subwayData.map(coord => {
          if (inside(coord, loc.geometry.coordinates[0])) {
            loc.properties.score++
          }
        })
      }
      dispatch(getSubway(mapData))
      for (let loc of mapData.features) {
        if (loc.properties.score >= 6) {
          if (!scoreObj[1].includes(loc.properties.neighborhood))
            scoreObj[1].push(loc.properties.neighborhood)
        } else if (loc.properties.score >= 1) {
          if (!scoreObj[2].includes(loc.properties.neighborhood))
            scoreObj[2].push(loc.properties.neighborhood)
        } else if (!scoreObj[3].includes(loc.properties.neighborhood))
          scoreObj[3].push(loc.properties.neighborhood)
      }
      dispatch(mapScore(scoreObj))
    })
  } catch (err) {
    console.error(err)
  }
}

export const getArrestMapData = () => async dispatch => {
  try {
    const {data} = await axios.get('/api/arrestSave')
    const arrestData = data

    d3.json('nycmap.geojson', mapData => {
      let scoreObj = {4: [], 5: [], 6: []}
      for (let loc of mapData.features) {
        // console.log('this is addedmapdata', loc)
        if (arrestData[loc.properties.neighborhood]) {
          loc.properties.score = arrestData[loc.properties.neighborhood]
        } else loc.properties.score = 0
      }
      dispatch(getArrest(mapData))
      for (let loc of mapData.features) {
        if (loc.properties.score < 5) {
          if (!scoreObj[4].includes(loc.properties.neighborhood))
            scoreObj[4].push(loc.properties.neighborhood)
        } else if (loc.properties.score < 15) {
          if (!scoreObj[5].includes(loc.properties.neighborhood))
            scoreObj[5].push(loc.properties.neighborhood)
        } else if (!scoreObj[6].includes(loc.properties.neighborhood))
          scoreObj[6].push(loc.properties.neighborhood)
      }
      dispatch(mapScore(scoreObj))
    })
    console.log('thing from jmapdata', arrestData)
  } catch (err) {
    console.error(err)
  }
}

//REDUCER

export default function(state = initialState, action) {
  return produce(state, draft => {
    switch (action.type) {
      case GET_SUBWAY:
        return {...state, subwayMapData: action.subwayData}
      case GET_MAP_SCORE:
        Object.keys(action.mapScoreData).forEach(key => {
          draft.mapScore[key] = action.mapScoreData[key]
        })
        break
      case GET_ARREST:
        console.log(action.arrestData)
        return {...state, arrestMapData: action.arrestData}
    }
  })
}
