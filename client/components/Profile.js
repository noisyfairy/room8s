import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import axios from 'axios'
import {me} from '../store/user'
import {TwoWayFav} from '../components'
import {withStyles} from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'

/**
 * COMPONENT
 */
// helper functions

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto'
  },
  table: {
    minWidth: 700
  }
})

const priorityLevelToString = num => {
  switch (num) {
    case '1':
      return 'Do not care'
    case '2':
      return 'Do not mind'
    case '3':
      return 'Important'
    case '4':
      return 'Pretty important'
    case '5':
      return 'Extremely important'
    default:
      return 'Average'
  }
}

const booleanToString = bool => {
  if (bool === 'true') {
    return 'Yes'
  }
  if (bool === 'false') {
    return 'Prefer not'
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
    const {firstName, lastName, sex, age, email, imgUrl} = this.props.user
    const {user} = this.props
    const {classes} = this.props
    const singleUser = this.state.singleUser || {}
    const question = singleUser.question || {}

    return (
      <div>
        <h1>Profile</h1>
        <h4>
          Personal Information
          <span className="edit">
            <Link to="/userinfo"> Edit </Link>
          </span>
        </h4>
        <hr />
        <div>
          <div className="clearfix">
            <img
              className="img2"
              src={imgUrl}
              alt="Pineapple"
              width="170"
              height="170"
            />
            <p>
              Name: {firstName} {lastName}
              <br />
              Sex: {sex}
              <br />
              Age: {age} <br /> Email: {email}
            </p>
          </div>
        </div>
        <div>
          <h4> Mutual Favorites </h4>
          <hr />
          <TwoWayFav />
        </div>
        <div>
          <h4>
            Preferences
            <span className="edit">
              <Link to="/preferences"> Edit </Link>
            </span>
          </h4>
          <Paper className={classes.root}>
            <Table className={classes.table}>
              <TableHead>
                <TableRow>
                  <TableCell>Question</TableCell>
                  <TableCell>Your answer</TableCell>
                  <TableCell>Importance of each category</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>Budget Range</TableCell>
                  <TableCell>
                    {question.budgetMin} - {question.budgetMax}
                  </TableCell>
                  <TableCell>
                    {priorityLevelToString(`${question.budgetPrior}`)}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Preferred Location</TableCell>
                  <TableCell>{user.location}</TableCell>
                  <TableCell>
                    {priorityLevelToString(`${question.locationPrior}`)}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>When do you want to move in?</TableCell>
                  <TableCell>{user.moveInTime}</TableCell>
                  <TableCell>
                    {priorityLevelToString(`${question.duraPrior}`)}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Preferred roommate age range</TableCell>
                  <TableCell>
                    {question.ageMin} - {question.ageMax}
                  </TableCell>
                  <TableCell>
                    {priorityLevelToString(`${question.agePrior}`)}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Living with a smoker?</TableCell>
                  <TableCell>{booleanToString(`${question.smoke}`)}</TableCell>
                  <TableCell>
                    {priorityLevelToString(`${question.smokePrior}`)}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Can your roommate bring a pet?</TableCell>
                  <TableCell>{booleanToString(`${question.pet}`)}</TableCell>
                  <TableCell>
                    {priorityLevelToString(`${question.petPrior}`)}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    Do you have a strong preference for your roommate's sex
                  </TableCell>
                  <TableCell>
                    {question.sex ? 'Same sex' : 'No preference'}
                  </TableCell>
                  <TableCell>
                    {priorityLevelToString(`${question.sexPrior}`)}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Your roommate's cleaniness Level?</TableCell>
                  <TableCell>
                    {question.clean
                      ? 'Need my roommate to be clean'
                      : 'No preference'}
                  </TableCell>
                  <TableCell>
                    {priorityLevelToString(`${question.cleanPrior}`)}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>You prefer your roommate to be...</TableCell>
                  <TableCell>
                    {question.introvert === 'introvert'
                      ? 'Introverted'
                      : 'Extroverted'}
                  </TableCell>
                  <TableCell>
                    {priorityLevelToString(`${question.introPrior}`)}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>You prefer your roommate to be...</TableCell>
                  <TableCell>{question.tod} person</TableCell>
                  <TableCell>
                    {priorityLevelToString(`${question.todPrior}`)}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Paper>
        </div>
      </div>
    )
  }
}

const mapState = state => ({
  user: state.user
})

const mapDispatch = dispatch => ({
  getUser: () => dispatch(me())
})

export default connect(mapState, mapDispatch)(withStyles(styles)(Profile))
