import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {fetchSingleUser} from '../store/singleUser'
import Axios from 'axios'
import Icon from '@material-ui/core/Icon'
import Button from '@material-ui/core/Button'
import {withStyles} from '@material-ui/core'
import SvgIcon from '@material-ui/core/SvgIcon'

const mapStateToProps = state => ({
  matchUsers: state.matchUsers.matchUsers,
  userId: state.user.id
})

const mapDispatchToProps = dispatch => ({
  getSingleUser: userId => dispatch(fetchSingleUser(userId))
  // getUser: () => dispatch(me()),
})

const styles = theme => ({
  button: {
    margin: theme.spacing.unit
  },
  extendedIcon: {
    marginRight: theme.spacing.unit
  }
})

class MatchUsers extends Component {
  constructor(props) {
    super(props)
    this.state = {
      matchedUser: []
    }
  }

  async componentDidMount() {
    console.log(this.props.matchUserList)
    const user1 = Axios.get(
      `./api/users/${Object.keys(this.props.matchUserList[0])}`
    )
    const user2 = Axios.get(
      `./api/users/${Object.keys(this.props.matchUserList[1])}`
    )
    const user3 = Axios.get(
      `./api//users/${Object.keys(this.props.matchUserList[2])}`
    )
    const userInfo = await Promise.all([user1, user2, user3])
    console.log(userInfo)
    this.setState({
      matchedUser: [userInfo[0].data, userInfo[1].data, userInfo[2].data]
    })
  }

  render() {
    const {classes} = this.props
    let idx = -1
    return (
      <div>
        Favorite User:
        <div />
        Matching users:
        <ul>
          {this.state.matchedUser.map(user => {
            idx++
            return (
              <li>
                <div>
                  <img
                    src={user.imgUrl}
                    style={{width: '50px', height: '50px'}}
                  />
                  Name: {user.firstName} {user.lastName}, location:{' '}
                  {user.location}, move in date: {user.moveInTime}, Stay
                  duration: {user.duration} Months, comaptibility score:{' '}
                  {Object.values(this.props.matchUserList[idx])}
                  <Button
                    color="secondary"
                    aria-label="Edit"
                    className={classes.button}
                  >
                    <SvgIcon>
                      <path
                        fill="#000000"
                        d="M23,10C23,8.89 22.1,8 21,8H14.68L15.64,3.43C15.66,3.33 15.67,3.22 15.67,3.11C15.67,2.7 15.5,2.32 15.23,2.05L14.17,1L7.59,7.58C7.22,7.95 7,8.45 7,9V19A2,2 0 0,0 9,21H18C18.83,21 19.54,20.5 19.84,19.78L22.86,12.73C22.95,12.5 23,12.26 23,12V10M1,21H5V9H1V21Z"
                      />
                    </SvgIcon>
                  </Button>
                  <Button
                    color="secondary"
                    aria-label="Edit"
                    className={classes.button}
                  >
                    <SvgIcon>
                      <path
                        fill="#000000"
                        d="M19,15H23V3H19M15,3H6C5.17,3 4.46,3.5 4.16,4.22L1.14,11.27C1.05,11.5 1,11.74 1,12V14A2,2 0 0,0 3,16H9.31L8.36,20.57C8.34,20.67 8.33,20.77 8.33,20.88C8.33,21.3 8.5,21.67 8.77,21.94L9.83,23L16.41,16.41C16.78,16.05 17,15.55 17,15V5C17,3.89 16.1,3 15,3Z"
                      />
                    </SvgIcon>
                  </Button>
                </div>
              </li>
            )
          })}
        </ul>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(
  withStyles(styles)(MatchUsers)
)
