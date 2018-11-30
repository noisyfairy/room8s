import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {auth, clearError} from '../store'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import {withStyles} from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import {Typography, FormGroup} from '@material-ui/core'

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
    width: '100px',
    height: '30px'
  },
  input: {
    display: 'none'
  },
  root: {
    flexGrow: 1
  },
  container: {
    display: 'flex',
    flexWrap: 'no-wrap',
    alignItems: 'baseline',
    justifyContent: 'center'
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    backgroundColor: 'transparent'
  },
  dense: {
    marginTop: 16
  },
  menu: {
    width: 200
  },
  authLabel: {
    color: '#3f51b5',
    fontSize: '1.25rem',
    margin: '8px'
  },
  authGroup: {
    alignItems: 'baseline',
    justifyContent: 'center'
  },
  link: {
    color: '#3f51b5',
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline'
    },
    '&visited': {
      color: theme.palette.secondary.main
    },
    '&active': {
      color: theme.palette.secondary.main
    },
    '&focus': {
      color: theme.palette.secondary.main
    }
  }
})
/**
 * COMPONENT
 */
class AuthForm extends Component {
  render() {
    let {name, displayName, handleSubmit, error, classes} = this.props

    return (
      <div className="loginPage">
        <div>
          <Typography variant="display1" className="centerContent">
            {name === 'login' ? 'Log in' : 'Create an account'}
          </Typography>
          <Typography variant="subheading">
            or{' '}
            {name === 'login' ? (
              <Link
                className={classes.link}
                to="/signup"
                onClick={() => this.props.removingError()}
              >
                Create an account
              </Link>
            ) : (
              <Link
                to="/login"
                className={classes.link}
                onClick={() => this.props.removingError()}
              >
                Login
              </Link>
            )}
          </Typography>
        </div>
        <form
          className={classes.container}
          autoComplete="off"
          onSubmit={handleSubmit}
          name={name}
        >
          <FormGroup row={true} className={classes.authGroup}>
            <TextField
              required
              id="outlined-email-input"
              label="Email"
              className={classes.textField}
              type="email"
              name="email"
              autoComplete="email"
              margin="normal"
              size="small"
            />
            <TextField
              required
              id="outlined-password-input"
              label="Password"
              className={classes.textField}
              type="password"
              name="password"
              autoComplete="current-password"
              margin="normal"
              size="small"
            />
            <Button
              className={classes.button}
              type="submit"
              name=""
              variant="outlined"
              color="primary"
            >
              {displayName}
            </Button>
          </FormGroup>
        </form>
        <div style={{justifyContent: 'center'}}>
          <a href="/auth/google" style={{justifyContent: 'center'}}>
            {' '}
            {displayName} with Google{' '}
          </a>
        </div>
        <Typography variant="caption" color="primary">
          {error && error.response && <div> {error.response.data} </div>}
        </Typography>
      </div>
    )
  }
}

const mapLogin = state => {
  return {
    name: 'login',
    displayName: 'Login',
    error: state.user.error
  }
}

const mapSignup = state => {
  return {
    name: 'signup',
    displayName: 'Sign Up',
    error: state.user.error
  }
}

const mapDispatch = dispatch => {
  return {
    handleSubmit(evt) {
      evt.preventDefault()
      const formName = evt.target.name
      const email = evt.target.email.value
      const password = evt.target.password.value
      dispatch(auth(email, password, formName))
    },
    removingError: () => {
      dispatch(clearError())
    }
  }
}

export const Login = withStyles(styles)(
  connect(mapLogin, mapDispatch)(AuthForm)
)
export const Signup = withStyles(styles)(
  connect(mapSignup, mapDispatch)(AuthForm)
)

/**
 * PROP TYPES
 */
// AuthForm.propTypes = {
//   name: PropTypes.string.isRequired,
//   displayName: PropTypes.string.isRequired,
//   handleSubmit: PropTypes.func.isRequired,
//   error: PropTypes.object
// }
