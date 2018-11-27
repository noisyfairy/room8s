import React, {Component} from 'react'
import {connect} from 'react-redux'
import {selectPreferredNeighborhood} from '../store/index'
import MapWrapper from './MapWrapper'
import {Link} from 'react-router-dom'

class MapQuestionnaireAnswer extends Component {
  constructor() {
    super()
    this.state = {
      whereYouShouldLive: null
    }
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

      this.setState({
        whereYouShouldLive: neighborhoodForYou
      })
    }
  }

  render() {
    const answer = this.state.whereYouShouldLive
    const color = d3
      .scaleThreshold()
      .domain([1, 2, 3, 4])
      .range(['white', '#D1F2EB', '#76D7C4', '#17A589'])
    console.log(this.props)
    return this.state.whereYouShouldLive !== null ? (
      <div>
        <div className="mapAndQuestions">
          <MapWrapper
            color={color}
            data={this.props.mapData}
            shouldRender={this.props.shouldRender}
          />
          <div className="answerBox">
            You should consider living in the following neighborhoods<br />
            {answer.map(neighborhood => (
              <div key={answer.indexOf(neighborhood)}>
                {this.props.isLoggedIn && (
                  <button
                    type="button"
                    onClick={() => {
                      alert(
                        `${
                          neighborhood.neighborhood
                        } has been saved to your profile as your preferred location`
                      )
                      this.props.selectPreferredNeighborhood(
                        neighborhood.neighborhood
                      )
                    }}
                  >
                    Save to preference
                  </button>
                )}&nbsp;
                {neighborhood.neighborhood},&nbsp;
                {neighborhood.borough}
              </div>
            ))}
            <br />
          </div>
        </div>
        {!this.props.isLoggedIn && (
          <div>
            Want to find a roommate in NYC?
            <Link to="/signup">Sign up for an account</Link> and our algorithm
            will match you up with a roommate based on your preferences!
          </div>
        )}
      </div>
    ) : (
      <div>
        <br />
        <br />
        Please make sure to fill out the <Link to="/map">questionnaire!</Link>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  mapData: state.map.mapData,
  isLoggedIn: !!state.user.id,
  shouldRender: state.map.shouldRender
})

const mapDispatchToProps = dispatch => {
  return {
    selectPreferredNeighborhood: neighborhood =>
      dispatch(selectPreferredNeighborhood(neighborhood))
  }
}

const ConnectedMapQuestionnaireAnswer = connect(
  mapStateToProps,
  mapDispatchToProps
)(MapQuestionnaireAnswer)

export default ConnectedMapQuestionnaireAnswer
