import React, {Component} from 'react'
import {connect} from 'react-redux'
import MapWrapper from './MapWrapper'
import ConnectedMapQuestionnaire from './MapQuestionnaire'

class MapAndQuestions extends Component {
  render() {
    const color = d3
      .scaleThreshold()
      .domain([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
      .range([
        '#ffffff',
        'black',
        '#e6e6e6',
        '#d9d9d9',
        '#cccccc',
        '#bfbfbf',
        '#b3b3b3',
        '#a6a6a6',
        '#999999',
        '#8c8c8c '
      ])
    return (
      <div>
        <ConnectedMapQuestionnaire />
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
  data: state.map.mapData,
  shouldRender: state.map.shouldRender
})

const connectedMapAndQuestions = connect(mapStateToProps)(MapAndQuestions)

export default connectedMapAndQuestions
