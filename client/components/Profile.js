import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import axios from 'axios'
import {me} from '../store/user'

/**
 * COMPONENT
 */
// helper functions

const priorityNumToString = num => {
  switch (num) {
    case '1':
      return 'Never'
    case '2':
      return 'Rarely'
    case '3':
      return 'Sometimes'
    case '4':
      return 'Often'
    case '5':
      return 'Very Often'
    default:
      return 'Sometimes'
  }
}

const booleanToString = bool => {
  if (bool === 'true') {
    return 'Ok'
  }
  if (bool === 'false') {
    return 'Not Ok'
  }
}

class Profile extends Component {
  constructor() {
    super()
    this.state = {
      singleUser: {}
    }
  }

  async componentDidMount() {
    try {
      await this.props.getUser()
      const userId = Number(this.props.user.id)
      const response = await axios.get(`/api/users/${userId}`)
      const singleUser = response.data
      this.setState({singleUser})
    } catch (err) {
      console.log('error in fetching sigleUser in Profile module')
    }
  }

  render() {
    const {firstName, lastName, sex, age, email} = this.props.user
    const {user} = this.props
    console.log('user in profile: ', user)

    const singleUser = this.state.singleUser || {}
    console.log('singleUser: ', singleUser)

    const question = singleUser.question || {}
    console.log('question in profile: ', question)

    console.log('is it hit profile')

    return (
      <div>
        <h3> Welcome to your profile { firstName ? firstName : email } </h3>
        <br />
        <div>
          <h4>
            {' '}
            Personal Information{' '}
            <span className="edit">
              {' '}
              <Link to="/userinfo"> Edit </Link>{' '}
            </span>{' '}
          </h4>
          <hr />
          <div>
            <div className="clearfix">
              <img
                className="img2"
                src="placeholder.png"
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
              <Link to="/preference"> Edit </Link>{' '}
            </span>{' '}
          </h4>
          <hr />
          <table>

            <thead>
              <tr>
                <th>Question</th>
                <th>Answer</th>
                <th>Priority</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td> Budget Range</td>
                <td>{question.budgetMin} - {question.budgetMax}</td>
                <td>{question.budgetPrior}</td>
              </tr>
              <tr>
                <td> Location </td>
                <td>{user.location} </td>
                <td>{question.locationPrior} </td>
              </tr>
              <tr>
                <td> Move in Time </td>
                <td>{user.moveInTime} </td>
                <td>{question.moveInPrior} </td>
              </tr>
              <tr>
                <td> Duration </td>
                <td>{user.duration} </td>
                <td>{question.duraPrior} </td>
              </tr>
              <tr>
                <td>Age Range</td>
                <td>{question.ageMin} - {question.ageMax} </td>
                <td>{question.sexPrior} </td>
              </tr>
              <tr>
                <td>Smoke</td>
                <td> {booleanToString(`${question.smoke}`)} </td>
                <td>{question.smokePrior} </td>
              </tr>
              <tr>
                <td>Pet</td>
                <td>{booleanToString(`${question.pet}`)} </td>
                <td>{question.petPrior} </td>
              </tr>
              <tr>
                <td>Sex</td>
                <td>{question.sex} </td>
                <td>{question.sexPrior} </td>
              </tr>
              <tr>
                <td>Clean</td>
                <td> { priorityNumToString(`${question.clean}`) } </td>
                <td>{question.cleanPrior} </td>
              </tr>
              <tr>
                <td>Guest</td>
                <td> { priorityNumToString(`${question.guest}`) } </td>
                <td>{question.guestPrior} </td>
              </tr>
              <tr>
                <td>Introvert</td>
                <td>{question.introvert} </td>
                <td>{question.introPrior} </td>
              </tr>
              <tr>
                <td>Tod</td>
                <td>{question.tod} </td>
                <td>{question.todPrior} </td>
              </tr>
            </tbody>

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

const mapDispatch = dispatch => ({
  getUser: () => dispatch(me())
})

export default connect(mapState, mapDispatch)(Profile)

/**
 * PROP TYPES
 */
// UserHome.propTypes = {
//   email: PropTypes.string
// }
