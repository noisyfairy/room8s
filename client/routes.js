import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch, Redirect} from 'react-router-dom'
import PropTypes from 'prop-types'
import {
  Login,
  Signup,
  UserHome,
  Main,
  Profile,
  MatchUsers,
  FavoriteUsers,
  SingleUser,
  ConnectedMapAndQuestions,
  UserInfoForm,
  QuestionsForm,
  ConnectedMapQuestionnaireAnswer,
  MapWithData
} from './components'
import {
  me,
  getMapData,
  getSubwayMapData,
  getArrestMapData,
  getHousingViolationsData
} from './store'
import axios from 'axios'

/**
 * COMPONENT
 */
class Routes extends Component {
  async componentDidMount() {
    this.props.loadInitialData()
    console.log('waiting for arrest data to load')
    await this.props.loadArrestData()
    // console.log('arrest data has loaded')
    // console.log('this is arrest data', this.props.arrestData)
    // axios.post('/api/arrestSave', this.props.arrestData)
  }

  render() {
    const {isLoggedIn} = this.props
    console.log(isLoggedIn)
    return (
      <Switch>
        <Route exact path="/" component={Main} />
        <Route exact path="/main" component={Main} />
        <Route exact path="/home" component={UserHome} />
        <Route exact path="/map" component={ConnectedMapAndQuestions} />
        {/* // personal info & link to {questions,AllMatchUsers, FavoriteUsers}  view */}
        {/* // should prepopulate with answers upon signIn; empy upon signUp, & link to AllMatchUsers view */}
        <Route exact path="/login" component={Login} />
        <Route exact path="/signup" component={Signup} />
        <Route
          exact
          path="/answer"
          component={ConnectedMapQuestionnaireAnswer}
        />
        {/* // <Route exact path="/neighborhoods" component={ NYCNeighborhoods } /> */}
        <Route exact path="/knowledge-map" component={MapWithData} />
        {/* // <Route exact path="/neighborhoods" component={ NYCNeighborhoods } /> */}

        {/* <Route exact path="/users" component={Users} />npm */}
        {isLoggedIn && (
          <Switch>
            {/* {/* Routes placed here are only available after logging in */}
            <Route exact path="/matchUsers" component={MatchUsers} />
            <Route exact path="/favoriteUsers" component={FavoriteUsers} />
            <Route exact path="/users/:userId" component={SingleUser} />
            <Route exact path="/preferences" component={QuestionsForm} />
            <Route exact path="/userinfo" component={UserInfoForm} />
            <Route exact path="/home" component={UserHome} />
            <Route exact path="/profile" component={Profile} />
          </Switch>
        )}
        {/* Displays our main {Login} component as a fallback */}
        <Route component={Main} />
        {/* <Redirect to="/main" /> */}
      </Switch>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    isLoggedIn: !!state.user.id,
    arrestData: state.arrestData
  }
}

const mapDispatch = dispatch => {
  return {
    loadInitialData() {
      dispatch(me())
      dispatch(getMapData())
      dispatch(getSubwayMapData())
      dispatch(getHousingViolationsData())
    },
    async loadArrestData() {
      await dispatch(getArrestMapData())
    }
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes))

/**
 * PROP TYPES
 */
Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
