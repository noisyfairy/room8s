import React, {Component} from 'react'
import ConnectedMapWrapper from './MapWrapper'
import MapQuestionnaire from './MapQuestionnaire'

class MapAndQuestions extends Component {
  render() {
    return (
      <div>
        <MapQuestionnaire />
        <ConnectedMapWrapper />
      </div>
    )
  }
}

export default MapAndQuestions
