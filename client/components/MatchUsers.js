import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import UserForm from './UserForm'
import Algo from './algo'
// import {me} from '../store/user'
// import {fetchMatchUsers} from '../store/matchUsers'       // to be activated

const mapStateToProps = state => ({
  matchUsers: state.matchUsers.matchUsers,
  userId: state.user.id
})

const mapDispatchToProps = dispatch => ({
  fetchMatchUsers: () => dispatch(fetchMatchUsers())
  // getUser: () => dispatch(me()),
})

class MatchUsers extends Component {
  // async componentDidMount() {
  //   // await this.props.getUser()
  //   await this.props.fetchMatchUsers()
  // }

  render() {
    const {matchUsers} = this.props

    return (
      <div>
        <h1> Your initial match room8s: </h1>
        <Algo id={this.props.userId} />
      </div>
    )
  }
}

const ConnectedMatchUsers = connect(mapStateToProps, mapDispatchToProps)(
  MatchUsers
)

export default ConnectedMatchUsers
