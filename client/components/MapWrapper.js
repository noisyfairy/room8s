import React, {Component} from 'react'
import NYCNeighborhoods from './NYCNeighborhoods'
import {getMapData, getSubwayData} from '../store/map'
import history from '../history'

class MapWrapper extends Component {
  render() {
    const data = this.props.data
    const color = this.props.color
    console.log(this.props)
    if (data === null) {
      return null
    } else {
      if (data.features && this.props.shouldRender === true) {
        return (
          <svg key="first" width="720" height="720">
            <NYCNeighborhoods
              width={720}
              height={720}
              mapData={data}
              color={color}
            />
          </svg>
        )
      }
      return (
        <svg key="second" width="720" height="720">
          <NYCNeighborhoods
            width={720}
            height={720}
            mapData={data}
            color={color}
          />
        </svg>
      )
    }
  }
}

export default MapWrapper
