import React from 'react'

const UserForm = props => {
  const {firstName, lastName, email} = props
  return (
    <div>
      {firstName} {lastName} | {email}
    </div>
  )
}

export default UserForm
