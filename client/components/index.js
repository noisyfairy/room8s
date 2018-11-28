/**
 * `components/index.js` exists simply as a 'central export' for our components.
 * This way, we can import all of our components from the same place, rather than
 * having to figure out which file they belong to!
 */
export {default as Navbar} from './Navbar'
export {default as UserHome} from './user-home'
export {default as Profile} from './Profile'
export {Login, Signup} from './auth-form'

export {default as Main} from './Main'
export {default as SignupPage} from './SignupPage'
export {default as Welcome} from './Welcome'
// export {default as Questions} from './Questions'

// export {default as Users} from './Users'
export {default as MatchUsers} from './MatchUsers'
// export {default as FavoriteUsers} from './FavoriteUsers'
export {default as SingleUser} from './SingleUser'
export {default as TwoWayFav} from './TwoWayFav'

//Forms
export {default as QuestionsForm} from './questionsForm'
export {default as UserInfoForm} from './userInfoForm'
export {default as Algo} from './algo'

// export {default as MapView } from './MapView'
export {default as NYCNeighborhoods} from './NYCNeighborhoods'
export {default as ConnectedMapAndQuestions} from './MapAndQuestions'
export {
  default as ConnectedMapQuestionnaireAnswer
} from './MapQuestionnaireAnswer'

// export {default as } from './'

export {default as MapWithData} from './MapWithData'
