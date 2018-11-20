import React, {Component} from 'react'
import NYCNeighborhoods from './NYCNeighborhoods'
import {getMapData, getSubwayData} from '../store/map'

class MapWrapper extends Component {
  handleClick = async () => {
    console.log('working')
    await this.props.getSubwayData(this.props.mapData)
  }
  render() {
    const data = this.props.data
    const color = this.props.color
    console.log(data)
    if (data === null) {
      return null
    } else {
      if (data.features && this.props.shouldRender === true) {
        return (
          <svg key="first" width="960" height="720">
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
        <svg key="second" width="960" height="720">
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
