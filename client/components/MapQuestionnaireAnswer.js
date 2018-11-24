import React, {Component} from 'react'
import {connect} from 'react-redux'
import history from '../history'

class MapQuestionnaireAnswer extends Component {
  constructor() {
    super()
    this.state = {
      liveHere: []
    }
  }

  componentDidMount() {
    let neighborhoods = this.props.mapData.features
    console.log(`NEIGHBORHOODS HERE: `, neighborhoods)
    let mapScore = {}
    for (let neighborhood of neighborhoods) {
      console.log(neighborhood.properties.score)
      if (mapScore[neighborhood.properties.score]) {
        mapScore[neighborhood.properties.score].push(
          neighborhood.properties.neighborhood
        )
      } else {
        mapScore[neighborhood.properties.score] = [
          neighborhood.properties.neighborhood
        ]
      }
    }
  }

  render() {
    return <div>"oh hai, looks like you should live here!"</div>
  }
}

const mapStateToProps = state => ({
  mapData: state.map.mapData
})
const ConnectedMapQuestionnaireAnswer = connect(mapStateToProps)(
  MapQuestionnaireAnswer
)
export default ConnectedMapQuestionnaireAnswer
