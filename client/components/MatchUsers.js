import React, {Component} from 'react'
import {connect} from 'react-redux'
import { Link } from 'react-router-dom'
import UserForm from './UserForm'
// import {me} from '../store/user'
// import {fetchMatchUsers} from '../store/matchUsers'       // to be activated

const mapStateToProps = state => (
  {
    matchUsers: state.matchUsers.matchUsers,
    // user: state.user,
  }
)

const mapDispatchToProps = dispatch => (
  {
    fetchMatchUsers: () => dispatch(fetchMatchUsers()),
    // getUser: () => dispatch(me()),
  }
)

class MatchUsers extends Component {

  async componentDidMount() {
    // await this.props.getUser()
    await this.props.fetchMatchUsers()
  }

  render() {
    const { matchUsers } = this.props

    return (
      <div>
        <h1> Your initial match room8s: </h1>
        {
          matchUsers.map(user => {
            return (
              <div key = {user.id} >
                <Link to={`users/${user.id}`}>
                  <div>
                    <UserForm user= {user} />
                  </div>
                </Link>
              </div>
            )}
          )
        }
      </div>
    )
  }
}

const ConnectedMatchUsers = connect(mapStateToProps, mapDispatchToProps)(MatchUsers)

export default ConnectedMatchUsers
