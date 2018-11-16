import React from 'react'
import PropTypes from 'prop-types'
import FormGroup from '@material-ui/core/FormGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'

class QuestionsForm extends React.Component {
  state = {
    budgetRange: {
      checked1: false,
      checked2: false,
      checked3: false,
      checked4: false,
      checked5: false
    },
    budgetMin: 0,
    budgetMax: 0,
    budgetPrior: 0,
    budgetPriorRange: {
      checkedRange1: false,
      checkedRange2: false,
      checkedRange3: false,
      checkedRange4: false,
      checkedRange5: false
    }
  }

  handleChange = (
    name,
    fieldKey,
    rangeKey1,
    rangeKey2 = null,
    rangeItr = null
  ) => event => {
    const checkBoxes = {...this.state[fieldKey]}
    const checkBoxKeys = Object.keys(checkBoxes)
    checkBoxKeys.map(elem => {
      if (elem === name) {
        checkBoxes[elem] = event.target.checked
      } else checkBoxes[elem] = false
    })

    this.setState({
      [fieldKey]: {...checkBoxes},
      [rangeKey1]: event.target.value,
      [rangeKey2]: event.target.value + rangeItr
    })
  }

  render() {
    return (
      <div>
        Budget:
        <FormGroup row>
          <FormControlLabel
            control={
              <Checkbox
                checked={this.state.checkedRange1}
                onChange={this.handleChange(
                  'checkedRange1',
                  'budgetRange',
                  'budgetMin',
                  'budgetMax',
                  499
                )}
                value={501}
              />
            }
            label="$501 - $1000"
          />

          <FormControlLabel
            control={
              <Checkbox
                checked={this.state.checkedRange2}
                onChange={this.handleChange(
                  'checkedRange2',
                  'budgetRange',
                  'budgetMin',
                  'budgetMax',
                  499
                )}
                value={1001}
              />
            }
            label="$1001 - $1500"
          />

          <FormControlLabel
            control={
              <Checkbox
                checked={this.state.checkedRange3}
                onChange={this.handleChange(
                  'checkedRange3',
                  'budgetRange',
                  'budgetMin',
                  'budgetMax',
                  499
                )}
                value={1501}
              />
            }
            label="$1501 - $2000"
          />

          <FormControlLabel
            control={
              <Checkbox
                checked={this.state.checkedRange4}
                onChange={this.handleChange(
                  'checkedRange4',
                  'budgetRange',
                  'budgetMin',
                  'budgetMax',
                  499
                )}
                value={2001}
              />
            }
            label="$1501 - $2000"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={this.state.checkedRange5}
                onChange={this.handleChange(
                  'checkedRange5',
                  'budgetRange',
                  'budgetMin',
                  'budgetMax',
                  499
                )}
                value={2001}
              />
            }
            label="$2001 - $2500"
          />
        </FormGroup>
        BudgetPriority:
        <FormGroup row>
          <FormControlLabel
            control={
              <Checkbox
                checked={this.state.budgetRange.checked1}
                onChange={this.handleChange(
                  'checkedRange1',
                  'budgetRange',
                  'budgetMin',
                  'budgetMax',
                  499
                )}
                value={501}
              />
            }
            label="$501 - $1000"
          />

          <FormControlLabel
            control={
              <Checkbox
                checked={this.state.checkedRange2}
                onChange={this.handleChange(
                  'checkedRange2',
                  'budgetRange',
                  'budgetMin',
                  'budgetMax',
                  499
                )}
                value={1001}
              />
            }
            label="$1001 - $1500"
          />

          <FormControlLabel
            control={
              <Checkbox
                checked={this.state.checkedRange3}
                onChange={this.handleChange(
                  'checkedRange3',
                  'budgetRange',
                  'budgetMin',
                  'budgetMax',
                  499
                )}
                value={1501}
              />
            }
            label="$1501 - $2000"
          />

          <FormControlLabel
            control={
              <Checkbox
                checked={this.state.checkedRange4}
                onChange={this.handleChange(
                  'checkedRange4',
                  'budgetRange',
                  'budgetMin',
                  'budgetMax',
                  499
                )}
                value={2001}
              />
            }
            label="$1501 - $2000"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={this.state.checkedRange5}
                onChange={this.handleChange(
                  'checkedRange5',
                  'budgetRange',
                  'budgetMin',
                  'budgetMax',
                  499
                )}
                value={2001}
              />
            }
            label="$2001 - $2500"
          />
        </FormGroup>
      </div>
    )
  }
}

CheckboxLabels.propTypes = {
  classes: PropTypes.object.isRequired
}

export default QuestionsForm
