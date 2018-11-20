import React, {Component} from 'react'
import {connect} from 'react-redux'
import NYCNeighborhoods from './NYCNeighborhoods'
import {getMapData, getSubwayData} from '../store/map'

class MapWrapper extends Component {
  handleClick = async () => {
    console.log('working')
    await this.props.getSubwayData(this.props.mapData)
  }
  render() {
    if (this.props.mapData === null) return null
    if (this.props.mapData.features && this.props.shouldRender === true) {
      return (
        <div>
          <button type="submit" onClick={this.handleClick}>
            SUBWAY DATA
          </button>
          <svg key="first" width="960" height="720">
            <NYCNeighborhoods
              width={720}
              height={720}
              mapData={this.props.mapData}
              getMapData={this.props.getMapData}
              getSubwayData={this.props.getSubwayData}
            />
          </svg>
        </div>
      )
    }
    return (
      <div>
        <button type="submit" onClick={this.handleClick}>
          SUBWAY DATA
        </button>
        <svg key="second" width="960" height="720">
          <NYCNeighborhoods
            width={720}
            height={720}
            mapData={this.props.mapData}
            getMapData={this.props.getMapData}
            getSubwayData={this.props.getSubwayData}
          />
        </svg>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  mapData: state.map.mapData,
  shouldRender: state.map.shouldRender
})

const mapDispatchToProps = dispatch => {
  return {
    getMapData: () => dispatch(getMapData()),
    getSubwayData: state => dispatch(getSubwayData(state))
  }
}

const ConnectedMapWrapper = connect(mapStateToProps, mapDispatchToProps)(
  MapWrapper
)

export default ConnectedMapWrapper
