import React from 'react'

const UserForm = props => {
  const {score, firstName, lastName, email} = props
  return (
    <div>
      {score} | {firstName} {lastName} | {email}
    </div>
  )
}

export default UserForm
