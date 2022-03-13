import {TOGGLE_VALUE,TOGGLE_REMOVE, TOASTER} from '../types/type';



export const addToggle = (toggle) =>{
    return{
      type: TOGGLE_VALUE,
      payload: toggle,
    }
    
  }

  export const removeToggle = (toggle) =>{
    return{
      type: TOGGLE_REMOVE,
      payload: toggle,
    }
    
  }

  export const toasterValue = (toaster) =>{
    return{
      type: TOASTER,
      payload: toaster,
    }
    
  }