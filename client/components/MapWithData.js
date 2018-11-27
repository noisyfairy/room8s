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

  componentDidMount() {
    console.log('compnonent mounting')
    // const arrestData = function() {
    //   for (let keys in this.props.arrestData) {
    //     this.props.mapData.features.find(nbhd => {
    //       if (nbhd.properties.neibhgorhood === keys) {
    //         return (nbhd.properties.score = arrestData[keys])
    //       }
    //       console.log('WORKING IN MOUNT', this.props.mapData.features)
    //     })
    //   }
    // return this.props.mapData.features.map(nbhd =>{
    // })
    // }
    // console.log(this.props.mapData)
    // console.log('this is arrest data WORK PLS', arrestData())
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
          {/* {console.log('arrest data in mapwithdata', this.props.arrestData)} */}
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
  mapData: state.map.mapData,
  arrestData: state.addedMap.arrestMapData,
  subwayData: state.addedMap.subwayMapData,
  shouldRender: state.map.shouldRender
})

export default connect(mapStateToProps, null)(MapWithData)
