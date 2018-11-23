import inside from 'point-in-polygon'
import axios from 'axios'
import produce from 'immer'
import * as d3 from 'd3'

//ACTION TYPES
const GET_SUBWAY = 'GET_SUBWAY'
const GET_SUBWAY_SCORE = 'GET_SUBWAY_SCORE'

//INITIAL STATE

const initialState = {
  allMapData: {},
  subwayMapData: {},
  getSubwayScore: {}
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

//THUNK CREATORS

export const getSubwayMapData = () => async dispatch => {
  try {
    const {data} = await axios.get('/api/subway')
    const subwayData = data
    d3.json(
      ' http://data.beta.nyc//dataset/0ff93d2d-90ba-457c-9f7e-39e47bf2ac5f/resource/35dd04fb-81b3-479b-a074-a27a37888ce7/download/d085e2f8d0b54d4590b1e7d1f35594c1pediacitiesnycneighborhoods.geojson',
      mapData => {
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
          } else if (!subwayObjScore[3].includes(location.properties.neighborhood))
              subwayObjScore[3].push(location.properties.neighborhood)
        }
        dispatch(getSubwayScore(subwayObjScore))
      }
    )
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
    }
  })
}
