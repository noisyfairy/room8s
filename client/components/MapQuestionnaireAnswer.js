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
      // console.log(mapScore[MaxScore])
      const neighborhoodForYou = mapScore[MaxScore]
      this.setState({
        whereYouShouldLive: neighborhoodForYou
      })
    }
  }

  render() {
    return (
      <div>
        "oh hai, looks like you should live here!"<br />
        {/* <div>{this.neighborhoodForYou}</div> */}
      </div>
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
