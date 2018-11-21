import React from 'react'
import {Link} from 'react-router-dom'
import {Login} from './auth-form'

const Main = () => {
  return (
    <div>
      <div>
        <Login />
      </div>

      <div>
        <h4> New to NYC and want to know where you should live? </h4>
        <h4> Want to know more about each neighborgood </h4>
        <h4>
          <i> Find out more here </i> <Link to="neighborhoods"> Map </Link>
        </h4>
      </div>
    </div>
  )
}

export default Main
