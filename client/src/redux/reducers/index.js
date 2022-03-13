import {combineReducers} from 'redux'
import toggleReducers from './toggleReducers'
import toastReducers from './toastReducer'



  const rootReducer = combineReducers({
    toggleReducers,
    toastReducers,
})

export default rootReducer