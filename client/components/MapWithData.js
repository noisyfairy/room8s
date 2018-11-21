import React, {Component} from 'react'
import {connect} from 'react-redux'
import MapWrapper from './MapWrapper'
import * as d3 from 'd3'

class MapWithData extends Component {
  render() {
    const color = d3
      .scaleThreshold()
      .domain([1, 2, 3, 4])
      .range(['white', 'blue', 'green', 'yellow', 'red'])
    return (
      <div>
        <MapWrapper
          data={this.props.data}
          shouldRender={this.props.shouldRender}
          color={color}
        />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  // data: state.addedMap.arrestMapData,
  data: state.addedMap.subwayMapData,
  shouldRender: state.map.shouldRender
})

export default connect(mapStateToProps, null)(MapWithData)
