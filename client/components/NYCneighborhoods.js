import React, {Component} from 'react'
import * as d3 from 'd3'

export default class NYCNeighborhoods extends Component {
  constructor() {
    super()
  }
  componentDidMount(props) {
    const node = this.node
    const color = d3
      .scaleThreshold()
      .domain([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
      .range([
        '#ffffff',
        'black',
        '#e6e6e6',
        '#d9d9d9',
        '#cccccc',
        '#bfbfbf',
        '#b3b3b3',
        '#a6a6a6',
        '#999999',
        '#8c8c8c '
      ])

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
  }

  render() {
    const nycmap = this.props.mapData

    if (!nycmap) {
      return null
    }

    return <g ref={node => (this.node = node)} />
  }
}
