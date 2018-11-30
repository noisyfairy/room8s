import React from 'react'
import history from '../history'
import questionList from '../MapQuestionsObject'

//material UI
import PropTypes from 'prop-types'
import {withStyles} from '@material-ui/core/styles'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormControl from '@material-ui/core/FormControl'
import FormLabel from '@material-ui/core/FormLabel'
import Button from '@material-ui/core/Button'

//redux
import {updateMapScore, updateMapRender} from '../store/index'
import {connect} from 'react-redux'

const styles = theme => ({
  root: {
    display: 'flex'
  },
  formControl: {
    margin: theme.spacing.unit * 3
  },
  group: {
    margin: `${theme.spacing.unit}px 0`
  }
})

class MapQuestionnaire extends React.Component {
  state = {
    value: '',
    question: 1
  }

  handleChange = event => {
    this.setState({value: event.target.value})
  }

  handleSubmit = evt => {
    evt.preventDefault()

    const neighborhoodsArray = this.props.mapScore[Number(this.state.value)]
    for (let neighborhood of neighborhoodsArray) {
      let idx = this.props.idx[neighborhood]
      this.props.updateMapScore(Number(idx))
    }
    this.props.updateMapRender()

    if (this.state.question === Math.max(...Object.keys(questionList))) {
      history.push('/answer')
    } else {
      this.setState({value: '', question: this.state.question + 1})
    }
  }

  render() {
    const {classes} = this.props

    return (
      <div className={classes.root}>
        <form className="questionBox" onSubmit={this.handleSubmit}>
          <FormControl component="fieldset" className={classes.formControl}>
            <FormLabel component="legend">
              {questionList[this.state.question].question}
            </FormLabel>
            <RadioGroup
              aria-label="location"
              name="location"
              className={classes.group}
              value={this.state.value}
              onChange={this.handleChange}
            >
              {questionList[this.state.question].answers.map(answer => (
                <FormControlLabel
                  label={answer.displayedAnswer}
                  control={<Radio color="primary" />}
                  value={answer.neighborhoods}
                  key={questionList[this.state.question].answers.indexOf(
                    answer
                  )}
                />
              ))}
              )}
            </RadioGroup>
            <Button
              variant="contained"
              className={classes.button}
              type="submit"
            >
              Submit
            </Button>
          </FormControl>
        </form>
      </div>
    )
  }
}

MapQuestionnaire.propTypes = {
  classes: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  mapData: state.map.mapData,
  idx: state.map.neighborhoodIdxObj,
  mapScore: state.addedMap.mapScore
})

const mapDispatchToProps = dispatch => {
  return {
    updateMapRender: () => dispatch(updateMapRender()),
    updateMapScore: idx => dispatch(updateMapScore(idx))
  }
}

const ConnectedMapQuestionnaire = connect(mapStateToProps, mapDispatchToProps)(
  withStyles(styles)(MapQuestionnaire)
)

export default ConnectedMapQuestionnaire
