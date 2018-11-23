import inside from 'point-in-polygon'
import axios from 'axios'
import produce from 'immer'
import * as d3 from 'd3'

//ACTION TYPES
const GET_SUBWAY = 'GET_SUBWAY'
const GET_ARREST = 'GET_ARREST'

//INITIAL STATE

const initialState = {
  allMapData: {},
  subwayMapData: {},
  arrestMapData: {}
}

//ACTION CREATORS

const getSubway = subwayData => ({
  type: GET_SUBWAY,
  subwayData
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
    d3.json(
      ' http://data.beta.nyc//dataset/0ff93d2d-90ba-457c-9f7e-39e47bf2ac5f/resource/35dd04fb-81b3-479b-a074-a27a37888ce7/download/d085e2f8d0b54d4590b1e7d1f35594c1pediacitiesnycneighborhoods.geojson',
      mapData => {
        for (let location of mapData.features) {
          location.properties.score = 0
          subwayData.map(coord => {
            if (inside(coord, location.geometry.coordinates[0])) {
              location.properties.score++
            }
          })
        }
        dispatch(getSubway(mapData))
      }
    )
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

    d3.json(
      'http://data.beta.nyc//dataset/0ff93d2d-90ba-457c-9f7e-39e47bf2ac5f/resource/35dd04fb-81b3-479b-a074-a27a37888ce7/download/d085e2f8d0b54d4590b1e7d1f35594c1pediacitiesnycneighborhoods.geojson',
      mapData => {
        for (let location of mapData.features) {
          location.properties.score = 0
          arrestData.map(coord => {
            if (inside(coord, location.geometry.coordinates[0])) {
              location.properties.score++
            }
          })
        }
        dispatch(getArrest(mapData))
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
      case GET_ARREST:
        console.log(action.arrestData)
        return {...state, arrestMapData: action.arrestData}
    }
  })
}
