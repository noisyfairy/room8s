import React from 'react'
import FormGroup from '@material-ui/core/FormGroup'
import Button from '@material-ui/core/Button'
import RadioFields from './radioFields'
import {connect} from 'react-redux'
import PropTypes, {string} from 'prop-types'
import {withStyles} from '@material-ui/core/styles'
import Axios from 'axios'
import {fetchSingleUser} from '../store'

const styles = {
  button: {
    position: 'absolute',
    bottom: '20px',
    right: '20px',
    width: '10%',
    height: '8%',
    transition: 'all 2s ease-in-out',
    zIndex: 1
  }
}

class QuestionsForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      userId: 0,
      budgetMin: 0,
      budgetMax: 0,
      budgetPrior: 0,
      locationPrior: 0,
      moveInPrior: 0,
      duraPrior: 0,
      pet: false,
      petPrior: 0,
      smoke: false,
      smokePrior: 0,
      introvert: '',
      introPrior: 0,
      sex: '',
      sexPrior: 0,
      ageMin: 0,
      ageMax: 0,
      agePrior: 0,
      clean: 0,
      cleanPrior: 0,
      guest: 0,
      guestPrior: 0,
      tod: '',
      todPrior: 0
    }
  }

  async componentDidMount() {
    const {data} = await Axios.get(`./api/questions/${this.props.userId}`)
    const userPref = data
    if (userPref) {
      this.setState({
        budgetMin: `${userPref.budgetMin}`,
        budgetMax: `${userPref.budgetMax}`,
        budgetPrior: `${userPref.budgetPrior}`,
        locationPrior: `${userPref.locationPrior}`,
        moveInPrior: `${userPref.moveInPrior}`,
        duraPrior: `${userPref.duraPrior}`,
        pet: `${userPref.pet}`,
        petPrior: `${userPref.petPrior}`,
        smoke: `${userPref.smoke}`,
        smokePrior: `${userPref.smokePrior}`,
        introvert: userPref.introvert,
        introPrior: `${userPref.introPrior}`,
        sex: `${userPref.sex}`,
        sexPrior: `${userPref.sexPrior}`,
        ageMin: `${userPref.ageMin}`,
        ageMax: `${userPref.ageMax}`,
        agePrior: `${userPref.agePrior}`,
        clean: `${userPref.clean}`,
        cleanPrior: `${userPref.cleanPrior}`,
        guest: `${userPref.guest}`,
        guestPrior: `${userPref.guestPrior}`,
        tod: `${userPref.tod}`,
        todPrior: `${userPref.todPrior}`
      })
    }
    this.setState({
      userId: this.props.userId
    })
  }

  handleChange = (fieldKey1, fieldKey2 = null, rangeitr = null) => event => {
    this.setState({
      [fieldKey1]: event.target.value,
      [fieldKey2]: Number(event.target.value) + Number(rangeitr)
    })
  }

  handleSubmit = async event => {
    event.preventDefault()
    await Axios.put(`./api/questions/${this.props.userId}`, this.state)
    this.routeChange()
  }

  routeChange() {
    let path = `/profile`
    this.props.history.push(path)
  }

  render() {
    const {classes} = this.props
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          Location Priority:
          <FormGroup row>
            <RadioFields
              field={{
                1: 'Very Low',
                2: 'Low',
                3: 'Average',
                4: 'High',
                5: 'Very High'
              }}
              fieldKey1="locationPrior"
              handleChange={this.handleChange.bind(this)}
              state={this.state}
            />
          </FormGroup>
          Rent Budget:
          <FormGroup row>
            <RadioFields
              field={{
                501: '$501 - $1000',
                1001: '$1001 - $1500',
                1501: '$1501 - $2000',
                2001: '$2001 - $2500',
                2501: '$2501 - $3000'
              }}
              fieldKey1="budgetMin"
              fieldKey2="budgetMax"
              rangeitr={499}
              handleChange={this.handleChange.bind(this)}
              state={this.state}
            />
          </FormGroup>
          Buget Priority:
          <FormGroup row>
            <RadioFields
              field={{
                1: 'Very Low',
                2: 'Low',
                3: 'Average',
                4: 'High',
                5: 'Very High'
              }}
              fieldKey1="budgetPrior"
              handleChange={this.handleChange.bind(this)}
              state={this.state}
            />
          </FormGroup>
          Move In Date Priority:
          <FormGroup row>
            <RadioFields
              field={{
                1: 'Very Low',
                2: 'Low',
                3: 'Average',
                4: 'High',
                5: 'Very High'
              }}
              fieldKey1="moveInPrior"
              handleChange={this.handleChange.bind(this)}
              state={this.state}
            />
          </FormGroup>
          Lease Duration Priority:
          <FormGroup row>
            <RadioFields
              field={{
                1: 'Very Low',
                2: 'Low',
                3: 'Average',
                4: 'High',
                5: 'Very High'
              }}
              fieldKey1="duraPrior"
              handleChange={this.handleChange.bind(this)}
              state={this.state}
            />
          </FormGroup>
          Want Roomate to be Okay with Pets? :
          <FormGroup row>
            <RadioFields
              field={{
                true: 'Okay with pets',
                false: 'Not okay with pets'
              }}
              fieldKey1="pet"
              handleChange={this.handleChange.bind(this)}
              state={this.state}
            />
          </FormGroup>
          Pet Priority:
          <FormGroup row>
            <RadioFields
              field={{
                1: 'Very Low',
                2: 'Low',
                3: 'Average',
                4: 'High',
                5: 'Very High'
              }}
              fieldKey1="petPrior"
              handleChange={this.handleChange.bind(this)}
              state={this.state}
            />
          </FormGroup>
          Want Roomate to be Okay with Smoking? :
          <FormGroup row>
            <RadioFields
              field={{
                true: 'Okay with smoking',
                false: 'Not okay with smoking'
              }}
              fieldKey1="smoke"
              handleChange={this.handleChange.bind(this)}
              state={this.state}
            />
          </FormGroup>
          Smoke Priority:
          <FormGroup row>
            <RadioFields
              field={{
                1: 'Very Low',
                2: 'Low',
                3: 'Average',
                4: 'High',
                5: 'Very High'
              }}
              fieldKey1="smokePrior"
              handleChange={this.handleChange.bind(this)}
              state={this.state}
            />
          </FormGroup>
          Want Roommate to be extroverted? :
          <FormGroup row>
            <RadioFields
              field={{
                extrovert: 'Yes',
                introvert: 'No'
              }}
              fieldKey1="introvert"
              handleChange={this.handleChange.bind(this)}
              state={this.state}
            />
          </FormGroup>
          Roomate extroverted Priority:
          <FormGroup row>
            <RadioFields
              field={{
                1: 'Very Low',
                2: 'Low',
                3: 'Average',
                4: 'High',
                5: 'Very High'
              }}
              fieldKey1="introPrior"
              handleChange={this.handleChange.bind(this)}
              state={this.state}
            />
          </FormGroup>
          Prefer to live with Male or Female? :
          <FormGroup row>
            <RadioFields
              field={{
                M: 'Male',
                F: 'Female'
              }}
              fieldKey1="sex"
              handleChange={this.handleChange.bind(this)}
              state={this.state}
            />
          </FormGroup>
          Roommate sex Priority:
          <FormGroup row>
            <RadioFields
              field={{
                1: 'Very Low',
                2: 'Low',
                3: 'Average',
                4: 'High',
                5: 'Very High'
              }}
              fieldKey1="sexPrior"
              handleChange={this.handleChange.bind(this)}
              state={this.state}
            />
          </FormGroup>
          Prefered Age range of roommate:
          <FormGroup row>
            <RadioFields
              field={{
                16: '16 - 20',
                21: '21 - 25',
                26: '26 - 30',
                31: '31 - 35',
                36: '36 - 40'
              }}
              fieldKey1="ageMin"
              fieldKey2="ageMax"
              rangeitr={5}
              handleChange={this.handleChange.bind(this)}
              state={this.state}
            />
          </FormGroup>
          Roommate Age Priority:
          <FormGroup row>
            <RadioFields
              field={{
                1: 'Very Low',
                2: 'Low',
                3: 'Average',
                4: 'High',
                5: 'Very High'
              }}
              fieldKey1="agePrior"
              handleChange={this.handleChange.bind(this)}
              state={this.state}
            />
          </FormGroup>
          How Often Do you clean dishes every week?:
          <FormGroup row>
            <RadioFields
              field={{
                1: 'never',
                2: 'Rarely',
                3: 'Sometimes',
                4: 'Often',
                5: 'Very Often'
              }}
              fieldKey1="clean"
              handleChange={this.handleChange.bind(this)}
              state={this.state}
            />
          </FormGroup>
          Roommate Cleanliness Priority:
          <FormGroup row>
            <RadioFields
              field={{
                1: 'Very Low',
                2: 'Low',
                3: 'Average',
                4: 'High',
                5: 'Very High'
              }}
              fieldKey1="cleanPrior"
              handleChange={this.handleChange.bind(this)}
              state={this.state}
            />
          </FormGroup>
          How Often Do you bring Guests home?:
          <FormGroup row>
            <RadioFields
              field={{
                1: 'never',
                2: 'Rarely',
                3: 'Sometimes',
                4: 'Often',
                5: 'Very Often'
              }}
              fieldKey1="guest"
              handleChange={this.handleChange.bind(this)}
              state={this.state}
            />
          </FormGroup>
          Roommate Guests Priority:
          <FormGroup row>
            <RadioFields
              field={{
                1: 'Very Low',
                2: 'Low',
                3: 'Average',
                4: 'High',
                5: 'Very High'
              }}
              fieldKey1="guestPrior"
              handleChange={this.handleChange.bind(this)}
              state={this.state}
            />
          </FormGroup>
          Prefer your roommate to be a morning or night person? :
          <FormGroup row>
            <RadioFields
              field={{
                Morning: 'Morning',
                Night: 'Night'
              }}
              fieldKey1="tod"
              handleChange={this.handleChange.bind(this)}
              state={this.state}
            />
          </FormGroup>
          Roommate schedule Priority:
          <FormGroup row>
            <RadioFields
              field={{
                1: 'Very Low',
                2: 'Low',
                3: 'Average',
                4: 'High',
                5: 'Very High'
              }}
              fieldKey1="todPrior"
              handleChange={this.handleChange.bind(this)}
              state={this.state}
            />
          </FormGroup>
          <Button variant="contained" className={classes.button} type="submit">
            Submit
          </Button>
        </form>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    userId: state.user.id,
    userInfo: state.singleUser.user
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getUserInfo: async userId => {
      dispatch(await fetchSingleUser(userId))
    }
  }
}

QuestionsForm.propTypes = {
  classes: PropTypes.object.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(
  withStyles(styles)(QuestionsForm)
)
