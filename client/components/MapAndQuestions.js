import React, {Component} from 'react'
import ConnectedMapWrapper from './MapWrapper'
import ConnectedMapQuestionnaire from './MapQuestionnaire'

class MapAndQuestions extends Component {
  render() {
    return (
      <div>
        <ConnectedMapQuestionnaire />
        <ConnectedMapWrapper />
      </div>
    )
  }
}

export default MapAndQuestions
