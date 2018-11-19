import React, {Component} from 'react'
import {connect} from 'react-redux'
// import {fetchSingleUser} from '../store/singleUser'
// import {me} from '../store/user'

const mapStateToProps = state => {
  return {
    user: state.singleUser.user
    // user: state.user,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getSingleUser: userId => dispatch(fetchSingleUser(userId))
    // getUser: () => dispatch(me()),
  }
}

class SingleUser extends Component {
  async componentDidMount() {
    // await this.props.getUser()
    await this.props.getSingleUser(Number(this.props.match.params.userId))
  }

  render() {
    return (
      <div>
        <h4> To be filled</h4>
      </div>
    )
  }
}

const ConnectedSingleUser = connect(mapStateToProps, mapDispatchToProps)(
  SingleUser
)

export default ConnectedSingleUser
