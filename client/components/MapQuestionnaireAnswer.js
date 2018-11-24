import React, {Component} from 'react'
import {connect} from 'react-redux'
import history from '../history'

class MapQuestionnaireAnswer extends Component {
  render() {
    return <div>"oh hai, looks like you should live here!"</div>
  }
}

const mapStateToProps = state => ({
  mapData: state.map.mapData
})
const ConnectedMapQuestionnaireAnswer = connect(mapStateToProps)(
  MapQuestionnaireAnswer
)
export default ConnectedMapQuestionnaireAnswer
