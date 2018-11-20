import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch, Redirect} from 'react-router-dom'
import PropTypes from 'prop-types'
import {
  Login,
  Signup,
  UserHome,
  Main,
  Questions,
  Users,
  MatchUsers,
  FavoriteUsers,
  SingleUser,
  MapAndQuestions,
  UserInfoForm,
  QuestionsForm,
} from './components'
import {me, getMapData} from './store'

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData()
  }

  render() {
    const {isLoggedIn} = this.props
    return (
      <Switch>
        <Route exact path="/" component={Main} />
        <Route exact path="/main" component={Main} />
        <Route exact path="/home" component={UserHome} />
        <Route exact path="/map" component={MapAndQuestions} />
        {/* // personal info & link to {questions,AllMatchUsers, FavoriteUsers}  view */}
        <Route exact path="/questions" component={Questions} />
        {/* // should prepopulate with answers upon signIn; empy upon signUp, & link to AllMatchUsers view */}
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        {/* // <Route exact path="/neighborhoods" component={ NYCNeighborhoods } /> */}
        {isLoggedIn && (
          <Switch>
            {/* {/* Routes placed here are only available after logging in */}
            <Route exact path="/users" component={Users} />
            <Route exact path="/matchUsers" component={MatchUsers} />
            <Route exact path="/favoriteUsers" component={FavoriteUsers} />
            <Route exact path="/users/:userId" component={SingleUser} />
            <Route exact path="/questionform" component={QuestionsForm} />
            <Route exact path="/userinfoform" component={UserInfoForm} />
            <Route path="/home" component={UserHome} />
          </Switch>
        )}
        {/* Displays our main {Login} component as a fallback */}
        <Route component={Main} />
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
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    loadInitialData() {
      dispatch(me())
      dispatch(getMapData())
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
