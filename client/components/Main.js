import React from 'react'
import {Login} from './auth-form'
import {connect} from 'react-redux'
import UserHome from './user-home'

const Main = props => {
  const {isLoggedIn} = props
  return (
    <div className="main">
      <div>{isLoggedIn ? <UserHome /> : <Login />}</div>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    isLoggedIn: !!state.user.id
  }
}

export default connect(mapStateToProps, null)(Main)

//  {/* <div id="about">
//         <h4> New to NYC and want to know where you should live? </h4>
//         <h4> Want to know more about each neighborgood </h4>
//         <h4>
//           <i> Find out more here </i> <Link to="map"> Map </Link>
//         </h4>
//       </div> */}
