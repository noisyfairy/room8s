import React, {Component} from 'react'
import {connect} from 'react-redux'
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
  fetchFavoriteUsers,
  createFavoriteUser,
  removeFavoriteUser,
  deleteMutualUser
} from '../store/favoriteUsers'

const mapStateToProps = state => ({
  matchUsers: state.matchUsers.matchUsers,
  favUsers: state.favoriteUsers.favoriteUsers,
  userId: state.user.id,
  matchScores: state.matchUsers.matchScores
})

const mapDispatchToProps = dispatch => ({
  getFavUsers: userId => dispatch(fetchFavoriteUsers(userId)),
  addFavUser: (userId, favId) => dispatch(createFavoriteUser(userId, favId)),
  deleteFavUser: (userId, favId) => dispatch(removeFavoriteUser(userId, favId)),
  deleteMutualUser: userId => {
    dispatch(deleteMutualUser(userId))
  }
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
  }

  componentDidMount() {
    this.props.getFavUsers(this.props.userId)
  }

  handleClickUp(favId) {
    this.props.addFavUser(this.props.userId, favId)
  }

  handleDelete(favId) {
    this.props.deleteFavUser(this.props.userId, favId)
    this.props.deleteMutualUser(favId)
  }

  render() {
    const {classes} = this.props
    let idx = -1
    return (
      <div>
        <Typography variant="h6" className={classes.title}>
          Favorite users:
        </Typography>
        <hr />
        {this.props.favUsers.length > 0 && (
          <div>
            {this.props.favUsers.map(user => {
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
        <div />
        <Typography variant="h6" className={classes.title}>
          Matching users:
        </Typography>
        <hr />
        {this.props.matchUsers.length > 0 && (
          <div>
            {console.log(this.props.matchScores)}
            {this.props.matchUsers.map(user => {
              idx++
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
                          <br />
                          {this.props.matchScores.length > 0 &&
                            `Compatibility score - ${
                              Object.values(this.props.matchScores[idx])[0]
                            }`}
                        </h7>
                      }
                    />
                    <ListItemSecondaryAction>
                      <IconButton
                        aria-label="Delete"
                        onClick={() => {
                          this.handleClickUp(user.id)
                        }}
                      >
                        <SvgIcon>
                          <path
                            fill="#000000"
                            d="M12,21.35L10.55,20.03C5.4,15.36 2,12.27 2,8.5C2,5.41 4.42,3 7.5,3C9.24,3 10.91,3.81 12,5.08C13.09,3.81 14.76,3 16.5,3C19.58,3 22,5.41 22,8.5C22,12.27 18.6,15.36 13.45,20.03L12,21.35Z"
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
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(
  withStyles(styles)(MatchUsers)
)
