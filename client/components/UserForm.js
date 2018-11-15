import React from 'react'
import { Link } from 'react-router-dom'

const UserForm = (props) => {
  const { score, firstName, lastName, email } = props
  return (
    <div>
      <Link to={'SingleUser'}>{score} | {firstName} {lastName} |  {email} </Link>

    </div>
  )
}

export default UserForm
