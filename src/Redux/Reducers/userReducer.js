let initialState = {
  user: {
    id: 0,
    username: "",
    profile_pic: ""
  },
  token: ""
}

const userReducer = (state = initialState, action) => {

  switch (action.type) {

    case "SET_USER":
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token
      }

    case "CLEAR_USER":
      return initialState

    default:
      return state

  }

}

export default userReducer;