import inside from 'point-in-polygon'
import axios from 'axios'
import produce from 'immer'
import * as d3 from 'd3'

//ACTION TYPES
const GET_SUBWAY = 'GET_SUBWAY'
const GET_SUBWAY_SCORE = 'GET_SUBWAY_SCORE'
const GET_ARREST = 'GET_ARREST'
const GET_VIOLATIONS = 'GET_VIOLATIONS'

//INITIAL STATE

const initialState = {
  subwayMapData: {},
  getSubwayScore: {},
  arrestMapData: {},
  violationMapData: {}
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
const getViolations = violationsData => ({
  type: GET_VIOLATIONS,
  violationsData
})

//THUNK CREATORS

export const getSubwayMapData = () => async dispatch => {
  try {
    const {data} = await axios.get('/api/subway')
    const subwayData = data
    d3.json('nycmap.geojson', mapData => {
      let subwayObjScore = {1: [], 2: [], 3: []}
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
          if (!subwayObjScore[1].includes(loc.properties.neighborhood))
            subwayObjScore[1].push(loc.properties.neighborhood)
        } else if (loc.properties.score >= 1) {
          if (!subwayObjScore[2].includes(loc.properties.neighborhood))
            subwayObjScore[2].push(loc.properties.neighborhood)
        } else if (!subwayObjScore[3].includes(loc.properties.neighborhood))
          subwayObjScore[3].push(loc.properties.neighborhood)
      }
      dispatch(getSubwayScore(subwayObjScore))
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
      let subwayObjScore = {4: [], 5: [], 6: []}
      for (let loc of mapData.features) {
        // console.log('this is addedmapdata', loc)
        if (arrestData[loc.properties.neighborhood]) {
          loc.properties.score = arrestData[loc.properties.neighborhood]
        } else loc.properties.score = 0
      }
      dispatch(getArrest(mapData))
      for (let loc of mapData.features) {
        if (loc.properties.score < 5) {
          if (!subwayObjScore[4].includes(loc.properties.neighborhood))
            subwayObjScore[4].push(loc.properties.neighborhood)
        } else if (loc.properties.score < 15) {
          if (!subwayObjScore[5].includes(loc.properties.neighborhood))
            subwayObjScore[5].push(loc.properties.neighborhood)
        } else if (!subwayObjScore[6].includes(loc.properties.neighborhood))
          subwayObjScore[6].push(loc.properties.neighborhood)
      }
      dispatch(getSubwayScore(subwayObjScore))
    })
  } catch (err) {
    console.error(err)
  }
}

export const getHousingViolationsData = () => async dispatch => {
  try {
    const {data} = await axios.get('/api/housingViolations')
    const violationData = data
    d3.json('nycmap.geojson', mapData => {
      for (let loc of mapData.features) {
        if (violationData[loc.properties.neighborhood]) {
          console.log('working')
          loc.properties.score = violationData[loc.properties.neighborhood]
        } else loc.properties.score = 0
      }
      dispatch(getViolations(mapData))
    })
    // d3.json('nycmap.geojson', mapData => {
    //   for (let loc of mapData.features) {
    //     data.map(coords => {
    //       if (inside(coords, loc.geometry.coordinates[0])) {
    //         // console.log('true')
    //         if (!newData[loc.properties.neighborhood]) {
    //           // console.log('hasnoprops')
    //           newData[loc.properties.neighborhood] = 1
    //           // console.log('newData', newData)
    //         } else {
    //           // console.log('hasprops')
    //           newData[loc.properties.neighborhood]++
    //         }
    //       }
    //     })
    //   }
    //   axios.post('/api/save', newData).then()
    // })

    // console.log(data)
  } catch (err) {
    console.log(err)
  }
}

export const getTreeData = () => async dispatfh => {
  try {
    const {data} = await axios.get(
      '/https://data.cityofnewyork.us/resource/5rq2-4hqu.json'
    )
  } catch (err) {
    console.log(err)
  }
}

//REDUCER

export default function(state = initialState, action) {
  return produce(state, draft => {
    switch (action.type) {
      case GET_SUBWAY:
        return {...state, subwayMapData: action.subwayData}
      case GET_SUBWAY_SCORE:
        Object.keys(action.subwayScoreData).forEach(key => {
          draft.getSubwayScore[key] = action.subwayScoreData[key]
        })
        break
      case GET_ARREST:
        // console.log(action.arrestData)
        return {...state, arrestMapData: action.arrestData}
      case GET_VIOLATIONS:
        return {...state, violationMapData: action.violationsData}
    }
  })
}

// d3.json('nycmap.geojson', mapData => {
//   for (let loc of mapData.features) {
//     data.map(coords => {
//       if (inside(coords, loc.geometry.coordinates[0])) {
//         // console.log('true')
//         if (!newData[loc.properties.neighborhood]) {
//           // console.log('hasnoprops')
//           newData[loc.properties.neighborhood] = 1
//           // console.log('newData', newData)
//         } else {
//           // console.log('hasprops')
//           newData[loc.properties.neighborhood]++
//         }
//       }
//     })
//   }
//   axios.post('/api/save', newData).then()
// })
