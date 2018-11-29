import React from 'react'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import {Radio} from '@material-ui/core'

const RadioFields = props => {
  const field = props.field
  const fieldKey1 = props.fieldKey1
  const fieldKey2 = props.fieldKey2
  const rangeitr = props.rangeitr
  const fieldValues = Object.keys(field)
  const handleChange = props.handleChange
  const state = props.state

  return fieldValues.map(value => {
    return (
      <FormControlLabel
        control={
          <Radio
            color="primary"
            checked={state[fieldKey1] === value}
            onChange={handleChange(fieldKey1, fieldKey2, rangeitr)}
            value={value}
            color="primary"
            name="radio-button-demo"
            aria-label="A"
          />
        }
        label={field[value]}
      />
    )
  })
}

export default RadioFields
