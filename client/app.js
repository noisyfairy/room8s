import React, {Component, Fragment} from 'react'
import {Navbar} from './components'
import Routes from './routes'
<<<<<<< HEAD
<<<<<<< HEAD
import {CssBaseline} from '@material-ui/core/'

class App extends Component {
  render() {
    return (
      <Fragment>
        <CssBaseline />
        {/* <Navbar /> */}
        <Routes />
      </Fragment>
    )
  }
=======
import NYCNeighborhoods from './components/NYCneighborhoods'

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes />
      <div className="App">
        <svg width="960" height="720">
          <NYCNeighborhoods width={960} height={720} />
        </svg>
      </div>
    </div>
  )
>>>>>>> origin/master
=======
import NYCNeighborhoods from './components/NYCneighborhoods'
import {CssBaseline} from '@material-ui/core/'

const App = () => {
  
    return (
      <Fragment>
        <CssBaseline />
        {/* <Navbar /> */}
        <Routes />
        <div className="App">
          <svg width="960" height="720">
            <NYCNeighborhoods width={960} height={720} />
          </svg>
        </div>
      </Fragment>
    )
>>>>>>> d336129cf1cca2f2f538c018a907e6d0f7b79eb0
}

export default App
