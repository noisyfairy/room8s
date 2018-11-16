/**
 * `components/index.js` exists simply as a 'central export' for our components.
 * This way, we can import all of our components from the same place, rather than
 * having to figure out which file they belong to!
 */
export {default as Navbar} from './navbar'
export {default as UserHome} from './user-home'
export {Login, Signup} from './auth-form'

export {default as Main } from './Main'
export {default as MapView } from './MapView'
export {default as Questions } from './Questions'
export {default as AllMatchUsers } from './AllMatchUsers'
export {default as SingleUser } from './SingleUser'
export {default as FavoriteUsers } from './FavoriteUsers'

// export {default as } from './'
