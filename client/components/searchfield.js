import React from 'react'
import PropTypes from 'prop-types'
import deburr from 'lodash/deburr'
import Autosuggest from 'react-autosuggest'
import match from 'autosuggest-highlight/match'
import parse from 'autosuggest-highlight/parse'
import TextField from '@material-ui/core/TextField'
import Paper from '@material-ui/core/Paper'
import MenuItem from '@material-ui/core/MenuItem'
import {withStyles} from '@material-ui/core/styles'
import {connect} from 'react-redux'

const suggestions = [
  {label: 'Melrose'},
  {label: 'Mott Haven'},
  {label: 'Port Morris'},
  {label: 'Hunts Point'},
  {label: 'Longwood'},
  {label: 'Claremont'},
  {label: 'Concourse Village'},
  {label: 'Crotona Park'},
  {label: 'Morrisania'},
  {label: 'Concourse'},
  {label: 'High Bridge'},
  {label: 'Fordham'},
  {label: 'Morris Heights'},
  {label: 'Mount Hope'},
  {label: 'University Heights'},
  {label: 'Bathgate'},
  {label: 'Belmont'},
  {label: 'East Tremont'},
  {label: 'West Farms'},
  {label: 'Bedford Park'},
  {label: 'University Heights'},
  {label: 'Fieldston'},
  {label: 'Kingsbridge'},
  {label: 'Kingsbridge Heights'},
  {label: 'Marble Hill'},
  {label: 'Riverdale'},
  {label: 'Spuyten Duyvil'},
  {label: 'Van Cortlandt Village'},
  {label: 'Bronx River'},
  {label: 'Bruckner'},
  {label: 'Castle Hill'},
  {label: 'Clason Point'},
  {label: 'Harding Park'},
  {label: 'Parkchester'},
  {label: 'Soundview'},
  {label: 'Unionport'},
  {label: 'City Island'},
  {label: 'Co-op City'},
  {label: 'Locust Point'},
  {label: 'Pelham Bay'},
  {label: 'Silver Beach'},
  {label: 'Throgs Neck'},
  {label: 'Westchester Square'},
  {label: 'Allerton'},
  {label: 'Bronxdale'},
  {label: 'Indian Village'},
  {label: 'Laconia'},
  {label: 'Morris Park'},
  {label: 'Pelham Gardens'},
  {label: 'Pelham Parkway'},
  {label: 'Van Nest'},
  {label: 'Baychester'},
  {label: 'Edenwald'},
  {label: 'Eastchester'},
  {label: 'Fish Bay'},
  {label: 'Olinville'},
  {label: 'Wakefield'},
  {label: 'Williamsbridge'},
  {label: 'Woodlawn'},
  {label: 'Greenpoint'},
  {label: 'Williamsburg'},
  {label: 'Boerum Hill'},
  {label: 'Brooklyn Heights'},
  {label: 'Brooklyn Navy Yard'},
  {label: 'Clinton Hill'},
  {label: 'DUMBO'},
  {label: 'Fort Greene'},
  {label: 'Fulton Ferry'},
  {label: 'Fulton Mall'},
  {label: 'Vinegar Hill'},
  {label: 'Bedford-Stuyvesant'},
  {label: 'Ocean Hill'},
  {label: 'Stuyvesant Heights'},
  {label: 'Bushwick'},
  {label: 'City Line'},
  {label: 'Cypress Hills'},
  {label: 'East New York'},
  {label: 'Highland Park'},
  {label: 'New Lots'},
  {label: 'Starrett City'},
  {label: 'Carroll Gardens'},
  {label: 'Cobble Hill'},
  {label: 'Gowanus'},
  {label: 'Park Slope'},
  {label: 'Red Hook'},
  {label: 'Greenwood Heights'},
  {label: 'Sunset Park'},
  {label: 'Windsor Terrace'},
  {label: 'Crown Heights'},
  {label: 'Prospect Heights'},
  {label: 'Weeksville'},
  {label: 'Prospect Lefferts Gardens'},
  {label: 'Wingate'},
  {label: 'Bay Ridge'},
  {label: 'Dyker Heights'},
  {label: 'Fort Hamilton'},
  {label: 'Bath Beach'},
  {label: 'Bensonhurst'},
  {label: 'Gravesend'},
  {label: 'Mapleton'},
  {label: 'Borough Park'},
  {label: 'Kensington'},
  {label: 'Midwood'},
  {label: 'Ocean Parkway'},
  {label: 'Bensonhurst'},
  {label: 'Brighton BeachSoundview'},
  {label: 'Coney Island'},
  {label: 'Gravesend'},
  {label: 'Sea Gate'},
  {label: 'Flatbush'},
  {label: 'Kensington'},
  {label: 'Midwood'},
  {label: 'Ocean Parkway'},
  {label: 'East Gravesend'},
  {label: 'Gerritsen Beach'},
  {label: 'Homecrest'},
  {label: 'Kings Bay'},
  {label: 'Kings Highway'},
  {label: 'Madison'},
  {label: 'Manhattan Beach'},
  {label: 'Plum Beach'},
  {label: 'Sheepshead Bay'},
  {label: 'Brownsville'},
  {label: 'Ocean Hill'},
  {label: 'Ditmas Village'},
  {label: 'East FlatbushSoundview'},
  {label: 'Erasmus'},
  {label: 'Farragut'},
  {label: 'Remsen Village'},
  {label: 'Rugby'},
  {label: 'Bergen Beach'},
  {label: 'Canarsie'},
  {label: 'Flatlands'},
  {label: 'Georgetown'},
  {label: 'Marine Park'},
  {label: 'Mill Basin'},
  {label: 'Mill Island'},
  {label: 'Battery Park City'},
  {label: 'Financial District'},
  {label: 'TriBeCa'},
  {label: 'Chinatown'},
  {label: 'Greenwich Village'},
  {label: 'Little Italy'},
  {label: 'Lower East Side'},
  {label: 'NoHo'},
  {label: 'SoHo'},
  {label: 'West Village'},
  {label: 'Alphabet City'},
  {label: 'East Village'},
  {label: 'Two Bridges'},
  {label: 'Chelsea'},
  {label: 'Clinton'},
  {label: 'Midtown'},
  {label: 'Gramercy Park'},
  {label: 'Kips Bay'},
  {label: 'Murray Hill'},
  {label: 'Peter Cooper Village'},
  {label: 'Stuyvesant Town'},
  {label: 'Sutton Place'},
  {label: 'Tudor City'},
  {label: 'Turtle Bay'},
  {label: 'Waterside Plaza'},
  {label: 'Lincoln Square'},
  {label: 'Manhattan Valley'},
  {label: 'Upper West Side'},
  {label: 'Lenox Hill'},
  {label: 'Roosevelt Island'},
  {label: 'Upper East Side'},
  {label: 'Yorkville'},
  {label: 'Hamilton Heights'},
  {label: 'Manhattanville'},
  {label: 'Morningside Heights'},
  {label: 'Harlem'},
  {label: 'Polo Grounds'},
  {label: 'East Harlem'},
  {label: 'Randall’s Island'},
  {label: 'Spanish Harlem'},
  {label: 'Wards Island'},
  {label: 'Inwood'},
  {label: 'Washington Heights'},
  {label: 'Astoria'},
  {label: 'Ditmars'},
  {label: 'Garden Bay'},
  {label: 'Long Island City'},
  {label: 'Old Astoria'},
  {label: 'Queensbridge'},
  {label: 'Ravenswood'},
  {label: 'Steinway'},
  {label: 'Woodside'},
  {label: 'Hunters Point'},
  {label: 'Sunnyside'},
  {label: 'East Elmhurst'},
  {label: 'Jackson Heights'},
  {label: 'North Corona'},
  {label: 'Corona'},
  {label: 'Elmhurst'},
  {label: 'Fresh Pond'},
  {label: 'Glendale'},
  {label: 'Maspeth'},
  {label: 'Middle Village'},
  {label: 'Liberty Park'},
  {label: 'Ridgewood'},
  {label: 'Forest Hills'},
  {label: 'Rego Park'},
  {label: 'Bay Terrace'},
  {label: 'Beechhurst'},
  {label: 'College Point'},
  {label: 'Flushing'},
  {label: 'Linden Hill'},
  {label: 'Malba'},
  {label: 'Queensboro Hill'},
  {label: 'Whitestone'},
  {label: 'Willets Point'},
  {label: 'Briarwood'},
  {label: 'Cunningham Heights'},
  {label: 'Flushing South'},
  {label: 'Fresh Meadows'},
  {label: 'Hilltop Village'},
  {label: 'Holliswood'},
  {label: 'Jamaica Estates'},
  {label: 'Kew Gardens Hills'},
  {label: 'Pomonok Houses'},
  {label: 'Utopia'},
  {label: 'Kew Gardens'},
  {label: 'Ozone Park'},
  {label: 'Richmond Hill'},
  {label: 'Woodhaven'},
  {label: 'Howard Beach'},
  {label: 'Lindenwood'},
  {label: 'South Ozone Park'},
  {label: 'Tudor Village'},
  {label: 'Auburndale'},
  {label: 'Bayside'},
  {label: 'Douglaston'},
  {label: 'East Flushing'},
  {label: 'Hollis Hills'},
  {label: 'Little Neck'},
  {label: 'Oakland Gardens'},
  {label: 'Baisley Park'},
  {label: 'Jamaica'},
  {label: 'Hollis'},
  {label: 'Rochdale Village'},
  {label: 'St. Albans'},
  {label: 'South Jamaica'},
  {label: 'Springfield Gardens'},
  {label: 'Bellerose'},
  {label: 'Brookville'},
  {label: 'Cambria Heights'},
  {label: 'Floral Park'},
  {label: 'Glen Oaks'},
  {label: 'Laurelton'},
  {label: 'Meadowmere'},
  {label: 'New Hyde Park'},
  {label: 'Queens Village'},
  {label: 'Rosedale'},
  {label: 'Arverne'},
  {label: 'Bayswater'},
  {label: 'Belle Harbor'},
  {label: 'Breezy Point'},
  {label: 'Edgemere'},
  {label: 'Far Rockaway'},
  {label: 'Neponsit'},
  {label: 'Rockaway Park'},
  {label: 'Arlington'},
  {label: 'Castleton Corners'},
  {label: 'Clifton'},
  {label: 'Concord'},
  {label: 'Elm Park'},
  {label: 'Fort Wadsworth'},
  {label: 'Graniteville'},
  {label: 'Grymes Hill'},
  {label: 'Livingston'},
  {label: 'Mariners Harbor'},
  {label: 'Meiers Corners'},
  {label: 'New Brighton'},
  {label: 'Port Ivory'},
  {label: 'Port Richmond'},
  {label: 'Randall Manor'},
  {label: 'Rosebank'},
  {label: 'St. George'},
  {label: 'Shore Acres'},
  {label: 'Silver Lake'},
  {label: 'Stapleton'},
  {label: 'Sunnyside'},
  {label: 'Tompkinsville'},
  {label: 'West Brighton'},
  {label: 'Westerleigh'},
  {label: 'Arrochar'},
  {label: 'Bloomfield'},
  {label: 'Bulls Head'},
  {label: 'Chelsea (Staten Island'},
  {label: 'Dongan Hills'},
  {label: 'Egbertville'},
  {label: 'Emerson Hill'},
  {label: 'Grant City'},
  {label: 'Grasmere'},
  {label: 'Midland Beach'},
  {label: 'New Dorp'},
  {label: 'New Springville'},
  {label: 'Oakwood'},
  {label: 'Ocean Breeze'},
  {label: 'Old Town'},
  {label: 'South Beach'},
  {label: 'Todt Hill'},
  {label: 'Travis'},
  {label: 'Annadale'},
  {label: 'Arden Heights'},
  {label: 'Bay Terrace'},
  {label: 'Charleston'},
  {label: 'Eltingville'},
  {label: 'Great Kills'},
  {label: 'Greenridge'},
  {label: 'Huguenot'},
  {label: 'Pleasant Plains'},
  {label: 'Prince’s Bay'},
  {label: 'Richmond Valley'},
  {label: 'Rossville'},
  {label: 'Tottenville'},
  {label: 'Woodrow'}
]

function renderInputComponent(inputProps) {
  const {classes, inputRef = () => {}, ref, ...other} = inputProps

  return (
    <TextField
      fullWidth
      InputProps={{
        inputRef: node => {
          ref(node)
          inputRef(node)
        },
        classes: {
          input: classes.input
        }
      }}
      {...other}
    />
  )
}

function renderSuggestion(suggestion, {query, isHighlighted}) {
  const matches = match(suggestion.label, query)
  const parts = parse(suggestion.label, matches)

  return (
    <MenuItem selected={isHighlighted} component="div">
      <div>
        {parts.map((part, index) => {
          return part.highlight ? (
            <span key={String(index)} style={{fontWeight: 500}}>
              {part.text}
            </span>
          ) : (
            <strong key={String(index)} style={{fontWeight: 300}}>
              {part.text}
            </strong>
          )
        })}
      </div>
    </MenuItem>
  )
}

function getSuggestions(value) {
  const inputValue = deburr(value.trim()).toLowerCase()
  const inputLength = inputValue.length
  let count = 0

  return inputLength === 0
    ? []
    : suggestions.filter(suggestion => {
        const keep =
          count < 5 &&
          suggestion.label.slice(0, inputLength).toLowerCase() === inputValue

        if (keep) {
          count += 1
        }

        return keep
      })
}

function getSuggestionValue(suggestion) {
  return suggestion.label
}

const styles = theme => ({
  root: {
    height: 250,
    flexGrow: 1
  },
  container: {
    position: 'relative'
  },
  suggestionsContainerOpen: {
    position: 'absolute',
    zIndex: 1,
    marginTop: theme.spacing.unit,
    top: '40px',
    left: 0,
    right: 0
  },
  suggestion: {
    display: 'block'
  },
  suggestionsList: {
    margin: 0,
    padding: 0,
    listStyleType: 'none'
  },
  divider: {
    height: theme.spacing.unit * 2
  }
})

class IntegrationAutosuggest extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      neighborhood: '',
      suggestions: []
    }
  }

  async componentDidMount() {
    this.setState({neighborhood: this.props.userInfo.location})
  }

  handleSuggestionsFetchRequested = ({value}) => {
    this.setState({
      suggestions: getSuggestions(value)
    })
  }

  handleSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    })
  }

  handleChange = name => (event, {newValue}) => {
    this.setState({
      [name]: newValue
    })
    this.props.handleChangeComponent(this.props.fieldKey, newValue)
  }

  render() {
    const {classes} = this.props
    const autosuggestProps = {
      renderInputComponent,
      suggestions: this.state.suggestions,
      onSuggestionsFetchRequested: this.handleSuggestionsFetchRequested,
      onSuggestionsClearRequested: this.handleSuggestionsClearRequested,
      getSuggestionValue,
      renderSuggestion
    }

    return (
      <div className={classes.root}>
        <Autosuggest
          {...autosuggestProps}
          inputProps={{
            label: this.props.label,
            classes,
            placeholder: 'Search for a neighborhood',
            value: this.state.neighborhood,
            onChange: this.handleChange('neighborhood')
          }}
          theme={{
            container: classes.container,
            suggestionsContainerOpen: classes.suggestionsContainerOpen,
            suggestionsList: classes.suggestionsList,
            suggestion: classes.suggestion
          }}
          renderSuggestionsContainer={options => (
            <Paper {...options.containerProps} square>
              {options.children}
            </Paper>
          )}
        />
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    userId: state.user.id,
    userInfo: state.user
  }
}

IntegrationAutosuggest.propTypes = {
  classes: PropTypes.object.isRequired
}

export default connect(mapStateToProps)(
  withStyles(styles)(IntegrationAutosuggest)
)
