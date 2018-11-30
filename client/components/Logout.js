import React from 'react'
import {connect} from 'react-redux'
import {logout} from '../store/user'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import {withStyles} from '@material-ui/core/styles'
import {Link, Redirect} from 'react-router-dom'
// import {withRouter, Route, Switch, Redirect} from 'react-router-dom'

const styles = theme => ({
  button: {
    position: 'absolute',
    right: '20px',
    margin: theme.spacing.unit,
    color: 'primary'
  }
})

const Logout = props => {
  const {handleClick, isLoggedIn, classes} = props

  return isLoggedIn ? (
    <Button
      color={classes.button.color}
      className={classes.button}
      onClick={handleClick}
      color="primary"
    >
      Logout
    </Button>
  ) : (
    <Button
      color={classes.button.color}
      className={classes.button}
      // onClick={handleClick}
    >
      <Link to="/login"> Login </Link>
    </Button>
  )
}

const mapStateToProps = state => {
  return {
    isLoggedIn: !!state.user.id
  }
}

const mapDispatchToProps = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

{
  /* <Redirect to="/" /> */
}

export default withStyles(styles)(
  connect(mapStateToProps, mapDispatchToProps)(Logout)
)
