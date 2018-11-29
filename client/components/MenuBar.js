import React, {Component} from 'react'
import history from '../history'
import {connect} from 'react-redux'

import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import {getMapData, updateMapRender} from '../store/index'

class MenuBar extends Component {
  render() {
    const {isLoggedIn} = this.props
    return (
      <div>
        <List>
          {isLoggedIn && (
            <ListItem
              button
              onClick={() => {
                history.push('profile')
                this.props.handleDrawerClose()
              }}
            >
              <ListItemText primary="Profile" />
            </ListItem>
          )}
          {isLoggedIn && (
            <ListItem
              button
              onClick={() => {
                history.push('/matchUsers')
                this.props.handleDrawerClose()
              }}
            >
              <ListItemText primary="Potential roommates" />
            </ListItem>
          )}
          <ListItem
            button
            onClick={() => {
              history.push('/knowledge-map')
              this.props.handleDrawerClose()
            }}
          >
            <ListItemText primary="Neighborhood Info" />
          </ListItem>
          <ListItem
            button
            onClick={() => {
              history.push('/map')
              this.props.handleDrawerClose()
            }}
          >
            <ListItemText primary="Neighborhood Quiz" />
          </ListItem>

          {/* <ListItem
            button
            onClick={() => {
              history.push('/')
              this.props.handleDrawerClose()
            }}
          >
            <ListItemText primary="Home" />
          </ListItem> */}
        </List>
      </div>
    )
  }
}

const mapState = state => ({
  isLoggedIn: !!state.user.id
})

export default connect(mapState)(MenuBar)
