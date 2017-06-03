

const initialState = {
  load: false,
  profile: null
}


//Login Reducer
export const loginStore = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      return {
        load: true,
        profile: action.profile
      }
    default:
      return state
  }

}

// export getProfile(){
//
// }




export default loginStore
