import React, {Component, Fragment} from 'react'
import {Navbar} from './components'
import Routes from './routes'
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
}

export default App
