import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {fetchUsers} from '../store/users'
import {Grid, Card, Divider} from '@material-ui/core'
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
    await this.props.fetchUsers()
    // await this.props.getUser()
  }

  render() {
    const {users} = this.props || []

    return (
      <div id="users">
        <h1 id="usersHeadline"> List of all users </h1>
        {/* <Grid
          container
          direction="column"
          justify="left"
          alignItem="center"
          className="userContainer"
        > */}
        <div className="userContainer">
          <table>
            <div className="userHeader">
              <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Score</th>
              </tr>
            </div>
            {users.map(user => {
              return (
                // <Grid
                //   key={user.id}
                //   xs={12}
                //   sm={12}
                //   lg={6}
                //   xl={6}
                //   className="userList"
                // >
                <div key={user.id} className="userList">
                  <Link to={`users/${user.id}`}>
                    <tr>
                      <td>{user.firstName}</td>
                      <td>{user.lastName} </td>
                      <td>{user.email} </td>
                      <td>100</td>
                    </tr>
                  </Link>
                </div>
                // </Grid>
              )
            })}
          </table>
        </div>
        {/* </Grid> */}
      </div>
    )
  }
}

const ConnectedUsers = connect(mapStateToProps, mapDispatchToProps)(Users)

export default ConnectedUsers
