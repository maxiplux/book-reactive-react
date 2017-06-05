import {
  FIND_FOLLOWERS_FOLLOWINGS_REQUEST,
  RESET_FOLLOWERS_STORE
} from '../actions/const'

const initialState = {
  tab: null,
  users: []
}

export const followerStore = (state = initialState, action) => {
  switch (action.type) {
    case FIND_FOLLOWERS_FOLLOWINGS_REQUEST:
      return {
        users: action.users
      }
    case RESET_FOLLOWERS_STORE:
      return {
        tab: null,
        users: []
      }
    default:
      return state

  }
}


export default followerStore
