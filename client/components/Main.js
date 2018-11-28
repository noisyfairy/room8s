import React from 'react'
// import {Login} from './auth-form'
import {connect} from 'react-redux'
import UserHome from './user-home'
import Welcome from './Welcome'

const Main = props => {
  const {isLoggedIn} = props
  return (
    <div className="main">
      <div>{isLoggedIn ? <UserHome /> : <Welcome />} </div>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    isLoggedIn: !!state.user.id
  }
}

export default connect(mapStateToProps, null)(Main)
