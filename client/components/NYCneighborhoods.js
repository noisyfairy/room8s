import React, {Component} from 'react'
import * as topojson from 'topojson'
import * as d3 from 'd3'
import queue from 'queue'

class NYCNeighborhoods extends Component {
  constructor() {
    super()
    this.state = {
      nycmap: []
    }
  }

  async componentDidMount() {
    d3.json(
      ' http://data.beta.nyc//dataset/0ff93d2d-90ba-457c-9f7e-39e47bf2ac5f/resource/35dd04fb-81b3-479b-a074-a27a37888ce7/download/d085e2f8d0b54d4590b1e7d1f35594c1pediacitiesnycneighborhoods.geojson',
      (error, nycmap) => {
        if (error) throw error
        this.setState({nycmap})
      }
    )
  }

  componentDidUpdate() {
    const nyc = this.state.nycmap
    const svg = d3.select(this.refs.anchor),
      width = this.props.width,
      height = this.props.height

    const path = d3.geoPath().projection(
      d3
        .geoConicConformal()
        .parallels([33, 45])
        .rotate([96, -39])
        .fitSize([width, height], nyc)
    )

    svg
      .selectAll('path')
      .data(nyc.features)
      .enter()
      .append('path')
      .attr('d', path)
      .on('click', function(d) {
        console.log(d)
        d3
          .select(this)
          .style('stroke-width', 1.5)
          .style('stroke-dasharray', 0)
          .style('fill', 'black')

        d3
          .select('#neighborhoodPopover')
          .transition()
          .style('opacity', 1)
          .style('left', d3.event.pageX + 'px')
          .style('top', d3.event.pageY + 'px')
          .text(d.properties.neighborhood)
      })
    // .on('mouseleave', function(d) {
    //   d3
    //     .select(this)
    //     .style('stroke-width', 0.25)
    //     .style('stroke-dasharray', 1)

    //   d3
    //     .select('#cneighborhoodPopoverountyText')
    //     .transition()
    //     .style('opacity', 0)
    // })
  }

  render() {
    const {nycmap} = this.state

    if (!nycmap) {
      return null
    }

    return <g ref="anchor" />
  }
}

export default NYCNeighborhoods
