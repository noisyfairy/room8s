import React, {Component} from 'react'
import {connect} from 'react-redux'
import history from '../history'

class MapQuestionnaireAnswer extends Component {
  state = {
    whereYouShouldLive: null
  }

  componentDidMount() {
    if (this.props.mapData) {
      let neighborhoods = this.props.mapData.features
      let mapScore = {}
      for (let neighborhood of neighborhoods) {
        if (mapScore[neighborhood.properties.score]) {
          mapScore[neighborhood.properties.score].push(neighborhood.properties)
        } else {
          mapScore[neighborhood.properties.score] = [neighborhood.properties]
        }
      }
      const MaxScore = Math.max(...Object.keys(mapScore))
      const neighborhoodForYou = mapScore[MaxScore]
      console.log(neighborhoodForYou)
      this.setState({
        whereYouShouldLive: neighborhoodForYou
      })
    }
  }

  render() {
    const answer = this.state.whereYouShouldLive
    return (
      this.state.whereYouShouldLive !== null && (
        <div>
          "based on your preferences, looks like you should considering living
          in the following areas!"
          {answer.map(neighborhood => (
            <div key={answer.indexOf(neighborhood)}>
              {neighborhood.neighborhood},&nbsp;
              {neighborhood.borough}
            </div>
          ))}
        </div>
      )
    )
  }
}

const mapStateToProps = state => ({
  mapData: state.map.mapData
})
const ConnectedMapQuestionnaireAnswer = connect(mapStateToProps)(
  MapQuestionnaireAnswer
)
export default ConnectedMapQuestionnaireAnswer
