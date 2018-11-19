import React, {Fragment} from 'react'
import {Navbar} from './components'
import Routes from './routes'
// import {CssBaseline} from '@material-ui/core/'

const App = () => {
  return (
    <Fragment>
      {/* <CssBaseline /> */}
      <Navbar />
      <Routes />
    </Fragment>
  )
}

export default App
