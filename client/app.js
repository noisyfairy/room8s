import React from 'react'

import {Navbar} from './components'
import Routes from './routes'
import NYCNeighborhoods from './components/NYCneighborhoods'

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes />
      <div className="App">
        <svg width="650" height="720">
          <NYCNeighborhoods width={650} height={720} />
        </svg>
      </div>
    </div>
  )
}

export default App
