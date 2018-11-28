import React, {Component} from 'react'
import {connect} from 'react-redux'
import MapWrapper from './MapWrapper'
import ConnectedMapQuestionnaire from './MapQuestionnaire'
import {getMapData, updateMapRender} from '../store/index'

class MapAndQuestions extends Component {
  async componentDidMount() {
    await this.props.mapRefresh()
    console.log('componentdidmount?')
  }
  render() {
    const color = d3
      .scaleThreshold()
      .domain([1, 2, 3, 4])
      .range(['white', '#D1F2EB', '#76D7C4', '#17A589'])
    return (
      <div>
        <h2>Want to know where you belong in this big city?</h2>
        <h3>Find out by taking this 4-question quiz!</h3>

        <div className="mapAndQuestions">
          <ConnectedMapQuestionnaire />
          <MapWrapper
            className="flexMapBox"
            data={this.props.data}
            shouldRender={this.props.shouldRender}
            color={color}
          />
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  data: state.map.mapData,
  shouldRender: state.map.shouldRender,
  subwayData: state.addedMap.subwayMapData
})

const mapDispatchToPros = dispatch => {
  return {
    mapRefresh: () => dispatch(getMapData()),
    renderRefresh: () => dispatch(updateMapRender())
  }
}

const connectedMapAndQuestions = connect(mapStateToProps, mapDispatchToPros)(
  MapAndQuestions
)

export default connectedMapAndQuestions
