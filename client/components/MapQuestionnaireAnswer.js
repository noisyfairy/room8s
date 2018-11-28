import React, {Component} from 'react'
import {connect} from 'react-redux'
import MapWrapper from './MapWrapper'
import {Link} from 'react-router-dom'
import axios from 'axios'

class MapQuestionnaireAnswer extends Component {
  constructor(props) {
    super(props)
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

  handleClick = async neighborhood => {
    await axios.put(`./api/users/${this.props.userId}`, {
      location: neighborhood.neighborhood
    })
    alert(
      `${
        neighborhood.neighborhood
      } has been saved to your profile as your preferred location`
    )
  }

  render() {
    const answer = this.state.whereYouShouldLive
    const color = d3
      .scaleThreshold()
      .domain([1, 2, 3, 4])
      .range(['white', '#D1F2EB', '#76D7C4', '#17A589'])
    return this.state.whereYouShouldLive !== null ? (
      <div>
        <h3>
          You should consider living in one of the following neighborhoods 🏠
        </h3>
        <h4>
          Find out more about each of these neighborhoods by visiting
          <Link to="knowledge-map"> Neighborhood Info</Link>!
        </h4>
        <div className="mapAndQuestions">
          <div className="answerBox">
            {answer.map(neighborhood => (
              <div key={answer.indexOf(neighborhood)}>
                {this.props.isLoggedIn && (
                  <button
                    onClick={() => {
                      this.handleClick(neighborhood)
                    }}
                  >
                    Save to preference
                  </button>
                )}&nbsp;&nbsp;
                {neighborhood.neighborhood},&nbsp;
                {neighborhood.borough}<br/>
              </div>
            ))}
            <br />
            <br />
            <br />

            {!this.props.isLoggedIn && (
              <div>
                Want to find a roommate in NYC?
                <Link to="/signup"> Sign up for an account</Link> and our
                algorithm will match you up with a roommate based on your
                preferences!
              </div>
            )}
            <div>
              <div>
                <br />Not liking the results?
              </div>
              <Link to="/map">Click me </Link>
              to take the test again
            </div>
          </div>
          <MapWrapper
            color={color}
            data={this.props.mapData}
            shouldRender={this.props.shouldRender}
          />
        </div>
      </div>
    ) : (
      <div>
        <br />
        <br />
        Fill out the <Link to="/map">questionnaire!</Link> to find out where you
        should live!
      </div>
    )
  }
}

const mapStateToProps = state => ({
  mapData: state.map.mapData,
  isLoggedIn: !!state.user.id,
  shouldRender: state.map.shouldRender,
  userId: state.user.id
})

const ConnectedMapQuestionnaireAnswer = connect(mapStateToProps)(
  MapQuestionnaireAnswer
)

export default ConnectedMapQuestionnaireAnswer
