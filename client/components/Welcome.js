import React from 'react'
import {Link} from 'react-router-dom'

const Welcome = () => {
  return (
    <div>
      <h2>Welcome</h2>
      <p>this is the Room8s website</p>
      <p> We are here to help you find your match roommate</p>
      <p>
        {' '}
        <Link to="/signup"> Signup </Link> if you are a new user
      </p>
      <p>
        {' '}
        <Link to="/login"> Login </Link> if you are a returning user
      </p>
    </div>
  )
}

export default Welcome
