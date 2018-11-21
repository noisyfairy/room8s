import React, {Component} from 'react'
import * as d3 from 'd3'

export default class NYCNeighborhoods extends Component {
  constructor(props) {
    super(props)
  }
  async componentDidMount(props) {
    // await this.props.getSubwayData(this.props.mapData)
    try {
      const node = this.node
      const color = this.props.color
      const nyc = this.props.mapData
      const svg = d3.select(node),
        width = this.props.width,
        height = this.props.height
      const projection = d3
        .geoConicConformal()
        .parallels([0, 0])
        .rotate([96, -39])
        .fitSize([width, height], nyc)

      const path = d3.geoPath().projection(projection)
      svg
        .selectAll('path')
        .data(nyc.features)
        .enter()
        .append('path')
        .attr('d', path)
        .style('fill', function(d) {
          return d.properties ? color(d.properties.score) : 'black'
        })
        .on('click', function(d) {
          console.log(d)
          d3
            .select(this)
            .style('stroke-width', 1.5)
            .style('stroke-dasharray', 0)
            .style('fill', 'black')
        })
    } catch (err) {
      console.error(err)
    }
  }

  render() {
    const nycmap = this.props.mapData

    if (!nycmap) {
      return null
    }

    return <g ref={node => (this.node = node)} />
  }
}
