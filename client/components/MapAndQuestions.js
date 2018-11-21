import React, {Component} from 'react'
import {connect} from 'react-redux'
import MapWrapper from './MapWrapper'
import ConnectedMapQuestionnaire from './MapQuestionnaire'

class MapAndQuestions extends Component {
  render() {
    const color = d3
      .scaleThreshold()
      .domain([1, 2, 3, 4])
      .range(['white', 'yellow', 'orange', 'red'])
    return (
      <div className="mapAndQuestions">
        <MapWrapper
          data={this.props.data}
          shouldRender={this.props.shouldRender}
          color={color}
        />
        <ConnectedMapQuestionnaire />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  data: state.map.mapData,
  shouldRender: state.map.shouldRender
})

const connectedMapAndQuestions = connect(mapStateToProps)(MapAndQuestions)

export default connectedMapAndQuestions
