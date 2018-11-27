import React, {Component} from 'react'
import history from '../history'
import {connect} from 'react-redux'

import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'

class MenuBar extends Component {
  render() {
    const {isLoggedIn} = this.props
    return (
      <div>
        <List>
          {isLoggedIn && (
            <ListItem button onClick={() => history.push('profile')}>
              <ListItemText primary="Profile" />
            </ListItem>
          )}
          <ListItem button onClick={() => history.push('/map')}>
            <ListItemText primary="Map" />
          </ListItem>
          <ListItem button onClick={() => history.push('/knowledge-map')}>
            <ListItemText primary="Knowledge Map" />
          </ListItem>
          {/* <ListItem button onClick={() => history.push('/users')}>
          <ListItemText primary="Users" />
        </ListItem> */}
          {isLoggedIn && (
            <ListItem button onClick={() => history.push('/matchUsers')}>
              <ListItemText primary="Match Users" />
            </ListItem>
          )}
          {/* <ListItem button onClick={() => history.push('/FavoriteUsers')}>
          <ListItemText primary="Favorite Users" />
        </ListItem> */}
        </List>
      </div>
    )
  }
}

const mapState = state => ({
  isLoggedIn: !!state.user.id
})

export default connect(mapState, null)(MenuBar)
