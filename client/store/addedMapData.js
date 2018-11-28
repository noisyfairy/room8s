import inside from 'point-in-polygon'
import axios from 'axios'
import produce from 'immer'
import * as d3 from 'd3'

//ACTION TYPES
const GET_SUBWAY = 'GET_SUBWAY'
const GET_MAP_SCORE = 'GET_MAP_SCORE'
const GET_ARREST = 'GET_ARREST'
const GET_VIOLATIONS = 'GET_VIOLATIONS'
const GET_TREES = 'GET_TREES'

//INITIAL STATE

const initialState = {
  subwayMapData: {},
  mapScore: {},
  arrestMapData: {},
  violationMapData: {},
  treeMapData: {}
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
const getViolations = violationsData => ({
  type: GET_VIOLATIONS,
  violationsData
})

const getTrees = treeData => ({
  type: GET_TREES,
  treeData
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
    const {data} = await axios.get('/api/arrest')
    const arrestData = data

    d3.json('nycmap.geojson', mapData => {
      let scoreObj = {4: [], 5: [], 6: []}
      for (let loc of mapData.features) {
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
  } catch (err) {
    console.error(err)
  }
}

export const getHousingViolationsData = () => async dispatch => {
  try {
    const {data} = await axios.get('/api/housingViolations')
    const violationData = data
    d3.json('nycmap.geojson', mapData => {
      let scoreObj = {7: [], 8: [], 9: []}
      for (let loc of mapData.features) {
        if (violationData[loc.properties.neighborhood]) {
          loc.properties.score = violationData[loc.properties.neighborhood]
        } else loc.properties.score = 0
      }
      dispatch(getViolations(mapData))
      for (let loc of mapData.features) {
        if (loc.properties.score < 10) {
          if (!scoreObj[9].includes(loc.properties.neighborhood))
            scoreObj[9].push(loc.properties.neighborhood)
        } else if (loc.properties.score < 20) {
          if (!scoreObj[8].includes(loc.properties.neighborhood))
            scoreObj[8].push(loc.properties.neighborhood)
        } else if (!scoreObj[7].includes(loc.properties.neighborhood))
          scoreObj[7].push(loc.properties.neighborhood)
      }
      dispatch(mapScore(scoreObj))
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

export const getTreeData = () => async dispatch => {
  try {
    const {data} = await axios.get('/api/trees')
    d3.json('nycmap.geojson', mapData => {
      let scoreObj = {10: [], 11: [], 12: []}
      for (let loc of mapData.features) {
        if (!data[loc.properties.neighborhood]) {
          loc.properties.score = 0
        } else {
          loc.properties.score = data[loc.properties.neighborhood]
        }
      }
      dispatch(getTrees(mapData))
      for (let loc of mapData.features) {
        if (loc.properties.score < 10) {
          if (!scoreObj[10].includes(loc.properties.neighborhood))
            scoreObj[10].push(loc.properties.neighborhood)
        } else if (loc.properties.score < 20) {
          if (!scoreObj[11].includes(loc.properties.neighborhood))
            scoreObj[11].push(loc.properties.neighborhood)
        } else if (!scoreObj[12].includes(loc.properties.neighborhood))
          scoreObj[12].push(loc.properties.neighborhood)
      }
      dispatch(mapScore(scoreObj))
    })
    // console.log(data)
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
      case GET_MAP_SCORE:
        Object.keys(action.mapScoreData).forEach(key => {
          draft.mapScore[key] = action.mapScoreData[key]
        })
        break
      case GET_ARREST:
        return {...state, arrestMapData: action.arrestData}
      case GET_VIOLATIONS:
        return {...state, violationMapData: action.violationsData}
      case GET_TREES:
        return {...state, treeMapData: action.treeData}
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
