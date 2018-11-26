import React, {Component} from 'react'
import {connect} from 'react-redux'
import MapWrapper from './MapWrapper'
import * as d3 from 'd3'

class MapWithData extends Component {
  constructor() {
    super()
    this.state = {
      dataSet: ''
    }
  }
  handleChange = evt => {
    console.log('receiving event:', evt)
    this.setState({
      dataSet: evt.target.value
    })
    this.render()
  }

  render() {
    // console.log('this is state', this.state)
    const color = d3
      .scaleThreshold()
      .domain([1, 2, 3, 4])
      .range(['white', 'blue', 'green', 'yellow', 'red'])
    // .style('opacity', 0.8)
    // .opacity = .4

    return (
      <div>
        <form>
          <select value={this.state} onChange={this.handleChange}>
            <option value="">SELECT</option>
            <option value="arrestData"> ARREST DATA </option>
            <option value="subwayData"> SUBWAY DATA</option>
          </select>
          {console.log(this.props.arrestData)}
          {this.state.dataSet === 'arrestData' && (
            <MapWrapper
              // data={this.props[this.state.dataSet]}
              data={this.props.arrestData}
              shouldRender={this.props.shouldRender}
              color={color}
            />
          )}
          {this.state.dataSet === 'subwayData' && (
            <MapWrapper
              data={this.props.subwayData}
              shouldRender={this.props.shouldRender}
              color={color}
            />
          )}
        </form>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  arrestData: state.addedMap.arrestMapData,
  subwayData: state.addedMap.subwayMapData,
  shouldRender: state.map.shouldRender
})

export default connect(mapStateToProps, null)(MapWithData)
