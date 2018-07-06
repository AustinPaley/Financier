import userReducer from './user'
import patternReducer from './pattern'
import symbolsReducer from './symbols'
import {combineReducers} from 'redux'

export default combineReducers({
  user: userReducer,
  pattern: patternReducer,
  symbols: symbolsReducer
})
