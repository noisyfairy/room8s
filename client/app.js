import React, {Fragment} from 'react'
import {Navbar} from './components'
import Routes from './routes'
import ConnectedMapWrapper from './components/MapWrapper'
import {CssBaseline} from '@material-ui/core/'

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes />
    </div>
  )
}

export default App
