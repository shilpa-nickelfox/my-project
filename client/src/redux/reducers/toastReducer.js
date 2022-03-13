import {TOASTER} from '../types/type'





const intialState  = null



 const toastReducers = (state = intialState, action)=>{

    switch(action.type){
      case TOASTER: 
      return state = action.payload
      break;
        default:
        return state;
    }
    
  };


  export default toastReducers

