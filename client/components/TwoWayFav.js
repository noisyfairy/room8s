import React, {Component} from 'react'
import {connect} from 'react-redux'
import Button from '@material-ui/core/Button'
import {withStyles} from '@material-ui/core'
import SvgIcon from '@material-ui/core/SvgIcon'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import Typography from '@material-ui/core/Typography'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import ListItemText from '@material-ui/core/ListItemText'
import Avatar from '@material-ui/core/Avatar'
import IconButton from '@material-ui/core/IconButton'
import {
  getTWoWayUser,
  removeMutualUser,
  deleteFavoriteUser
} from '../store/favoriteUsers'

/**
 * COMPONENT
 */
class TwoWayFav extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.getMutualUsers(this.props.userId)
  }

  handleDelete(favId) {
    this.props.deleteMutualUser(this.props.userId, favId)
    this.props.deleteFavoriteUser(favId)
  }

  render() {
    const {classes} = this.props
    return (
      <React.Fragment>
        {this.props.mutualUsers.length > 0 && (
          <div>
            {this.props.mutualUsers.map(user => {
              return (
                <List dense="dense">
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar style={{width: '75px', height: '75px'}}>
                        <img
                          src={user.imgUrl}
                          style={{width: '75px', height: '75px'}}
                        />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        <h7>
                          {`${user.firstName} ${user.lastName}`}
                          <br />
                          {`Preferences - ${user.location}, ${
                            user.moveInTime
                          }, ${user.duration} Months`}
                        </h7>
                      }
                      secondary={<h7>{user.email}</h7>}
                    />
                    <ListItemSecondaryAction>
                      <IconButton
                        aria-label="Delete"
                        onClick={() => {
                          this.handleDelete(user.id)
                        }}
                      >
                        <SvgIcon>
                          <path
                            fill="#000000"
                            d="M12.1,18.55L12,18.65L11.89,18.55C7.14,14.24 4,11.39 4,8.5C4,6.5 5.5,5 7.5,5C9.04,5 10.54,6 11.07,7.36H12.93C13.46,6 14.96,5 16.5,5C18.5,5 20,6.5 20,8.5C20,11.39 16.86,14.24 12.1,18.55M16.5,3C14.76,3 13.09,3.81 12,5.08C10.91,3.81 9.24,3 7.5,3C4.42,3 2,5.41 2,8.5C2,12.27 5.4,15.36 10.55,20.03L12,21.35L13.45,20.03C18.6,15.36 22,12.27 22,8.5C22,5.41 19.58,3 16.5,3Z"
                          />
                        </SvgIcon>
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                </List>
              )
            })}
          </div>
        )}
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => ({
  mutualUsers: state.favoriteUsers.mutualUsers,
  userId: state.user.id
})

const mapDispatchToProps = dispatch => ({
  deleteMutualUser: (userId, favId) =>
    dispatch(removeMutualUser(userId, favId)),
  getMutualUsers: userId => dispatch(getTWoWayUser(userId)),
  deleteFavoriteUser: userId => dispatch(deleteFavoriteUser(userId))
})

const styles = theme => ({
  button: {
    margin: theme.spacing.unit
  },
  extendedIcon: {
    marginRight: theme.spacing.unit
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(
  withStyles(styles)(TwoWayFav)
)
