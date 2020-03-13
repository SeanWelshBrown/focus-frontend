let initialState = {
  user: {
    username: "",
    id: 0,
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

    default:
      return state

  }

}

export default userReducer;