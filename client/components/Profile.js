import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import axios from 'axios'
// import {me} from '../store/user'

/**
 * COMPONENT
 */
class Profile extends Component {
  constructor() {
    super()
    this.state = {
      singleUser: {}
    }
  }

  async componentDidMount() {
    try {
      // await this.props.getUser();
      const userId = Number(this.props.user.id)
      const response = await axios.get(`/api/users/${userId}`)
      const singleUser = response.data
      this.setState({singleUser})
    } catch (err) {
      console.log('error in fetching sigleUser in Profile module')
    }
  }

  render() {
    const {firstName, lastName, sex, age} = this.props.user
    const {user} = this.props
    console.log('user in profile: ', user)

    const singleUser = this.state.singleUser || {}
    console.log('singleUser: ', singleUser)

    const question = singleUser.question || {}
    console.log('question in profile: ', question)

    return (
      <div>
        <h3>Welcome to your profile {user.email}</h3>
        <br />
        <div>
          <h4>
            {' '}
            Personal Information{' '}
            <span className="edit">
              {' '}
              <Link to="/userinfoform"> Edit </Link>{' '}
            </span>{' '}
          </h4>
          <hr />
          <div>
            <div className="clearfix">
              <img
                className="img2"
                src="roommates.jpg"
                alt="Pineapple"
                width="170"
                height="170"
              />
              <p>
                {' '}
                {firstName} {lastName} {sex} {age}{' '}
              </p>
            </div>
          </div>
        </div>
        <br /> <br /> <br /> <br />
        <div>
          <h4>
            {' '}
            Preferences{' '}
            <span className="edit">
              {' '}
              <Link to="/questionform"> Edit </Link>{' '}
            </span>{' '}
          </h4>
          <hr />
          <table>
            <tr>
              <th>Question</th>
              <th>Answer</th>
            </tr>
            <tr>
              <td> budgetMin </td>
              <td>{question.budgetMin} </td>
            </tr>
            <tr>
              <td> budgetMax </td>
              <td>{question.budgetMax} </td>
            </tr>
            <tr>
              <td> budgetPrior </td>
              <td>{question.budgetPrior} </td>
            </tr>
            <tr>
              <td> location1 </td>
              <td>{question.location1} </td>
            </tr>
            <tr>
              <td> location2 </td>
              <td>{question.location2} </td>
            </tr>
            <tr>
              <td>pet</td>
              <td>{question.pet} </td>
            </tr>
            <tr>
              <td>Max age</td>
              <td>{question.ageMax} </td>
            </tr>
            <tr>
              <td>Min age</td>
              <td>{question.ageMin} </td>
            </tr>
            <tr>
              <td>Smoke</td>
              <td>{question.smoke} </td>
            </tr>
            <tr>
              <td>Sex</td>
              <td>{question.sex} </td>
            </tr>
            <tr>
              <td>tod</td>
              <td>{question.tod} </td>
            </tr>
          </table>
        </div>
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => ({
  user: state.user
})

// const mapDispatch = dispatch => ({
//       getUser: () => dispatch(me())
// })

export default connect(mapState, null)(Profile)

/**
 * PROP TYPES
 */
// UserHome.propTypes = {
//   email: PropTypes.string
// }
