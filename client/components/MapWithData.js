import React, {Component} from 'react'
import {connect} from 'react-redux'
import MapWrapper from './MapWrapper'
import * as d3 from 'd3'
import {
  withStyles,
  FormGroup,
  Radio,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel
} from '@material-ui/core'

const styles = theme => ({
  root: {
    display: 'flex'
  },
  formControl: {
    margin: theme.spacing.unit * 3
  },
  group: {
    margin: `${theme.spacing.unit}px 0`
  }
})

class MapWithData extends Component {
  constructor() {
    super()
    this.state = {
      dataSet: 'Trees'
    }
  }

  componentDidMount() {
    console.log('compnonent mounting')
  }

  handleChange = evt => {
    console.log('receiving event:', evt)
    this.setState({
      dataSet: evt.target.value
    })
    this.render()
  }

  render() {
    const ArrestColor = d3
      .scaleThreshold()
      .domain([1, 5, 10, 15, 20, 25])
      .range([
        'white',
        d3.rgb(245, 162, 162),
        d3.rgb(255, 2, 2),
        d3.rgb(206, 2, 2),
        d3.rgb(168, 1, 1),
        d3.rgb(126, 1, 1),
        d3.rgb(89, 1, 1)
      ])

    const subwayColor = d3
      .scaleThreshold()
      .domain([1, 5, 10, 15, 20])
      .range([
        'white',
        d3.rgb(254, 255, 204),
        d3.rgb(253, 255, 160),
        d3.rgb(253, 235, 130),
        d3.rgb(255, 236, 100),
        d3.rgb(255, 219, 61)
      ])
    const housingColor = d3
      .scaleThreshold()
      .domain([1, 5, 10, 15, 20])
      .range([
        'white',
        d3.rgb(194, 194, 194),
        d3.rgb(137, 137, 137),
        d3.rgb(80, 80, 80),
        d3.rgb(57, 57, 57),
        d3.rgb(37, 37, 37)
      ])
    const treeColor = d3
      .scaleThreshold()
      .domain([1, 4, 8, 12, 16, 20])
      .range([
        'white',
        d3.rgb(31, 235, 148),
        d3.rgb(1, 204, 102),
        d3.rgb(0, 153, 75),
        d3.rgb(0, 122, 51),
        d3.rgb(0, 80, 15)
      ])
    const {classes} = this.props
    return (
      <div>
        {this.state.dataSet.length > 1 ? (
          <h3>Currently Showing {this.state.dataSet} Map</h3>
        ) : (
          <h3>Pick a map to display below</h3>
        )}
        {/* <form> */}
        <div className="mapAndQuestions">
          <form>
            <FormControl component="fieldset" className={classes.formControl}>
              <FormLabel component="legend">
                Select what you want to look at
              </FormLabel>
              <RadioGroup
                aria-label="aria label"
                name="location"
                value="location"
                onChange={this.handleChange}
              >
                <FormControlLabel
                  label="Crime"
                  control={<Radio />}
                  value="Crime"
                />
                <FormControlLabel
                  label="Subway Stations"
                  control={<Radio />}
                  value="Subway Stations"
                />
                <FormControlLabel
                  label="Housing Violations"
                  control={<Radio />}
                  value="Housing Violations"
                />
                <FormControlLabel
                  label="Trees"
                  control={<Radio />}
                  value="Trees"
                />
              </RadioGroup>
            </FormControl>
          </form>

          {/* <div className="mapAndQuestions">
            <select
              type="select"
              value={this.state}
              onChange={this.handleChange}
            >
              <option value="">SELECT</option>
              <option value="Crime"> Crime </option>
              <option value="Subway Stations"> Subway Stations</option>
              <option value="Housing Violations">Housing Violations</option>
              <option value="Trees">Trees</option>
            </select>
          </div> */}
          <div>
            {this.state.dataSet === 'Crime' && (
              <div>
                <h4>
                  This map shows the number of arrests in each neighborhood from
                  2018.
                </h4>
                <div className="mapWithKeys">
                  <MapWrapper
                    data={this.props.arrestData}
                    shouldRender={this.props.shouldRender}
                    color={ArrestColor}
                  />
                  <div>
                    <h3>1-4:</h3>
                    <img src="/keysForMap/crimeMap/red1.png" />
                    <h3>5-10:</h3>
                    <img src="/keysForMap/crimeMap/red2.png" />
                    <h3>11-15:</h3>
                    <img src="/keysForMap/crimeMap/red3.png" />
                    <h3>16-20:</h3>
                    <img src="/keysForMap/crimeMap/red4.png" />
                    <h3>20-25:</h3>
                    <img src="/keysForMap/crimeMap/red5.png" />
                    <h3>25+:</h3>
                    <img src="/keysForMap/crimeMap/red6.png" />
                  </div>
                </div>
              </div>
            )}
            {this.state.dataSet === 'Subway Stations' && (
              <div>
                <h4>
                  {' '}
                  This map shows the subway station density for each
                  neighborhood from September 2018.
                </h4>
                <div className="mapWithKeys">
                  <MapWrapper
                    data={this.props.subwayData}
                    shouldRender={this.props.shouldRender}
                    color={subwayColor}
                  />
                  <div>
                    <h3>1-4:</h3>
                    <img src="/keysForMap/subwayMap/yellow1.png" />
                    <h3>5-10:</h3>
                    <img src="/keysForMap/subwayMap/yellow2.png" />
                    <h3>10-15:</h3>
                    <img src="/keysForMap/subwayMap/yellow3.png" />
                    <h3>15-20:</h3>
                    <img src="/keysForMap/subwayMap/yellow4.png" />
                    <h3>20+:</h3>
                    <img src="/keysForMap/subwayMap/yellow5.png" />
                  </div>
                </div>
              </div>
            )}
            {this.state.dataSet === 'Housing Violations' && (
              <div>
                <h4>
                  This is a map of housing violations density for each
                  neighborhood from November 2018.
                </h4>
                <div className="mapWithKeys">
                  <MapWrapper
                    data={this.props.violationData}
                    shouldRender={this.props.shouldRender}
                    color={housingColor}
                  />
                  <div>
                    <h3>1-4:</h3>
                    <img src="/keysForMap/violationMap/gray1.png" />
                    <h3>5-10:</h3>
                    <img src="/keysForMap/violationMap/gray2.png" />
                    <h3>11-15:</h3>
                    <img src="/keysForMap/violationMap/gray3.png" />
                    <h3>16-20:</h3>
                    <img src="/keysForMap/violationMap/gray4.png" />
                    <h3>20+:</h3>
                    <img src="/keysForMap/violationMap/gray5.png" />
                  </div>
                </div>
              </div>
            )}
            {this.state.dataSet === 'Trees' && (
              <div>
                <h4>
                  This is a map of tree density for each neighborhood from 2015.
                </h4>
                <div className="mapWithKeys">
                  <MapWrapper
                    data={this.props.treeData}
                    shouldRender={this.props.shouldRender}
                    color={treeColor}
                  />
                  <div>
                    <h3>1-4:</h3>
                    <img src="/keysForMap/treeMap/green1.png" />
                    <h3>5-10:</h3>
                    <img src="/keysForMap/treeMap/green2.png" />
                    <h3>11-15:</h3>
                    <img src="/keysForMap/treeMap/green3.png" />
                    <h3>16-20:</h3>
                    <img src="/keysForMap/treeMap/green4.png" />
                    <h3>20+:</h3>
                    <img src="/keysForMap/treeMap/green5.png" />
                  </div>
                </div>
              </div>
            )}
          </div>
          {/* </form> */}
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  mapData: state.map.mapData,
  arrestData: state.addedMap.arrestMapData,
  subwayData: state.addedMap.subwayMapData,
  violationData: state.addedMap.violationMapData,
  shouldRender: state.map.shouldRender,
  treeData: state.addedMap.treeMapData
})

export default connect(mapStateToProps, null)(withStyles(styles)(MapWithData))
