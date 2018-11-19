import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import UserForm from './UserForm'
// import {me} from '../store/user'
// import {fetchFavoriteUsers} from '../store/favoriteUsers'     // to be activated

const mapStateToProps = state => ({
  favoriteUsers: state.favoriteUsers.favoriteUsers
  // user: state.user,
})

const mapDispatchToProps = dispatch => ({
  fetchFavoriteUsers: () => dispatch(fetchFavoriteUsers())
  // getUser: () => dispatch(me()),
})

class AllMatchUsers extends Component {
  async componentDidMount() {
    // await this.props.getUser()
    await this.props.fetchFavoriteUsers()
  }

  render() {
    const {favoriteUsers} = this.props

    return (
      <div>
        <h1> Your favorite room8s: </h1>
        {favoriteUsers.map(user => {
          return (
            <div key={user.id}>
              <Link to={`users/${user.id}`}>
                <div>
                  <UserForm user={user} />
                </div>
              </Link>
            </div>
          )
        })}
      </div>
    )
  }
}

const ConnectedAllMatchUsers = connect(mapStateToProps, mapDispatchToProps)(
  AllMatchUsers
)

export default ConnectedAllMatchUsers
