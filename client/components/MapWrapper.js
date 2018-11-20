import React, {Component} from 'react'
import {connect} from 'react-redux'
import NYCNeighborhoods from './NYCNeighborhoods'

class MapWrapper extends Component {
  render() {
    const data = this.props.data
    console.log(data)
    if (data === null) {
      return null
    } else {
      if (data.features && this.props.shouldRender === true) {
        return (
          <svg key="first" width="960" height="720">
            <NYCNeighborhoods width={720} height={720} mapData={data} />
          </svg>
        )
      }
      return (
        <svg key="second" width="960" height="720">
          <NYCNeighborhoods width={720} height={720} mapData={data} />
        </svg>
      )
    }
  }
}

export default MapWrapper
