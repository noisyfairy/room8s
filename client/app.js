import React, {Component, Fragment} from 'react'
import {Navbar} from './components'
import Routes from './routes'
import ConnectedMapWrapper from './components/MapWrapper'
// <<<<<<< HEAD
// <<<<<<< HEAD
// import {CssBaseline} from '@material-ui/core/'

// class App extends Component {
//   render() {
//     return (
//       <Fragment>
//         <CssBaseline />
//         {/* <Navbar /> */}
//         <Routes />
//       </Fragment>
//     )
//   }
// =======
// import NYCNeighborhoods from './components/NYCneighborhoods'

// const App = () => {
//   return (
//     <div>
//       <Navbar />
//       <Routes />
//       <div className="App">
//         <svg width="650" height="720">
//           <NYCNeighborhoods width={650} height={720} />
//         </svg>
//       </div>
//     </div>
//   )
// >>>>>>> origin/master
// =======
// import ConnectedNYCNeighborhoods from './components/NYCneighborhoods'
import {CssBaseline} from '@material-ui/core/'

const App = () => {
  return (
    <Fragment>
      <CssBaseline />
      <Navbar />
      <Routes />
      <ConnectedMapWrapper />
    </Fragment>
  )
}

export default App
