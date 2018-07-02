import userReducer from './user'
import patternReducer from './pattern'
import {combineReducers} from 'redux'

export default combineReducers({
  user: userReducer,
  pattern: patternReducer
})
