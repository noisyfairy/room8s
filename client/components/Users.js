import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {fetchUsers} from '../store/users'
// import {me} from '../store/user'
// import {fetchUsers} from '../store/users'        // to be activated

const mapStateToProps = state => ({
  users: state.users.users
  // user: state.user,
})

const mapDispatchToProps = dispatch => ({
  fetchUsers: () => dispatch(fetchUsers())
  // getUser: () => dispatch(me()),
})

class Users extends Component {
  async componentDidMount() {
    // await this.props.getUser()
    await this.props.fetchUsers()
  }

  render() {
    const {users} = this.props || []

    return (
      <div>
        <h1> List of all users </h1>
        {users.map(user => {
          return (
            <div key={user.id}>
              <Link to={`users/${user.id}`}>
                <div>
                  {user.firstName} {user.lastName} | {user.email}
                </div>
              </Link>
            </div>
          )
        })}
      </div>
    )
  }
}

const ConnectedUsers = connect(mapStateToProps, mapDispatchToProps)(Users)

export default ConnectedUsers
