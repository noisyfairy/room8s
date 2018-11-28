import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

/**
 * COMPONENT
 */
export const UserHome = props => {
  const {email} = props
  console.log('hit user-home component')

  return (
    <div>
      <h3>Welcome, {email}</h3>
      <p>
        {' '}
        <Link to="/profile"> Your Profile </Link>
      </p>
      <br />
      <h4> New user </h4>
      <p>
        Please go to your <Link to="/userinfo"> User Information Form </Link>{' '}
        and complete your personal information
      </p>
      <p>
        You should also go to <Link to="/preferences"> Question Form </Link> and
        choose your preferences
      </p>
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    email: state.user.email
  }
}

export default connect(mapState)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
