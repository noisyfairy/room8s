import React, {Fragment} from 'react'
import {Navbar} from './components'
import Routes from './routes'
// import {CssBaseline} from '@material-ui/core/'
// import {connect} from 'react-redux'

const App = () => {
  return (
    <div>
      <Navbar />
    </div>
  )
}

export default App

// const mapState = state => ({
//   isLoggedIn: !!state.user.id
// })

// export default connect(mapState)(App)
