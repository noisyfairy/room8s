import inside from 'point-in-polygon'
import axios from 'axios'
import produce from 'immer'
import * as d3 from 'd3'

//ACTION TYPES
const GET_SUBWAY = 'GET_SUBWAY'
const GET_SUBWAY_SCORE = 'GET_SUBWAY_SCORE'
const GET_ARREST = 'GET_ARREST'

//INITIAL STATE

const initialState = {
  allMapData: {},
  subwayMapData: {},
  getSubwayScore: {},
  arrestMapData: {}
}

//ACTION CREATORS

const getSubway = subwayData => ({
  type: GET_SUBWAY,
  subwayData
})

const getSubwayScore = subwayScoreData => ({
  type: GET_SUBWAY_SCORE,
  subwayScoreData
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
      let subwayObjScore = {1: [], 2: [], 3: []}
      for (let location of mapData.features) {
        location.properties.score = 0
        subwayData.map(coord => {
          if (inside(coord, location.geometry.coordinates[0])) {
            location.properties.score++
          }
        })
      }
      dispatch(getSubway(mapData))
      for (let location of mapData.features) {
        if (location.properties.score >= 6) {
          if (!subwayObjScore[1].includes(location.properties.neighborhood))
            subwayObjScore[1].push(location.properties.neighborhood)
        } else if (location.properties.score >= 1) {
          if (!subwayObjScore[2].includes(location.properties.neighborhood))
            subwayObjScore[2].push(location.properties.neighborhood)
        } else if (
          !subwayObjScore[3].includes(location.properties.neighborhood)
        )
          subwayObjScore[3].push(location.properties.neighborhood)
      }
      dispatch(getSubwayScore(subwayObjScore))
    })
  } catch (err) {
    console.error(err)
  }
}

export const getArrestMapData = () => async dispatch => {
  try {
    const {data} = await axios.get(
      'https://data.cityofnewyork.us/resource/m25r-ji2e.json'
    )
    const arrestData = data.map(obj => {
      return [obj.longitude, obj.latitude]
    })

    d3.json('nycmap.geojson', mapData => {
      for (let location of mapData.features) {
        location.properties.score = 0
        arrestData.map(coord => {
          if (inside(coord, location.geometry.coordinates[0])) {
            location.properties.score++
          }
        })
      }
      dispatch(getArrest(mapData))
    })
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
      case GET_SUBWAY_SCORE:
        return {...state, getSubwayScore: action.subwayScoreData}
      case GET_ARREST:
        console.log(action.arrestData)
        return {...state, arrestMapData: action.arrestData}
    }
  })
}
