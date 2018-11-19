import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {withStyles} from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import MenuItem from '@material-ui/core/MenuItem'
import Button from '@material-ui/core/Button'
import Axios from 'axios'

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    display: 'flex',
    flexWrap: 'wrap'
  },
  dense: {
    marginTop: 16
  },
  menu: {
    width: 200
  }
})

class UserInfoForm extends React.Component {
  state = {
    firstName: '',
    lastName: '',
    sex: '',
    age: '',
    introvert: '',
    guest: '',
    tod: ''
  }

  handleChange = name => event => {
    this.setState({[name]: event.target.value})
    console.log(this.state)
  }

  handleSubmit = async event => {
    event.preventDefault()
    await Axios.put(`./api/users/3`, this.state)
    this.routeChange()
  }

  routeChange() {
    let path = `/`
    this.props.history.push(path)
  }

  render() {
    const {classes} = this.props

    return (
      <form
        className={classes.container}
        autoComplete="off"
        onSubmit={this.handleSubmit}
      >
        <TextField
          id="firstName input"
          label="First Name"
          className={classes.textField}
          margin="normal"
          helperText="Required"
          value={this.state.firstName}
          onChange={this.handleChange('firstName')}
        />

        <TextField
          id="last name input"
          label="Last Name"
          className={classes.textField}
          margin="normal"
          helperText="Required"
          value={this.state.lastName}
          onChange={this.handleChange('lastName')}
        />

        <TextField
          id="Age input"
          label="Age"
          className={classes.textField}
          margin="normal"
          helperText="Required"
          value={this.state.age}
          onChange={this.handleChange('age')}
        />

        <TextField
          id="sex input"
          select
          label="Select"
          className={classes.textField}
          value={this.state.sex}
          onChange={this.handleChange('sex')}
          SelectProps={{
            MenuProps: {
              className: classes.menu
            }
          }}
          helperText="Please select sex"
          margin="normal"
        >
          <MenuItem value="M">Male</MenuItem>
          <MenuItem value="F">Female</MenuItem>
        </TextField>

        <TextField
          id="introvert input"
          select
          label="Select"
          className={classes.textField}
          value={this.state.introvert}
          onChange={this.handleChange('introvert')}
          SelectProps={{
            MenuProps: {
              className: classes.menu
            }
          }}
          helperText="Please select sex"
          margin="normal"
        >
          <MenuItem value="introvert">introvert</MenuItem>
          <MenuItem value="extrovert">extrovert</MenuItem>
        </TextField>

        <TextField
          id="guest input"
          select
          label="Select"
          className={classes.textField}
          value={this.state.guest}
          onChange={this.handleChange('guest')}
          SelectProps={{
            MenuProps: {
              className: classes.menu
            }
          }}
          helperText="Please select how often you have quests over"
          margin="normal"
        >
          <MenuItem value={1}>Never</MenuItem>
          <MenuItem value={2}>Rarely</MenuItem>
          <MenuItem value={3}>Sometimes</MenuItem>
          <MenuItem value={4}>Often</MenuItem>
          <MenuItem value={5}>very Often</MenuItem>
        </TextField>

        <TextField
          id="tod input"
          select
          label="Select"
          className={classes.textField}
          value={this.state.tod}
          onChange={this.handleChange('tod')}
          SelectProps={{
            MenuProps: {
              className: classes.menu
            }
          }}
          helperText="Are you a morning or night person"
          margin="normal"
        >
          <MenuItem value="Morning">Morning</MenuItem>
          <MenuItem value="Night">Night</MenuItem>
        </TextField>

        <Button variant="contained" className={classes.button} type="submit">
          Submit
        </Button>
      </form>
    )
  }
}

const mapStateToProps = state => {
  return {
    userId: state.user.userId
  }
}

UserInfoForm.propTypes = {
  classes: PropTypes.object.isRequired
}

export default connect(mapStateToProps)(withStyles(styles)(UserInfoForm))
