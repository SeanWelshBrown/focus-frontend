let initialState = {
  user: {
    id: 0,
    username: "",
    profile_pic: "",
    time_meditated: 0
  },
  meditationSessions: [],
  focusSessions: [],
  token: ""
}

const userReducer = (state = initialState, action) => {

  switch (action.type) {

    case "SET_USER":
      return {
        ...state,
        user: action.payload.user,
        meditationSessions: action.payload.user.meditation_sessions,
        token: action.payload.token
      }

    case "CLEAR_USER":
      return initialState

    case "DELETE_MEDITATION_SESSION":
      return {
        ...state,
        meditationSessions: state.meditationSessions.filter( session => session.id !== action.payload )
      }

    default:
      return state

  }

}

export default userReducer;