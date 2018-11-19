import React, {Component} from 'react'
import {connect} from 'react-redux'
import NYCNeighborhoods from './NYCneighborhoods'

class MapWrapper extends Component {
  render() {
    if (this.props.mapData === null) return null
    if (this.props.mapData.features && this.props.shouldRender === true) {
      return (
        <svg key="first" width="960" height="720">
          <NYCNeighborhoods
            width={720}
            height={720}
            mapData={this.props.mapData}
          />
        </svg>
      )
    }
    return (
      <svg key="second" width="960" height="720">
        <NYCNeighborhoods
          width={720}
          height={720}
          mapData={this.props.mapData}
        />
      </svg>
    )
  }
}

const mapStateToProps = state => ({
  mapData: state.map.mapData,
  shouldRender: state.map.shouldRender
})

const ConnectedMapWrapper = connect(mapStateToProps)(MapWrapper)

export default ConnectedMapWrapper
