import React, {Component} from 'react'
import {connect} from 'react-redux'
import MapWrapper from './MapWrapper'
import ConnectedMapQuestionnaire from './MapQuestionnaire'

class MapAndQuestions extends Component {
  render() {
    return (
      <div>
        <ConnectedMapQuestionnaire />
        <MapWrapper
          data={this.props.data}
          shouldRender={this.props.shouldRender}
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
