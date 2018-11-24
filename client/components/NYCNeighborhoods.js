import React, {Component} from 'react'
import * as d3 from 'd3'

export default class NYCNeighborhoods extends Component {
  constructor(props) {
    super(props)
  }
  async componentDidMount(props) {
    // await this.props.getSubwayData(this.props.mapData)
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
      .on('mouseenter', function(d) {
        d3
          .select(this)
          .style('stroke-width', 1.5)
          .style('stroke-dasharray', 0)
        d3
          .select('#neighborhoodPopover')
          .transition()
          .style('opacity', 1)
          .style('left', d3.event.pageX + 'px')
          .style('top', d3.event.pageY + 'px')
          .text(d.properties.neighborhood)
      })
      .on('mouseleave', function(d) {
        d3.select(this).style('stroke-width', 0.5)
      })

    // .on('click', function(d) {
    //   d3
    //     .select(this)
    //     .style('stroke-width', 1.5)
    //     .style('stroke-dasharray', 0)
    //     .style('fill', 'black')
    //   console.log(d)
    // })
  }

  render() {
    const nycmap = this.props.mapData

    if (!nycmap) {
      return null
    }

    return <g ref={node => (this.node = node)} />
  }
}
