import React, {Component} from 'react'
// import * as topojson from 'topojson'
import * as d3 from 'd3'
// import queue from 'queue'

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
        console.log(nycmap)
        for (let location of nycmap.features) {
          location.properties.score = 0
        }
        this.setState({nycmap})
      }
    )
  }

  componentDidUpdate() {
    const color = d3
      .scaleThreshold()
      .domain([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
      .range([
        '#ffffff',
        '#f2f2f2',
        '#e6e6e6',
        '#d9d9d9',
        '#cccccc',
        '#bfbfbf',
        '#b3b3b3',
        '#a6a6a6',
        '#999999',
        '#8c8c8c '
      ])

    const nyc = this.state.nycmap
    const svg = d3.select(this.refs.anchor),
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
      .data(nyc.features) //nyc.features returns an array of neighborhood object
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
    //   d3
    //     .select('#neighborhoodPopover')
    //     .transition()
    //     .style('opacity', 1)
    //     .style('left', d3.event.pageX + 'px')
    //     .style('top', d3.event.pageY + 'px')
    //     .text(d.properties.neighborhood)
    // })
  }

  render() {
    const nycmap = this.state.nycmap
    console.log(`NYC MAP:`, this.state.nycmap)
    this.setObjectByPath(['nycmap'])

    if (!nycmap) {
      return null
    }

    return <g ref="anchor" />
  }
}

export default NYCNeighborhoods
