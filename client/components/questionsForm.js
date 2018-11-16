import React from 'react'
import FormGroup from '@material-ui/core/FormGroup'
import {Radio} from '@material-ui/core'
import RadioFields from './radioFields'
import FormControlLabel from '@material-ui/core/FormControlLabel'

class QuestionsForm extends React.Component {
  state = {
    userId: 1,
    budgetMin: 0,
    budgetMax: 0,
    budgetPrior: 0
  }

  handleChange = (fieldKey1, fieldKey2 = null, rangeitr = null) => event => {
    this.setState({
      [fieldKey1]: event.target.value,
      [fieldKey2]: Number(event.target.value) + Number(rangeitr)
    })
    console.log(this.state)
  }

  render() {
    return (
      <div>
        Budget:
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
      </div>
    )
  }
}

// CheckboxLabels.propTypes = {
//   classes: PropTypes.object.isRequired
// }

export default QuestionsForm
