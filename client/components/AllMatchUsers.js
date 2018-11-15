import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchUsers} from '../store/users'
import {addEntryThunk, fetchCartEntries} from '../store/cart'
import {addEntryThunkGuest, fetchCartEntriesGuest} from '../store/guestCart'
import UserForm from './UserForm'
import {me} from '../store/user'

const mapStateToProps = state => {
  return {
    users: state.users.users,
    user: state.user,
    usersInCart: state.cart.cartList,
    usersInGuestCart: state.guestCart.cartList
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchUsers: () => dispatch(fetchUsers()),
    getCart: userId => dispatch(fetchCartEntries(userId)),
    addToCart: (userId, robotId, quantity) =>
      dispatch(addEntryThunk(userId, robotId, quantity)),
    getUser: () => dispatch(me()),

    getCartGuest: () => dispatch(fetchCartEntriesGuest()),
    addToCartGuest: (robotId, quantity) =>
      dispatch(addEntryThunkGuest(robotId, quantity))
  }
}

class AllMatchUsers extends Component {
  async componentDidMount() {
    await this.props.getUser()
    if (!!this.props.user.id) {
      await this.props.getCart(this.props.user.id)
    } else {
      await this.props.getCartGuest()
    }
    await this.props.fetchUsers()
  }

  render() {
    const {users, user, addToCart, addToCartGuest} = this.props

    return (
      <div>
        <h1>users:</h1>
        <ListComponent
          users={users}
          user={user}
          addToCart={addToCart}
          addToCartGuest={addToCartGuest}
        />
      </div>
    )
  }
}

const ConnectedAllMatchUsers = connect(mapStateToProps, mapDispatchToProps)(AllMatchUsers)

export default ConnectedAllMatchUsers
