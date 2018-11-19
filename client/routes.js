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
  AllMatchUsers,
  SingleUser,
  FavoriteUsers,
  ConnectedMapWrapper
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
        <Route path="/main" component={Main} />
        <Route path="/mapview" component={ConnectedMapWrapper} />{' '}
        {/* // then a link to Main view */}
        <Route path="/home" component={UserHome} />{' '}
        {/* // personal info & link to {questions,AllMatchUsers, FavoriteUsers}  view */}
        <Route path="/questions" component={Questions} />{' '}
        {/* // should prepopulate with answers upon signIn; empy upon signUp, & link to AllMatchUsers view */}
        <Route exact path="/users" component={AllMatchUsers} />
        <Route exact path="/users/favoriteUsers" component={FavoriteUsers} />
        <Route path="/users/:userId" component={SingleUser} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        {isLoggedIn && (
          <Switch>
            {/* Routes placed here are only available after logging in */}
            <Route path="/home" component={UserHome} />
          </Switch>
        )}
        {/* Displays our main {Login} component as a fallback */}
        {/* <Route component={Login} /> */}
        <Redirect to="/main" />
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
