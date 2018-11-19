import React, {Component} from 'react'
import {connect} from 'react-redux'
// import {fetchQuestions} from '../store/questions'
// import {me} from '../store/user'


const mapStateToProps = state => {
  return {
    questions: state.questions,
    // user: state.user,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getQuestions: userId => dispatch(fetchQuestions(userId)),
    // getUser: () => dispatch(me()),
  }
}

class Questions extends Component {
  async componentDidMount() {
    // await this.props.getUser()
    await this.props.getQuestions(Number(this.props.match.params.userId))
  }

  render() {
    return (
      <div>
        <h4> To be filled</h4>
      </div>
    )
  }
}

const ConnectedQuestions = connect(mapStateToProps, mapDispatchToProps)(Questions)

export default ConnectedQuestions
