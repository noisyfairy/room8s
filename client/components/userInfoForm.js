import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {withStyles} from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import MenuItem from '@material-ui/core/MenuItem'
import Button from '@material-ui/core/Button'
import Axios from 'axios'
import {fetchSingleUser} from '../store'
import IntegrationAutosuggest from './searchfield'
import Grid from '@material-ui/core/Grid'

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
  },
  button: {
    position: 'absolute',
    bottom: '20px',
    right: '20px',
    width: '10%',
    height: '8%',
    transition: 'all 2s ease-in-out',
    zIndex: 1
  }
})

class UserInfoForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      firstName: '',
      lastName: '',
      sex: '',
      age: '',
      introvert: '',
      guest: '',
      tod: '',
      location: '',
      moveInTime: '',
      duration: ''
    }
  }

  async componentDidMount() {
    this.setState({
      firstName: this.props.userInfo.firstName,
      lastName: this.props.userInfo.lastName,
      sex: this.props.userInfo.sex,
      age: this.props.userInfo.age,
      introvert: this.props.userInfo.introvert,
      guest: this.props.userInfo.guest,
      tod: this.props.userInfo.tod,
      moveInTime: this.props.userInfo.moveInTime,
      duration: this.props.userInfo.duration
    })

    if (this.props.userInfo.location !== null) {
      this.setState({
        location: this.props.userInfo.location
      })
    }

    await Axios.put(`./api/questions/${this.props.userId}`, {
      userId: this.props.userId
    })
  }

  handleChange = name => event => {
    this.setState({[name]: event.target.value})
  }

  handleChangeComponent = (name, value) => {
    this.setState({[name]: value})
  }

  handleSubmit = async event => {
    event.preventDefault()
    await Axios.put(`./api/users/${this.props.userId}`, this.state)
    this.routeChange()
  }

  formEmpty = obj => {
    const values = Object.values(obj)
    let boolean = true
    values.map(arg => {
      if (!arg) {
        boolean = false
      }
    })
    return boolean
  }

  routeChange() {
    let path = `/profile`
    this.props.history.push(path)
  }

  render() {
    const {classes} = this.props

    return (
      <div>
        {Object.keys(this.props.userInfo).length > 0 ? (
          <form
            className={classes.container}
            autoComplete="off"
            onSubmit={this.handleSubmit}
          >
            <Grid container spacing={16}>
              <Grid item xs={3}>
                <TextField
                  id="firstName input"
                  label="*First Name"
                  className={classes.textField}
                  margin="normal"
                  value={this.state.firstName}
                  onChange={this.handleChange('firstName')}
                />
              </Grid>

              <Grid item xs={3}>
                <TextField
                  id="last name input"
                  label="*Last Name"
                  className={classes.textField}
                  margin="normal"
                  value={this.state.lastName}
                  onChange={this.handleChange('lastName')}
                />
              </Grid>

              <Grid item xs={3}>
                <TextField
                  id="Age input"
                  type="number"
                  label="*Age"
                  className={classes.textField}
                  margin="normal"
                  value={this.state.age}
                  onChange={this.handleChange('age')}
                />
              </Grid>

              <Grid item xs={3}>
                <TextField
                  id="MoveIn input "
                  label="*Move in date"
                  className={classes.textField}
                  type="date"
                  margin="normal"
                  value={this.state.moveInTime}
                  onChange={this.handleChange('moveInTime')}
                  InputLabelProps={{shrink: true}}
                />
              </Grid>
            </Grid>

            <Grid container spacing={16}>
              <Grid item xs={2}>
                <TextField
                  id="sex input"
                  select
                  label="*Select your sex"
                  className={classes.textField}
                  value={this.state.sex}
                  onChange={this.handleChange('sex')}
                  SelectProps={{
                    MenuProps: {
                      className: classes.menu
                    }
                  }}
                  margin="normal"
                >
                  <MenuItem value="M">Male</MenuItem>
                  <MenuItem value="F">Female</MenuItem>
                </TextField>
              </Grid>

              <Grid item xs={2}>
                <TextField
                  id="introvert input"
                  select
                  label="*Are you extroverted or introverted?"
                  className={classes.textField}
                  value={this.state.introvert}
                  onChange={this.handleChange('introvert')}
                  SelectProps={{
                    MenuProps: {
                      className: classes.menu
                    }
                  }}
                  margin="normal"
                >
                  <MenuItem value="introvert">introvert</MenuItem>
                  <MenuItem value="extrovert">extrovert</MenuItem>
                </TextField>
              </Grid>

              <Grid item xs={2}>
                <TextField
                  id="guest input"
                  select
                  label="*How often you have guests over?"
                  className={classes.textField}
                  value={this.state.guest}
                  onChange={this.handleChange('guest')}
                  SelectProps={{
                    MenuProps: {
                      className: classes.menu
                    }
                  }}
                  margin="normal"
                >
                  <MenuItem value={1}>Never</MenuItem>
                  <MenuItem value={2}>Rarely</MenuItem>
                  <MenuItem value={3}>Sometimes</MenuItem>
                  <MenuItem value={4}>Often</MenuItem>
                  <MenuItem value={5}>Very Often</MenuItem>
                </TextField>
              </Grid>
              <Grid item xs={2}>
                <TextField
                  id="tod input"
                  select
                  label="*Are you a Morning or Night person?"
                  className={classes.textField}
                  value={this.state.tod}
                  onChange={this.handleChange('tod')}
                  SelectProps={{
                    MenuProps: {
                      className: classes.menu
                    }
                  }}
                  margin="normal"
                >
                  <MenuItem value="Morning">Morning</MenuItem>
                  <MenuItem value="Night">Night</MenuItem>
                </TextField>
              </Grid>

              <Grid item xs={2}>
                <TextField
                  id="duration input"
                  select
                  label="*Lease duration perference"
                  className={classes.textField}
                  value={this.state.duration}
                  onChange={this.handleChange('duration')}
                  SelectProps={{
                    MenuProps: {
                      className: classes.menu
                    }
                  }}
                  margin="normal"
                >
                  <MenuItem value={1}>1 Month</MenuItem>
                  <MenuItem value={2}>2 Months</MenuItem>
                  <MenuItem value={3}>3 Months</MenuItem>
                  <MenuItem value={4}>4 Months</MenuItem>
                  <MenuItem value={5}>5 Months</MenuItem>
                  <MenuItem value={6}>6 Months</MenuItem>
                  <MenuItem value={7}>7 Months</MenuItem>
                  <MenuItem value={8}>8 Months</MenuItem>
                  <MenuItem value={9}>9 Months</MenuItem>
                  <MenuItem value={10}>10 Months</MenuItem>
                  <MenuItem value={11}>11 Months</MenuItem>
                  <MenuItem value={12}>12 Months</MenuItem>
                </TextField>
              </Grid>
            </Grid>

            <Grid container spacing={16}>
              <Grid item xs={6}>
                <IntegrationAutosuggest
                  label="Location Preference"
                  handleChangeComponent={this.handleChangeComponent.bind(this)}
                  location={this.state.location}
                  fieldKey="location"
                />
              </Grid>
              <Grid item xs={6}>
                <Button
                  variant="contained"
                  className={classes.button}
                  type="submit"
                  disabled={!this.formEmpty(this.state)}
                >
                  Submit
                </Button>
              </Grid>
            </Grid>
          </form>
        ) : (
          <div />
        )}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    userId: state.user.id,
    userInfo: state.user
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getUserInfo: userId => {
      dispatch(fetchSingleUser(userId))
    }
  }
}

UserInfoForm.propTypes = {
  classes: PropTypes.object.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(
  withStyles(styles)(UserInfoForm)
)
