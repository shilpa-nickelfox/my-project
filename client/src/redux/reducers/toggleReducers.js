import {TOGGLE_VALUE, TOGGLE_REMOVE} from '../types/type'





const intialState  = true



 const toggleReducers = (state = intialState, action)=>{
    switch(action.type){
      case TOGGLE_VALUE: return state = action.payload
      case TOGGLE_REMOVE: return state = action.payload
        
        default:
        return state;
    }
  };

  export default toggleReducers

