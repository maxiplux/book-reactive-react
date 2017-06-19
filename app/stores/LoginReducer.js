import {
  LOGIN_SUCCESS,
  LOGIN_REQUEST,
  LOGOUT_REQUEST
} from '../actions/const'

const initialState = {
  load: false,
  profile: null
}


//Login Reducer
export const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        load: true,
        profile: action.profile
      }
    case LOGOUT_REQUEST:
      return initialState
    case LOGIN_REQUEST:
      return state
    default:
      return state
  }
}


export default loginReducer
